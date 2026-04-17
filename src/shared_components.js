/**
 * Shared Components for Consistent Layout across all pages
 */

const navbarHTML = `
    <nav class="navbar">
        <a href="/index.html" class="nav-logo">IDOL AGENCY</a>
        <div class="language-selector">
            <button id="lang-en" class="lang-btn active">EN</button>
            <button id="lang-ko" class="lang-btn">KO</button>
        </div>
    </nav>
`;

const footerHTML = `
    <footer style="margin-top: 60px; padding-top: 30px; border-top: 1px solid var(--border-dim); text-align: center;">
        <p style="color: var(--text-muted); font-size: 0.8rem;">&copy; 2026 IDOL AGENCY. All rights reserved.</p>
        <div class="footer-links" style="margin-top: 10px; display: flex; justify-content: center; gap: 15px; font-size: 0.8rem;">
            <a href="/index.html" style="text-decoration: none; color: var(--text-muted);">Home</a>
            <a href="/about.html" style="text-decoration: none; color: var(--text-muted);">About Us</a>
            <a href="/privacy.html" style="text-decoration: none; color: var(--text-muted);">Privacy Policy</a>
            <a href="/terms.html" style="text-decoration: none; color: var(--text-muted);">Terms of Service</a>
            <a href="/contact.html" style="text-decoration: none; color: var(--text-muted);">Contact</a>
        </div>
    </footer>
`;

export function syncLayout() {
    // Inject Navbar if not present or to ensure consistency
    let nav = document.querySelector('.navbar');
    // If it's already there and has IDOL AGENCY branding, we might skip to avoid breaking dynamic listeners
    // But since main.js calls syncLayout THEN initUI, it's safer to just set it once.
    if (!nav) {
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    } else if (!nav.innerHTML.includes('IDOL AGENCY')) {
        nav.outerHTML = navbarHTML;
    }

    // Inject Footer if not present or old
    let footer = document.querySelector('footer');
    if (!footer) {
        const container = document.querySelector('.container') || document.body;
        container.insertAdjacentHTML('beforeend', footerHTML);
    } else if (!footer.innerHTML.includes('IDOL AGENCY')) {
        footer.outerHTML = footerHTML;
    }
}
