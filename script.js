// JavaScript for making the sphere draggable
const sphere = document.getElementById('draggable-sphere');
let isDragging = false;
let initialX, initialY;

sphere.addEventListener('mousedown', startDrag);
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
        const rect = sphere.getBoundingClientRect();
        const newX = rect.left + deltaX;
        const newY = rect.top + deltaY;
        sphere.style.left = newX + 'px';
        sphere.style.top = newY + 'px';
        initialX = e.clientX;
        initialY = e.clientY;
    }
}

function endDrag() {
    isDragging = false;
}
