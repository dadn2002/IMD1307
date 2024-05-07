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
    // Prevent text selection
    document.body.style.userSelect = 'none';
}

function drag(e) {
    if (isDragging) {
        const mapRect = document.querySelector('.map-container').getBoundingClientRect();
        const newX = e.clientX - offsetX - mapRect.left;
        const newY = e.clientY - offsetY - mapRect.top;
        sphere.style.left = newX + 'px';
        sphere.style.top = newY + 'px';
        // Prevent default behavior to avoid any unwanted selections or other side effects
        e.preventDefault();
    }
}

function endDrag() {
    isDragging = false;
    // Re-enable text selection
    document.body.style.userSelect = '';
}
