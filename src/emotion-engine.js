/**
 * QARAH — Emotion Engine
 * face-api.js 감정 확률 → 6가지 감정 유형 판정
 */

/**
 * 6가지 감정 유형 정의
 */
export const EMOTION_TYPES = {
    joy: {
        key: 'joy',
        emoji: '😊',
        label: '기쁨형',
        labelEn: 'Joyful',
        desc: '밝고 따뜻한 에너지가 가득합니다',
        descEn: 'Full of bright and warm energy',
        traits: ['환한 미소', '긍정적 기운', '따뜻한 시선'],
        traitsEn: ['Bright smile', 'Positive aura', 'Warm gaze']
    },
    calm: {
        key: 'calm',
        emoji: '🧘',
        label: '고요형',
        labelEn: 'Serene',
        desc: '차분하고 안정적인 에너지를 품고 있습니다',
        descEn: 'Possesses calm and stable energy',
        traits: ['고요한 눈빛', '안정된 표정', '내면의 평화'],
        traitsEn: ['Tranquil eyes', 'Steady expression', 'Inner peace']
    },
    mystery: {
        key: 'mystery',
        emoji: '🔮',
        label: '신비형',
        labelEn: 'Enigmatic',
        desc: '놀라움과 경외를 품은 신비로운 에너지입니다',
        descEn: 'Mysterious energy filled with wonder and awe',
        traits: ['깊은 호기심', '확장된 시선', '예민한 감각'],
        traitsEn: ['Deep curiosity', 'Widened gaze', 'Keen senses']
    },
    passion: {
        key: 'passion',
        emoji: '💪',
        label: '열정형',
        labelEn: 'Passionate',
        desc: '강렬하고 결단력 있는 에너지가 넘칩니다',
        descEn: 'Overflowing with intense and decisive energy',
        traits: ['단호한 의지', '강렬한 눈빛', '추진력'],
        traitsEn: ['Strong will', 'Intense gaze', 'Drive']
    },
    soulful: {
        key: 'soulful',
        emoji: '🎵',
        label: '감성형',
        labelEn: 'Soulful',
        desc: '깊고 감성적인 에너지로 가득합니다',
        descEn: 'Full of deep and emotional energy',
        traits: ['섬세한 감정', '깊은 공감력', '예술적 감각'],
        traitsEn: ['Delicate emotions', 'Deep empathy', 'Artistic sense']
    },
    bold: {
        key: 'bold',
        emoji: '🦁',
        label: '담대형',
        labelEn: 'Bold',
        desc: '다면적이고 담대한 에너지를 지니고 있습니다',
        descEn: 'Possesses multifaceted and bold energy',
        traits: ['복합적 매력', '균형잡힌 감정', '리더의 기질'],
        traitsEn: ['Complex charm', 'Balanced emotions', 'Leader temperament']
    }
};

/**
 * face-api.js 감정 확률을 6가지 QARAH 감정 유형으로 변환
 * @param {Object} expressions - { happy, sad, angry, fearful, disgusted, surprised, neutral }
 * @returns {{ type: string, label: string, score: number, allScores: Object }}
 */
export function determineEmotion(expressions) {
    if (!expressions) {
        return createResult('bold', 90);
    }

    // face-api.js 7가지 감정 → QARAH 6가지 감정으로 매핑
    const scores = {
        joy:     (expressions.happy || 0) * 1.0,
        calm:    (expressions.neutral || 0) * 0.85,
        mystery: ((expressions.surprised || 0) * 0.6 + (expressions.fearful || 0) * 0.4),
        passion: ((expressions.angry || 0) * 0.7 + (expressions.disgusted || 0) * 0.3),
        soulful: (expressions.sad || 0) * 1.0,
        bold:    0 // 계산 후 할당
    };

    // bold 점수: 어떤 감정도 지배적이지 않을 때 높아짐
    const maxPrimary = Math.max(scores.joy, scores.calm, scores.mystery, scores.passion, scores.soulful);
    scores.bold = Math.max(0, 0.5 - maxPrimary) * 2;

    // 최고 점수 유형 선정
    let bestType = 'bold';
    let bestScore = -Infinity;

    for (const [key, score] of Object.entries(scores)) {
        if (score > bestScore) {
            bestScore = score;
            bestType = key;
        }
    }

    // 감정 확률이 너무 낮으면 (확신도 부족) bold로 기본 할당
    if (bestScore < 0.15 && bestType !== 'bold') {
        bestType = 'bold';
    }

    // 적합도 점수 (85~99)
    const normalizedScore = Math.min(1, bestScore * 1.5);
    const matchScore = Math.floor(85 + normalizedScore * 14);

    return createResult(bestType, matchScore, scores);
}

function createResult(type, score, allScores = {}) {
    const typeInfo = EMOTION_TYPES[type];
    return {
        type,
        emoji: typeInfo.emoji,
        label: typeInfo.label,
        labelEn: typeInfo.labelEn,
        desc: typeInfo.desc,
        descEn: typeInfo.descEn,
        traits: typeInfo.traits,
        traitsEn: typeInfo.traitsEn,
        score,
        allScores
    };
}
