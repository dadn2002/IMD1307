// JavaScript for making the sphere draggable with enhanced touch support
const sphere = document.getElementById('draggable-sphere');
let isDragging = false;
let offsetX, offsetY;

function startDrag(e) {
    // Prevent any default action (like scrolling and zooming) when touching
    if (e.type === 'touchstart') {
        e.preventDefault();
    }
    isDragging = true;
    let clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    let clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    offsetX = clientX - sphere.getBoundingClientRect().left;
    offsetY = clientY - sphere.getBoundingClientRect().top;
    // Disable text selection
    document.querySelectorAll("*").forEach(el => el.style.userSelect = 'none', el.style.pointerEvents = 'none');
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();  // This prevents the mobile browser from interpreting this as a scroll gesture.
        let clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        let clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        const mapRect = document.querySelector('.map-container').getBoundingClientRect();
        const newX = clientX - offsetX - mapRect.left;
        const newY = clientY - offsetY - mapRect.top;
        sphere.style.left = `${newX}px`;
        sphere.style.top = `${newY}px`;
    }
}

function endDrag() {
    isDragging = false;
    // Re-enable text selection and pointer events
    document.querySelectorAll("*").forEach(el => el.style.userSelect = '', el.style.pointerEvents = '');
}

// Adding both mouse and touch event listeners
sphere.addEventListener('mousedown', startDrag);
sphere.addEventListener('touchstart', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
document.addEventListener("DOMContentLoaded", function() {
    const rotateNotice = document.getElementById('rotate-device');

    function checkOrientation() {
        // Check if the device is likely a mobile device based on screen width and height
        if (window.innerWidth < 800 && window.innerHeight < 800) {
            if (window.innerWidth < window.innerHeight) {
                // If the height is greater than the width, assume it's in portrait
                rotateNotice.style.display = 'flex';
            } else {
                rotateNotice.style.display = 'none';
            }
        } else {
            // Hide the message on larger screens
            rotateNotice.style.display = 'none';
        }
    }

    function hideRotateNotice() {
        rotateNotice.style.display = 'none';
        window.removeEventListener('orientationchange', hideRotateNotice);
    }

    // Check on initial load and any time the window size changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', hideRotateNotice);
    checkOrientation();
});

// Optional: Lock the orientation via the Screen Orientation API (where supported)
if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(function(error) {
        console.log("Orientation lock not allowed:", error);
    });
}


