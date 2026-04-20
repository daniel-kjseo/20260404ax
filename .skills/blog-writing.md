# QARAH 프리미엄 블로그 작성 스킬 (Blog Writing Skill)

이 스킬은 QARAH 브랜드의 정체성을 바탕으로, 세계 최고의 블로그 품질을 구현하기 위한 지침서입니다. 네이버와 티스토리의 상위 블로그 벤치마킹 데이터와 2026년 최신 AI 검색 최적화(AEO) 전략을 결합하여 설계되었습니다.

---

## 1. 벤치마킹 기반 하이브리드 전략

### [네이버 스타일: 시각적 몰입 및 사용자 신뢰]
- **경험형 도입부**: "지난주 저는 ~를 직접 겪으며..."와 같은 개인적이고 진실된 스토리텔링으로 독자의 흥미를 유발합니다.
- **정보 요약 섹션**: 본문 중간에 '한눈에 보는 핵심 요약' 박스를 배치하여 체류 시간을 늘리고 가독성을 확보합니다.
- **Q&A 구조 (AEO 대응)**: 검색 사용자의 질문 의도를 명확히 해결하는 Q&A 섹션을 반드시 포함합니다.

### [티스토리 스타일: 기술적 SEO 및 구조적 가독성]
- **시맨틱 HTML 구조**: `H1`(제목), `H2`(대분류), `H3`(소분류) 태그를 논리적으로 사용하여 검색 엔진이 글을 완벽히 이해하도록 돕습니다.
- **미니멀 디자인**: 여백의 미를 살리고 텍스트와 이미지의 비율을 조절하여 눈의 피로도를 낮춥니다.
- **구조화 데이터**: JSON-LD 및 Meta 태그를 통해 구글 및 AI 검색 결과에서 상위 노출을 노립니다.

---

## 2. 조사 프로토콜 (Research Protocol)

블로그 작성 전, 다음 데이터를 반드시 확보해야 합니다:
1. **어원 분석**: 대상 이름의 라틴어, 게르만어, 한자 등 고전적 기원 및 의미.
2. **문화적 배경**: 해당 이름이 서구권 또는 동양권에서 가지는 상징적 이미지.
3. **통계 데이터**: 2026년 기준 인기 순위, 빈도수 등 객관적 수치.
4. **리더십/성품 매칭**: 이름의 의미와 부합하는 긍정적인 성품이나 리더십 모델 연결.

---

## 3. 브랜드 정체성 및 보이스 (Tone & Voice)

- **핵심 가치**: 전문성(Expertise), 품격(Premium), 통찰력(Insight).
- **글쓰기 스타일**:
    - **Forbidden**: "개꿀", "ㅇㅇ", "대박" 등 비속어나 가벼운 온라인 말투.
    - **Preferred**: "~하는 경향이 있습니다", "~의 관점에서 분석해 봅니다", "품격 있는 선택" 등 정중하고 학구적인 말투.
- **감성적 연결**: 단순한 정보 전달을 넘어 이름에 담긴 '부름(Calling)'에 집중합니다.

---

## 4. 비주얼 표준 (Visual Excellence)

- **Hero Image**: `generate_image` 활용 시 "Minimalist, Premium, Deep Purple & Gold Palette, Cinematic Lighting" 키워드를 포함합니다.
- **정보 그래픽**: 복잡한 정보는 표(Table)나 강조 카드를 사용하여 시각화합니다.
- **이미지 배치**: 텍스트 500자당 1장 이상의 고품질 이미지를 배치하여 리듬감을 조절합니다.

---

## 5. 마스터 하이브리드 HTML 템플릿

```html
<article class="blog-post">
    <!-- Header: SEO Optimized -->
    <header class="post-header">
        <span class="category-tag">태그명</span>
        <h1>제목(H1) - 키워드 포함</h1>
        <div class="meta-info">날짜 | 작성자: QARAH 전문 분석팀</div>
    </header>

    <!-- Hero Image -->
    <div class="hero-container">
        <img src="hero-image.png" alt="이미지 설명">
    </div>

    <!-- Intro: Naver Style Storytelling -->
    <section class="intro">
        <p>경험 기반의 도입부 스토리텔링...</p>
    </section>

    <!-- Content: Tistory Style Semantic Structure -->
    <section class="body-content">
        <h2>소제목(H2) - 구조적 접근</h2>
        <p>상세 내용 분석...</p>
        
        <div class="highlight-card">
            <h3>핵심 인사이트(H3)</h3>
            <ul>
                <li>정보 1</li>
                <li>정보 2</li>
            </ul>
        </div>
    </section>

    <!-- Q&A (AEO Optimization) -->
    <section class="qa-section">
        <h2>자주 묻는 질문(FAQ)</h2>
        <div class="qa-item">
            <strong>Q: 독자가 궁금해할 질문?</strong>
            <p>A: AI 검색 엔진이 답변으로 가져갈 수 있는 명확한 해결책.</p>
        </div>
    </section>
</article>
```

---

## 6. SEO 및 배포(Launch) 체크리스트

1. [ ] Title 태그에 메인 키워드가 포함되었는가?
2. [ ] Meta Description이 160자 이내로 핵심을 담고 있는가?
3. [ ] 모든 이미지에 `alt` 태그가 달려 있는가?
4. [ ] `sitemap.xml`에 신규 경로가 추가되었는가?
5. [ ] 내부 링크(이름 추천 서비스로 연결)가 적절히 배치되었는가?
