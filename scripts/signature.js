const canvas = document.querySelector('canvas');
const form = document.querySelector('.mainForm');
const clear = document.querySelector('.delete')
const ctx = canvas.getContext('2d');

let writingMode = false;

const clearPad = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

clear.addEventListener('click', (event) => {
    event.preventDefault();
    clearPad();
})

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = 'round';

const getTargetPosition = (event) => {
    posX = event.clientX - event.target.getBoundingClientRect().x;
    posY = event.clientY - event.target.getBoundingClientRect().y;

    return [posX,posY];

}

const handlePointerMove = (event) => {
    if(!writingMode) return

    const [posX, posY] = getTargetPosition(event);
    ctx.lineTo(posX,posY);
    ctx.stroke();
}

const handlePointerUp = () => {
    writingMode = false;
}

const handlePointerDown = (event) => {
    writingMode = true;
    ctx.beginPath();

    const [posX, posY] = getTargetPosition(event);
    ctx.moveTo(posX,posY);
}

const handlePointerOut = () => {
    writingMode = false;
}

canvas.addEventListener('pointerdown', handlePointerDown, {passive: true});
canvas.addEventListener('pointerup', handlePointerUp, {passive: true});
canvas.addEventListener('pointermove', handlePointerMove, {passive: true});
canvas.addEventListener('pointerout', handlePointerOut, {passive: true});