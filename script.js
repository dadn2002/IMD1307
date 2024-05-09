document.addEventListener("DOMContentLoaded", function() {
    const sphere = document.getElementById('draggable-sphere');
    const mapContainer = document.querySelector('.map-container');
    const rotateNotice = document.getElementById('rotate-device');
    const coordinatesDisplay = document.getElementById('coordinates');
    const ufrnImage = document.getElementById('ufrn-image');
    const informationContainer = document.querySelector('.information-container');
    const distanceSelect = document.getElementById('distance-select'); // Change to select element
    const rangeDisplay = document.getElementById('range-display');

    let isDragging = false;
    let offsetX, offsetY;
    let distanceThreshold = parseInt(distanceSelect.value); // Initial value from select

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        const sphereRect = sphere.getBoundingClientRect();
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        offsetX = clientX - (sphereRect.left + sphereRect.width / 2);
        offsetY = clientY - (sphereRect.top + sphereRect.height / 2);
        document.querySelectorAll("*").forEach(el => {
            el.style.userSelect = 'none';
            el.style.pointerEvents = 'none';
        });
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
            updateRangeDisplay(percentX, percentY);
        }
    }
    
    function endDrag() {
        isDragging = false;
        document.querySelectorAll("*").forEach(el => {
            el.style.userSelect = '';
            el.style.pointerEvents = '';
        });
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
    });

    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            checkOrientation();
            positionInformationContainer();
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
    
    

    function initMapWithMarketMarkers() {
        loadJSON(function(response) {
            const marketData = JSON.parse(response);
            marketData.forEach(market => {
                createMarketMarker(market.localizacao.x, market.localizacao.y);
            });
        });
    }

    initMapWithMarketMarkers();

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

    // Function to update the information container with data about near markets
    function updateInformationContainer(x, y) {
        // Update the coordinates display
        coordinatesDisplay.textContent = `Coordinates: (${Math.round(x)}, ${Math.round(y)})`;

        loadJSON(function(response) {
            const marketData = JSON.parse(response);
            const nearbyMarkets = marketData.filter(market => {
                const distance = Math.sqrt((market.localizacao.x - x) ** 2 + (market.localizacao.y - y) ** 2);
                return distance < distanceThreshold;
            });

            // Get the market info container
            const marketInfoContainer = document.querySelector('.market-info-container');

            // Clear previous content related to markets
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
                const noMarketsMessage = document.createElement('p');
                noMarketsMessage.textContent = 'No markets nearby';
                marketInfoContainer.appendChild(noMarketsMessage);
            }
        });
    }


    // Function to position the information container relative to the UFRN image
    function positionInformationContainer() {
        const imageRect = ufrnImage.getBoundingClientRect();
        informationContainer.style.top = `${imageRect.top + 20}px`;
        informationContainer.style.left = `${imageRect.left + 10}px`;
    }

    // Function to update the range display based on the selected value
    function updateRangeDisplay(percentX, percentY) {
        rangeDisplay.textContent = `Threshold: ${distanceThreshold}px`;

        // Update the information container with the new threshold
        updateInformationContainer(percentX, percentY);
    }

    // Call the functions initially
    positionInformationContainer();

    // Add event listener for distance select change
    distanceSelect.addEventListener('change', function() {
        const percentX = parseFloat(coordinatesDisplay.textContent.split(':')[1].trim().slice(0, -1));
        const percentY = parseFloat(coordinatesDisplay.textContent.split(':')[2].trim().slice(0, -1));
        distanceThreshold = parseInt(distanceSelect.value); // Update distanceThreshold
        updateRangeDisplay(percentX, percentY);
    });

});
