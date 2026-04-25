/**
 * QARAH — Likes Tracker
 * Cloudflare Workers API 기반 이름 좋아요 기능 + 순위 조회
 */
import { QARAH_API_BASE } from './api-config.js';

const LIKE_PREFIX = 'qarah_liked_';

/** nameKey 생성: "{category}_{name}" */
export function makeNameKey(category, name) {
    return (category + '_' + name)
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w가-힣ぁ-ん一-龯]/g, '')
        .slice(0, 80);
}

/** 이 브라우저에서 좋아요를 누른 적 있는지 확인 (UI 상태용) */
export function hasLiked(nameKey) {
    return !!localStorage.getItem(LIKE_PREFIX + nameKey);
}

/**
 * 좋아요 등록 — 같은 브라우저에서는 한 번만 허용 (UI 상태).
 * 실제 중복 방지는 서버(KV 60s TTL)가 담당.
 * @returns {boolean} 실제로 등록됐으면 true
 */
export async function toggleLike(nameKey, { name, category }) {
    if (hasLiked(nameKey)) return false;
    localStorage.setItem(LIKE_PREFIX + nameKey, '1');

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
