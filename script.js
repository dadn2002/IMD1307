document.addEventListener("DOMContentLoaded", function() {
    const sphere = document.getElementById('draggable-sphere');
    const mapContainer = document.querySelector('.map-container');
    const rotateNotice = document.getElementById('rotate-device');
    const coordinatesDisplay = document.getElementById('coordinates');
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
            // Update coordinates display
            coordinatesDisplay.textContent = `X: ${Math.round(newX)}, Y: ${Math.round(newY)}`;
            // Calculate the position of the image within the map container
            const imageRect = mapContainer.querySelector('img').getBoundingClientRect();
            // Adjust the position of the coordinates box relative to the image position
            coordinatesDisplay.style.left = `${imageRect.left + 20}px`; // Adjust the offset as needed
            coordinatesDisplay.style.top = `${imageRect.top + 20}px`; // Adjust the offset as needed
        }
    }

    function endDrag() {
        isDragging = false;
        document.querySelectorAll("*").forEach(el => el.style.userSelect = '', el.style.pointerEvents = '');
    }

    // Adding both mouse and touch event listeners
    sphere.addEventListener('mousedown', startDrag);
    sphere.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // Hide the rotation notice on non-mobile devices or when in landscape orientation
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    function checkOrientation() {
        if (isMobile && window.innerWidth < window.innerHeight) {
            rotateNotice.style.display = 'flex';
        } else {
            rotateNotice.style.display = 'none';
        }
    }

    function hideRotateNotice() {
        rotateNotice.style.display = 'none';
    }

    window.addEventListener('resize', function() {
        checkOrientation();
    });

    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            checkOrientation();
        }, 500); // Delay to ensure the orientation change is correctly detected
    });

    checkOrientation();
});
