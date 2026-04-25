/**
 * QARAH — i18n Module
 * Supported languages: ko (Korean), en (English), ja (Japanese)
 */

const SUPPORTED = ['ko', 'en', 'ja'];
const STORAGE_KEY = 'qarah_lang';
const DEFAULT_LANG = 'ko';

let _lang = DEFAULT_LANG;
let _strings = {};

/** Resolve base path for JSON fetch based on current URL depth */
function basePath() {
    const p = location.pathname;
    if (p.includes('/test/') || p.includes('/blog/')) return '../';
    return './';
}

/** Detect language: localStorage → browser → default */
function detectLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const browser = (navigator.language || '').split('-')[0].toLowerCase();
    if (SUPPORTED.includes(browser)) return browser;
    return DEFAULT_LANG;
}

/** Fetch translation JSON */
async function loadStrings(lang) {
    const url = `${basePath()}i18n/${lang}.json`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`i18n: ${lang} load failed (${resp.status})`);
    return resp.json();
}

/** Apply strings to [data-i18n] / [data-i18n-placeholder] / [data-i18n-aria] elements */
function applyStrings() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const v = _strings[el.dataset.i18n];
        if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const v = _strings[el.dataset.i18nPlaceholder];
        if (v !== undefined) el.placeholder = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const v = _strings[el.dataset.i18nAria];
        if (v !== undefined) el.setAttribute('aria-label', v);
    });
    document.documentElement.lang = _lang;
}

/** Inject language switcher button into .nav-inner */
function injectLangSwitcher() {
    const navInner = document.querySelector('.nav-inner');
    if (!navInner || document.getElementById('langSwitcher')) return;

    const sw = document.createElement('div');
    sw.id = 'langSwitcher';
    sw.className = 'lang-switcher';
    sw.innerHTML = `
        <button class="lang-btn" id="langBtn" aria-label="Language / 언어 / 言語">
            <span class="lang-globe">🌐</span>
            <span class="lang-current" id="langCurrent">${_lang.toUpperCase()}</span>
        </button>
        <div class="lang-dropdown" id="langDropdown">
            <button class="lang-option${_lang==='ko'?' active':''}" data-lang="ko">🇰🇷 한국어</button>
            <button class="lang-option${_lang==='en'?' active':''}" data-lang="en">🇺🇸 English</button>
            <button class="lang-option${_lang==='ja'?' active':''}" data-lang="ja">🇯🇵 日本語</button>
        </div>`;
    navInner.appendChild(sw);

    document.getElementById('langBtn').addEventListener('click', e => {
        e.stopPropagation();
        document.getElementById('langDropdown').classList.toggle('open');
    });
    document.addEventListener('click', () => {
        document.getElementById('langDropdown')?.classList.remove('open');
    });
    sw.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => setLanguage(opt.dataset.lang));
    });
}

/** Switch language, persist, re-apply */
export async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    _lang = lang;
    try {
        _strings = await loadStrings(lang);
    } catch (e) {
        console.warn('i18n: setLanguage load failed', e);
    }
    applyStrings();
    // Update switcher UI
    document.querySelectorAll('.lang-option').forEach(o => {
        o.classList.toggle('active', o.dataset.lang === lang);
    });
    const cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = lang.toUpperCase();
    document.getElementById('langDropdown')?.classList.remove('open');
}

/** Initialize on page load — call once */
export async function initI18n() {
    _lang = detectLanguage();
    try {
        _strings = await loadStrings(_lang);
    } catch (e) {
        console.warn('i18n: init failed, using defaults', e);
        _strings = {};
    }
    applyStrings();
    injectLangSwitcher();
}

/**
 * Translate a key with optional variable substitution.
 * e.g. t('tweet.text', { name: '서윤', impression: '별빛형' })
 */
export function t(key, vars = {}) {
    let str = _strings[key] ?? key;
    for (const [k, v] of Object.entries(vars)) {
        str = str.replaceAll(`{${k}}`, v);
    }
    return str;
}

/** Return current active language code */
export function getCurrentLang() {
    return _lang;
}
