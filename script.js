document.addEventListener("DOMContentLoaded", function() {
    const sphere = document.getElementById('draggable-sphere');
    const mapContainer = document.querySelector('.map-container');
    const rotateNotice = document.getElementById('rotate-device');
    const coordinatesDisplay = document.getElementById('coordinates');
    const ufrnImage = document.getElementById('ufrn-image');
    const informationContainer = document.querySelector('.information-container');

    let isDragging = false;
    let offsetX, offsetY;

    function startDrag(e) {
        e.preventDefault();
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
            e.preventDefault();
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
            coordinatesDisplay.textContent = `X: ${Math.round(newX)}, Y: ${Math.round(newY)}`;
            updateInformationContainer(newX, newY);
        }
    }
    
    function endDrag() {
        isDragging = false;
        document.querySelectorAll("*").forEach(el => el.style.userSelect = '', el.style.pointerEvents = '');
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

    function createMarketMarker(x, y) {
        const marker = document.createElement('div');
        marker.classList.add('market-marker');
        marker.style.position = 'absolute';
        marker.style.width = '5px';
        marker.style.height = '5px';
        marker.style.backgroundColor = 'red';
        marker.style.borderRadius = '50%';
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

    function initMapWithMarketMarkers() {
        loadJSON(function(response) {
            const marketData = JSON.parse(response);
            marketData.forEach(market => {
                createMarketMarker(market.localizacao.x, market.localizacao.y);
            });
        });
    }

    initMapWithMarketMarkers();

    // Function to update the information container with data about near markets
    function updateInformationContainer(x, y) {
        const distanceThreshold = 50; // Threshold to consider a market as near (in pixels)
    
        // Create a div to display the coordinates
        const coordinatesInfo = document.createElement('div');
        coordinatesInfo.textContent = `Coordinates: (${Math.round(x)}, ${Math.round(y)})`;
    
        loadJSON(function(response) {
            const marketData = JSON.parse(response);
            const nearbyMarkets = marketData.filter(market => {
                const distance = Math.sqrt((market.localizacao.x - x) ** 2 + (market.localizacao.y - y) ** 2);
                return distance < distanceThreshold;
            });
    
            // Clear previous content
            informationContainer.innerHTML = '';
    
            // Append the coordinates info to the container
            informationContainer.appendChild(coordinatesInfo);
    
            if (nearbyMarkets.length > 0) { // If there are nearby markets, display their data
                const heading = document.createElement('h2');
                heading.classList.add('market-heading'); // Add a class for styling
                heading.textContent = 'Nearby Markets';
                informationContainer.appendChild(heading);
    
                nearbyMarkets.forEach(market => {
                    const marketInfo = document.createElement('div');
                    marketInfo.classList.add('market-info'); // Add a class for styling
                    marketInfo.innerHTML = `<strong>${market.nicho}</strong><br>Coordinates: (${market.localizacao.x}, ${market.localizacao.y})`;
                    informationContainer.appendChild(marketInfo);
                });
            } else { // If no nearby markets, display a message
                const noMarketsMessage = document.createElement('p');
                noMarketsMessage.textContent = 'No markets nearby';
                informationContainer.appendChild(noMarketsMessage);
            }
        });
    }
    
    // Function to position the information container relative to the UFRN image
    function positionInformationContainer() {
        const imageRect = ufrnImage.getBoundingClientRect();
        informationContainer.style.top = `${imageRect.top + 20}px`;
        informationContainer.style.left = `${imageRect.left + 10}px`;
    }

    // Call the function initially
    positionInformationContainer();
});
