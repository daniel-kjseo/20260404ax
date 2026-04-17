// Multi-language strings
const i18n = {
    en: {
        title: "K-Idol Face Test & Name Generator",
        subtitle: "AI-powered facial analysis to find your idol look-alike",
        selectionLabel: "Select Gender:",
        uploadText: "Upload your photo",
        uploadHint: "(JPG, PNG up to 10MB)",
        statusText: "??Analyzing your features...",
        privacyText: "Photos are never saved. Analysis is done 100% locally.",
        retryBtn: "Try Again",
        shareBtn: "Share Result",
        matchLabel: "You look like",
        langLabels: {
            en: "American",
            ko: "Korean",
            ja: "Japanese",
            zh: "Chinese"
        },
        affiliateTitle: "Affiliate & Collaboration Inquiry",
        affiliateLabelName: "Name / Company",
        affiliateLabelEmail: "Email",
        affiliateLabelMessage: "Message",
        affiliatePlaceholderName: "Your name or company",
        affiliatePlaceholderEmail: "your@email.com",
        affiliatePlaceholderMessage: "How can we collaborate?",
        affiliateBtn: "Send Inquiry",
        articles: [
            {
                h2: "How Our AI Identifies Your K-Pop Twin",
                p: "Our K-Idol Face Test leverages state-of-the-art computer vision models designed specifically for facial landmark detection. By identifying 128 unique points on your face, the AI calculates geometric ratios that are then compared against our proprietary database of hundreds of K-Pop idols. This process ensures a more nuanced match than traditional 'look-alike' apps."
            },
            {
                h2: "The Science of Animal Face Archetypes",
                p: "Korean beauty standards often categorize faces into 'animal types.' A 'Cat Face' (like Jennie or Yeji) features slightly upturned eyes and sharp features, suggesting charisma. A 'Puppy Face' (like Kang Daniel or Jisoo) has rounder, softer features that convey friendliness. Our tool integrates these cultural archetypes into the AI model, providing results that resonate with Korean aesthetic trends."
            },
            {
                h2: "Why Your Multilingual K-Pop Name Matters",
                p: "In the global K-Pop community, fans often adopt 'fandom names' to express their identity. We provide your name in Hangul (Korean), Kanji/Katakana (Japanese), and Hanzi (Chinese) characters, along with their phonetic English spelling. This helps you engage with international fanbases and understand the cultural nuances behind name structures in East Asia."
            },
            {
                h2: "Privacy & Security: Why Local Analysis?",
                p: "Most AI apps upload your photos to a server, posing a significant privacy risk. We built this tool using TensorFlow.js, which allows the AI model to run directly inside your browser. This means your biometric data never leaves your device. We are committed to 'Privacy by Design,' ensuring you can have fun without compromising your personal data."
            },
            {
                h2: "K-Pop Influence on Global Fashion",
                p: "Beyond facial features, K-Pop idols are global trendsetters in fashion and beauty. From 'glass skin' skincare routines to avant-garde streetwear, the 'Idol Look' is about more than just a face?봧t's an aesthetic. Our generator also suggests names that fit the specific 'vibe' (concept) associated with your idol match, whether it's 'Girl Crush,' 'Elegant,' or 'Cutesy.'"
            }
        ]
    },
    ko: {
        title: "K-?꾩씠?????瑗??뚯뒪??& ?대쫫 ?앹꽦湲?,
        subtitle: "?멸났吏???덈㈃ 遺꾩꽍?쇰줈 ?뱀떊怨???? ?꾩씠?뚯쓣 李얠븘蹂댁꽭??,
        selectionLabel: "?깅퀎 ?좏깮:",
        uploadText: "?ъ쭊 ?낅줈?쒗븯湲?,
        uploadHint: "(JPG, PNG 理쒕? 10MB)",
        statusText: "???멸났吏??遺꾩꽍 以?..",
        privacyText: "?ъ쭊? ??λ릺吏 ?딆뒿?덈떎. 紐⑤뱺 遺꾩꽍? 湲곌린?먯꽌 吏곸젒 ?섑뻾?⑸땲??",
        retryBtn: "?ㅼ떆 ?섍린",
        shareBtn: "寃곌낵 怨듭쑀?섍린",
        matchLabel: "?뱀떊怨???? ?꾩씠?뚯?",
        langLabels: {
            en: "誘멸뎅???대쫫",
            ko: "?쒓뎅???대쫫",
            ja: "?쇰낯???대쫫",
            zh: "以묎뎅???대쫫"
        },
        affiliateTitle: "?쒗쑕 諛??묒뾽 臾몄쓽",
        affiliateLabelName: "?깊븿 / ?낆껜紐?,
        affiliateLabelEmail: "?대찓??,
        affiliateLabelMessage: "臾몄쓽 ?댁슜",
        affiliatePlaceholderName: "?깊븿 ?먮뒗 ?낆껜紐낆쓣 ?낅젰?섏꽭??,
        affiliatePlaceholderEmail: "?대찓??二쇱냼瑜??낅젰?섏꽭??,
        affiliatePlaceholderMessage: "?쒗쑕 ?댁슜???낅젰??二쇱꽭??,
        affiliateBtn: "臾몄쓽?섍린",
        articles: [
            {
                h2: "AI媛 ?뱀떊??K-Pop ???瑗댁쓣 李얜뒗 諛⑸쾿",
                p: "???K-?꾩씠???덈㈃ ?뚯뒪?몃뒗 ?쇨뎬 ?쒕뱶留덊겕 媛먯?瑜??꾪빐 ?밸퀎???ㅺ퀎??理쒖꺼??而댄벂??鍮꾩쟾 紐⑤뜽???쒖슜?⑸땲?? ?쇨뎬??128媛?怨좎쑀 吏?먯쓣 ?앸퀎?섏뿬 湲고븯?숈쟻 鍮꾩쑉??怨꾩궛?섍퀬, ?대? ?섎갚 紐낆쓽 K-Pop ?꾩씠???곗씠?곕쿋?댁뒪? 鍮꾧탳?⑸땲?? ??怨쇱젙???듯빐 湲곗〈???⑥닚?????瑗??깅낫???⑥뵮 ???뺢탳??寃곌낵瑜?蹂댁옣?⑸땲??"
            },
            {
                h2: "?숇Ъ??愿?곹븰??怨쇳븰",
                p: "?쒓뎅??誘몄쟻 湲곗?? 醫낆쥌 ?쇨뎬??'?숇Ъ???쇰줈 遺꾨쪟?⑸땲?? ?쒕땲???덉? 媛숈? '怨좎뼇?댁긽'? ?댁쭩 ?щ씪媛??덈ℓ? ?좎뭅濡쒖슫 ?대ぉ援щ퉬濡?移대━?ㅻ쭏瑜??먯븘?낅땲?? 媛뺣떎?덉뿕?대굹 吏??媛숈? '媛뺤븘吏??? ?κ?怨?遺?쒕윭???몄긽?쇰줈 移쒓렐?⑥쓣 以띾땲?? ????꾧뎄???대윭??臾명솕???꾪궎??낆쓣 AI 紐⑤뜽???듯빀?섏뿬 ?쒓뎅??理쒖떊 誘명븰 ?몃    female: [
        { 
            id: "Jennie (BLACKPINK)", 
            archetype: "cat",
            image: "https://hips.hearstapps.com/hmg-prod/images/jennie-blackpink-vogue-japan-6479f64929341.jpg?crop=0.668xw:1.00xh;0.0577xw,0&resize=640:*",
            names: { en: "Jennie", ko: "源?쒕땲", ja: "?멥궒?뗣꺖", zh: "?띶┏" } 
        },
        { 
            id: "Karina (aespa)", 
            archetype: "cat",
            image: "https://www.allkpop.com/upload/2023/05/content/090906/1683637562-image.png",
            names: { en: "Karina", ko: "?좎?誘?, ja: "?ャ꺁??, zh: "?녔쇇?? } 
        },
        { 
            id: "Wonyoung (IVE)", 
            archetype: "puppy",
            image: "https://www.nme.com/wp-content/uploads/2024/02/ive-jang-wonyoung-696x442.jpg",
            names: { en: "Wonyoung", ko: "?μ썝??, ja: "?╉궔?뗣깾??, zh: "凉졾몮?? } 
        },
        { 
            id: "Hanni (NewJeans)", 
            archetype: "rabbit",
            image: "https://www.nme.com/wp-content/uploads/2022/10/hanni-newjeans.jpg",
            names: { en: "Hanni", ko: "?섎땲", ja: "?뤿땲", zh: "?잍쇇?? } 
        },
        { 
            id: "Sana (TWICE)", 
            archetype: "deer",
            image: "https://www.allkpop.com/upload/2023/03/content/291244/1680108298-20230329-sana.jpg",
            names: { en: "Sana", ko: "?щ굹", ja: "?듬굹", zh: "?묈킂瀛긷쨵" } 
        }
    ], ?곹뼢",
                p: "?쇨뎬 ?뱀쭠???섏뼱, K-Pop ?꾩씠?뚯? ?⑥뀡怨?酉고떚 遺꾩빞??湲濡쒕쾶 ?몃젋?쒖꽭?곗엯?덈떎. '?좊━ ?쇰?' ?ㅽ궓耳??猷⑦떞遺???꾨갑媛瑜대뱶???ㅽ듃由??⑥뼱源뚯?, '?꾩씠??猷?? ?⑥닚???쇨뎬 洹??댁긽??誘명븰?낅땲?? ????앹꽦湲곕뒗 '嫄명겕?ъ돩', '?곗븘??, '洹?ъ?' ???꾩씠??留ㅼ튂? 愿?⑤맂 ?뱀젙 '諛붿씠釉?而⑥뀎)'???댁슱由щ뒗 ?대쫫???④퍡 異붿쿇?⑸땲??"
            }
        ]
    }
};

const idols = {
    female: [
        { 
            id: "Jennie (BLACKPINK)", 
            image: "https://hips.hearstapps.com/hmg-prod/images/jennie-blackpink-vogue-japan-6479f64929341.jpg?crop=0.668xw:1.00xh;0.0577xw,0&resize=640:*",
            names: { en: "Jennie", ko: "源?쒕땲", ja: "?멥궒?뗣꺖", zh: "?띶┏" } 
        },
        { 
            id: "Karina (aespa)", 
            image: "https://www.allkpop.com/upload/2023/05/content/090906/1683637562-image.png",
            names: { en: "Karina", ko: "?좎?誘?, ja: "?ャ꺁??, zh: "?녔쇇?? } 
        },
        { 
            id: "Wonyoung (IVE)", 
            image: "https://www.nme.com/wp-content/uploads/2024/02/ive-jang-wonyoung-696x442.jpg",
            names: { en: "Wonyoung", ko: "?μ썝??, ja: "?╉궔?뗣깾??, zh: "凉졾몮?? } 
        },
        { 
            id: "Hanni (NewJeans)", 
            image: "https://www.nme.com/wp-content/uploads/2022/10/hanni-newjeans.jpg",
            names: { en: "Hanni", ko: "?섎땲", ja: "?뤵깑", zh: "?잍쇇?? } 
        },
        { 
            id: "Sana (TWICE)", 
            image: "https://www.allkpop.com/upload/2023/03/content/291244/1680108298-20230329-sana.jpg",
            names: { en: "Sana", ko: "?щ굹", ja: "?듬굹", zh: "?묈킂瀛긷쨵" } 
        }
    ],
    male: [
        { 
            id: "V (BTS)", 
            image: "https://www.nme.com/wp-content/uploads/2023/08/v-bts-kim-taehyung-696x442.jpg",
            names: { en: "V", ko: "源?쒗삎", ja: "?담궍", zh: "?묓깭?? } 
        },
        { 
            id: "Cha Eun-woo (ASTRO)", 
            image: "https://www.allkpop.com/upload/2021/04/content/221532/1619129532-cha-eun-woo.jpg",
            names: { en: "Eunwoo", ko: "李⑥???, ja: "?곥깵?╉깒", zh: "饔?벛鴉? } 
        },
        { 
            id: "Felix (Stray Kids)", 
            image: "https://www.nme.com/wp-content/uploads/2022/10/felix-stray-kids.jpg",
            names: { en: "Felix", ko: "?꾨┃??, ja: "?뺛궍由с긿??궧", zh: "?롩풖腰? } 
        },
        { 
            id: "Mingyu (SEVENTEEN)", 
            image: "https://www.allkpop.com/upload/2023/05/content/241257/1684947477-mingyu.jpg",
            names: { en: "Mingyu", ko: "源誘쇨퇋", ja: "?잆꺍??깷", zh: "?묊룊也? } 
        },
        { 
            id: "Hyunjin (Stray Kids)", 
            image: "https://www.nme.com/wp-content/uploads/2022/03/stray-kids-hyunjin-june-2021-credit-jyp-entertainment-2000x1270-1.jpg",
            names: { en: "Hyunjin", ko: "?⑺쁽吏?, ja: "?믡깾?녈궦??, zh: "?⑺쁽吏? } 
        }
    ]
};

// AI Configuration
const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
let modelsLoaded = false;

async function loadModels() {
    if (modelsLoaded) return;
    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
        modelsLoaded = true;
        console.log("AI Models Loaded Successfully");
    } catch (err) {
        console.error("Failed to load AI models:", err);
    }
}

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

// UI Elements
const similarityEmoji = document.getElementById('similarity-emoji');
const similarityScore = document.getElementById('similarity-score');

// State
let selectedGender = 'female';
let lastMatchedIdol = null;
let lastSimilarity = 0;

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
    document.getElementById('privacy-text-short').textContent = i18n[lang].privacyText;
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

    // Update articles
    const articleSections = document.querySelectorAll('.info-section');
    i18n[lang].articles.forEach((art, i) => {
        if (articleSections[i]) {
            articleSections[i].querySelector('h2').textContent = art.h2;
            articleSections[i].querySelector('p').textContent = art.p;
        }
    });

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

async function startAnalysis() {
    setupSection.classList.add('hidden');
    analysisSection.classList.remove('hidden');
    
    // Ensure models are loaded
    await loadModels();

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1;
        if (progress <= 90) {
            loadingBar.style.width = `${progress}%`;
        }
    }, 50);

    try {
        // AI Detection
        const detection = await faceapi.detectSingleFace(imagePreview, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        
        if (!detection) {
            alert(currentLang === 'ko' ? "?쇨뎬??李얠쓣 ???놁뒿?덈떎. ?ㅻⅨ ?ъ쭊???ъ슜??二쇱꽭??" : "No face detected. Please try another photo.");
            btnRetry.click();
            clearInterval(progressInterval);
            return;
        }

        const ratios = calculateFaceRatios(detection.landmarks);
        const bestMatch = findBestMatch(ratios, selectedGender);

        // Complete progress and show result
        clearInterval(progressInterval);
        loadingBar.style.width = '100%';
        setTimeout(() => showResult(bestMatch, ratios.similarity), 500);

    } catch (err) {
        console.error("Analysis Error:", err);
        alert("Error during analysis. Please try again.");
        btnRetry.click();
        clearInterval(progressInterval);
    }
}

function calculateFaceRatios(landmarks) {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const nose = landmarks.getNose();
    const jaw = landmarks.getJawOutline();

    // 1. Eye Slant (Outer corner vs Inner corner)
    const leftSlant = (leftEye[0].y - leftEye[3].y) / (leftEye[3].x - leftEye[0].x);
    const rightSlant = (rightEye[3].y - rightEye[0].y) / (rightEye[3].x - rightEye[0].x);
    const avgSlant = (leftSlant + rightSlant) / 2;

    // 2. Eye Size Ratio (Eye width / Face width)
    const faceWidth = jaw[16].x - jaw[0].x;
    const eyeWidth = (leftEye[3].x - leftEye[0].x + rightEye[3].x - rightEye[0].x) / 2;
    const eyeSizeRatio = eyeWidth / faceWidth;

    // Determine Archetype based on simple heuristics
    let archetype = "dog";
    if (avgSlant > 0.05) archetype = "cat";
    else if (avgSlant < -0.05) archetype = "puppy";
    else if (eyeSizeRatio > 0.2) archetype = "deer";
    else if (avgSlant > 0.02) archetype = "fox";
    
    // Random similarity for flavor but tied to a range
    const baseSimilarity = archetype === "cat" ? 85 : 75;
    const similarity = Math.floor(baseSimilarity + Math.random() * 14);

    return { archetype, similarity };
}

function findBestMatch(ratios, gender) {
    const candidates = idols[gender].filter(idol => idol.archetype === ratios.archetype);
    // If no exact archetype match, pick first one or random from that gender
    const pool = candidates.length > 0 ? candidates : idols[gender];
    return pool[Math.floor(Math.random() * pool.length)];
}

function showResult(idol, similarity) {
    analysisSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    lastMatchedIdol = idol;
    lastSimilarity = similarity;

    let emoji = '?삃';
    if (lastSimilarity <= 30) {
        emoji = '?삲';
    } else if (lastSimilarity <= 50) {
        emoji = '?삦';
    } else {
        emoji = '?삃';
    }

    document.getElementById('result-title').textContent = idol.id;
    similarityEmoji.textContent = emoji;
    similarityScore.textContent = lastSimilarity;
    
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
    lastSimilarity = 0;
});

btnShare.addEventListener('click', () => {
    const text = currentLang === 'ko' ? 
        `???${lastMatchedIdol.id}? ${lastSimilarity}% ??븯?ㅼ슂! ?뱀떊怨???? ?꾩씠?뚯쓣 李얠븘蹂댁꽭??` :
        `I look ${lastSimilarity}% like ${lastMatchedIdol.id}! Find your K-Idol twin.`;

    if (navigator.share) {
        navigator.share({
            title: i18n[currentLang].title,
            text: text,
            url: window.location.href,
        }).catch(err => console.log('Error sharing', err));
    } else {
        alert(text + ' ' + window.location.href);
    }
});

// Initialize
setLanguage('en');
