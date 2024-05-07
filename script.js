// JavaScript for making the sphere draggable
const sphere = document.getElementById('draggable-sphere');
let isDragging = false;
let offsetX, offsetY;

sphere.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
    isDragging = true;
    offsetX = e.clientX - sphere.getBoundingClientRect().left;
    offsetY = e.clientY - sphere.getBoundingClientRect().top;
}

function drag(e) {
    if (isDragging) {
        const mapRect = document.querySelector('.map-container').getBoundingClientRect();
        const newX = e.clientX - offsetX - mapRect.left;
        const newY = e.clientY - offsetY - mapRect.top;
        sphere.style.left = newX + 'px';
        sphere.style.top = newY + 'px';
    }
}

function endDrag() {
    isDragging = false;
}
