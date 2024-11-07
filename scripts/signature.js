const canvas = document.querySelector('canvas');
const form = document.querySelector('.mainForm');
const clear = document.querySelector('.delete')
const ctx = canvas.getContext('2d');
const body = document.getElementsByTagName('body');



let writingMode = false;
const coordinates = [];

const clearPad = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

clear.addEventListener('click', (event) => {
    event.preventDefault();
    clearPad();
    coordinates.length = 0;
})

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = 'round';

const getTargetPosition = (event) => {
    posX = event.clientX - event.target.getBoundingClientRect().x;
    posY = event.clientY - event.target.getBoundingClientRect().y;

    return [posX,posY];

}

//fix da ko je darkmode piše z belo

const switcher = document.querySelector(".themeSwitch").addEventListener("click", function(){
    if(body[0].classList.contains("darkMode")){
        ctx.strokeStyle = "black";
        redraw();
    }
    else{
        ctx.strokeStyle = "white";
        redraw();
    }
    });


const handlePointerMove = (event) => {
    if(!writingMode) return

    const [posX, posY] = getTargetPosition(event);
    ctx.lineTo(posX,posY);
    ctx.stroke();
    coordinates.push({ x: posX, y: posY });
}

const handlePointerUp = () => {
    writingMode = false;
    coordinates.push({ x: null, y: null });
}

const handlePointerDown = (event) => {
    writingMode = true;
    ctx.beginPath();

    const [posX, posY] = getTargetPosition(event);
    ctx.moveTo(posX,posY);
    coordinates.push({ x: posX, y: posY });
}

const handlePointerOut = () => {
    writingMode = false;
}

const redraw = () => {
    clearPad();
    ctx.beginPath();
    for (let i = 0; i < coordinates.length; i++) {
        const point = coordinates[i];
        if (point.x === null && point.y === null) {
            ctx.beginPath(); // Start a new path for each separate stroke
        } else {
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        }
    }
}


canvas.addEventListener('pointerdown', handlePointerDown, {passive: true});
canvas.addEventListener('pointerup', handlePointerUp, {passive: true});
canvas.addEventListener('pointermove', handlePointerMove, {passive: true});
canvas.addEventListener('pointerout', handlePointerOut, {passive: true});