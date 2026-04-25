/**
 * QARAH — Analytics Tracker
 * Cloudflare Workers API 기반 분석 횟수 추적 + 홈페이지 실시간 카운터
 */
import { QARAH_API_BASE } from './api-config.js';

const THROTTLE_KEY = 'qarah_last_analysis_ts';
const THROTTLE_MS  = 60_000;

/**
 * 분석 완료 시 호출 — Workers API 카운터 증가
 * @param {string} category  'korean' | 'english' | 'bible' | …
 */
export async function trackAnalysis(category = 'unknown') {
    if (!QARAH_API_BASE) return;
    try {
        const now  = Date.now();
        const last = parseInt(localStorage.getItem(THROTTLE_KEY) || '0');
        if (now - last < THROTTLE_MS) return;
        localStorage.setItem(THROTTLE_KEY, String(now));

        await fetch(`${QARAH_API_BASE}/api/visit`, { method: 'POST' });

        if (typeof gtag === 'function') {
            gtag('event', 'analysis_complete', { category });
        }
    } catch (e) {
        console.debug('[QARAH] Analytics track skipped:', e.message);
    }
}

/**
 * 홈페이지용 — 통계 읽기
 * @returns {{ total: number, today: number }}
 */
export async function loadStats() {
    if (!QARAH_API_BASE) return { total: 0, today: 0 };
    try {
        const resp = await fetch(`${QARAH_API_BASE}/api/stats`);
        if (!resp.ok) return { total: 0, today: 0 };
        return await resp.json();
    } catch (e) {
        return { total: 0, today: 0 };
    }
}
