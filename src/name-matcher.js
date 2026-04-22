/**
 * QARAH — Name Matcher
 * 인상 유형 + 감정 유형 + 성별 + 카테고리 → 이름 3개 추천
 */

/**
 * 이름 매칭 메인 함수 (2축 매칭: 인상 + 감정)
 * @param {string} impressionType - 인상 유형 키 (water, fire, etc.)
 * @param {string} emotionType - 감정 유형 키 (joy, calm, etc.)
 * @param {string} gender - 'female' 또는 'male'
 * @param {Object} nameDB - 이름 데이터베이스
 * @param {number} baseScore - 기본 적합도 점수 (85-99)
 * @returns {Array} 추천 이름 3개 [{name, hanja, meaning, hanjaDetail, score, rarity}]
 */
export function matchNames(impressionType, emotionType, gender, nameDB, baseScore = 92) {
    const genderDB = nameDB[gender];
    if (!genderDB) return [];

    const typeNames = genderDB[impressionType];
    if (!typeNames || typeNames.length === 0) return [];

    // 감정 친화도 기반 정렬 (emotionAffinity가 있는 경우)
    let sorted;
    if (emotionType && typeNames[0]?.emotionAffinity) {
        sorted = [...typeNames].sort((a, b) => {
            const aScore = a.emotionAffinity?.[emotionType] || 0.5;
            const bScore = b.emotionAffinity?.[emotionType] || 0.5;
            return bScore - aScore;
        });
    } else {
        sorted = [...typeNames];
    }

    // 상위 5개 후보 중 3개를 셔플 선택 (다양성 + 정밀성 균형)
    const candidates = sorted.slice(0, 5);
    const shuffled = shuffleArray(candidates);
    const top3 = shuffled.slice(0, 3);

    // 적합도 점수 부여 (1위가 가장 높고 순차 감소)
    return top3.map((name, index) => {
        // 1위: baseScore, 2위: -4~-5, 3위: -7~-9
        const scoreOffset = index === 0 ? 0 : index === 1 ? -(3 + Math.floor(Math.random() * 3)) : -(6 + Math.floor(Math.random() * 4));
        const score = Math.max(85, Math.min(99, baseScore + scoreOffset));

        // 레어리티 결정
        let rarity;
        if (score >= 95) rarity = { tier: 'legendary', label: 'LEGENDARY', stars: '★★★★★' };
        else if (score >= 90) rarity = { tier: 'epic', label: 'EPIC', stars: '★★★★' };
        else rarity = { tier: 'rare', label: 'RARE', stars: '★★★' };

        return {
            rank: index + 1,
            name: name.name,
            hanja: name.hanja || name.reading || '',
            meaning: name.meaning || '',
            hanjaDetail: name.hanjaDetail || null,
            origin: name.origin || '',
            reading: name.reading || '',
            desc: name.desc || '',
            score,
            rarity
        };
    });
}

/**
 * Fisher-Yates 셔플 (결정적이지 않게)
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
