function resizeCanvas(x, y) {
    var canvases = document.getElementsByClassName('signatureField');
    var canvas = canvases[0];

canvas.width = x;
canvas.height = y;
}

function applyMediaQuery() {

    var mediaQuery = window.matchMedia("(max-width: 725px)");

    // Check if the media query matches
    if (mediaQuery.matches) {
        // Apply new canvas size for small screens
        resizeCanvas(175, 90);
    } else {
        // Apply default canvas size for larger screens
        resizeCanvas(290, 100);
    }

    // Listen for media query changes
    mediaQuery.addEventListener('change', function(e) {
        if (e.matches) {
            resizeCanvas(175, 90); // Small screens
        } else {
            resizeCanvas(290, 100); // Larger screens
        }
    });
}

// Call the function to apply media queries on page load
applyMediaQuery();