/**
 * QARAH — Test Page Common Logic
 * 모든 테스트 페이지에서 공유하는 로직
 */
import { preloadModels, analyzeFace } from './face-analyzer.js';
import { determineImpression } from './impression-engine.js';
import { determineEmotion } from './emotion-engine.js';
import { matchNames } from './name-matcher.js';

/**
 * 테스트 페이지 초기화
 * @param {Object} config
 * @param {Object} config.nameDB — 이름 데이터베이스
 * @param {string} config.lang — 'ko' 또는 'en'
 * @param {Function} config.createCardContent — (nameData, index) => HTML string
 */
export function initTestPage(config) {
    const { nameDB, lang = 'ko', createCardContent } = config;

    // DOM
    const phaseSetup = document.getElementById('phase-setup');
    const phaseCountdown = document.getElementById('phase-countdown');
    const phaseResult = document.getElementById('phase-result');
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const cameraInput = document.getElementById('cameraInput');
    const countdownPhoto = document.getElementById('countdownPhoto');
    const countdownContainer = document.getElementById('countdownContainer');
    const countdownOverlay = document.getElementById('countdownOverlay');
    const nameCardsContainer = document.getElementById('nameCardsContainer');

    let selectedGender = 'female';

    // Model preload
    preloadModels('../models').catch(err => console.warn('Model preload:', err));

    // Gender
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedGender = btn.dataset.gender;
        });
    });

    // Upload handlers
    document.getElementById('btnUpload').addEventListener('click', (e) => {
        e.stopPropagation(); e.preventDefault(); fileInput.click();
    });
    document.getElementById('btnCamera').addEventListener('click', (e) => {
        e.stopPropagation(); e.preventDefault(); cameraInput.click();
    });
    uploadZone.addEventListener('click', (e) => {
        if (e.target.closest('.upload-buttons')) return;
        fileInput.click();
    });

    uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('dragover'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault(); uploadZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });
    cameraInput.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });

    // Main flow
    async function handleFile(file) {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = async (e) => {
            countdownPhoto.src = e.target.result;
            phaseSetup.classList.add('hidden');
            phaseCountdown.classList.remove('hidden');

            const img = new Image();
            img.src = e.target.result;
            img.onload = async () => {
                const [traits] = await Promise.all([
                    analyzeFace(img).catch(() => null),
                    runCountdown()
                ]);

                if (!traits) {
                    alert(lang === 'ko' ? '얼굴을 찾을 수 없습니다. 다른 사진을 사용해 주세요.' : 'No face detected. Please try another photo.');
                    resetToSetup(); return;
                }

                const impression = determineImpression(traits);
                const emotion = determineEmotion(traits.expressions);
                const names = matchNames(impression.type, emotion.type, selectedGender, nameDB, impression.score);
                showResult(impression, emotion, names);
            };
        };
        reader.readAsDataURL(file);
    }

    // Countdown
    async function runCountdown() {
        for (let i = 0; i < 5; i++) {
            const num = 5 - i;
            countdownOverlay.className = 'countdown-overlay phase-' + num;
            const el = document.createElement('div');
            el.className = `countdown-number size-80 anim-${num}`;
            el.textContent = num;
            countdownContainer.appendChild(el);
            if (num <= 3 && num > 1) countdownContainer.classList.add('shake');
            if (num === 1) { countdownContainer.classList.remove('shake'); countdownContainer.classList.add('intense-shake'); }
            if (navigator.vibrate) navigator.vibrate(50 + i * 30);
            await delay(num === 1 ? 500 : 1000);
            el.remove();
        }
        countdownContainer.classList.remove('shake', 'intense-shake');
        const flash = document.createElement('div');
        flash.className = 'flash-overlay';
        countdownContainer.appendChild(flash);
        await delay(600);
        flash.remove();
    }

    // Show result
    function showResult(impression, emotion, names) {
        phaseCountdown.classList.add('hidden');
        phaseResult.classList.remove('hidden');

        const useEn = lang === 'en';
        document.getElementById('impressionEmoji').textContent = impression.emoji;
        document.getElementById('impressionType').textContent = useEn ? impression.labelEn : impression.label;
        document.getElementById('impressionDesc').textContent = useEn ? impression.descEn : impression.desc;

        const traitsContainer = document.getElementById('impressionTraits');
        traitsContainer.innerHTML = '';
        (useEn ? impression.traitsEn : impression.traits).forEach(trait => {
            const span = document.createElement('span');
            span.className = 'impression-trait';
            span.textContent = trait;
            traitsContainer.appendChild(span);
        });

        // Emotion badge
        const emotionBadge = document.getElementById('emotionBadge');
        if (emotionBadge) {
            const emoEmoji = document.getElementById('emotionEmoji');
            const emoType = document.getElementById('emotionType');
            const emoDesc = document.getElementById('emotionDesc');
            const emoTraits = document.getElementById('emotionTraits');
            if (emoEmoji) emoEmoji.textContent = emotion.emoji;
            if (emoType) emoType.textContent = useEn ? emotion.labelEn : emotion.label;
            if (emoDesc) emoDesc.textContent = useEn ? emotion.descEn : emotion.desc;
            if (emoTraits) {
                emoTraits.innerHTML = '';
                (useEn ? emotion.traitsEn : emotion.traits).forEach(trait => {
                    const span = document.createElement('span');
                    span.className = 'impression-trait';
                    span.textContent = trait;
                    emoTraits.appendChild(span);
                });
            }
        }

        nameCardsContainer.innerHTML = '';
        names.forEach((nameData, index) => {
            const card = createCard(nameData, index);
            nameCardsContainer.appendChild(card);
            setTimeout(() => {
                const bar = card.querySelector('.score-bar-fill');
                if (bar) bar.style.width = nameData.score + '%';
            }, index === 0 ? 500 : 1500 + index * 1000);
        });

        setTimeout(() => {
            const first = nameCardsContainer.querySelector('.card-legendary, .card-epic');
            if (first) createParticles(first, 15);
        }, 800);

        phaseResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function createCard(nameData, index) {
        const { rank, name, meaning, score, rarity } = nameData;
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';

        const card = document.createElement('div');
        card.className = `glass-card card-${rarity.tier}`;
        card.classList.add('card-reveal');
        if (index > 0) card.classList.add(`card-reveal-delay-${index}`);

        if (index === 0) {
            const burst = document.createElement('div');
            burst.className = 'light-burst';
            wrapper.appendChild(burst);
        }

        const medals = ['🥇', '🥈', '🥉'];
        const scoreLabel = lang === 'ko' ? '적합도' : 'Match';
        const rankLabel = lang === 'ko' ? `${rank}위` : `#${rank}`;

        // Use custom content generator if provided, otherwise default
        if (createCardContent) {
            card.innerHTML = createCardContent(nameData, index, medals, scoreLabel, rankLabel);
        } else {
            const extra = nameData.hanja ? `<div class="hanja-text">${nameData.hanja}</div>` : '';
            const detail = nameData.hanjaDetail
                ? `<div class="name-detail">${nameData.hanjaDetail.first}<br>${nameData.hanjaDetail.second}</div>`
                : (nameData.origin ? `<div class="name-detail">Origin: ${nameData.origin}</div>` : '');

            card.innerHTML = `
                <div style="text-align: center;">
                    <span class="rarity-badge ${rarity.tier}">${rarity.stars} ${rarity.label}</span>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">${medals[index]} ${rankLabel}</p>
                    <div class="name-text">${name}</div>
                    ${extra}
                    <p class="name-meaning">"${meaning}"</p>
                    <div class="score-bar"><div class="score-bar-fill ${rarity.tier}" style="width: 0%;"></div></div>
                    <p class="score-text ${rarity.tier}">${scoreLabel} ${score}%</p>
                    ${detail}
                </div>
            `;
        }

        wrapper.appendChild(card);
        return wrapper;
    }

    function createParticles(container, count = 20) {
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'particle';
            p.textContent = ['✦','✧','⭐','✨','💫'][i % 5];
            p.style.setProperty('--x', `${(Math.random()-0.5)*200}px`);
            p.style.setProperty('--y', `${(Math.random()-0.5)*200}px`);
            p.style.animationDelay = `${Math.random()*0.5}s`;
            p.style.animationDuration = `${0.8+Math.random()*0.5}s`;
            container.appendChild(p);
            setTimeout(() => p.remove(), 1500);
        }
    }

    // Share
    document.getElementById('shareX')?.addEventListener('click', () => {
        const n = nameCardsContainer.querySelector('.name-text');
        const t = document.getElementById('impressionType').textContent;
        const e = document.getElementById('emotionType')?.textContent || '';
        const text = lang === 'ko'
            ? `내 인상에 어울리는 이름은 '${n?.textContent}'이래! 인상: ${t}, 감정: ${e} #QARAH #이름추천`
            : `My impression is "${t}" with "${e}" energy. QARAH recommends "${n?.textContent}" for me! #QARAH`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(location.href)}`, '_blank');
    });

    document.getElementById('shareCopy')?.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(location.href);
            const b = document.getElementById('shareCopy');
            const orig = b.textContent;
            b.textContent = '✅ 복사됨!';
            setTimeout(() => b.textContent = orig, 2000);
        } catch(e) { prompt('링크를 복사해주세요:', location.href); }
    });

    document.getElementById('shareDownload')?.addEventListener('click', () => {
        alert(lang === 'ko' ? '카드 저장 기능 준비 중입니다!' : 'Card download coming soon!');
    });

    // Retry
    document.getElementById('btnRetry')?.addEventListener('click', resetToSetup);

    function resetToSetup() {
        phaseResult.classList.add('hidden');
        phaseCountdown.classList.add('hidden');
        phaseSetup.classList.remove('hidden');
        fileInput.value = ''; cameraInput.value = '';
        nameCardsContainer.innerHTML = '';
        countdownOverlay.className = 'countdown-overlay';
    }

    // Nav
    document.getElementById('navHamburger')?.addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('open');
    });
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
