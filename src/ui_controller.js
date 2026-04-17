/**
 * UI Controller for 2026 K-Pop Debut Evaluation
 */
import { i18n, idols } from './data_store.js';
import { loadModels, analyzeDebutFace } from './ai_engine.js';

let currentLang = 'en';
let selectedGender = 'female';
let lastResult = null;

// DOM Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const setupSection = document.getElementById('setup-section');
const analysisSection = document.getElementById('analysis-section');
const resultSection = document.getElementById('result-section');
const loadingBar = document.getElementById('loading-bar');
const btnRetry = document.getElementById('btn-retry');
const btnShare = document.getElementById('btn-share');

export function initUI() {
    const langEn = document.getElementById('lang-en');
    const langKo = document.getElementById('lang-ko');
    
    if (langEn) langEn.addEventListener('click', () => setLanguage('en'));
    if (langKo) langKo.addEventListener('click', () => setLanguage('ko'));
    
    document.querySelectorAll('input[name="gender"]').forEach(input => {
        input.addEventListener('change', (e) => { 
            selectedGender = e.target.value;
            // Native-like feedback
            input.parentElement.parentElement.querySelectorAll('.toggle-btn').forEach(btn => btn.style.background = '');
        });
    });

    dropZone.addEventListener('click', () => fileInput.click());
    
    // Drag and Drop
    dropZone.addEventListener('dragover', (e) => { 
        e.preventDefault(); 
        dropZone.style.borderColor = 'var(--primary-color)';
    });
    dropZone.addEventListener('dragleave', () => { 
        dropZone.style.borderColor = '';
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '';
        if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    btnRetry.addEventListener('click', resetApp);
    btnShare.addEventListener('click', shareResult);

    setLanguage('en');
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    const langEn = document.getElementById('lang-en');
    const langKo = document.getElementById('lang-ko');
    if (langEn) langEn.classList.toggle('active', lang === 'en');
    if (langKo) langKo.classList.toggle('active', lang === 'ko');

    const title = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    const uploadText = document.querySelector('.upload-text');
    const uploadHint = document.querySelector('.upload-hint');
    const analysisText = document.getElementById('analysis-text');
    const privacyText = document.getElementById('privacy-text-short');
    const matchLabel = document.getElementById('idol-match-label');

    if (title) title.textContent = i18n[lang].title;
    if (subtitle) subtitle.textContent = i18n[lang].subtitle;
    if (uploadText) uploadText.textContent = i18n[lang].uploadText;
    if (uploadHint) uploadHint.textContent = i18n[lang].uploadHint;
    if (analysisText) analysisText.textContent = i18n[lang].statusText;
    if (privacyText) privacyText.textContent = i18n[lang].privacyText;
    if (matchLabel) matchLabel.textContent = i18n[lang].matchLabel;
    
    const posLabel = document.getElementById('pos-label');
    const rankLabel = document.getElementById('rank-label');
    if (posLabel) posLabel.textContent = i18n[lang].positionLabel;
    if (rankLabel) rankLabel.textContent = i18n[lang].rankLabel;

    btnRetry.textContent = i18n[lang].retryBtn;
    btnShare.textContent = i18n[lang].shareBtn;

    if (lastResult) updateResultDisplay();
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('hidden');
        dropZone.classList.add('scanning'); // Trigger Laser Animation
        startAnalysis();
    };
    reader.readAsDataURL(file);
}

async function startAnalysis() {
    // We stay in setup-section for a moment to show the "Scanning" on the image
    setTimeout(() => {
        analysisSection.classList.remove('hidden');
    }, 500);
    
    try {
        await loadModels();
        
        let prog = 0;
        const interval = setInterval(() => {
            prog += 2;
            if (prog <= 98) loadingBar.style.width = prog + '%';
        }, 50);

        const result = await analyzeDebutFace(imagePreview);
        clearInterval(interval);
        
        if (!result) {
            alert(currentLang === 'ko' ? "얼굴 감지 실패! 정면 사진을 사용해주세요." : "Face detection failed. Please use a clear front-facing photo.");
            resetApp();
            return;
        }

        loadingBar.style.width = '100%';
        
        // Match Idol
        const pool = idols[selectedGender].filter(i => i.archetype === result.archetype);
        const candidates = pool.length > 0 ? pool : idols[selectedGender];
        const twin = candidates[Math.floor(Math.random() * candidates.length)];
        
        lastResult = { twin, analysis: result };
        setTimeout(updateResultDisplay, 1000);

    } catch (err) {
        console.error(err);
        resetApp();
    }
}

function updateResultDisplay() {
    if (!lastResult) return;
    
    setupSection.classList.add('hidden');
    analysisSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    const { twin, analysis } = lastResult;
    const lang = i18n[currentLang];
    
    document.getElementById('result-title').textContent = twin.id;
    document.getElementById('similarity-score').textContent = analysis.similarity;
    
    const posVal = document.getElementById('pos-val');
    const rankVal = document.getElementById('rank-val');
    const namePrimary = document.getElementById('val-primary');

    if (posVal) posVal.textContent = lang.positions[analysis.position];
    if (rankVal) rankVal.textContent = lang.ranks[analysis.rank].split(':')[0]; // Just the rank letter for visual
    if (namePrimary) namePrimary.textContent = twin.id;

    let emoji = '🤩';
    if (analysis.rank === 'B') emoji = '🔥';
    else if (analysis.rank === 'A') emoji = '✨';
    document.getElementById('similarity-emoji').textContent = emoji;

    // Haptic-like effect if supported
    if (window.navigator.vibrate) window.navigator.vibrate(50);
}

function resetApp() {
    resultSection.classList.add('hidden');
    analysisSection.classList.add('hidden');
    setupSection.classList.remove('hidden');
    dropZone.classList.remove('scanning');
    imagePreview.classList.add('hidden');
    imagePreview.src = '';
    fileInput.value = '';
    loadingBar.style.width = '0%';
    lastResult = null;
}

function shareResult() {
    if (!lastResult) return;
    const { twin, analysis } = lastResult;
    const pos = i18n[currentLang].positions[analysis.position];
    const text = currentLang === 'ko' ? 
        `[데뷔 평가 합격] 저는 ${pos} 포지션으로 합격! 닮은꼴 아이돌은 ${twin.id}입니다. 테스트 결과 보기:` :
        `[Official Debut Pass] I'm assigned as ${pos}! My twin is ${twin.id}. Start your evaluation:`;

    if (navigator.share) {
        navigator.share({ title: 'K-Idol Debut Evaluation', text, url: window.location.href });
    } else {
        const copyText = `${text}\n${window.location.href}`;
        navigator.clipboard.writeText(copyText).then(() => {
            alert(currentLang === 'ko' ? "결과가 클립보드에 복사되었습니다!" : "Result copied to clipboard!");
        });
    }
}
