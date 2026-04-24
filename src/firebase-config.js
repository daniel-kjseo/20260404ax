/**
 * QARAH — Firebase Configuration
 *
 * 🔧 설정 방법:
 *   1. Firebase Console (console.firebase.google.com) → 프로젝트 선택
 *   2. 프로젝트 설정 → 앱 → 웹앱 → SDK 구성 복사
 *   3. 아래 REPLACE_WITH_* 값을 실제 값으로 교체
 *
 * 🔧 Firestore 활성화:
 *   Firebase Console → Firestore Database → 데이터베이스 만들기 → 프로덕션 모드
 *   Rules 탭에서 아래 규칙 설정 (초기 개발용):
 *   rules_version = '2';
 *   service cloud.firestore {
 *     match /databases/{database}/documents {
 *       match /stats/{doc}     { allow read: if true; allow write: if true; }
 *       match /nameLikes/{doc} { allow read: if true; allow write: if true; }
 *     }
 *   }
 */
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore }           from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey:            'REPLACE_WITH_API_KEY',
    authDomain:        'qarah.firebaseapp.com',
    projectId:         'qarah',
    storageBucket:     'qarah.appspot.com',
    messagingSenderId: 'REPLACE_WITH_SENDER_ID',
    appId:             'REPLACE_WITH_APP_ID',
};

let _db = null;

export function getDB() {
    if (_db) return _db;
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    _db = getFirestore(app);
    return _db;
}

export function isConfigured() {
    return !firebaseConfig.apiKey.startsWith('REPLACE_WITH');
}
