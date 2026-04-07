// Multi-language strings
const i18n = {
    en: {
        title: "AI Animal Face Test",
        subtitle: "Global AI Face Analysis",
        selectionLabel: "Select Gender:",
        uploadText: "Click or drag your photo here",
        uploadHint: "(JPG, PNG up to 10MB)",
        statusText: "⚡ Fast Analysis...",
        privacyText: "Photos are never saved on our server.",
        retryBtn: "Try Again",
        shareBtn: "Share",
        results: {
            male: [
                { type: "Dog Face", emoji: "🐶", desc: "Friendly and loyal, you have a charm that makes everyone feel comfortable!", percentages: ["Dog 45%", "Cat 20%", "Bear 15%"] },
                { type: "Cat Face", emoji: "🐱", desc: "Chic and mysterious, you have a sharp and sophisticated aura.", percentages: ["Cat 50%", "Fox 25%", "Dog 10%"] },
                { type: "Dinosaur Face", emoji: "🦖", desc: "Strong and charismatic, you have a powerful presence that commands attention.", percentages: ["Dinosaur 55%", "Bear 20%", "Dog 10%"] },
                { type: "Bear Face", emoji: "🐻", desc: "Reliable and warm, you look like someone who gives great hugs!", percentages: ["Bear 48%", "Dog 22%", "Dinosaur 10%"] }
            ],
            female: [
                { type: "Puppy Face", emoji: "🐶", desc: "Friendly and cute, you have the most lovable charm!", percentages: ["Dog 42%", "Rabbit 28%", "Deer 10%"] },
                { type: "Cat Face", emoji: "🐱", desc: "Sophisticated and alluring, you have a sharp and chic gaze.", percentages: ["Cat 45%", "Fox 25%", "Deer 12%"] },
                { type: "Rabbit Face", emoji: "🐰", desc: "Bubbly and bright, you radiate positive energy everywhere you go!", percentages: ["Rabbit 52%", "Dog 20%", "Deer 10%"] },
                { type: "Deer Face", emoji: "🦌", desc: "Elegant and calm, you have a graceful and peaceful atmosphere.", percentages: ["Deer 50%", "Rabbit 20%", "Cat 10%"] }
            ]
        }
    },
    ko: {
        title: "AI 동물상 테스트",
        subtitle: "글로벌 인공지능 얼굴 분석",
        selectionLabel: "성별 선택:",
        uploadText: "사진을 클릭하거나 드래그하세요",
        uploadHint: "(JPG, PNG 최대 10MB)",
        statusText: "⚡ 빠른 분석 중...",
        privacyText: "사진은 서버에 저장되지 않습니다.",
        retryBtn: "다시 하기",
        shareBtn: "공유하기",
        results: {
            male: [
                { type: "강아지상", emoji: "🐶", desc: "다정다감하고 귀여운 당신은 누구에게나 호감을 주는 매력을 가졌네요!", percentages: ["강아지 45%", "고양이 20%", "곰 15%"] },
                { type: "고양이상", emoji: "🐱", desc: "시크하고 신비로운 당신은 날카로우면서도 세련된 분위기를 풍깁니다.", percentages: ["고양이 50%", "여우 25%", "강아지 10%"] },
                { type: "공룡상", emoji: "🦖", desc: "강하고 카리스마 있는 당신은 압도적인 존재감을 보여줍니다.", percentages: ["공룡 55%", "곰 20%", "강아지 10%"] },
                { type: "곰상", emoji: "🐻", desc: "듬직하고 따뜻한 당신은 포근한 매력으로 주변을 안심시킵니다.", percentages: ["곰 48%", "강아지 22%", "공룡 10%"] }
            ],
            female: [
                { type: "강아지상", emoji: "🐶", desc: "다정하고 귀여운 당신은 모든 사람들에게 사랑받는 매력을 가졌네요!", percentages: ["강아지 42%", "토끼 28%", "사슴 10%"] },
                { type: "고양이상", emoji: "🐱", desc: "세련되고 매혹적인 당신은 날카로우면서도 도도한 매력이 돋보입니다.", percentages: ["고양이 45%", "여우 25%", "사슴 12%"] },
                { type: "토끼상", emoji: "🐰", desc: "발랄하고 귀여운 당신은 주변에 긍정적인 에너지를 전파합니다!", percentages: ["토끼 52%", "강아지 20%", "사슴 10%"] },
                { type: "사슴상", emoji: "🦌", desc: "우아하고 차분한 당신은 맑고 영롱한 분위기를 자아냅니다.", percentages: ["사슴 50%", "토끼 20%", "고양이 10%"] }
            ]
        }
    }
};

let currentLang = 'en';

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
const langEn = document.getElementById('lang-en');
const langKo = document.getElementById('lang-ko');

// State
let selectedGender = 'female';

// Language Switching
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Update active button
    langEn.classList.toggle('active', lang === 'en');
    langKo.classList.toggle('active', lang === 'ko');

    // Update UI text
    document.querySelector('.main-title').textContent = i18n[lang].title;
    document.querySelector('.subtitle').textContent = i18n[lang].subtitle;
    document.querySelector('.selection-label').textContent = i18n[lang].selectionLabel;
    document.querySelector('.upload-text').textContent = i18n[lang].uploadText;
    document.querySelector('.upload-hint').textContent = i18n[lang].uploadHint;
    document.getElementById('analysis-text').textContent = i18n[lang].statusText;
    document.querySelector('.privacy-notice span:last-child').textContent = i18n[lang].privacyText;
    btnRetry.textContent = i18n[lang].retryBtn;
    btnShare.textContent = i18n[lang].shareBtn;
}

langEn.addEventListener('click', () => setLanguage('en'));
langKo.addEventListener('click', () => setLanguage('ko'));

// Gender Selection
document.querySelectorAll('input[name="gender"]').forEach(input => {
    input.addEventListener('change', (e) => {
        selectedGender = e.target.value;
    });
});

// Upload Logic
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

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

// Analysis Sequence
function startAnalysis() {
    setupSection.classList.add('hidden');
    analysisSection.classList.remove('hidden');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        loadingBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            showResult();
        }
    }, 50);
}

// Result Generation
function showResult() {
    analysisSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    const results = i18n[currentLang].results[selectedGender];
    const result = results[Math.floor(Math.random() * results.length)];

    document.getElementById('result-emoji').textContent = result.emoji;
    document.getElementById('result-title').textContent = result.type;
    document.getElementById('result-desc').textContent = result.desc;

    const percentageList = document.getElementById('percentage-list');
    percentageList.innerHTML = '';

    result.percentages.forEach((p, index) => {
        const [label, valueStr] = p.split(' ');
        const value = parseInt(valueStr);
        
        const item = document.createElement('div');
        item.className = 'percentage-item';
        item.innerHTML = `
            <div class="label-row">
                <span>${label}</span>
                <span>${valueStr}</span>
            </div>
            <div class="bar-bg">
                <div class="bar-fill ${index === 0 ? '' : 'accent'}" style="width: 0%"></div>
            </div>
        `;
        percentageList.appendChild(item);

        // Animate bar
        setTimeout(() => {
            item.querySelector('.bar-fill').style.width = `${value}%`;
        }, 100);
    });
}

// Actions
btnRetry.addEventListener('click', () => {
    resultSection.classList.add('hidden');
    setupSection.classList.remove('hidden');
    imagePreview.classList.add('hidden');
    imagePreview.src = '';
    fileInput.value = '';
    loadingBar.style.width = '0%';
});

btnShare.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: i18n[currentLang].title,
            text: `I got ${document.getElementById('result-title').textContent}! Find your animal face type here.`,
            url: window.location.href,
        }).catch(err => console.log('Error sharing', err));
    } else {
        alert('Share not supported on this browser. Copy the URL!');
    }
});

// Initialize
setLanguage('en');
