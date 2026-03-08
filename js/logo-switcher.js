// Logo switcher - alternates between original and AI logo on each page refresh
(function() {
    const logos = [
        'images/logo/japanika-logo-upgraded-transparent.png?v=1',  // AI version
        'images/logo/japanika-original-final.png?v=1'              // Original
    ];
    
    // Get current count from localStorage
    let count = parseInt(localStorage.getItem('logoSwitchCount') || '0');
    
    // Increment and save
    count = (count + 1) % logos.length;
    localStorage.setItem('logoSwitchCount', count);
    
    // Apply logo to all logo images on page
    document.addEventListener('DOMContentLoaded', function() {
        const logoImgs = document.querySelectorAll('.logo-image');
        logoImgs.forEach(img => {
            img.src = logos[count];
        });
    });
})();
