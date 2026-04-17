/**
 * AI Engine for 2026 K-Pop Debut Evaluation
 */
import { archetypes } from './data_store.js';

export async function loadModels(modelPath = './models') {
    if (window.faceapi.nets.tinyFaceDetector.params && window.faceapi.nets.faceLandmark68Net.params) return;
    try {
        await Promise.all([
            window.faceapi.nets.tinyFaceDetector.loadFromUri(modelPath),
            window.faceapi.nets.faceLandmark68Net.loadFromUri(modelPath)
        ]);
        console.log("AI Models loaded successfully");
    } catch (err) {
        console.error("Error loading models:", err);
        throw err;
    }
}

export async function analyzeDebutFace(imageElement) {
    if (!imageElement.complete || imageElement.naturalWidth === 0) {
        await new Promise(resolve => { imageElement.onload = resolve; });
    }

    const detection = await window.faceapi.detectSingleFace(
        imageElement, 
        new window.faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks();

    if (!detection) return null;

    const traits = calculateAdvancedTraits(detection.landmarks);
    return traits;
}

function calculateAdvancedTraits(landmarks) {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const jaw = landmarks.getJawOutline();

    // 1. Eye Slant (Outer corner vs Inner corner)
    const leftSlant = (leftEye[0].y - leftEye[3].y) / (leftEye[3].x - leftEye[0].x);
    const rightSlant = (rightEye[3].y - rightEye[0].y) / (rightEye[3].x - rightEye[0].x);
    const avgSlant = (leftSlant + rightSlant) / 2;

    // 2. Eye Size Ratio (Eye width / Face width)
    const faceWidth = jaw[16].x - jaw[0].x;
    const eyeWidth = (leftEye[3].x - leftEye[0].x + rightEye[3].x - rightEye[0].x) / 2;
    const eyeSizeRatio = eyeWidth / faceWidth;

    // 3. Jaw Sharpness (V-Line Index)
    const jawMidWidth = jaw[12].x - jaw[4].x;
    const jawSharpness = jawMidWidth / faceWidth;

    let bestArchetype = "dog";
    let minDistance = Infinity;

    for (const [name, trait] of Object.entries(archetypes)) {
        const distance = Math.abs(avgSlant - trait.slant) * trait.weight.slant * 5 +
                         Math.abs(eyeSizeRatio - trait.eyeSize) * trait.weight.eyeSize * 10 +
                         Math.abs(jawSharpness - trait.jaw) * trait.weight.jaw;

        if (distance < minDistance) {
            minDistance = distance;
            bestArchetype = name;
        }
    }

    // Similarity score (Boosted for virality: 85-99 range)
    let rawSim = 99 - (minDistance * 60);
    let similarity = Math.floor(Math.max(85, Math.min(99, rawSim)));
    
    // Position Logic
    const position = archetypes[bestArchetype].position;
    
    // Rank Logic
    let rank = 'B';
    if (similarity >= 95) rank = 'S';
    else if (similarity >= 90) rank = 'A';

    return { 
        archetype: bestArchetype, 
        similarity, 
        position,
        rank
    };
}
