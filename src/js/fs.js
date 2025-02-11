function showProxyWarning() {
    if (!localStorage.getItem('proxyWarningAccepted')) {
        const consent = confirm("Warning: This is a web proxy service. I am not responsible for how you use this service. By clicking 'OK', you acknowledge and accept full responsibility for your actions.");
        if (consent) {
            localStorage.setItem('proxyWarningAccepted', 'true');
        }
        return consent;
    }
    return true;
}

function toggleFullscreen() {
    if (showProxyWarning()) {
        const iframe = document.getElementById('proxyFrame');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { 
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { 
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { 
            iframe.msRequestFullscreen();
        }
    }
}

// Show warning when page loads
document.addEventListener('DOMContentLoaded', showProxyWarning);