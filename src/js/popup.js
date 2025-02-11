document.getElementById('open-settings').addEventListener('click', function() {
    var gears = document.getElementById('settings');
    if (gears.classList.contains('visible')) {
        gears.classList.remove('visible');
    } else {
        gears.classList.add('visible');
    }
});