/**
 * Global I18n strings and Data Store for Idols and Archetypes
 * Optimized for 2026 K-Pop Debut Evaluation
 */

export const i18n = {
    en: {
        title: "K-Idol Debut Evaluation",
        subtitle: "AI analysis of your debut potential & position",
        selectionLabel: "Select Gender:",
        uploadText: "Calculate my Debut Score",
        uploadHint: "High-quality photo for better accuracy",
        statusText: "⚡ Evaluating your facial symmetry and vibe...",
        privacyText: "Safe & Private: Local AI processing.",
        retryBtn: "New Evaluation",
        shareBtn: "Share My Debut Pass",
        matchLabel: "Your Twin Idol",
        positionLabel: "Assigned Position",
        rankLabel: "Debut Rank",
        langLabels: { en: "English", ko: "한국어", ja: "日本語", zh: "中文" },
        ranks: {
            S: "S-Tier: Global Super Star",
            A: "A-Tier: Rising Star",
            B: "B-Tier: Elite Trainee"
        },
        positions: {
            visual: "Main Visual / Center",
            vocal: "Main Vocalist",
            dancer: "Main Dancer",
            rapper: "Lead Rapper",
            leader: "Group Leader"
        }
    },
    ko: {
        title: "K-아이돌 데뷔 평가 서비스",
        subtitle: "인공지능 안면 분석으로 보는 나의 데뷔 잠재력",
        selectionLabel: "성별 선택:",
        uploadText: "데뷔 가능성 분석하기",
        uploadHint: "고화질 사진일수록 정확도가 높습니다",
        statusText: "⚡ 안면 대칭성 및 분위기 분석 중...",
        privacyText: "개인정보 보호: 기기 내 로컬 AI 분석 수행",
        retryBtn: "다시 테스트하기",
        shareBtn: "데뷔 합격증 공유하기",
        matchLabel: "당신과 닮은 트윈 아이돌",
        positionLabel: "확정 포지션",
        rankLabel: "데뷔 랭크",
        langLabels: { en: "English", ko: "한국어", ja: "日本語", zh: "中文" },
        ranks: {
            S: "S급: 글로벌 슈퍼스타",
            A: "A급: 라이징 스타",
            B: "B급: 엘리트 연습생"
        },
        positions: {
            visual: "메인 비주얼 / 센터",
            vocal: "메인 보컬",
            dancer: "메인 댄서",
            rapper: "리드 래퍼",
            leader: "그룹 리더"
        }
    }
};

export const archetypes = {
    cat:   { slant: 0.08,  eyeSize: 0.19, jaw: 0.70, position: "visual", weight: { slant: 0.5, eyeSize: 0.2, jaw: 0.3 } },
    fox:   { slant: 0.12,  eyeSize: 0.17, jaw: 0.65, position: "rapper", weight: { slant: 0.6, eyeSize: 0.1, jaw: 0.3 } },
    puppy: { slant: -0.04, eyeSize: 0.22, jaw: 0.85, position: "vocal",  weight: { slant: 0.4, eyeSize: 0.4, jaw: 0.2 } },
    deer:  { slant: 0.02,  eyeSize: 0.26, jaw: 0.80, position: "visual", weight: { slant: 0.2, eyeSize: 0.6, jaw: 0.2 } },
    rabbit:{ slant: 0.01,  eyeSize: 0.24, jaw: 0.82, position: "dancer", weight: { slant: 0.1, eyeSize: 0.5, jaw: 0.4 } },
    dog:   { slant: 0.00,  eyeSize: 0.20, jaw: 0.90, position: "leader", weight: { slant: 0.3, eyeSize: 0.3, jaw: 0.4 } }
};

export const idols = {
    female: [
        { id: "Haerin (NewJeans)", archetype: "cat", position: "dancer" },
        { id: "Minji (NewJeans)", archetype: "dog", position: "visual" },
        { id: "Wonyoung (IVE)", archetype: "rabbit", position: "visual" },
        { id: "Yujin (IVE)", archetype: "dog", position: "leader" },
        { id: "Karina (aespa)", archetype: "fox", position: "visual" },
        { id: "Winter (aespa)", archetype: "deer", position: "vocal" },
        { id: "Sakura (LE SSERAFIM)", archetype: "cat", position: "visual" },
        { id: "Chaewon (LE SSERAFIM)", archetype: "deer", position: "leader" },
        { id: "Ahyeon (BABYMONSTER)", archetype: "cat", position: "vocal" },
        { id: "Wonhee (ILLIT)", archetype: "puppy", position: "visual" },
        { id: "Minnie ((G)I-DLE)", archetype: "cat", position: "vocal" },
        { id: "Haewon (NMIXX)", archetype: "puppy", position: "leader" },
        { id: "Sullyoon (NMIXX)", archetype: "deer", position: "visual" },
        { id: "Seeun (STAYC)", archetype: "fox", position: "visual" },
        { id: "Natty (KISS OF LIFE)", archetype: "cat", position: "dancer" },
        { id: "Jennie (BLACKPINK)", archetype: "cat", position: "rapper" },
        { id: "Jisoo (BLACKPINK)", archetype: "puppy", position: "visual" },
        { id: "Nayeon (TWICE)", archetype: "rabbit", position: "vocal" },
        { id: "Sana (TWICE)", archetype: "deer", position: "visual" },
        { id: "Irene (Red Velvet)", archetype: "rabbit", position: "visual" }
    ],
    male: [
        { id: "Wonbin (RIIZE)", archetype: "cat", position: "visual" },
        { id: "Anton (RIIZE)", archetype: "puppy", position: "vocal" },
        { id: "Shinyu (TWS)", archetype: "deer", position: "visual" },
        { id: "Dohoon (TWS)", archetype: "fox", position: "vocal" },
        { id: "V (BTS)", archetype: "fox", position: "visual" },
        { id: "Jungkook (BTS)", archetype: "rabbit", position: "vocal" },
        { id: "Hyunjin (Stray Kids)", archetype: "fox", position: "visual" },
        { id: "Felix (Stray Kids)", archetype: "cat", position: "rapper" },
        { id: "Mingyu (SEVENTEEN)", archetype: "dog", position: "visual" },
        { id: "Vernon (SEVENTEEN)", archetype: "fox", position: "rapper" },
        { id: "Sunghoon (ENHYPEN)", archetype: "deer", position: "visual" },
        { id: "Jungwon (ENHYPEN)", archetype: "cat", position: "leader" },
        { id: "Yejun (PLAVE)", archetype: "puppy", position: "leader" },
        { id: "Sung Hanbin (ZB1)", archetype: "dog", position: "leader" },
        { id: "Jiwoong (ZB1)", archetype: "fox", position: "visual" },
        { id: "Beomgyu (TXT)", archetype: "deer", position: "visual" },
        { id: "Yeonjun (TXT)", archetype: "fox", position: "rapper" },
        { id: "Hongjoong (ATEEZ)", archetype: "cat", position: "leader" },
        { id: "Cha Eun-woo (ASTRO)", archetype: "puppy", position: "visual" },
        { id: "Shotaro (RIIZE)", archetype: "dog", position: "dancer" }
    ]
};
