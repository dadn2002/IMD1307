// JavaScript for making the sphere draggable with touch support
const sphere = document.getElementById('draggable-sphere');
let isDragging = false;
let offsetX, offsetY;

function startDrag(e) {
    e.preventDefault(); // Prevent scrolling when touching
    isDragging = true;
    let clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    let clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    offsetX = clientX - sphere.getBoundingClientRect().left;
    offsetY = clientY - sphere.getBoundingClientRect().top;
    document.querySelectorAll("*").forEach(el => el.style.userSelect = 'none');
}

function drag(e) {
    if (isDragging) {
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
    document.querySelectorAll("*").forEach(el => el.style.userSelect = '');
}

sphere.addEventListener('mousedown', startDrag);
sphere.addEventListener('touchstart', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
