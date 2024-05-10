document.addEventListener("DOMContentLoaded", function() {
    const sphere = document.getElementById('draggable-sphere');
    const mapContainer = document.querySelector('.map-container');
    const rotateNotice = document.getElementById('rotate-device');
    const coordinatesDisplay = document.getElementById('coordinates');
    const ufrnImage = document.getElementById('ufrn-image');
    const informationContainer = document.querySelector('.information-container');
    const distanceSelect = document.getElementById('distance-select'); // Change to select element
    const confirmPositionBtn = document.getElementById('confirm-position'); // New button
    const returnToMapBtn = document.getElementById('return-to-map-btn'); // New button
    const blankScreen = document.getElementById('blank-screen'); // Blank screen div
    const blankScreenText = document.getElementById('blank-screen-text'); // Text in blank screen
    let isDragging = false;
    let offsetX, offsetY;
    let preConfirmationX, preConfirmationY;

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        const sphereRect = sphere.getBoundingClientRect();
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        offsetX = clientX - (sphereRect.left + sphereRect.width / 2);
        offsetY = clientY - (sphereRect.top + sphereRect.height / 2);
        // Store the pre-confirmation coordinates of the sphere
        preConfirmationX = parseFloat(sphere.style.left) || 0;
        preConfirmationY = parseFloat(sphere.style.top) || 0;
        // Disable text selection and pointer events only for the sphere
        sphere.style.userSelect = 'none';
        sphere.style.pointerEvents = 'none';
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            let clientX, clientY;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            const mapRect = ufrnImage.getBoundingClientRect();
            const newX = clientX - offsetX - mapRect.left;
            const newY = clientY - offsetY - mapRect.top;
            sphere.style.left = `${newX}px`;
            sphere.style.top = `${newY}px`;
    
            // Calculate percentage values relative to map container size
            const percentX = ((newX + sphere.offsetWidth / 2) / mapRect.width) * 100;
            const percentY = ((newY + sphere.offsetHeight / 2) / mapRect.height) * 100;
    
            coordinatesDisplay.textContent = `X: ${percentX.toFixed(2)}%, Y: ${percentY.toFixed(2)}%`;
            updateInformationContainer(percentX, percentY);
        }
    }
    
    function endDrag() {
        isDragging = false;
        // Re-enable text selection and pointer events
        sphere.style.userSelect = '';
        sphere.style.pointerEvents = '';
    }

    sphere.addEventListener('mousedown', startDrag);
    sphere.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

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
        positionInformationContainer();
        if (isMobile) { // Only reposition market markers on mobile
            repositionMarketMarkers();
        }
    });

    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            checkOrientation();
            positionInformationContainer();
            if (isMobile) { // Only reposition market markers on mobile
                repositionMarketMarkers();
            }
            location.reload(); // Reload the page after screen rotation
        }, 500);
    });

    checkOrientation();

    function createMarketMarker(percentX, percentY) {
        const marker = document.createElement('div');
        marker.classList.add('market-marker');
        marker.style.position = 'absolute';
    
        // Convert percentage coordinates to pixel values relative to the map image
        const imageRect = ufrnImage.getBoundingClientRect();
        const markerX = imageRect.left + (percentX / 100) * imageRect.width;
        const markerY = imageRect.top + (percentY / 100) * imageRect.height;
    
        marker.style.left = `${markerX}px`;
        marker.style.top = `${markerY}px`;
        marker.style.width = '5px';
        marker.style.height = '5px';
        marker.style.backgroundColor = 'red';
        marker.style.borderRadius = '50%';
    
        mapContainer.appendChild(marker);
    }
    
    

    function repositionMarketMarker(marker) {
        const imageRect = ufrnImage.getBoundingClientRect();
        const percentX = parseFloat(marker.dataset.percentX);
        const percentY = parseFloat(marker.dataset.percentY);
        const newX = (percentX / 100) * imageRect.width + imageRect.left;
        const newY = (percentY / 100) * imageRect.height + imageRect.top;
        marker.style.left = `${newX}px`;
        marker.style.top = `${newY}px`;
    }

    function initMapWithMarketMarkers() {
        loadJSON(function(response) {
            const marketData = JSON.parse(response);
            marketData.forEach(market => {
                createMarketMarker(market.localizacao.x, market.localizacao.y);
            });
            positionInformationContainer();
            if (isMobile) { // Only reposition market markers on mobile
                repositionMarketMarkers();
            }
        });
    }

    function repositionMarketMarkers() {
        const markers = document.querySelectorAll('.market-marker');
        markers.forEach(marker => {
            repositionMarketMarker(marker);
        });
    }

    initMapWithMarketMarkers();

    function loadJSON(callback) {   
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', 'foodData.json', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    console.error('Failed to load market data:', xhr.status);
                }
            }
        };
        xhr.send(null);  
    }

    function updateInformationContainer(x, y) {
        // Update the coordinates display
        coordinatesDisplay.textContent = `X: ${x.toFixed(2)}%, Y: ${y.toFixed(2)}%`;
        updateMarketData(x, y);
    }

    function positionInformationContainer() {
        const imageRect = ufrnImage.getBoundingClientRect();
        informationContainer.style.top = `${imageRect.top + 20}px`;
        informationContainer.style.left = `${imageRect.left + 10}px`;
    }

    function updateMarketData(percentX, percentY) {
        const currentDistanceThreshold = parseInt(distanceSelect.value);
        loadJSON(function(response) {
            const marketData = JSON.parse(response);
            const nearbyMarkets = marketData.filter(market => {
                const distance = Math.sqrt((market.localizacao.x - percentX) ** 2 + (market.localizacao.y - percentY) ** 2);
                return distance < currentDistanceThreshold;
            });
            const marketInfoContainer = document.querySelector('.market-info-container');
            marketInfoContainer.innerHTML = '';
            if (nearbyMarkets.length > 0) {
                const heading = document.createElement('h2');
                heading.classList.add('market-heading');
                heading.textContent = 'Nearby Markets';
                marketInfoContainer.appendChild(heading);
                nearbyMarkets.forEach(market => {
                    const marketInfo = document.createElement('div');
                    marketInfo.classList.add('market-info');
                    marketInfo.innerHTML = `<strong>${market.nicho}</strong><br>Coordinates: (${market.localizacao.x}, ${market.localizacao.y})`;
                    marketInfoContainer.appendChild(marketInfo);
                });
            } else {
                const noMarketInfo = document.createElement('div');
                noMarketInfo.textContent = 'No markets within selected distance';
                marketInfoContainer.appendChild(noMarketInfo);
            }
        });
    }

    distanceSelect.addEventListener('change', function() {
        const x = parseFloat(coordinatesDisplay.textContent.match(/X: ([\d\.]+)/)[1]);
        const y = parseFloat(coordinatesDisplay.textContent.match(/Y: ([\d\.]+)/)[1]);
        updateInformationContainer(x, y);
    });

    positionInformationContainer();

    // Function to confirm position
    function confirmPosition() {
        // Hide the UFRN image, information box, market markers, and sphere
        ufrnImage.style.display = 'none';
        informationContainer.style.display = 'none';
        document.querySelectorAll('.market-marker').forEach(marker => marker.style.display = 'none');
        sphere.style.display = 'none';
        // Show the blank screen
        blankScreen.style.display = 'block';
        // Show the coordinates of the sphere before confirmation
        blankScreenText.textContent = `Coordinates before confirmation: (${preConfirmationX.toFixed(2)}, ${preConfirmationY.toFixed(2)})`;
        // Show the return to map button
        returnToMapBtn.style.display = 'block';
    }

    // Function to return to the map
    function returnToMap() {
        // Show the UFRN image, information box, market markers, and sphere again
        ufrnImage.style.display = 'block';
        informationContainer.style.display = 'block';
        document.querySelectorAll('.market-marker').forEach(marker => marker.style.display = 'block');
        sphere.style.display = 'block';
        // Hide the blank screen
        blankScreen.style.display = 'none';
        // Hide the return to map button again
        returnToMapBtn.style.display = 'none';
    }

    // Event listener for confirm position button
    confirmPositionBtn.addEventListener('click', confirmPosition);

    // Event listener for return to map button
    returnToMapBtn.addEventListener('click', returnToMap);
});
