/**
 * QARAH — Shared Components
 * Consistent layout helpers for QARAH pages
 */

const navbarHTML = `
    <nav class="nav">
        <div class="nav-inner">
            <a href="/index.html" class="nav-brand"><span>QARAH</span></a>
            <ul class="nav-links" id="navLinks">
                <li><a href="/index.html#tests" data-i18n="nav.test">이름추천</a></li>
                <li><a href="/ranking.html" data-i18n="nav.ranking">🏆 순위</a></li>
                <li><a href="/blog/index.html" data-i18n="nav.blog">블로그</a></li>
                <li><a href="/about.html" data-i18n="nav.about">소개</a></li>
            </ul>
            <button class="nav-hamburger" id="navHamburger" aria-label="메뉴">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
`;

const footerHTML = `
    <footer class="footer">
        <div class="container">
            <ul class="footer-links">
                <li><a href="/index.html#tests" data-i18n="nav.test">이름추천</a></li>
                <li><a href="/blog/index.html" data-i18n="nav.blog">블로그</a></li>
                <li><a href="/about.html" data-i18n="footer.about">소개</a></li>
                <li><a href="/privacy.html" data-i18n="footer.privacy">개인정보처리방침</a></li>
                <li><a href="/terms.html" data-i18n="footer.terms">이용약관</a></li>
                <li><a href="/contact.html" data-i18n="footer.contact">문의</a></li>
            </ul>
            <p class="footer-disclaimer" data-i18n="footer.copyright">© 2026 QARAH. 모든 이름에는 부름이 있습니다.</p>
        </div>
    </footer>
`;

export function syncLayout() {
    // Inject Navbar if not present
    let nav = document.querySelector('.nav');
    if (!nav) {
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }

    // Inject Footer if not present
    let footer = document.querySelector('.footer');
    if (!footer) {
        const container = document.querySelector('.container') || document.body;
        container.insertAdjacentHTML('beforeend', footerHTML);
    }

    // Hamburger menu toggle
    document.getElementById('navHamburger')?.addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('open');
    });
}
