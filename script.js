// JavaScript for making the button draggable
const button = document.getElementById('draggable-button');
let isDragging = false;
let offsetX, offsetY;

button.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
    isDragging = true;
    const rect = button.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
}

function drag(e) {
    if (isDragging) {
        const mapRect = document.querySelector('.map-container').getBoundingClientRect();
        const newX = e.clientX - offsetX - mapRect.left;
        const newY = e.clientY - offsetY - mapRect.top;
        button.style.left = newX + 'px';
        button.style.top = newY + 'px';
    }
}

function endDrag() {
    isDragging = false;
}
