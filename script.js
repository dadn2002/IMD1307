// JavaScript for making the sphere draggable with enhanced touch support
document.addEventListener("DOMContentLoaded", function() {
    const sphere = document.getElementById('draggable-sphere');
    const coordinatesDisplay = document.getElementById('coordinates');
    let isDragging = false;
    let offsetX, offsetY;

    function startDrag(e) {
        e.preventDefault(); // Prevent default action to stop things like text selection
        isDragging = true;
        offsetX = e.clientX - sphere.getBoundingClientRect().left;
        offsetY = e.clientY - sphere.getBoundingClientRect().top;
        document.querySelectorAll("*").forEach(el => el.style.userSelect = 'none', el.style.pointerEvents = 'none');
    }

    function drag(e) {
        if (isDragging) {
            const mapRect = document.querySelector('.map-container').getBoundingClientRect();
            const newX = e.clientX - offsetX - mapRect.left;
            const newY = e.clientY - offsetY - mapRect.top;
            sphere.style.left = `${newX}px`;
            sphere.style.top = `${newY}px`;
            updateCoordinates(newX, newY);
        }
    }

    function endDrag() {
        isDragging = false;
        document.querySelectorAll("*").forEach(el => el.style.userSelect = '', el.style.pointerEvents = '');
    }

    function updateCoordinates(x, y) {
        coordinatesDisplay.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
        console.log(`Updated coordinates: X: ${Math.round(x)}, Y: ${Math.round(y)}`);
    }

    // Adding both mouse and touch event listeners
    sphere.addEventListener('mousedown', startDrag);
    sphere.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
});

// Optional: Lock the orientation via the Screen Orientation API (where supported)
if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(function(error) {
        console.log("Orientation lock not allowed:", error);
    });
}
