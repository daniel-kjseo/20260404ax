// Theme Switch Logic
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleSwitch.checked = false;
    }
}

applyTheme(currentTheme);

function switchTheme(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    applyTheme(theme);
    localStorage.setItem('theme', theme);
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Newsletter Form Submission (Mock)
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        alert(`Thank you for subscribing with: ${email}`);
        e.target.reset();
    });
}

// Mock Ad Impression Tracker
function trackAdImpression(slotName) {
    console.log(`Ad impression tracked for: ${slotName}`);
}

// Initialize "Ads"
document.querySelectorAll('.ad-slot').forEach(slot => {
    const slotName = slot.classList[1];
    trackAdImpression(slotName);
});
