// Multi-language strings
const i18n = {
    en: {
        title: "K-Idol Name Generator",
        subtitle: "Find your K-Pop look-alike & names",
        selectionLabel: "Select Gender:",
        uploadText: "Upload your photo",
        uploadHint: "(JPG, PNG up to 10MB)",
        statusText: "⚡ Analyzing your features...",
        privacyText: "Photos are never saved on our server.",
        retryBtn: "Try Again",
        shareBtn: "Share Result",
        matchLabel: "You look like",
        langLabels: {
            en: "American",
            ko: "Korean",
            ja: "Japanese",
            zh: "Chinese"
        },
        affiliateTitle: "Affiliate Inquiry",
        affiliateLabelName: "Name / Company",
        affiliateLabelEmail: "Email",
        affiliateLabelMessage: "Message",
        affiliatePlaceholderName: "Your name or company",
        affiliatePlaceholderEmail: "your@email.com",
        affiliatePlaceholderMessage: "How can we collaborate?",
        affiliateBtn: "Send Inquiry"
    },
    ko: {
        title: "K-아이돌 이름 생성기",
        subtitle: "나와 닮은 아이돌과 이름 찾기",
        selectionLabel: "성별 선택:",
        uploadText: "사진 업로드하기",
        uploadHint: "(JPG, PNG 최대 10MB)",
        statusText: "⚡ 인공지능 분석 중...",
        privacyText: "사진은 서버에 저장되지 않습니다.",
        retryBtn: "다시 하기",
        shareBtn: "결과 공유하기",
        matchLabel: "당신의 닮은꼴 아이돌은",
        langLabels: {
            en: "미국식 이름",
            ko: "한국식 이름",
            ja: "일본식 이름",
            zh: "중국식 이름"
        },
        affiliateTitle: "제휴 문의",
        affiliateLabelName: "성함 / 업체명",
        affiliateLabelEmail: "이메일",
        affiliateLabelMessage: "문의 내용",
        affiliatePlaceholderName: "성함 또는 업체명을 입력하세요",
        affiliatePlaceholderEmail: "이메일 주소를 입력하세요",
        affiliatePlaceholderMessage: "제휴 내용을 입력해 주세요",
        affiliateBtn: "문의하기"
    }
};

const idols = {
    female: [
        { id: "Jennie (BLACKPINK)", names: { en: "Jennie", ko: "김제니", ja: "ジェニー", zh: "珍妮" } },
        { id: "Karina (aespa)", names: { en: "Karina", ko: "유지민", ja: "カリナ", zh: "柳智敏" } },
        { id: "Wonyoung (IVE)", names: { en: "Wonyoung", ko: "장원영", ja: "ウォニョン", zh: "张员瑛" } },
        { id: "Hanni (NewJeans)", names: { en: "Hanni", ko: "하니", ja: "ハニ", zh: "牟智慧" } },
        { id: "Sana (TWICE)", names: { en: "Sana", ko: "사나", ja: "サナ", zh: "凑崎纱夏" } }
    ],
    male: [
        { id: "V (BTS)", names: { en: "V", ko: "김태형", ja: "ヴィ", zh: "金泰亨" } },
        { id: "Cha Eun-woo (ASTRO)", names: { en: "Eunwoo", ko: "차은우", ja: "チャウヌ", zh: "车银优" } },
        { id: "Felix (Stray Kids)", names: { en: "Felix", ko: "필릭스", ja: "フィリックス", zh: "李龙馥" } },
        { id: "Mingyu (SEVENTEEN)", names: { en: "Mingyu", ko: "김민규", ja: "ミンギュ", zh: "金珉奎" } },
        { id: "Hyunjin (Stray Kids)", names: { en: "Hyunjin", ko: "황현진", ja: "ヒョンジン", zh: "黄铉辰" } }
    ]
};

let currentLang = 'en';

// DOM Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const setupSection = document.getElementById('setup-section');
const analysisSection = document.getElementById('analysis-section');
const resultSection = document.getElementById('result-section');
const affiliateSection = document.getElementById('affiliate-section');
const loadingBar = document.getElementById('loading-bar');
const btnRetry = document.getElementById('btn-retry');
const btnShare = document.getElementById('btn-share');
const langEn = document.getElementById('lang-en');
const langKo = document.getElementById('lang-ko');
const linkAffiliate = document.getElementById('link-affiliate');

// State
let selectedGender = 'female';

// Language Switching
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    langEn.classList.toggle('active', lang === 'en');
    langKo.classList.toggle('active', lang === 'ko');

    document.querySelector('.main-title').textContent = i18n[lang].title;
    document.querySelector('.subtitle').textContent = i18n[lang].subtitle;
    document.querySelector('.selection-label').textContent = i18n[lang].selectionLabel;
    document.querySelector('.upload-text').textContent = i18n[lang].uploadText;
    document.querySelector('.upload-hint').textContent = i18n[lang].uploadHint;
    document.getElementById('analysis-text').textContent = i18n[lang].statusText;
    document.querySelector('.privacy-notice span:last-child').textContent = i18n[lang].privacyText;
    btnRetry.textContent = i18n[lang].retryBtn;
    btnShare.textContent = i18n[lang].shareBtn;
    document.getElementById('idol-match-label').textContent = i18n[lang].matchLabel;

    document.getElementById('affiliate-title').textContent = i18n[lang].affiliateTitle;
    document.getElementById('label-name').textContent = i18n[lang].affiliateLabelName;
    document.getElementById('label-email').textContent = i18n[lang].affiliateLabelEmail;
    document.getElementById('label-message').textContent = i18n[lang].affiliateLabelMessage;
    document.getElementById('name').placeholder = i18n[lang].affiliatePlaceholderName;
    document.getElementById('email').placeholder = i18n[lang].affiliatePlaceholderEmail;
    document.getElementById('message').placeholder = i18n[lang].affiliatePlaceholderMessage;
    document.getElementById('btn-affiliate').textContent = i18n[lang].affiliateBtn;

    // If result is already shown, update labels
    if (!resultSection.classList.contains('hidden')) {
        updateResultLabels();
    }
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

function startAnalysis() {
    setupSection.classList.add('hidden');
    analysisSection.classList.remove('hidden');
    affiliateSection.classList.add('hidden');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        loadingBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            showResult();
        }
    }, 30);
}

let lastMatchedIdol = null;

function showResult() {
    analysisSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    const genderIdols = idols[selectedGender];
    const idol = genderIdols[Math.floor(Math.random() * genderIdols.length)];
    lastMatchedIdol = idol;

    document.getElementById('result-title').textContent = idol.id;
    updateResultLabels();
}

function updateResultLabels() {
    if (!lastMatchedIdol) return;

    const labels = i18n[currentLang].langLabels;
    const idolNames = lastMatchedIdol.names;

    // Primary name (Current Language)
    const primaryLang = currentLang === 'ko' ? 'ko' : 'en';
    const secondaryLangs = ['en', 'ko', 'ja', 'zh'].filter(l => l !== primaryLang);

    document.getElementById('lang-label-primary').textContent = labels[primaryLang];
    document.getElementById('val-primary').textContent = idolNames[primaryLang];

    secondaryLangs.forEach((lang, index) => {
        const idx = index + 1;
        document.getElementById(`lang-label-sec-${idx}`).textContent = labels[lang];
        document.getElementById(`val-sec-${idx}`).textContent = idolNames[lang];
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
    lastMatchedIdol = null;
});

btnShare.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: i18n[currentLang].title,
            text: `I look like ${lastMatchedIdol.id}! Check out my names in 4 languages.`,
            url: window.location.href,
        }).catch(err => console.log('Error sharing', err));
    } else {
        alert('Share not supported on this browser. Copy the URL!');
    }
});

linkAffiliate.addEventListener('click', (e) => {
    e.preventDefault();
    affiliateSection.classList.toggle('hidden');
    if (!affiliateSection.classList.contains('hidden')) {
        affiliateSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Initialize
setLanguage('en');
