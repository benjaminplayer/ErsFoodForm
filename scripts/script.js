function resizeCanvas(x, y) {
    var canvases = document.getElementsByClassName('signatureField');
    var canvas = canvases[0];

    canvas.width = x;
    canvas.height = y;
}

// Call the function to apply media queries on page load
applyMediaQuery();
function applyMediaQuery() {

    let mediaQuery = window.matchMedia("(max-width: 725px)");
    // Check if the media query matches
    if (mediaQuery.matches) {
        // Apply new canvas size for small screens
        resizeCanvas(175, 90);
    } else {
        // Apply default canvas size for larger screens
        resizeCanvas(290, 100);
    }
    // Listen for media query changes
    mediaQuery.addEventListener('change', function (e) {
        if (e.matches) {
            resizeCanvas(175, 90); // Small screens
        } else {
            resizeCanvas(290, 100); // Larger screens
        }
    });
}

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

function openPopup() {
    if (modal == null) {
        console.log("here");
        return;
    }
    modal.classList.add('active'); // doda class .active
    overlay.classList.add('active');
}

function closePopup(modal) {
    if (modal == null) return
    modal.classList.remove('active'); //izbirše .active class
    overlay.classList.remove('active');
}

//Input masks

document.getElementById('emsoin').addEventListener("input", function (e) {
    const value = e.target.value.replace(/\D/g, ''); //odstrani vse znake ki niso stevila

    e.target.value = value.slice(0, 13); // ohrani samo prvih 13 stevil
});

let masks = document.querySelectorAll(".onlyLetters")
masks.forEach(mask => mask.addEventListener("input", function (e) {
    const value1 = e.target.value.replace(/[^a-zA-Z]/g, ''); //izbriše use številke 
    e.target.value = value1;
}));
//prepreči da popup da submit

const preventPopup = document.getElementsByClassName('mainForm');

document
    .getElementById("CloseBtn")
    .addEventListener("click", function (event) {
        event.preventDefault(); // prepreči buttonu da pošlje data
    });

//sweet alert

function validate(event) {
    event.preventDefault(); // prepreči submit
    const requiredFields = document.querySelectorAll("#mainFormus [required]");
    let allFiled = true;

    requiredFields.forEach((field) => { //preveri ali so polja povna
        if (!field.value.trim()) { //.trim() odstrani use extra spaces
            allFiled = false;
        }
    });

    if (isCanvasBlank())
        allFiled = false;
    if (!document.getElementById("izjavaCheck").checked) {
        allFiled = false;
    }

    if(!checkSelections())
        allFiled = false;

    if(!emsoLen()){
        Swal.fire({
            title: 'Napaka!',
            text: 'Emso mora vsebovati 11 stevil!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
        

    if (!allFiled) {
        Swal.fire({
            title: 'Napaka!',
            text: 'Prosimo, izpolnite vsa polja!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return;
    }

    else {
        Swal.fire({
            title: 'Uspeh!',
            text: 'Registracija je bila uspešno oddana!',
            icon: 'success'
        }).then((result) => {
            if (result.isConfirmed) { //pošlje podatke po tem ko user klikne OK
                event.target.submit();
                clearPad();
            }
        });
    }
}

// preveri ali so usi barvni kanali v vsakem pixlu blank (0)
function isCanvasBlank() {
    let canvas = document.querySelector('canvas');
    return !canvas.getContext('2d')
        .getImageData(0, 0, canvas.width, canvas.height).data //.getImageData kopira pixel data za podan pravokotnik na canvasu
        .some(channel => channel !== 0);  //gre skozi usak channel value -> .some() vrne true če usaj en el !=0
}

function emsoLen() {
    let emso = document.getElementById('emsoin');
    if(emso.value.length < 13 && emso.value.length !== 0)
        return false;
    return true;    
}

//odstrani past dates

function disablePastDates() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    console.log(dd + ", mm: " + mm + ", yyyy" + yyyy);
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("prijDate").setAttribute("min", today);
}

function checkSelections() {
    let select = document.getElementById("sole");
    let select2 = document.getElementById("oddelekSelect");
    if(select.value == 0){
        console.log("doc1 false")
        return false;
    }
        
    if(select2.value == "null"){
        console.log("doc2 false")
        console.log(select2.value);
        return false;
    }
    return true;
}

document.getElementById("signField").addEventListener("touchstart", function(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){
        console.log("here");
        window.scrollTo(x, y);
    };    
});

document.getElementById("signField").addEventListener("touchend", function(){
        window.onscroll = function(){};
});


//darkmode

let darkmode = localStorage.getItem('darkMode'); //pogleda ali je darkmode stored localy
const themeSwitch = document.querySelector('.themeSwitch');
console.log(themeSwitch)

const enableDarkMode = () => {
    document.body.classList.add('darkMode');
    localStorage.setItem('darkMode', 'active');
    let image = document.getElementById("logo");
    console.log(image);
        image.src = "Img/SCNG-ColorDark.svg";
}

const disableDarkMode = () => {
    document.body.classList.remove('darkMode');
    localStorage.setItem('darkMode', null);
    let image = document.getElementById("logo");
    image.src = "Img/SCNG-Color.svg";
}

if(darkmode === "active") enableDarkMode();

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkMode');
    darkmode !== "active" ? enableDarkMode() : disableDarkMode(); // if(condition) true : false
});
