/**
 * QARAH — Likes Tracker
 * Cloudflare Workers API 기반 이름 좋아요 기능 + 순위 조회
 */
import { QARAH_API_BASE } from './api-config.js';

const LIKE_PREFIX = 'qarah_liked_';
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24시간 중복 방지 (클라이언트 측)

/** nameKey 생성: "{category}_{name}" */
export function makeNameKey(category, name) {
    return (category + '_' + name)
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w가-힣ぁ-ん一-龯]/g, '')
        .slice(0, 80);
}

/** 이미 24시간 내 좋아요 눌렀는지 확인 (localStorage 기반) */
export function hasLiked(nameKey) {
    const ts = parseInt(localStorage.getItem(LIKE_PREFIX + nameKey) || '0');
    return Date.now() - ts < COOLDOWN_MS;
}

/**
 * 좋아요 등록 (이미 눌렀으면 no-op)
 * 서버에서도 IP 기반 24h 중복 방지를 적용하므로 클라이언트는 UX용으로만 체크
 * @returns {boolean} 실제로 등록됐으면 true
 */
export async function toggleLike(nameKey, { name, category }) {
    if (hasLiked(nameKey)) return false;
    localStorage.setItem(LIKE_PREFIX + nameKey, String(Date.now()));

    if (QARAH_API_BASE) {
        try {
            await fetch(`${QARAH_API_BASE}/api/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nameKey, name, category }),
            });
        } catch (e) {
            console.debug('[QARAH] Like track skipped:', e.message);
        }
    }

    if (typeof gtag === 'function') {
        gtag('event', 'name_liked', { name, category });
    }
    return true;
}

/**
 * 순위 데이터 조회 — Workers API SQL 쿼리 사용
 * @param {'total'|'daily'|'weekly'|'monthly'|'yearly'} period
 * @param {number} topN
 */
export async function loadRanking(period = 'total', topN = 10) {
    if (!QARAH_API_BASE) return [];
    try {
        const url  = `${QARAH_API_BASE}/api/ranking?period=${period}&limit=${topN}`;
        const resp = await fetch(url);
        if (!resp.ok) return [];
        const { items } = await resp.json();
        return items || [];
    } catch (e) {
        console.debug('[QARAH] Ranking load failed:', e.message);
        return [];
    }
}
