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
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-ko').addEventListener('click', () => setLanguage('ko'));
    
    document.querySelectorAll('input[name="gender"]').forEach(input => {
        input.addEventListener('change', (e) => { selectedGender = e.target.value; });
    });

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault(); dropZone.classList.remove('dragover');
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
    
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-ko').classList.toggle('active', lang === 'ko');

    document.querySelector('.main-title').textContent = i18n[lang].title;
    document.querySelector('.subtitle').textContent = i18n[lang].subtitle;
    document.querySelector('.upload-text').textContent = i18n[lang].uploadText;
    document.querySelector('.upload-hint').textContent = i18n[lang].uploadHint;
    document.getElementById('analysis-text').textContent = i18n[lang].statusText;
    document.getElementById('privacy-text-short').textContent = i18n[lang].privacyText;
    document.getElementById('idol-match-label').textContent = i18n[lang].matchLabel;
    
    // Position/Rank Labels (if present in DOM)
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
        startAnalysis();
    };
    reader.readAsDataURL(file);
}

async function startAnalysis() {
    setupSection.classList.add('hidden');
    analysisSection.classList.remove('hidden');
    
    try {
        await loadModels();
        
        let prog = 0;
        const interval = setInterval(() => {
            prog += 5;
            if (prog <= 95) loadingBar.style.width = prog + '%';
        }, 100);

        const result = await analyzeDebutFace(imagePreview);
        clearInterval(interval);
        
        if (!result) {
            alert(currentLang === 'ko' ? "얼굴을 찾을 수 없습니다." : "No face detected.");
            resetApp();
            return;
        }

        loadingBar.style.width = '100%';
        
        // Find Twin
        const pool = idols[selectedGender].filter(i => i.archetype === result.archetype);
        const candidates = pool.length > 0 ? pool : idols[selectedGender];
        const twin = candidates[Math.floor(Math.random() * candidates.length)];
        
        lastResult = { twin, analysis: result };
        setTimeout(updateResultDisplay, 800);

    } catch (err) {
        console.error(err);
        alert("Evaluation Error.");
        resetApp();
    }
}

function updateResultDisplay() {
    if (!lastResult) return;
    
    analysisSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    const { twin, analysis } = lastResult;
    const lang = i18n[currentLang];
    
    // Core Results
    document.getElementById('result-title').textContent = twin.id;
    document.getElementById('similarity-score').textContent = analysis.similarity;
    
    const posVal = document.getElementById('pos-val');
    const rankVal = document.getElementById('rank-val');
    if (posVal) posVal.textContent = lang.positions[analysis.position];
    if (rankVal) rankVal.textContent = lang.ranks[analysis.rank];

    // Aesthetics
    let emoji = '🤩';
    if (analysis.rank === 'B') emoji = '🔥';
    else if (analysis.rank === 'A') emoji = '✨';
    document.getElementById('similarity-emoji').textContent = emoji;
}

function resetApp() {
    resultSection.classList.add('hidden');
    analysisSection.classList.add('hidden');
    setupSection.classList.remove('hidden');
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
        `[데뷔 평가] 저는 ${pos} 포지션으로 합격! 닮은꼴은 ${twin.id}입니다. 당신의 랭크는?` :
        `[Debut Pass] I'm assigned as ${pos}! My twin is ${twin.id}. Find your rank!`;

    if (navigator.share) {
        navigator.share({ title: 'K-Idol Debut Evaluation', text, url: window.location.href });
    } else {
        alert(text + "\n" + window.location.href);
    }
}
