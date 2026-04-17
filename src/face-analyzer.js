/**
 * QARAH — Face Analyzer Module
 * face-api.js를 사용한 얼굴 분석 (사전로딩 + 리사이즈 + 웜업)
 */

let modelsReady = false;
let modelsLoading = null;

/**
 * 모델 사전 로딩 + WebGL 웜업
 * 페이지 로드 시 즉시 호출하여 사용자 인터랙션 전에 로딩 완료
 */
export async function preloadModels(modelPath = '../models') {
    if (modelsReady) return;
    if (modelsLoading) return modelsLoading;

    modelsLoading = (async () => {
        try {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(modelPath),
                faceapi.nets.faceLandmark68Net.loadFromUri(modelPath)
            ]);
            console.log('[QARAH] Models loaded');

            // WebGL 웜업 — shader 사전 컴파일
            await warmUpDetector();
            console.log('[QARAH] Warm-up complete');

            modelsReady = true;
        } catch (err) {
            console.error('[QARAH] Model loading failed:', err);
            throw err;
        }
    })();

    return modelsLoading;
}

/**
 * WebGL shader 사전 컴파일 (더미 감지)
 */
async function warmUpDetector() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#888';
    ctx.fillRect(0, 0, 64, 64);
    try {
        await faceapi.detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions());
    } catch (e) {
        // 무시 — 목적은 shader 컴파일
    }
}

/**
 * 이미지를 최대 너비로 리사이즈 (성능 최적화)
 */
function resizeToCanvas(imgElement, maxWidth = 640) {
    const canvas = document.createElement('canvas');
    const naturalW = imgElement.naturalWidth || imgElement.width;
    const naturalH = imgElement.naturalHeight || imgElement.height;

    if (naturalW <= maxWidth) {
        canvas.width = naturalW;
        canvas.height = naturalH;
    } else {
        const ratio = maxWidth / naturalW;
        canvas.width = maxWidth;
        canvas.height = Math.round(naturalH * ratio);
    }

    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
    return canvas;
}

/**
 * 얼굴 분석 메인 함수
 * @param {HTMLImageElement|HTMLCanvasElement} imageElement
 * @returns {Object|null} 5가지 인상 지표
 */
export async function analyzeFace(imageElement) {
    // 모델이 아직 로딩 중이면 대기
    if (!modelsReady && modelsLoading) {
        await modelsLoading;
    }

    // 이미지 리사이즈 (640px)
    const resized = resizeToCanvas(imageElement, 640);

    // 얼굴 감지 + 랜드마크 추출
    const detection = await faceapi.detectSingleFace(
        resized,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 })
    ).withFaceLandmarks();

    if (!detection) return null;

    // 5가지 인상 지표 추출
    return extractTraits(detection.landmarks);
}

/**
 * 68개 랜드마크에서 5가지 인상 지표 추출
 */
function extractTraits(landmarks) {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const nose = landmarks.getNose();
    const mouth = landmarks.getMouth();
    const jaw = landmarks.getJawOutline();

    const faceWidth = jaw[16].x - jaw[0].x;
    const faceHeight = jaw[8].y - nose[0].y + (nose[0].y - jaw[0].y);

    // 1. 눈매 각도 (Eye Slant) — 양(↗올라감) / 음(↘내려감)
    const leftSlant = (leftEye[0].y - leftEye[3].y) / (leftEye[3].x - leftEye[0].x);
    const rightSlant = (rightEye[3].y - rightEye[0].y) / (rightEye[3].x - rightEye[0].x);
    const eyeSlant = (leftSlant + rightSlant) / 2;

    // 2. 얼굴 비율 (상·중·하) — 상(이마):중(코):하(턱)
    const foreheadH = nose[0].y - (jaw[0].y + jaw[16].y) / 2;
    const noseH = nose[6].y - nose[0].y;
    const chinH = jaw[8].y - nose[6].y;
    const totalH = foreheadH + noseH + chinH;
    const faceRatio = {
        upper: foreheadH / totalH,
        middle: noseH / totalH,
        lower: chinH / totalH
    };

    // 3. 입 너비 비율 (Mouth Width Ratio)
    const mouthWidth = (mouth[6].x - mouth[0].x) / faceWidth;

    // 4. 턱선 각도 (Jaw Sharpness) — V라인 지수
    const jawMid = jaw[8];
    const jawLeft = jaw[4];
    const jawRight = jaw[12];
    const jawWidthAtChin = jawRight.x - jawLeft.x;
    const jawAngle = jawWidthAtChin / faceWidth; // 작을수록 V라인

    // 5. 좌우 대칭도 (Symmetry)
    const centerX = (jaw[0].x + jaw[16].x) / 2;
    let asymmetrySum = 0;
    const symmetryPairs = [
        [leftEye[0], rightEye[3]],
        [leftEye[3], rightEye[0]],
        [jaw[2], jaw[14]],
        [jaw[4], jaw[12]],
        [jaw[6], jaw[10]]
    ];
    for (const [left, right] of symmetryPairs) {
        const leftDist = Math.abs(left.x - centerX);
        const rightDist = Math.abs(right.x - centerX);
        asymmetrySum += Math.abs(leftDist - rightDist) / faceWidth;
    }
    const symmetry = 1 - (asymmetrySum / symmetryPairs.length) * 5; // 0~1, 1=완벽 대칭

    return {
        eyeSlant: Math.round(eyeSlant * 1000) / 1000,
        faceRatio,
        mouthWidth: Math.round(mouthWidth * 1000) / 1000,
        jawAngle: Math.round(jawAngle * 1000) / 1000,
        symmetry: Math.max(0, Math.min(1, Math.round(symmetry * 1000) / 1000))
    };
}

export function isModelsReady() {
    return modelsReady;
}
