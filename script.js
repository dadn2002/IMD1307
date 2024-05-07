// JavaScript for making the button draggable
const button = document.getElementById('draggable-button');
let isDragging = false;
let initialX, initialY;

button.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
    isDragging = true;
    initialX = e.clientX;
    initialY = e.clientY;
}

function drag(e) {
    if (isDragging) {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;
        const rect = button.getBoundingClientRect();
        const newX = rect.left + deltaX;
        const newY = rect.top + deltaY;
        button.style.left = newX + 'px';
        button.style.top = newY + 'px';
        initialX = e.clientX;
        initialY = e.clientY;
    }
}

function endDrag() {
    isDragging = false;
}
