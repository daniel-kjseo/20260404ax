/**
 * QARAH — Analytics Tracker
 * Firestore 기반 분석 횟수 추적 + 홈페이지 실시간 카운터
 */
import { getDB, isConfigured }  from './firebase-config.js';
import {
    doc, getDoc, setDoc, updateDoc, increment, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const THROTTLE_KEY = 'qarah_last_analysis_ts';
const THROTTLE_MS  = 60_000; // 같은 브라우저 1분 내 중복 카운트 방지

/**
 * 분석 완료 시 호출 — Firestore 카운터 증가
 * @param {string} category  'korean' | 'english' | 'bible' | …
 */
export async function trackAnalysis(category = 'unknown') {
    if (!isConfigured()) return;
    try {
        const now  = Date.now();
        const last = parseInt(localStorage.getItem(THROTTLE_KEY) || '0');
        if (now - last < THROTTLE_MS) return;
        localStorage.setItem(THROTTLE_KEY, String(now));

        const db    = getDB();
        const ref   = doc(db, 'stats', 'global');
        const today = dateKey();

        await updateDoc(ref, {
            totalAnalyses:  increment(1),
            [`d_${today}`]: increment(1),
            updatedAt:      serverTimestamp(),
        }).catch(async () => {
            // 문서 없으면 생성
            await setDoc(ref, {
                totalAnalyses:    1,
                [`d_${today}`]:   1,
                createdAt:        serverTimestamp(),
                updatedAt:        serverTimestamp(),
            });
        });

        // GA4 이벤트 (GA4 스크립트가 로드된 경우)
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
    if (!isConfigured()) return { total: 0, today: 0 };
    try {
        const snap = await getDoc(doc(getDB(), 'stats', 'global'));
        if (!snap.exists()) return { total: 0, today: 0 };
        const d = snap.data();
        return {
            total: d.totalAnalyses || 0,
            today: d[`d_${dateKey()}`] || 0,
        };
    } catch (e) {
        return { total: 0, today: 0 };
    }
}

function dateKey() {
    const d = new Date();
    return d.getFullYear().toString()
        + String(d.getMonth() + 1).padStart(2, '0')
        + String(d.getDate()).padStart(2, '0');
}
