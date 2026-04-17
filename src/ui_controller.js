/**
 * UI Controller for Managing UX and DOM Updates
 */
import { i18n, idols } from './data_store.js';
import { loadModels, analyzeFace } from './ai_engine.js';

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
    // Language setup
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-ko').addEventListener('click', () => setLanguage('ko'));
    
    // Gender setup
    document.querySelectorAll('input[name="gender"]').forEach(input => {
        input.addEventListener('change', (e) => {
            selectedGender = e.target.value;
        });
    });

    // Upload setup
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    // Retry setup
    btnRetry.addEventListener('click', resetApp);
    
    // Share setup
    btnShare.addEventListener('click', shareResult);

    // Initial state
    setLanguage('en');
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-ko').classList.toggle('active', lang === 'ko');

    document.querySelector('.main-title').textContent = i18n[lang].title;
    document.querySelector('.subtitle').textContent = i18n[lang].subtitle;
    document.querySelector('.selection-label').textContent = i18n[lang].selectionLabel;
    document.querySelector('.upload-text').textContent = i18n[lang].uploadText;
    document.querySelector('.upload-hint').textContent = i18n[lang].uploadHint;
    document.getElementById('analysis-text').textContent = i18n[lang].statusText;
    document.getElementById('privacy-text-short').textContent = i18n[lang].privacyText;
    document.getElementById('idol-match-label').textContent = i18n[lang].matchLabel;
    btnRetry.textContent = i18n[lang].retryBtn;
    btnShare.textContent = i18n[lang].shareBtn;
    document.getElementById('btn-affiliate').textContent = i18n[lang].affiliateBtn;

    // Update articles
    const articles = i18n[lang].articles;
    const articleElements = document.querySelectorAll('.info-section');
    articles.forEach((article, index) => {
        if (articleElements[index]) {
            articleElements[index].querySelector('h2').textContent = article.title;
            articleElements[index].querySelector('p').textContent = article.content;
        }
    });

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
        
        // Progress simulation
        let prog = 0;
        const interval = setInterval(() => {
            prog += 2;
            if (prog <= 90) loadingBar.style.width = prog + '%';
        }, 50);

        const result = await analyzeFace(imagePreview);
        clearInterval(interval);
        
        if (!result) {
            alert(currentLang === 'ko' ? "얼굴을 찾을 수 없습니다." : "No face detected.");
            resetApp();
            return;
        }

        loadingBar.style.width = '100%';
        
        // Match Idol
        const pool = idols[selectedGender].filter(i => i.archetype === result.archetype);
        const candidates = pool.length > 0 ? pool : idols[selectedGender];
        const match = candidates[Math.floor(Math.random() * candidates.length)];
        
        lastResult = { match, analysis: result };
        
        setTimeout(updateResultDisplay, 500);

    } catch (err) {
        console.error(err);
        alert("An error occurred during analysis.");
        resetApp();
    }
}

function updateResultDisplay() {
    if (!lastResult) return;
    
    analysisSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    const { match, analysis } = lastResult;
    
    document.getElementById('result-title').textContent = match.id;
    document.getElementById('similarity-score').textContent = analysis.similarity;
    
    // Emoji logic
    let emoji = '😊';
    if (analysis.similarity <= 75) emoji = '🙂';
    else if (analysis.similarity >= 95) emoji = '🤩';
    document.getElementById('similarity-emoji').textContent = emoji;

    // Names
    const labels = i18n[currentLang].langLabels;
    const primary = currentLang === 'ko' ? 'ko' : 'en';
    const secondary = ['en', 'ko', 'ja', 'zh'].filter(l => l !== primary);

    document.getElementById('lang-label-primary').textContent = labels[primary];
    document.getElementById('val-primary').textContent = match.names[primary];

    secondary.forEach((lang, i) => {
        document.getElementById(`lang-label-sec-${i+1}`).textContent = labels[lang];
        document.getElementById(`val-sec-${i+1}`).textContent = match.names[lang];
    });
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
    const { match, analysis } = lastResult;
    const text = currentLang === 'ko' ? 
        `저는 ${match.id}와 ${analysis.similarity}% 닮았네요! 당신의 아이돌 닮은꼴은?` :
        `I look ${analysis.similarity}% like ${match.id}! Find your K-Idol twin.`;

    if (navigator.share) {
        navigator.share({ title: 'K-Idol Face Test', text, url: window.location.href });
    } else {
        alert(text + "\n" + window.location.href);
    }
}
