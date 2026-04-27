# QARAH 티스토리 상위 노출 블로그 작성 스킬 (Blog Writing Skill v2)

이 스킬은 **티스토리 (Tistory) 기반 검색엔진 최적화(SEO) 및 조회수 상위 5개 블로그의 핵심 성공 공식**을 벤치마킹하여 설계된 새로운 블로그 작성 지침서입니다. 구글(Google)과 다음과 같은 검색 엔진에서 지속적인 트래픽을 창출하고, 체류 시간을 늘리며, 궁극적으로 수익(AdSense 등) 및 전환율을 극대화하는 것을 목표로 합니다.

---

## 1. 상위 5% 티스토리 블로그의 핵심 전략 (Benchmarking)

### [검색 엔진 최적화 (Technical SEO)]
- **시맨틱 구조의 철저한 준수**: 본문 내 `H1`은 절대 사용하지 않습니다 (보통 블로그 스킨에서 글 제목을 H1으로 사용하므로 중복 방지). 본문은 `H2`로 시작하여 `H3`, `H4`로 내려가는 완벽한 계층 구조를 갖춥니다.
- **체류 시간 극대화 (TOC)**: 글의 서두에 반드시 **목차(Table of Contents)**를 제공하여 독자가 원하는 정보로 바로 이동할 수 있게 하고, 이탈률(Bounce Rate)을 낮춥니다.
- **이미지 최적화 및 실사 생성**: 이미지 용량을 최소화(WebP 등 권장)하고, `alt` 속성을 기입하여 검색 트래픽을 확보합니다. 특히 이미지를 AI로 생성할 때는 인위적인 느낌을 배제하고, 실제 카메라로 촬영한 것 같은 **초고화질 실사판(Photorealistic)**으로 생성해야 합니다. (가능한 경우 최신 ChatGPT 이미지 모델을 적극 활용)

### [가독성 및 스니펫 (Featured Snippets) 최적화]
- **두괄식 정보 제공**: 서론은 3~4줄 이내로 짧게 작성하며, 독자가 검색한 핵심 답변을 첫 번째 `H2` 바로 아래에 배치하여 구글 추천 스니펫(Featured Snippet)에 선정되도록 유도합니다.
- **여백과 시각적 휴식**: 텍스트 덩어리를 피하고, 2~3문장마다 줄바꿈을 합니다. 중요한 문장은 **볼드체** 또는 색상 배경(하이라이트 박스)으로 처리하여 속독하는 독자의 시선을 잡아둡니다.

---

## 2. 콘텐츠 구성 프로토콜 (Content Protocol)

티스토리 상위 노출 블로그는 다음 순서를 엄격히 따릅니다:

1. **매력적인 제목 (Title)**: [메인 키워드] + [서브 키워드] + [호기심 유발 수식어] (예: "2026년 유행하는 강아지 이름 TOP 5 (feat. 부르기 쉬운 이름)")
2. **도입부 (Intro)**: 독자의 문제에 공감하고, 이 글을 읽으면 얻을 수 있는 이점을 명확히 제시 (3문장 이내).
3. **목차 (TOC)**: 본문의 H2 제목들을 리스트 형태로 제공.
4. **본문 (Body)**: 
   - 정보의 나열보다는 '비교', '장단점', '순위' 형태의 구조화된 데이터 제공.
   - 단락 사이사이에 광고가 들어갈 수 있는 충분한 텍스트 분량 확보.
5. **결론 및 요약 (Outro/Summary)**: 글의 핵심을 3줄로 요약하고, 다음 글로 넘어갈 수 있는 내부 링크(Internal Link) 삽입.

---

## 3. 브랜드 정체성 (Tone & Manner)

- **휴먼 터치 (Human-Like)**: 기계적으로 AI가 생성한 텍스트라는 느낌이 전혀 들지 않도록, 실제 사람이 직접 경험하고 깊이 고민하여 작성한 것처럼 완벽하게 자연스러운 문맥과 어조를 유지해야 합니다.
- **전문가적 신뢰감**: 감정적인 표현보다는 객관적 사실, 통계, 연구 결과를 바탕으로 서술합니다.
- **문체**: "~합니다", "~습니다"의 깔끔하고 정중한 문체를 사용하며, 군더더기 없는 간결한 문장(단문 위주)을 지향합니다.
- **모바일 친화적 (편안한 가독성)**: 전체 트래픽의 80% 이상이 모바일에서 발생함을 인지하고, 스마트폰으로 블로그를 읽을 때 눈이 편안하고 자연스럽게 술술 읽히도록 문단과 여백을 꼼꼼하게 구성합니다.

---

## 4. 마스터 티스토리 HTML 템플릿

```html
<article class="tistory-post-container">
    <!-- 목차 (Table of Contents) -->
    <div class="toc-box" style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <p style="font-weight: bold; margin-bottom: 10px;">목차</p>
        <ul style="list-style-type: decimal; padding-left: 20px;">
            <li><a href="#section1">핵심 주제 1 (키워드 포함)</a></li>
            <li><a href="#section2">핵심 주제 2 (키워드 포함)</a></li>
            <li><a href="#section3">요약 및 결론</a></li>
        </ul>
    </div>

    <!-- 도입부 -->
    <section class="intro-section" style="margin-bottom: 40px;">
        <p>독자의 고민을 해결해 줄 핵심 답변과 이 글을 끝까지 읽어야 하는 이유를 2~3줄로 짧게 작성합니다.</p>
    </section>

    <!-- 본문 섹션 1 -->
    <section id="section1" class="content-section" style="margin-bottom: 50px;">
        <h2 style="border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">1. 대주제 (H2) - 키워드 배치</h2>
        <p>관련된 구체적인 정보를 제공합니다. 모바일 가독성을 위해 단락은 짧게 유지합니다.</p>
        
        <h3 style="margin-top: 30px; margin-bottom: 15px; color: #444;">1.1 소주제 (H3)</h3>
        <p>상세 설명...</p>
        
        <!-- 정보 강조 박스 -->
        <div class="info-box" style="background-color: #eef2f5; border-left: 4px solid #0056b3; padding: 15px; margin: 20px 0;">
            <strong>💡 핵심 포인트:</strong> 바쁜 독자를 위해 가장 중요한 정보를 요약합니다.
        </div>
    </section>

    <!-- 결론 및 내부 링크 -->
    <section id="section3" class="outro-section">
        <h2 style="border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">3. 요약 및 결론</h2>
        <p>전체 내용을 3줄 이내로 깔끔하게 요약합니다.</p>
        
        <div class="internal-link-box" style="text-align: center; margin-top: 40px; padding: 20px; border: 1px solid #ddd;">
            <p><strong>더 읽어보기:</strong></p>
            <a href="/blog/related-post.html" style="color: #0056b3; text-decoration: none;">다음 읽을거리 제목(내부 링크)</a>
        </div>
    </section>
</article>
```

---

## 5. 티스토리 발행 전 최종 체크리스트 (Pre-Flight Check)

1. [ ] 글 제목에 메인 키워드가 좌측에 치우쳐 배치되었는가? (예: "키워드 - 설명" 형식)
2. [ ] 본문 첫 문단에 타겟 키워드가 자연스럽게 포함되었는가?
3. [ ] 제목 구조가 `H2` -> `H3` 순서로 올바르게 중첩되었는가? (`H1` 사용 금지)
4. [ ] 사용된 이미지에 `alt="설명과 키워드"` 속성이 부여되었고, 일러스트가 아닌 **실사판(실제 사진 같은)**으로 생성되었는가?
5. [ ] 스마트폰으로 읽기에 편안하고 자연스럽도록 문단이 짧게(2~3문장) 나뉘어 있는가?
6. [ ] 글의 체류 시간을 늘리기 위한 시각적 요소(강조 박스, 리스트, 볼드체)가 적절히 사용되었는가?
7. [ ] **[자체 검수 철저]** 블로그 텍스트가 기계적이거나 어색하지 않고, 100% 사람이 직접 작성한 것처럼 완벽하게 자연스러운가? (AI 생성 느낌이 나면 전면 수정할 것)
