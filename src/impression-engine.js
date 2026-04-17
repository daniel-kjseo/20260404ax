/**
 * QARAH — Impression Engine
 * 5가지 얼굴 지표 → 8가지 인상 유형 판정
 */

/**
 * 8가지 인상 유형 정의
 */
export const IMPRESSION_TYPES = {
    water: {
        key: 'water',
        emoji: '🌊',
        label: '맑은물형',
        labelEn: 'Crystal Water',
        desc: '투명하고 깨끗한 인상',
        descEn: 'Clear and pure impression',
        traits: ['큰 눈', '부드러운 턱선', '높은 대칭'],
        traitsEn: ['Large eyes', 'Soft jawline', 'Symmetrical'],
        weights: { eyeSlant: -0.3, upperFace: 0.3, mouthWidth: -0.2, jawAngle: -0.5, symmetry: 0.5 }
    },
    fire: {
        key: 'fire',
        emoji: '🔥',
        label: '불꽃형',
        labelEn: 'Fierce Flame',
        desc: '강렬하고 카리스마 있는 인상',
        descEn: 'Intense and charismatic impression',
        traits: ['날카로운 눈매', '뚜렷한 이목구비', '강한 턱선'],
        traitsEn: ['Sharp eyes', 'Defined features', 'Strong jaw'],
        weights: { eyeSlant: 0.8, upperFace: -0.2, mouthWidth: 0.3, jawAngle: 0.3, symmetry: 0.2 }
    },
    forest: {
        key: 'forest',
        emoji: '🌿',
        label: '숲속형',
        labelEn: 'Forest Spirit',
        desc: '편안하고 따뜻한 인상',
        descEn: 'Warm and comforting impression',
        traits: ['둥근 눈', '부드러운 윤곽', '넓은 입'],
        traitsEn: ['Round eyes', 'Soft contours', 'Wide smile'],
        weights: { eyeSlant: -0.5, upperFace: 0.1, mouthWidth: 0.5, jawAngle: -0.3, symmetry: -0.1 }
    },
    star: {
        key: 'star',
        emoji: '✨',
        label: '별빛형',
        labelEn: 'Starlight',
        desc: '균형잡히고 빛나는 인상',
        descEn: 'Balanced and radiant impression',
        traits: ['높은 대칭도', '균형잡힌 비율', '세련된 눈매'],
        traitsEn: ['High symmetry', 'Balanced proportions', 'Elegant eyes'],
        weights: { eyeSlant: 0.1, upperFace: 0.0, mouthWidth: 0.0, jawAngle: -0.2, symmetry: 1.0 }
    },
    rock: {
        key: 'rock',
        emoji: '🏔️',
        label: '바위형',
        labelEn: 'Solid Rock',
        desc: '듬직하고 신뢰감 있는 인상',
        descEn: 'Strong and trustworthy impression',
        traits: ['넓은 이마', '강한 턱선', '안정적 비율'],
        traitsEn: ['Broad forehead', 'Strong jaw', 'Stable proportions'],
        weights: { eyeSlant: 0.0, upperFace: 0.5, mouthWidth: 0.2, jawAngle: 0.7, symmetry: 0.3 }
    },
    flower: {
        key: 'flower',
        emoji: '🌸',
        label: '꽃잎형',
        labelEn: 'Petal Bloom',
        desc: '섬세하고 우아한 인상',
        descEn: 'Delicate and elegant impression',
        traits: ['작은 입', '섬세한 라인', 'V라인 턱'],
        traitsEn: ['Small lips', 'Delicate lines', 'V-line jaw'],
        weights: { eyeSlant: -0.1, upperFace: -0.2, mouthWidth: -0.7, jawAngle: -0.7, symmetry: 0.3 }
    },
    moon: {
        key: 'moon',
        emoji: '🌙',
        label: '달빛형',
        labelEn: 'Moonlight',
        desc: '신비롭고 깊이 있는 인상',
        descEn: 'Mysterious and deep impression',
        traits: ['깊은 눈', '긴 얼굴', '조용한 입매'],
        traitsEn: ['Deep eyes', 'Elongated face', 'Quiet expression'],
        weights: { eyeSlant: 0.3, upperFace: -0.4, mouthWidth: -0.4, jawAngle: -0.3, symmetry: -0.2 }
    },
    sun: {
        key: 'sun',
        emoji: '☀️',
        label: '햇살형',
        labelEn: 'Sunshine',
        desc: '밝고 활기찬 인상',
        descEn: 'Bright and energetic impression',
        traits: ['큰 입', '넓은 얼굴', '활발한 눈'],
        traitsEn: ['Wide smile', 'Broad face', 'Lively eyes'],
        weights: { eyeSlant: -0.2, upperFace: 0.2, mouthWidth: 0.8, jawAngle: 0.5, symmetry: 0.0 }
    }
};

/**
 * 5가지 지표를 정규화하여 유형별 점수 계산
 * @param {Object} traits - { eyeSlant, faceRatio, mouthWidth, jawAngle, symmetry }
 * @returns {{ type: string, label: string, score: number, allScores: Object }}
 */
export function determineImpression(traits) {
    // 지표 정규화 (-1 ~ 1 범위)
    const normalized = {
        eyeSlant: clamp(traits.eyeSlant * 10, -1, 1),         // 눈매
        upperFace: clamp((traits.faceRatio.upper - 0.33) * 5, -1, 1),  // 이마 비율
        mouthWidth: clamp((traits.mouthWidth - 0.4) * 5, -1, 1),      // 입 크기
        jawAngle: clamp((traits.jawAngle - 0.6) * 5, -1, 1),          // 턱선
        symmetry: clamp((traits.symmetry - 0.8) * 5, -1, 1)           // 대칭도
    };

    let bestType = 'star';
    let bestScore = -Infinity;
    const allScores = {};

    for (const [key, type] of Object.entries(IMPRESSION_TYPES)) {
        const w = type.weights;
        const score =
            normalized.eyeSlant * w.eyeSlant +
            normalized.upperFace * w.upperFace +
            normalized.mouthWidth * w.mouthWidth +
            normalized.jawAngle * w.jawAngle +
            normalized.symmetry * w.symmetry;

        allScores[key] = score;

        if (score > bestScore) {
            bestScore = score;
            bestType = key;
        }
    }

    // 적합도 점수 (85~99 범위로 매핑, 바이럴 최적화)
    const minScore = Math.min(...Object.values(allScores));
    const maxScore = Math.max(...Object.values(allScores));
    const range = maxScore - minScore || 1;
    const normalizedBest = (bestScore - minScore) / range; // 0~1
    const matchScore = Math.floor(85 + normalizedBest * 14); // 85~99

    const typeInfo = IMPRESSION_TYPES[bestType];

    return {
        type: bestType,
        emoji: typeInfo.emoji,
        label: typeInfo.label,
        labelEn: typeInfo.labelEn,
        desc: typeInfo.desc,
        descEn: typeInfo.descEn,
        traits: typeInfo.traits,
        traitsEn: typeInfo.traitsEn,
        score: matchScore,
        allScores
    };
}

/**
 * 점수에 따른 레어리티 등급 반환
 */
export function getRarity(score) {
    if (score >= 95) return { tier: 'legendary', label: 'LEGENDARY', stars: '★★★★★' };
    if (score >= 90) return { tier: 'epic', label: 'EPIC', stars: '★★★★' };
    return { tier: 'rare', label: 'RARE', stars: '★★★' };
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
