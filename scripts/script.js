function resizeCanvas(x, y) {
    var canvases = document.getElementsByClassName('signatureField');
    var canvas = canvases[0];

canvas.width = x;
canvas.height = y;
}

function applyMediaQuery() {

    let mediaQuery = window.matchMedia("(max-width: 725px)");
    //let hideImg = window.matchMedia("(max-width: 433px)");
    // Check if the media query matches
    if (mediaQuery.matches) {
        // Apply new canvas size for small screens
        resizeCanvas(175, 90);
    } else {
        // Apply default canvas size for larger screens
        resizeCanvas(290, 100);
    }

    /*if(hideImg.matches){
        let headLeft =  document.getElementById("headLeft");
        let hedCenter = document.getElementById("headCenter")
        let hedRight = document.getElementById("headRight");

        headLeft.remove();
        hedRight.remove();
    }*/

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

//Popup code
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const modal = document.querySelector('.izjavaPopUp');


//event listener za close button v popupu
closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.izjavaPopUp'); //dobi prvi parrent z classom .izjavaPopUp
        closePopup(modal);
    })
});

function openPopup(){
    if(modal == null){
        console.log("here");
        return;
    }
    modal.classList.add('active'); // doda class .active
    overlay.classList.add('active');
}

function closePopup(modal){
    if(modal == null) return
    modal.classList.remove('active'); //izbirše .active class
    overlay.classList.remove('active');
}

//Input masks

