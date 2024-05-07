document.addEventListener("DOMContentLoaded", function() {
    const sphere = document.getElementById('draggable-sphere');
    const coordinatesDisplay = document.getElementById('coordinates');
    const mapContainer = document.querySelector('.map-container');
    let isDragging = false;
    let offsetX, offsetY;

    function startDrag(e) {
        e.preventDefault(); // Prevent default action to stop things like text selection
        isDragging = true;
        if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - sphere.getBoundingClientRect().left;
            offsetY = e.touches[0].clientY - sphere.getBoundingClientRect().top;
        } else {
            offsetX = e.clientX - sphere.getBoundingClientRect().left;
            offsetY = e.clientY - sphere.getBoundingClientRect().top;
        }
        document.querySelectorAll("*").forEach(el => el.style.userSelect = 'none', el.style.pointerEvents = 'none');
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();  // This prevents the mobile browser from interpreting this as a scroll gesture.
            let clientX, clientY;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            const mapRect = mapContainer.getBoundingClientRect();
            const newX = clientX - offsetX - mapRect.left;
            const newY = clientY - offsetY - mapRect.top;
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

    // Set default position of the button to top-left corner of the image
    const mapRect = mapContainer.getBoundingClientRect();
    sphere.style.left = `${mapRect.left}px`;
    sphere.style.top = `${mapRect.top}px`;

    // Adding both mouse and touch event listeners
    sphere.addEventListener('mousedown', startDrag);
    sphere.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // Adjust position of the coordinates display within the map container
    coordinatesDisplay.style.position = 'absolute';
    coordinatesDisplay.style.top = '10px'; // Adjust as needed
    coordinatesDisplay.style.left = '10px'; // Adjust as needed
});
