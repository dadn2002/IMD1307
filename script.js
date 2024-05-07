// JavaScript for making the button draggable
const button = document.getElementById('draggable-button');
let isDragging = false;
let offsetX, offsetY;

button.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
    isDragging = true;
    offsetX = e.clientX - button.getBoundingClientRect().left;
    offsetY = e.clientY - button.getBoundingClientRect().top;
}

function drag(e) {
    if (isDragging) {
        button.style.left = (e.clientX - offsetX) + 'px';
        button.style.top = (e.clientY - offsetY) + 'px';
    }
}

function endDrag() {
    isDragging = false;
}
