function resizeCanvas(x, y) {
    var canvases = document.getElementsByClassName('signatureField');
    var canvas = canvases[0];

    canvas.width = x;
    canvas.height = y;
}

function applyMediaQuery() {

    let mediaQuery = window.matchMedia("(max-width: 725px)");
    let hideImg = window.matchMedia("(max-width: 433px)");
    // Check if the media query matches
    if (mediaQuery.matches) {
        // Apply new canvas size for small screens
        resizeCanvas(175, 90);
    } else {
        // Apply default canvas size for larger screens
        resizeCanvas(290, 100);
    }


    hideImg.addEventListener('change', function (e1) {
        if (e1.matches) {
            let headLeft = document.getElementById("headLeft");
            let hedRight = document.getElementById("headRight");

            headLeft.remove();
            hedRight.remove();
        } else {

            // remove center in pole append -> left, center
            // right
            // popravi header pri smaller sizes, tako da odstrani stranska diva

            let header = document.getElementById("header");
            let hedCenter = document.getElementById("headCenter");
            let h1 = document.createElement("h1");
            hedCenter.remove();
            hedCenter = document.createElement("div");
            let headLeft = document.createElement("div");
            let headRight = document.createElement("div");
            let image = document.createElement("img");
            image.src = "Img/SCNG-Color.svg";
            image.alt = "Image";
            headLeft.id = "headLeft";
            headRight.id = "headRight";
            hedCenter.id = "headCenter";
            h1.textContent = "Prijava na šolsko prehrano";


            header.appendChild(headLeft);
            header.appendChild(hedCenter);
            header.appendChild(headRight);
            headLeft.appendChild(image);
            hedCenter.appendChild(h1);
        }
    });



    // Listen for media query changes
    mediaQuery.addEventListener('change', function (e) {
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

    if (!allFiled) {
        Swal.fire({
            title: 'Napaka!',
            text: 'Prosimo, izpolnite vsa polja!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return; // gre iz loopa ko dobi prvi prazen field
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