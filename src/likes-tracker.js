/**
 * QARAH — Likes Tracker
 * Firestore 기반 이름 좋아요 기능 + 순위 조회
 */
import { getDB, isConfigured } from './firebase-config.js';
import {
    doc, setDoc, updateDoc, increment,
    collection, query, orderBy, limit, getDocs,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const LIKE_PREFIX  = 'qarah_liked_';
const COOLDOWN_MS  = 24 * 60 * 60 * 1000; // 24시간 중복 방지

/** nameKey 생성: "{category}_{name}" → Firestore 문서 ID용 */
export function makeNameKey(category, name) {
    return (category + '_' + name)
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w가-힣ぁ-ん一-龯]/g, '')
        .slice(0, 80);
}

/** 이미 24시간 내 좋아요 눌렀는지 확인 */
export function hasLiked(nameKey) {
    const ts = parseInt(localStorage.getItem(LIKE_PREFIX + nameKey) || '0');
    return Date.now() - ts < COOLDOWN_MS;
}

/**
 * 좋아요 등록 (이미 눌렀으면 no-op)
 * @returns {boolean} 실제로 등록됐으면 true
 */
export async function toggleLike(nameKey, { name, category }) {
    if (hasLiked(nameKey)) return false;
    localStorage.setItem(LIKE_PREFIX + nameKey, String(Date.now()));

    if (isConfigured()) {
        try {
            const db  = getDB();
            const ref = doc(db, 'nameLikes', nameKey);
            const now = new Date();
            const d   = _dateKey(now);
            const w   = _weekKey(now);
            const m   = _monthKey(now);
            const y   = now.getFullYear().toString();

            await updateDoc(ref, {
                total:       increment(1),
                [`d_${d}`]:  increment(1),
                [`w_${w}`]:  increment(1),
                [`m_${m}`]:  increment(1),
                [`y_${y}`]:  increment(1),
            }).catch(async () => {
                await setDoc(ref, {
                    name, category,
                    total:       1,
                    [`d_${d}`]:  1,
                    [`w_${w}`]:  1,
                    [`m_${m}`]:  1,
                    [`y_${y}`]:  1,
                });
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
 * 순위 데이터 조회
 * total 기준 상위 200개를 가져온 뒤 period 기준으로 클라이언트 정렬
 * (Firestore 동적 필드 인덱스 불필요)
 * @param {'total'|'daily'|'weekly'|'monthly'|'yearly'} period
 * @param {number} topN
 */
export async function loadRanking(period = 'total', topN = 10) {
    if (!isConfigured()) return [];
    try {
        const db = getDB();
        const q  = query(
            collection(db, 'nameLikes'),
            orderBy('total', 'desc'),
            limit(200),
        );
        const snap = await getDocs(q);
        const all  = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        if (period === 'total') return all.slice(0, topN);

        const now = new Date();
        const fieldMap = {
            daily:   `d_${_dateKey(now)}`,
            weekly:  `w_${_weekKey(now)}`,
            monthly: `m_${_monthKey(now)}`,
            yearly:  `y_${now.getFullYear()}`,
        };
        const field = fieldMap[period];
        return all
            .filter(d => (d[field] || 0) > 0)
            .sort((a, b) => (b[field] || 0) - (a[field] || 0))
            .slice(0, topN);
    } catch (e) {
        console.debug('[QARAH] Ranking load failed:', e.message);
        return [];
    }
}

function _dateKey(d) {
    return d.getFullYear().toString()
        + String(d.getMonth() + 1).padStart(2, '0')
        + String(d.getDate()).padStart(2, '0');
}

function _weekKey(d) {
    const jan1 = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7);
    return d.getFullYear() + '_' + String(week).padStart(2, '0');
}

function _monthKey(d) {
    return d.getFullYear().toString() + String(d.getMonth() + 1).padStart(2, '0');
}
