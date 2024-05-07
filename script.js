// JavaScript for making the sphere draggable
const sphere = document.getElementById('draggable-sphere');
let isDragging = false;
let offsetX, offsetY;

sphere.addEventListener('mousedown', function(e) {
    e.preventDefault();  // Prevent default action to stop things like text selection
    isDragging = true;
    offsetX = e.clientX - sphere.getBoundingClientRect().left;
    offsetY = e.clientY - sphere.getBoundingClientRect().top;
    // Apply userSelect style more broadly
    document.querySelectorAll("*").forEach(el => el.style.userSelect = 'none');
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const mapRect = document.querySelector('.map-container').getBoundingClientRect();
        const newX = e.clientX - offsetX - mapRect.left;
        const newY = e.clientY - offsetY - mapRect.top;
        sphere.style.left = newX + 'px';
        sphere.style.top = newY + 'px';
        e.preventDefault(); // Keep this to prevent any default behavior during dragging
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
    // Re-enable text selection by resetting userSelect
    document.querySelectorAll("*").forEach(el => el.style.userSelect = '');
});
