// Logo switcher - alternates between original and new logo on each page load
(function() {
    const logos = [
        'images/logo/japanika-logo-upgraded-transparent.png',  // New logo
        'images/logo/japanika-logo-original-clean.png'         // Original logo
    ];
    
    // Get current count from localStorage
    let count = parseInt(localStorage.getItem('logoSwitchCount') || '0');
    
    // Increment and save
    count = (count + 1) % logos.length;
    localStorage.setItem('logoSwitchCount', count);
    
    // Apply logo
    const logoImg = document.querySelector('.logo-image');
    if (logoImg) {
        logoImg.src = logos[count];
    }
})();
