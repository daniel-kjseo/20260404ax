const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const indexFile = path.join(blogDir, 'index.html');
const sitemapFile = path.join(__dirname, 'sitemap.xml');

const template = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} | QARAH 블로그</title>
    <meta name="description" content="{{DESC}}">
    <meta property="og:title" content="{{TITLE}}">
    <meta property="og:description" content="{{DESC}}">
    <meta property="og:type" content="article">
    <meta property="og:image" content="https://qarah.web.app/blog/pet-names-series-1.png">
    <link rel="canonical" href="https://qarah.web.app/blog/{{FILENAME}}">
    <link rel="stylesheet" href="../style.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;900&display=swap" rel="stylesheet">
    <style>
        .blog-hero { text-align: center; padding: 3rem 0 2rem; }
        .blog-hero-tag {
            display: inline-block; padding: 0.3rem 0.8rem; border-radius: 99px;
            background: rgba(167,139,250,0.15); color: var(--color-purple);
            font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
            text-transform: uppercase; margin-bottom: 1rem;
        }
        .blog-hero h1 {
            font-weight: 900; font-size: 2.2rem; line-height: 1.3; margin-bottom: 1rem;
            background: linear-gradient(135deg, var(--color-purple), var(--color-gold));
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .blog-hero-meta { font-size: 0.85rem; color: var(--text-muted); }
        .blog-hero-img {
            width: 100%; max-width: 800px; margin: 2rem auto;
            border-radius: var(--radius-lg); overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .blog-hero-img img { width: 100%; height: auto; display: block; }
        .blog-body { max-width: 760px; margin: 0 auto; padding: 0 1.25rem; }
        .blog-body h2 {
            font-weight: 800; font-size: 1.6rem; color: var(--text-primary);
            margin: 4rem 0 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-subtle);
        }
        .blog-body h3 { font-weight: 700; font-size: 1.25rem; color: var(--color-gold); margin: 2.5rem 0 1rem; }
        .blog-body p { color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.25rem; font-size: 1rem; }
        .highlight-card {
            background: var(--bg-card); border: 1px solid var(--border-subtle);
            border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem;
        }
        .qa-section { margin-top: 5rem; padding-top: 3rem; border-top: 1px solid var(--border-subtle); }
        .qa-item { margin-bottom: 2rem; }
        .qa-item strong { display: block; font-size: 1.1rem; color: var(--color-purple); margin-bottom: 0.5rem; }
    </style>
</head>
<body>

<nav class="nav">
    <div class="nav-inner">
        <a href="../index.html" class="nav-brand"><span>QARAH</span></a>
        <ul class="nav-links" id="navLinks">
            <li><a href="../index.html">이름추천</a></li>
            <li><a href="index.html">블로그</a></li>
            <li><a href="../about.html">소개</a></li>
        </ul>
    </div>
</nav>

<main class="container">
    <article class="blog-post">
        <header class="blog-hero">
            <span class="blog-hero-tag">🐾 반려동물 이름의 기적 {{PART}}탄</span>
            <h1>{{H1_TITLE}}</h1>
            <p class="blog-hero-meta">2026년 4월 23일 · 작성자: QARAH 전문 분석팀</p>
        </header>

        <div class="blog-hero-img">
            <img src="pet-names-series-1.png" alt="반려동물 이름 시리즈 대표 이미지">
        </div>

        <div class="blog-body">
            {{BODY}}

            <section class="qa-section">
                <h2>🔎 자주 묻는 질문(FAQ)</h2>
                <div class="qa-item">
                    <strong>Q: 이름이 정말 반려동물의 성격에 영향을 미치나요?</strong>
                    <p>A: 네, 이름의 어감과 발음은 반려동물이 반응하는 방식과 주인의 감정에 영향을 주어 장기적으로 성격 형성에 일조합니다.</p>
                </div>
            </section>
        </div>
    </article>
</main>

<footer class="footer">
    <div class="container">
        <p class="footer-disclaimer">© 2026 QARAH. 모든 이름에는 부름이 있습니다.</p>
    </div>
</footer>

</body>
</html>`;

const posts = [
    {
        part: 2,
        filename: 'pet-names-series-2.html',
        title: '[반려동물 이름의 기적 2탄] 2026년 강아지 이름 트렌드 TOP 10',
        h1: '[2탄] 2026년 가장 인기 있는<br>강아지 이름 트렌드 TOP 10',
        desc: '반려동물 이름 10부작 제2탄! 2026년 대한민국에서 가장 사랑받는 강아지 이름 10가지와 그 안에 담긴 보호자들의 마음을 분석합니다.',
        body: `
            <section class="intro">
                <p>시대가 변하면 아이들의 이름도 변하듯, 반려견의 이름 트렌드 역시 우리의 삶과 가치관을 반영하며 빠르게 진화하고 있습니다. 2026년 현재, 보호자들은 반려견을 단순한 '동물'이 아닌 완벽한 '가족 구성원'으로 여기며, 그에 걸맞은 세련되고 의미 있는 이름을 찾고 있습니다.</p>
            </section>
            <section class="body-content">
                <h2>🏆 2026년 강아지 이름 트렌드 핵심</h2>
                <h3>자연에서 온 순우리말의 강세</h3>
                <p>올해 가장 두드러진 특징은 '구름', '여름', '바다' 등 자연의 아름다움을 담은 순우리말 이름의 인기입니다. 이는 반려견과 함께하는 자연 친화적이고 편안한 라이프스타일을 지향하는 현대인들의 심리가 투영된 결과입니다.</p>
                <div class="highlight-card">
                    <h3>💡 2026 강아지 이름 TOP 3</h3>
                    <ul>
                        <li><strong>1위. 여름:</strong> 활기차고 청량한 에너지를 주는 이름.</li>
                        <li><strong>2위. 보리:</strong> 구수하고 친근하며, 황갈색 털을 가진 아이들에게 인기.</li>
                        <li><strong>3위. 두부:</strong> 하얗고 순둥순둥한 성격을 기대하는 보호자들의 Pick.</li>
                    </ul>
                </div>
            </section>
        `
    },
    {
        part: 3,
        filename: 'pet-names-series-3.html',
        title: '[반려동물 이름의 기적 3탄] 2026년 고양이 이름 트렌드',
        h1: '[3탄] 2026년 고양이 이름 트렌드<br>— 신비로움과 우아함',
        desc: '반려동물 이름 10부작 제3탄! 고양이 특유의 신비롭고 우아한 매력을 극대화하는 2026년 최신 고양이 이름 트렌드를 소개합니다.',
        body: `
            <section class="intro">
                <p>고양이는 강아지와는 전혀 다른 독립적이고 신비로운 매력을 지닌 존재입니다. 그렇기에 고양이의 이름은 단순히 부르기 쉬운 것을 넘어, 그들의 고고한 자태와 우아한 성격을 표현하는 방향으로 발전해 왔습니다.</p>
            </section>
            <section class="body-content">
                <h2>✨ 신비로운 매력을 담은 이름들</h2>
                <h3>우주와 밤하늘의 언어</h3>
                <p>야행성이라는 특징과 신비로운 눈동자 색깔 때문에 '루나(Luna)', '스텔라(Stella)', '코스모(Cosmo)' 등 별과 우주를 뜻하는 이름들이 2026년 고양이 이름 트렌드 상위권을 차지하고 있습니다.</p>
                <div class="highlight-card">
                    <h3>💡 2026 고양이 이름 TOP 3</h3>
                    <ul>
                        <li><strong>1위. 루나(Luna):</strong> 은은하게 빛나는 달의 여신.</li>
                        <li><strong>2위. 레오(Leo):</strong> 용감하고 당당한 사자 같은 매력.</li>
                        <li><strong>3위. 모카(Mocha):</strong> 따뜻하고 부드러운 털색을 가진 아이를 위한 이름.</li>
                    </ul>
                </div>
            </section>
        `
    },
    {
        part: 4,
        filename: 'pet-names-series-4.html',
        title: '[반려동물 이름의 기적 4탄] 주인의 성격과 닮아가는 이름',
        h1: '[4탄] 주인의 성격과 꼭 닮아가는<br>반려견 이름의 심리학',
        desc: '반려동물 이름 10부작 제4탄! 보호자의 성향이 반려견의 이름 선택과 성격 형성에 미치는 놀라운 심리학적 연관성을 분석합니다.',
        body: `
            <section class="intro">
                <p>"강아지는 주인을 닮는다"는 흔한 말이 있습니다. 흥미롭게도 이는 외모뿐만 아니라 '이름'과 그로 인해 형성되는 '성격'에도 적용됩니다. 우리가 무의식적으로 선택한 이름은 우리의 성향과 기대를 투영하기 때문입니다.</p>
            </section>
            <section class="body-content">
                <h2>🧠 이름에 투영된 보호자의 심리</h2>
                <h3>에너지 레벨과 이름의 상관관계</h3>
                <p>활달하고 외향적인 보호자들은 '탄이', '번개', '제트'처럼 강렬하고 빠른 느낌의 이름을 선호합니다. 반면, 차분하고 내향적인 보호자들은 '마음', '고요', '하루' 등 평화로운 느낌의 이름을 선택하는 경향이 뚜렷하게 나타납니다.</p>
                <div class="highlight-card">
                    <h3>💡 투영 효과(Projection Effect)</h3>
                    <p>반려동물을 부르는 보호자의 목소리 톤과 태도는 이름의 어감에 따라 달라집니다. 활기찬 이름을 부를 때는 목소리가 높아지고, 차분한 이름을 부를 때는 나긋해집니다. 이 반복된 교감이 결국 아이의 성격에 영향을 미칩니다.</p>
                </div>
            </section>
        `
    },
    {
        part: 5,
        filename: 'pet-names-series-5.html',
        title: '[반려동물 이름의 기적 5탄] 분리불안을 줄이는 이름',
        h1: '[5탄] 분리불안을 줄여주는<br>안정감 있는 이름 짓기',
        desc: '반려동물 이름 10부작 제5탄! 분리불안을 겪는 반려동물에게 심리적 안정감을 주는 부드러운 주파수의 이름 짓는 방법을 알아봅니다.',
        body: `
            <section class="intro">
                <p>현대 사회에서 많은 반려동물들이 보호자와 떨어져 있을 때 극심한 스트레스를 받는 '분리불안'을 겪습니다. 훈련과 환경 조성도 중요하지만, 평소 불리는 '이름의 소리'가 아이의 신경계 안정에 영향을 미칠 수 있다는 사실을 아시나요?</p>
            </section>
            <section class="body-content">
                <h2>🌿 안정감을 주는 이름의 비밀</h2>
                <h3>부드러운 유음과 비음의 활용</h3>
                <p>강한 파열음(ㅋ, ㅌ)은 주의를 집중시키는 데 좋지만, 예민한 아이들에게는 지속적인 자극이 될 수 있습니다. 반면 'ㄴ', 'ㄹ', 'ㅁ'과 같은 부드러운 소리는 모성의 소리와 닮아있어 심리적 이완을 돕습니다.</p>
                <div class="highlight-card">
                    <h3>💡 추천하는 안정형 이름</h3>
                    <ul>
                        <li><strong>마일로(Milo):</strong> 부드러운 'ㅁ'과 'ㄹ'의 조화로 차분함을 유도합니다.</li>
                        <li><strong>노아(Noah):</strong> 위로와 안식을 뜻하는 평화로운 소리.</li>
                        <li><strong>온유:</strong> 따뜻하고 부드럽다는 의미 그대로의 부드러운 발음.</li>
                    </ul>
                </div>
            </section>
        `
    },
    {
        part: 6,
        filename: 'pet-names-series-6.html',
        title: '[반려동물 이름의 기적 6탄] 다견/다묘 가정 세트 이름',
        h1: '[6탄] 다견/다묘 가정을 위한<br>조화로운 세트 이름 가이드',
        desc: '반려동물 이름 10부작 제6탄! 둘 이상의 반려동물을 키우는 가정을 위해, 부르기 쉽고 혼동을 주지 않는 완벽한 세트 이름 짓기 팁을 제공합니다.',
        body: `
            <section class="intro">
                <p>한 마리보다 두 마리, 두 마리보다 세 마리가 주는 기쁨은 배가 됩니다. 하지만 아이들이 늘어날수록 이름을 짓는 고민도 커집니다. 통일성을 주면서도 각자가 자신의 이름을 헷갈리지 않게 하는 '세트 이름' 짓기의 법칙을 소개합니다.</p>
            </section>
            <section class="body-content">
                <h2>🧩 완벽한 세트 이름의 법칙</h2>
                <h3>모음을 다르게 설정하라</h3>
                <p>이름의 테마는 같아도, 아이들이 듣고 구분하는 '끝 모음'은 완전히 달라야 합니다. 그래야 두 아이를 동시에 불렀을 때 혼동하지 않습니다.</p>
                <div class="highlight-card">
                    <h3>💡 추천 세트 이름 테마</h3>
                    <ul>
                        <li><strong>날씨 테마:</strong> 구름(음) & 햇살(알) - 모음이 명확히 다름</li>
                        <li><strong>계절 테마:</strong> 봄(옴) & 가을(을) - 소리의 길이가 다름</li>
                        <li><strong>컬러 테마:</strong> 까미(이) & 베이지(지) - 발음의 악센트가 다름</li>
                    </ul>
                </div>
            </section>
        `
    },
    {
        part: 7,
        filename: 'pet-names-series-7.html',
        title: '[반려동물 이름의 기적 7탄] 귀여운 음식 이름 모음',
        h1: '[7탄] 먹을 것과 관련된<br>귀여운 이름들의 매력',
        desc: '반려동물 이름 10부작 제7탄! 호두, 자두, 모카 등 반려동물 이름으로 가장 많이 쓰이는 음식 관련 이름들의 숨겨진 매력과 이유를 파헤쳐봅니다.',
        body: `
            <section class="intro">
                <p>동물병원 대기실에 앉아있으면 유독 '먹을 것' 이름이 많이 들립니다. "땅콩아!", "치즈야!", "소금아!" 우리가 반려동물에게 음식 이름을 붙여주는 것은 단순한 유행일까요, 아니면 깊은 심리적 이유가 있을까요?</p>
            </section>
            <section class="body-content">
                <h2>🍩 음식 이름이 사랑받는 이유</h2>
                <h3>친근함과 귀여움의 극대화</h3>
                <p>음식은 인간의 삶에서 가장 긍정적이고 일상적인 경험을 제공합니다. 둥글둥글하고 작고 맛있는 음식의 이미지가 반려동물의 사랑스러운 외모와 겹쳐지면서, 부를 때마다 행복한 감정을 유발하는 효과가 있습니다.</p>
                <div class="highlight-card">
                    <h3>💡 컬러별 음식 이름 추천</h3>
                    <ul>
                        <li><strong>갈색/크림색:</strong> 보리, 호두, 모카, 쿠키, 인절미</li>
                        <li><strong>흰색:</strong> 두부, 소금, 설탕, 찐빵, 우유</li>
                        <li><strong>검은색/회색:</strong> 짜장, 후추, 까까, 흑임자</li>
                    </ul>
                </div>
            </section>
        `
    },
    {
        part: 8,
        filename: 'pet-names-series-8.html',
        title: '[반려동물 이름의 기적 8탄] 자연과 우주의 힐링 이름',
        h1: '[8탄] 별, 우주, 자연에서 영감을 받은<br>힐링 이름들',
        desc: '반려동물 이름 10부작 제8탄! 반려동물이 우리 삶에 주는 평화와 위로를 담아, 별과 우주, 그리고 대자연에서 따온 아름다운 이름들을 소개합니다.',
        body: `
            <section class="intro">
                <p>현대인들에게 반려동물은 삭막한 일상 속 작은 자연이자 안식처입니다. 그들이 주는 거대한 위로와 사랑에 보답하기 위해, 최근에는 대자연과 광활한 우주에서 모티브를 얻은 스케일 크고 아름다운 이름들이 주목받고 있습니다.</p>
            </section>
            <section class="body-content">
                <h2>🌌 자연과 우주를 품은 이름</h2>
                <h3>시공간을 넘어서는 영원한 유대감</h3>
                <p>별(Star)이나 우주(Cosmo)와 관련된 이름은 반려동물이 우리 삶에서 반짝이는 존재임을, 바다나 숲과 관련된 이름은 그들이 주는 평화로움을 상징합니다.</p>
                <div class="highlight-card">
                    <h3>💡 추천하는 자연/우주 테마 이름</h3>
                    <ul>
                        <li><strong>우주 테마:</strong> 오리온, 아폴로, 노바(Nova), 혜성</li>
                        <li><strong>날씨 테마:</strong> 윈디(Windy), 써니(Sunny), 하임(독일어로 집/안식처)</li>
                        <li><strong>꽃/식물 테마:</strong> 로지(Rosy), 릴리(Lily), 포레(Foret)</li>
                    </ul>
                </div>
            </section>
        `
    },
    {
        part: 9,
        filename: 'pet-names-series-9.html',
        title: '[반려동물 이름의 기적 9탄] 우아한 프랑스/이탈리아어 이름',
        h1: '[9탄] 글로벌 시대,<br>우아한 외국어 반려동물 이름',
        desc: '반려동물 이름 10부작 제9탄! 푸들, 비숑, 이탈리안 그레이하운드 등 특정 견종/묘종의 품격을 높여주는 고급스러운 프랑스어, 이탈리아어 이름을 알아봅니다.',
        body: `
            <section class="intro">
                <p>반려동물의 기원 국가나 특유의 우아한 외모에 맞춰 이국적인 이름을 지어주는 보호자들이 늘고 있습니다. 특히 낭만적인 프랑스어나 멜로디컬한 이탈리아어는 특유의 고급스러운 어감으로 아이의 매력을 돋보이게 합니다.</p>
            </section>
            <section class="body-content">
                <h2>🍷 품격을 더하는 외국어 이름</h2>
                <h3>견종과 어원의 완벽한 조화</h3>
                <p>프랑스 출신의 푸들이나 비숑에게는 프랑스어 이름을, 날렵한 이탈리안 그레이하운드에게는 이탈리아어 이름을 지어주면 그들만의 고유한 정체성이 더욱 살아납니다.</p>
                <div class="highlight-card">
                    <h3>💡 국가별 럭셔리 이름 추천</h3>
                    <ul>
                        <li><strong>프랑스어:</strong> 블랑(Blanc-흰색), 꼬맹(Gamin-장난꾸러기), 미뇽(Mignon-귀여운)</li>
                        <li><strong>이탈리아어:</strong> 벨라(Bella-아름다운), 비타(Vita-생명), 아모레(Amore-사랑)</li>
                        <li><strong>독일어:</strong> 프리츠(Fritz-평화로운 지배자), 하이디(Heidi-고귀한)</li>
                    </ul>
                </div>
            </section>
        `
    },
    {
        part: 10,
        filename: 'pet-names-series-10.html',
        title: '[반려동물 이름의 기적 10탄] 무지개다리를 건넌 아이를 위한 이름',
        h1: '[10탄] 영원한 기억,<br>무지개다리를 건넌 아이를 기리는 이름',
        desc: '반려동물 이름 10부작 제10탄! 이별의 슬픔을 넘어, 다시 만날 날을 기약하며 새롭게 입양한 아이에게 물려주는 운명적이고 영원한 이름에 대해 이야기합니다.',
        body: `
            <section class="intro">
                <p>언젠가 우리는 가장 사랑하는 털복숭이 친구를 무지개다리 너머로 떠나보내야 합니다. 하지만 그 아이가 우리 삶에 남긴 발자국은 결코 지워지지 않습니다. 시리즈의 마지막 편에서는 먼저 떠난 아이를 기리며, 새롭게 찾아온 인연에게 지어주는 특별한 이름들에 대해 이야기합니다.</p>
            </section>
            <section class="body-content">
                <h2>🌈 사랑은 이름으로 이어진다</h2>
                <h3>환생과 재회를 상징하는 이름</h3>
                <p>많은 보호자들이 떠난 아이의 이름과 비슷한 발음을 선택하거나, '다시', '기억', '영원'을 의미하는 단어를 새로운 가족의 이름으로 삼아 그 유대감을 영원히 이어갑니다.</p>
                <div class="highlight-card">
                    <h3>💡 영원한 사랑을 담은 이름</h3>
                    <ul>
                        <li><strong>리본(Reborn):</strong> 다시 태어나 내게 와주었다는 의미.</li>
                        <li><strong>메모리(Memory):</strong> 평생 너를 기억하겠다는 약속.</li>
                        <li><strong>돌림자 활용:</strong> 첫째가 '초코'였다면 둘째는 '초롱'으로 하여 소리의 연결고리를 만듦.</li>
                    </ul>
                </div>
            </section>
        `
    }
];

let indexHtml = fs.readFileSync(indexFile, 'utf8');
let sitemapXml = fs.readFileSync(sitemapFile, 'utf8');

// The place to inject new links in index.html is right after <div class="blog-list">
// The place to inject new links in sitemap is right before </urlset>

let newIndexLinks = '';
let newSitemapLinks = '';

posts.forEach(post => {
    // Generate HTML
    let content = template.replace(/\{\{TITLE\}\}/g, post.title)
                          .replace(/\{\{DESC\}\}/g, post.desc)
                          .replace(/\{\{H1_TITLE\}\}/g, post.h1)
                          .replace(/\{\{PART\}\}/g, post.part)
                          .replace(/\{\{BODY\}\}/g, post.body)
                          .replace(/\{\{FILENAME\}\}/g, post.filename);
    
    fs.writeFileSync(path.join(blogDir, post.filename), content);

    // Build Index Link
    newIndexLinks += `
        <a href="${post.filename}" class="blog-item">
            <div class="blog-thumb">
                <img src="pet-names-series-1.png" alt="반려동물 이름 시리즈 ${post.part}탄">
            </div>
            <div class="blog-item-body">
                <span class="blog-item-tag">🐾 반려동물 이름의 기적 ${post.part}탄</span>
                <h2 class="blog-item-title">${post.title}</h2>
                <p class="blog-item-excerpt">${post.desc}</p>
                <div class="blog-item-meta">2026년 4월 23일 · 읽기 약 8분</div>
            </div>
        </a>
`;

    // Build Sitemap Link
    newSitemapLinks += `    <url><loc>https://20260404ax.pages.dev/blog/${post.filename}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
});

// Update index.html
indexHtml = indexHtml.replace('<div class="blog-list">', '<div class="blog-list">\n' + newIndexLinks);
fs.writeFileSync(indexFile, indexHtml);

// Update sitemap.xml
sitemapXml = sitemapXml.replace('</urlset>', newSitemapLinks + '</urlset>');
fs.writeFileSync(sitemapFile, sitemapXml);

console.log("Generated all 9 files and updated index & sitemap.");
