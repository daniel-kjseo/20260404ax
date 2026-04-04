// Map Initialization
const map = L.map('map').setView([20, 0], 2);

const lightTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

// Population Data (Major Cities)
const cities = [
    { name: "Tokyo", coords: [35.6895, 139.6917], pop: "37M" },
    { name: "Delhi", coords: [28.6139, 77.2090], pop: "31M" },
    { name: "Shanghai", coords: [31.2304, 121.4737], pop: "27M" },
    { name: "Sao Paulo", coords: [-23.5505, -46.6333], pop: "22M" },
    { name: "Mexico City", coords: [19.4326, -99.1332], pop: "21M" },
    { name: "Cairo", coords: [30.0444, 31.2357], pop: "20M" },
    { name: "Mumbai", coords: [19.0760, 72.8777], pop: "20M" },
    { name: "Beijing", coords: [39.9042, 116.4074], pop: "20M" },
    { name: "Dhaka", coords: [23.8103, 90.4125], pop: "20M" },
    { name: "Osaka", coords: [34.6937, 135.5023], pop: "19M" },
    { name: "New York", coords: [40.7128, -74.0060], pop: "18M" },
    { name: "Seoul", coords: [37.5665, 126.9780], pop: "10M" }
];

// Cat Icon using Emoji
const catIcon = L.divIcon({
    html: '<div class="cat-icon">🐱</div>',
    className: 'custom-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// Add Markers
cities.forEach(city => {
    L.marker(city.coords, { icon: catIcon })
        .addTo(map)
        .bindPopup(`<b>${city.name}</b><br>Population: ~${city.pop}`);
});

// Theme Switch Logic
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        map.removeLayer(lightTiles);
        darkTiles.addTo(map);
        toggleSwitch.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        map.removeLayer(darkTiles);
        lightTiles.addTo(map);
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
