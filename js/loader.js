function loadBase() {
    // Add loading class immediately
    document.body.classList.add('loading');
    
    fetch('base.html')
        .then(response => response.text())
        .then(data => {
            const tempDoc = new DOMParser().parseFromString(data, 'text/html');
            const originalContent = document.getElementById('originalContent');
            
            // Copy all head elements except script tags
            const head = tempDoc.head.cloneNode(true);
            const scripts = Array.from(head.getElementsByTagName('script'));
            scripts.forEach(script => script.remove());
            document.head.appendChild(head);
            
            if (originalContent) {
                tempDoc.getElementById('content').innerHTML = originalContent.innerHTML;
            }
            
            // Replace body content instead of entire HTML
            document.body.innerHTML = tempDoc.body.innerHTML;
            
            // Preserve page title
            document.title = originalContent.getAttribute('data-title') || 'Aster';
            
            // Remove loading class
            document.body.classList.remove('loading');
        });
}