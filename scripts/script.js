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

document.querySelectorAll('input[type="text"]').forEach(input => { //vsakemu elementu tipa input text doda event listener, ki kliče funkcijo z eventom e
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.slice(0,30); //omeji na max 30 characters input na vseh poljih
    });
});

let masks = document.querySelectorAll(".onlyLetters")
masks.forEach(mask => mask.addEventListener("input", function (e) {
    const value1 = e.target.value.replace(/[^a-zA-Z]/g, ''); //izbriše use številke 
    e.target.value = value1;
}));
//prepreči da popup izvede submit

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
    let arr = ["ime vlagatelja", "priimkek vlagatelja","naslov vlagatelja","vlogo vlagatelja"," ime dijaka", "priimek dijaka","emso dijaka","naslov dijaka"];

    // gre z loopom skozi vsa obvezna polja, ter iz zgornje tabele vstavi ustrezno obliko zapisa v alert
    for(let i = 0; i < arr.length; i++){
        console.log(requiredFields[i]);
        if(i === 3 && !cehckRadio()){
                Swal.fire({
                    title: 'Napaka!',
                    text: 'Prosimo izberite '+ arr[i],
                    icon: 'error',
                    iconColor: '#EF5041',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#EF5041'
                });
                return;
        }else if(!requiredFields[i].value.trim()){
            Swal.fire({
                title: 'Napaka!',
                text: 'Prosimo vnesite ' + arr[i],
                icon: 'error',
                iconColor: '#EF5041',
                confirmButtonText: 'OK',
                confirmButtonColor: '#EF5041'
            });
            return;
        }
    }

    if(!checkSelections())
        return;

    if(!document.getElementById("prijDate").value){ //če datum nima vrednosti je vrednost "" -> "" pomeni false
        Swal.fire({
            title: 'Napaka!',
            text: 'Prosimo vnesite datum veljavnosti',
            icon: 'error',
            iconColor: '#EF5041',
            confirmButtonColor: '#EF5041',
            confirmButtonText: 'OK'
        });
        return;
    } 
    if (isCanvasBlank()){
            Swal.fire({
                title: 'Napaka!',
                text: 'Podpis je obvezen vnos!',
                icon: 'error',
                iconColor: '#EF5041',
                confirmButtonColor: '#EF5041',
                confirmButtonText: 'OK'
            });
            return;
    }
        
    if (!document.getElementById("izjavaCheck").checked) {
        Swal.fire({
            title: 'Napaka!',
            text: 'Z izjavo se morate strinjati!',
            icon: 'error',
            iconColor: '#EF5041',
            confirmButtonColor: '#EF5041',
            confirmButtonText: 'OK'
        });
        return;
    }

    if(!emsoLen()){
        Swal.fire({
            title: 'Napaka!',
            text: 'Emso mora vsebovati 11 stevil!',
            icon: 'error',
            iconColor: '#EF5041',
            confirmButtonColor: '#EF5041',
            confirmButtonText: 'OK'
        });
        return;
    }
        
    Swal.fire({
        title: 'Prijava je bila uspešno oddana!',
        icon: 'success',
        iconColor: '#49BA86',
        confirmButtonColor: '#49BA86',
        confirmButtonText: 'Zaključi!'
    }).then((result) => {
        if (result.isConfirmed) { //pošlje podatke po tem ko user klikne OK
            event.target.submit();
            clearPad();
        }
    });
    
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
        Swal.fire({
            title: 'Napaka!',
            text: 'Prosimo izberite šolo!',
            icon: 'error',
            confirmButtonText: 'OK',
            iconColor: '#EF5041',
            confirmButtonColor: '#EF5041'
        });
        return false;
    }
        
    if(select2.value == "null"){
        console.log("doc2 false")
        Swal.fire({
            title: 'Napaka!',
            text: 'Prosimo izberite oddelek',
            icon: 'error',
            confirmButtonText: 'OK',
            iconColor: '#EF5041',
            confirmButtonColor: '#EF5041'
        });
        console.log(select2.value);
        return false;
    }
    return true;
}

function cehckRadio(){
   let radios = document.getElementsByClassName('radios');
   let empty = 0; 
   for (let i = 0; i < radios.length; i++)
        if(radios[i].checked)
            return true;
    return false;
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


/*
    Daj sweetalerts na use - Done
    change colors od gumbu 
    omeji lengths od inputs -Done
*/