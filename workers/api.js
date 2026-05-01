/**
 * QARAH — Cloudflare Workers API
 * Endpoints:
 *   POST /api/visit           — track analysis (60s IP cooldown)
 *   GET  /api/stats           — { total, today }
 *   POST /api/like            — like a name (24h IP+nameKey cooldown)
 *   GET  /api/ranking?period=total&limit=10
 */

const VISIT_COOLDOWN_TTL = 60;      // seconds
const LIKE_COOLDOWN_TTL = 86400;    // 24 hours

const ALLOWED_ORIGINS = new Set([
    'https://havenames.com',
    'https://www.havenames.com',
    'https://20260404ax.pages.dev',
]);

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;
        const origin = request.headers.get('Origin') || '';

        // CORS preflight
        if (method === 'OPTIONS') {
            return corsResponse(null, 204, origin);
        }

        try {
            if (path === '/api/visit' && method === 'POST') {
                return await handleVisit(request, env, origin);
            }
            if (path === '/api/stats' && method === 'GET') {
                return await handleStats(request, env, origin);
            }
            if (path === '/api/like' && method === 'POST') {
                return await handleLike(request, env, origin);
            }
            if (path === '/api/ranking' && method === 'GET') {
                return await handleRanking(request, env, url, origin);
            }
            return corsResponse({ error: 'Not Found' }, 404, origin);
        } catch (e) {
            console.error(e);
            return corsResponse({ error: 'Internal Server Error' }, 500, origin);
        }
    },
};

// --- Handlers ---

async function handleVisit(request, env, origin) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const kvKey = `visit:${ip}`;

    // 60s cooldown per IP
    if (await env.KV.get(kvKey)) {
        return corsResponse({ ok: false, reason: 'cooldown' }, 429, origin);
    }
    await env.KV.put(kvKey, '1', { expirationTtl: VISIT_COOLDOWN_TTL });

    const day = dateKey();
    await env.DB.prepare(
        'INSERT INTO visits (day, count) VALUES (?, 1) ON CONFLICT(day) DO UPDATE SET count = count + 1'
    ).bind(day).run();

    return corsResponse({ ok: true }, 200, origin);
}

async function handleStats(_request, env, origin) {
    const day = dateKey();

    const totalRow = await env.DB.prepare(
        'SELECT SUM(count) AS total FROM visits'
    ).first();
    const todayRow = await env.DB.prepare(
        'SELECT count FROM visits WHERE day = ?'
    ).bind(day).first();

    return corsResponse({
        total: totalRow?.total || 0,
        today: todayRow?.count || 0,
    }, 200, origin);
}

async function handleLike(request, env, origin) {
    let body;
    try { body = await request.json(); } catch { return corsResponse({ error: 'Invalid JSON' }, 400, origin); }

    const { nameKey, name, category } = body || {};
    if (!nameKey || !name || !category) {
        return corsResponse({ error: 'Missing fields' }, 400, origin);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const kvKey = `like:${ip}:${nameKey}`;

    // 24h cooldown per IP+nameKey
    if (await env.KV.get(kvKey)) {
        return corsResponse({ ok: false, reason: 'already_liked' }, 429, origin);
    }
    await env.KV.put(kvKey, '1', { expirationTtl: LIKE_COOLDOWN_TTL });

    const d = dateKey();
    const w = weekKey();
    const m = monthKey();
    const y = yearKey();

    await env.DB.prepare(`
        INSERT INTO likes (name_key, name, category, day, week, month, year, count)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        ON CONFLICT(name_key, day) DO UPDATE SET count = likes.count + 1
    `).bind(nameKey, name, category, d, w, m, y).run();

    return corsResponse({ ok: true }, 200, origin);
}

async function handleRanking(_request, env, url, origin) {
    const period = url.searchParams.get('period') || 'total';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10', 10), 50);

    let rows;

    if (period === 'total') {
        const result = await env.DB.prepare(`
            SELECT name_key, name, category,
                   SUM(count) AS total
            FROM likes
            GROUP BY name_key
            ORDER BY total DESC
            LIMIT ?
        `).bind(limit).all();
        rows = result.results;
    } else {
        const field = periodField(period);
        if (!field) return corsResponse({ error: 'Invalid period' }, 400, origin);

        const result = await env.DB.prepare(`
            SELECT name_key, name, category,
                   SUM(count) AS total
            FROM likes
            WHERE ${field} = ?
            GROUP BY name_key
            ORDER BY total DESC
            LIMIT ?
        `).bind(periodValue(period), limit).all();
        rows = result.results;
    }

    return corsResponse({ items: rows || [] }, 200, origin);
}

// --- Helpers ---

function corsResponse(body, status, origin) {
    const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'https://havenames.com';
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin',
    };
    return new Response(
        body !== null ? JSON.stringify(body) : null,
        { status, headers }
    );
}

function getKSTDate() {
    // Current time + 9 hours
    return new Date(Date.now() + (9 * 60 * 60 * 1000));
}

function dateKey() {
    const d = getKSTDate();
    return d.getUTCFullYear()
        + String(d.getUTCMonth() + 1).padStart(2, '0')
        + String(d.getUTCDate()).padStart(2, '0');
}

function weekKey() {
    const d = getKSTDate();
    const jan1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Number of days since Jan 1 (0-indexed)
    const dayOfYear = Math.floor((d.getTime() - jan1.getTime()) / 86400000);
    // Jan 1st day of week: 0=Sun, 1=Mon, ..., 6=Sat
    // Convert to Monday=1, ..., Sunday=7
    const jan1Day = jan1.getUTCDay() === 0 ? 7 : jan1.getUTCDay();
    // Week number calculation where Monday starts the week
    const week = Math.ceil((dayOfYear + jan1Day) / 7);
    return d.getUTCFullYear() + '_' + String(week).padStart(2, '0');
}

function monthKey() {
    const d = getKSTDate();
    return d.getUTCFullYear() + String(d.getUTCMonth() + 1).padStart(2, '0');
}

function yearKey() {
    const d = getKSTDate();
    return String(d.getUTCFullYear());
}

function periodField(period) {
    return { daily: 'day', weekly: 'week', monthly: 'month', yearly: 'year' }[period] || null;
}

function periodValue(period) {
    if (period === 'daily') return dateKey();
    if (period === 'weekly') return weekKey();
    if (period === 'monthly') return monthKey();
    if (period === 'yearly') return yearKey();
    return null;
}
