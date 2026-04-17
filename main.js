/**
 * Entry Point: Main Application Initialization
 */
import { initUI } from './src/ui_controller.js';
import { syncLayout } from './src/shared_components.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("K-Idol AI Face Test initializing...");
    
    // Sync shared layout components (Navbar, Footer)
    syncLayout();

    // Initialize UI and Application Logic
    initUI();
});
