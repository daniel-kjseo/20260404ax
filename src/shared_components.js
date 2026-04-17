/**
 * Shared Components for Consistent Layout across all pages
 */

const navbarHTML = `
    <nav class="navbar">
        <a href="/" class="nav-logo">K-Idol AI</a>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/blog/">Blog</a>
            <a href="/about.html">About</a>
            <a href="/contact.html">Contact</a>
        </div>
    </nav>
`;

const footerHTML = `
    <footer>
        <p>&copy; 2026 K-Idol Face Test. All rights reserved.</p>
        <div class="footer-links" style="margin-top: 10px; display: flex; justify-content: center; gap: 15px;">
            <a href="/about.html" class="footer-link">About Us</a>
            <a href="/privacy.html" class="footer-link">Privacy Policy</a>
            <a href="/terms.html" class="footer-link">Terms of Service</a>
        </div>
    </footer>
`;

export function syncLayout() {
    // Inject Navbar if not present or to ensure consistency
    let nav = document.querySelector('.navbar');
    if (!nav) {
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    } else {
        nav.outerHTML = navbarHTML;
    }

    // Inject Footer if not present
    let footer = document.querySelector('footer');
    if (!footer) {
        const container = document.querySelector('.container') || document.body;
        container.insertAdjacentHTML('beforeend', footerHTML);
    } else {
        footer.outerHTML = footerHTML;
    }
}
