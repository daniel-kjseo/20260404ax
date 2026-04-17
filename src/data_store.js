/**
 * Global I18n strings and Data Store for Idols and Archetypes
 */

export const i18n = {
    en: {
        title: "K-Idol Face Test & Name Generator",
        subtitle: "AI-powered facial analysis to find your idol look-alike",
        selectionLabel: "Select Gender:",
        uploadText: "Upload your photo",
        uploadHint: "(JPG, PNG up to 10MB)",
        statusText: "⚡ Analyzing your features...",
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
        archetypeLabels: {
            cat: "Cat Face",
            dog: "Dog Face",
            puppy: "Puppy Face",
            fox: "Fox Face",
            rabbit: "Rabbit Face",
            deer: "Deer Face"
        },
        articles: [
            {
                title: "How Our AI Identifies Your K-Pop Twin",
                content: "Our K-Idol Face Test leverages state-of-the-art computer vision models designed specifically for facial landmark detection. By identifying 68 unique points on your face, the AI calculates geometric ratios that are then compared against our proprietary database of hundreds of K-Pop idols. This process ensures a more nuanced match than traditional 'look-alike' apps."
            },
            {
                title: "The Science of Animal Face Archetypes",
                content: "Korean beauty standards often categorize faces into 'animal types.' A 'Cat Face' (like Jennie or Yeji) features slightly upturned eyes and sharp features, suggesting charisma. A 'Puppy Face' (like Kang Daniel or Jisoo) has rounder, softer features that convey friendliness. Our tool integrates these cultural archetypes into the AI model, providing results that resonate with Korean aesthetic trends."
            },
            {
                title: "Why Your Multilingual K-Pop Name Matters",
                content: "In the global K-Pop community, fans often adopt 'fandom names' to express their identity. We provide your name in Hangul (Korean), Kanji/Katakana (Japanese), and Hanzi (Chinese) characters, along with their phonetic English spelling. This helps you engage with international fanbases and understand the cultural nuances behind name structures in East Asia."
            },
            {
                title: "Privacy & Security: Why Local Analysis?",
                content: "Most AI apps upload your photos to a server, posing a significant privacy risk. We built this tool using TensorFlow.js, which allows the AI model to run directly inside your browser. This means your biometric data never leaves your device. We are committed to 'Privacy by Design,' ensuring you can have fun without compromising your personal data."
            },
            {
                title: "K-Pop Influence on Global Fashion",
                content: "Beyond facial features, K-Pop idols are global trendsetters in fashion and beauty. From 'glass skin' skincare routines to avant-garde streetwear, the 'Idol Look' is about more than just a face—it's an aesthetic. Our generator also suggests names that fit the specific 'vibe' (concept) associated with your idol match, whether it's 'Girl Crush,' 'Elegant,' or 'Cutesy.'"
            }
        ]
    },
    ko: {
        title: "K-아이돌 닮은꼴 테스트 & 이름 생성기",
        subtitle: "인공지능 안면 분석으로 당신과 닮은 아이돌을 찾아보세요",
        selectionLabel: "성별 선택:",
        uploadText: "사진 업로드하기",
        uploadHint: "(JPG, PNG 최대 10MB)",
        statusText: "⚡ 인공지능 분석 중...",
        privacyText: "사진은 저장되지 않습니다. 모든 분석은 기기에서 직접 수행됩니다.",
        retryBtn: "다시 하기",
        shareBtn: "결과 공유하기",
        matchLabel: "당신과 닮은 아이돌은",
        langLabels: {
            en: "미국식 이름",
            ko: "한국식 이름",
            ja: "일본식 이름",
            zh: "중국식 이름"
        },
        archetypeLabels: {
            cat: "고양이상",
            dog: "개상",
            puppy: "강아지상",
            fox: "여우상",
            rabbit: "토끼상",
            deer: "사슴상"
        },
        articles: [
            {
                title: "AI가 당신의 K-Pop 닮은꼴을 찾는 방법",
                content: "저희 K-아이돌 안면 테스트는 얼굴 랜드마크 감지를 위해 특별히 설계된 최첨단 컴퓨터 비전 모델을 활용합니다. 얼굴의 68개 고유 지점을 식별하여 기하학적 비율을 계산하고, 이를 수백 명의 K-Pop 아이돌 데이터베이스와 비교합니다. 이 과정을 통해 기존의 단순한 닮은꼴 앱보다 훨씬 더 정교한 결과를 보장합니다."
            },
            {
                title: "동물상 관상학의 과학",
                content: "한국의 미적 기준은 종종 얼굴을 '동물상'으로 분류합니다. 제니나 예지 같은 '고양이상'은 살짝 올라간 눈매와 날카로운 이목구비로 카리스마를 자아냅니다. 강다니엘이나 지수 같은 '강아지상'은 둥글고 부드러운 인상으로 친근함을 줍니다. 저희 도구는 이러한 문화적 아키타입을 AI 모델에 통합하여 한국의 최신 미학 트렌드를 반영한 결과를 제공합니다."
            },
            {
                title: "다국어 K-Pop 이름이 중요한 이유",
                content: "글로벌 K-Pop 커뮤니티에서 팬들은 자신의 정체성을 표현하기 위해 종종 '팬덤 네임'을 사용합니다. 저희는 한글, 일본어(칸지/가타카나), 중국어(한자) 캐릭터와 함께 영어 발음을 제공합니다. 이를 통해 전 세계 팬들과 소통하고 동아시아 이름 구조의 문화적 뉘앙스를 이해할 수 있습니다."
            },
            {
                title: "개인정보 보호 및 보안: 왜 로컬 분석인가요?",
                content: "대부분의 AI 앱은 사진을 서버에 업로드하여 심각한 개인정보 위험을 초래합니다. 저희는 TensorFlow.js를 사용하여 AI 모델이 브라우저 내부에서 직접 실행되도록 구축했습니다. 즉, 귀하의 생체 데이터는 기기를 절대 떠나지 않습니다. '프라이버시 중심 설계(Privacy by Design)'를 통해 데이터 침해 걱정 없이 즐거운 경험을 제공합니다."
            },
            {
                title: "K-Pop이 글로벌 패션에 미치는 영향",
                content: "얼굴 특징을 넘어, K-Pop 아이돌은 패션과 뷰티 분야의 글로벌 트렌드세터입니다. '유리 피부' 스킨케어 루틴부터 아방가르드한 스트릿 웨어까지, '아이돌 룩'은 단순한 얼굴 그 이상의 미학입니다. 저희 생성기는 '걸크러쉬', '우아함', '귀여움' 등 아이돌 매치와 관련된 특정 '바이브(컨셉)'에 어울리는 이름을 함께 추천합니다."
            }
        ]
    }
};

export const archetypes = {
    cat:   { slant: 0.08,  eyeSize: 0.19, jaw: 0.70, weight: { slant: 0.5, eyeSize: 0.2, jaw: 0.3 } },
    fox:   { slant: 0.12,  eyeSize: 0.17, jaw: 0.65, weight: { slant: 0.6, eyeSize: 0.1, jaw: 0.3 } },
    puppy: { slant: -0.04, eyeSize: 0.22, jaw: 0.85, weight: { slant: 0.4, eyeSize: 0.4, jaw: 0.2 } },
    deer:  { slant: 0.02,  eyeSize: 0.26, jaw: 0.80, weight: { slant: 0.2, eyeSize: 0.6, jaw: 0.2 } },
    rabbit:{ slant: 0.01,  eyeSize: 0.24, jaw: 0.82, weight: { slant: 0.1, eyeSize: 0.5, jaw: 0.4 } },
    dog:   { slant: 0.00,  eyeSize: 0.20, jaw: 0.90, weight: { slant: 0.3, eyeSize: 0.3, jaw: 0.4 } }
};

export const idols = {
    female: [
        { 
            id: "Jennie (BLACKPINK)", 
            archetype: "cat",
            image: "https://hips.hearstapps.com/hmg-prod/images/jennie-blackpink-vogue-japan-6479f64929341.jpg?crop=0.668xw:1.00xh;0.0577xw,0&resize=640:*",
            names: { en: "Jennie", ko: "김제니", ja: "ジェニー", zh: "珍妮" } 
        },
        { 
            id: "Karina (aespa)", 
            archetype: "fox",
            image: "https://www.allkpop.com/upload/2023/05/content/090906/1683637562-image.png",
            names: { en: "Karina", ko: "유지민", ja: "カリナ", zh: "柳智敏" } 
        },
        { 
            id: "Wonyoung (IVE)", 
            archetype: "rabbit",
            image: "https://www.nme.com/wp-content/uploads/2024/02/ive-jang-wonyoung-696x442.jpg",
            names: { en: "Wonyoung", ko: "장원영", ja: "ウォニョン", zh: "张员瑛" } 
        },
        { 
            id: "Hanni (NewJeans)", 
            archetype: "puppy",
            image: "https://www.nme.com/wp-content/uploads/2022/10/hanni-newjeans.jpg",
            names: { en: "Hanni", ko: "하니", ja: "ハニ", zh: "牟智慧" } 
        },
        { 
            id: "Sana (TWICE)", 
            archetype: "deer",
            image: "https://www.allkpop.com/upload/2023/03/content/291244/1680108298-20230329-sana.jpg",
            names: { en: "Sana", ko: "사나", ja: "サな", zh: "凑崎纱夏" } 
        }
    ],
    male: [
        { 
            id: "V (BTS)", 
            archetype: "fox",
            image: "https://www.nme.com/wp-content/uploads/2023/08/v-bts-kim-taehyung-696x442.jpg",
            names: { en: "V", ko: "김태형", ja: "ヴィ", zh: "金태형" } 
        },
        { 
            id: "Cha Eun-woo (ASTRO)", 
            archetype: "puppy",
            image: "https://www.allkpop.com/upload/2021/04/content/221532/1619129532-cha-eun-woo.jpg",
            names: { en: "Eunwoo", ko: "차은우", ja: "チャウヌ", zh: "车银优" } 
        },
        { 
            id: "Felix (Stray Kids)", 
            archetype: "cat",
            image: "https://www.nme.com/wp-content/uploads/2022/10/felix-stray-kids.jpg",
            names: { en: "Felix", ko: "필릭스", ja: "フィ리ックス", zh: "李龙馥" } 
        },
        { 
            id: "Mingyu (SEVENTEEN)", 
            archetype: "dog",
            image: "https://www.allkpop.com/upload/2023/05/content/241257/1684947477-mingyu.jpg",
            names: { en: "Mingyu", ko: "김민규", ja: "ミンギュ", zh: "金珉奎" } 
        },
        { 
            id: "Hyunjin (Stray Kids)", 
            archetype: "fox",
            image: "https://www.nme.com/wp-content/uploads/2022/03/stray-kids-hyunjin-june-2021-credit-jyp-entertainment-2000x1270-1.jpg",
            names: { en: "Hyunjin", ko: "황현진", ja: "ヒョン진", zh: "황현진" } 
        }
    ]
};
