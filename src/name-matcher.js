/**
 * QARAH — Name Matcher
 * 인상 유형 + 성별 + 카테고리 → 이름 3개 추천
 */

/**
 * 이름 매칭 메인 함수
 * @param {string} impressionType - 인상 유형 키 (water, fire, etc.)
 * @param {string} gender - 'female' 또는 'male'
 * @param {Object} nameDB - 이름 데이터베이스
 * @param {number} baseScore - 기본 적합도 점수 (85-99)
 * @returns {Array} 추천 이름 3개 [{name, hanja, meaning, hanjaDetail, score, rarity}]
 */
export function matchNames(impressionType, gender, nameDB, baseScore = 92) {
    const genderDB = nameDB[gender];
    if (!genderDB) return [];

    const typeNames = genderDB[impressionType];
    if (!typeNames || typeNames.length === 0) return [];

    // 이름 목록을 약간 셔플 (같은 유형이어도 매번 다른 결과)
    const shuffled = shuffleArray([...typeNames]);

    // 상위 3개 선택
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
