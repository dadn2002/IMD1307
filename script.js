document.addEventListener("DOMContentLoaded", function() {
    const sphere = document.getElementById('draggable-sphere');
    const mapContainer = document.querySelector('.map-container');
    const rotateNotice = document.getElementById('rotate-device');
    const coordinatesDisplay = document.getElementById('coordinates');
    const marketList = document.getElementById('market-list');
    
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
            updateMarketList(newX, newY);
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

    function createFoodMarketMarker(x, y) {
        const radiusOfSphere = '5px';
        const marker = document.createElement('div');
        marker.classList.add('food-market-marker');
        marker.style.position = 'absolute';
        marker.style.width = radiusOfSphere; // Diameter of the marker
        marker.style.height = radiusOfSphere; // Diameter of the marker
        marker.style.backgroundColor = 'black'; // Marker color
        marker.style.borderRadius = '50%'; // Make it a circle
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        mapContainer.appendChild(marker);
    }

    function loadJSON(callback) {   
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', 'foodData.json', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        xhr.send(null);  
    }

    function initMapWithFoodMarketMarkers() {
        loadJSON(function(response) {
            const foodMarketData = JSON.parse(response);
            foodMarketData.forEach(market => {
                createFoodMarketMarker(market.localizacao.x, market.localizacao.y);
            });
        });
    }

    function updateMarketList(x, y) {
        // Clear previous entries
        marketList.innerHTML = '';
    
        loadJSON(function(response) {
            const foodMarketData = JSON.parse(response);
            foodMarketData.forEach(market => {
                const distance = Math.sqrt((market.localizacao.x - x) ** 2 + (market.localizacao.y - y) ** 2);
                if (distance < 50) { // Consider markets within 50 pixels radius
                    const marketItem = document.createElement('div');
                    marketItem.textContent = market.nicho;
                    marketList.appendChild(marketItem);
                }
            });
        });
    }

    initMapWithFoodMarketMarkers();
});
