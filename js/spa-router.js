// SPA Router - keeps header static, loads content dynamically
(function() {
    const contentContainer = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link[href$=".html"]');
    
    // Intercept navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip external links and current page
            if (!href || href.startsWith('http') || href === '#') {
                return;
            }
            
            e.preventDefault();
            loadPage(href);
            
            // Update URL without page reload
            history.pushState({page: href}, '', href);
        });
    });
    
    // Handle back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            loadPage(e.state.page);
        }
    });
    
    // Load page content dynamically
    async function loadPage(url) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            
            // Parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract main content (everything after nav)
            const newContent = doc.querySelector('#main-content') || doc.querySelector('main') || doc.body;
            
            // Replace content
            if (contentContainer && newContent) {
                contentContainer.innerHTML = newContent.innerHTML;
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                // Update active nav link
                updateActiveLink(url);
            }
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }
    
    function updateActiveLink(url) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === url) {
                link.classList.add('active');
            }
        });
    }
})();
