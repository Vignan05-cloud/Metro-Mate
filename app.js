// Enhanced MetroMate Application - Bug Fixed Version
class EnhancedMetroMate {
    constructor() {
        this.metroData = null;
        this.map = null;
        this.stations = [];
        this.stationMarkers = new Map();
        this.selectedSource = null;
        this.selectedDest = null;
        this.routeLine = null;
        this.isFirstLoad = true;
        
        this.init();
    }

    async init() {
        await this.loadMetroData();
        this.initializeUI();
        this.initializeMap();
        this.populateStationSelects();
        this.bindEvents();
        
        if (this.isFirstLoad) {
            this.showInstructions();
            this.isFirstLoad = false;
        }
        
        this.showNotification('🚇', 'MetroMate Enhanced - Click any station to start!');
    }

    async loadMetroData() {
        // Complete metro data with all stations
        this.metroData = {
            "red_line": {
                "name": "Red Line",
                "color": "#FF4444",
                "stations": [
                    {"name": "Miyapur", "code": "MYP", "lat": 17.4947, "lng": 78.3884, "index": 0},
                    {"name": "JNTU College", "code": "JTU", "lat": 17.4926, "lng": 78.3916, "index": 1},
                    {"name": "KPHB Colony", "code": "KPH", "lat": 17.4886, "lng": 78.3972, "index": 2},
                    {"name": "Kukatpally", "code": "KUK", "lat": 17.4842, "lng": 78.4078, "index": 3},
                    {"name": "Dr. B.R. Ambedkar Balanagar", "code": "BAL", "lat": 17.4804, "lng": 78.4198, "index": 4},
                    {"name": "Moosapet", "code": "MSP", "lat": 17.4782, "lng": 78.4291, "index": 5},
                    {"name": "Bharat Nagar", "code": "BHN", "lat": 17.4751, "lng": 78.4405, "index": 6},
                    {"name": "Erragadda", "code": "ERG", "lat": 17.4707, "lng": 78.4484, "index": 7},
                    {"name": "ESI Hospital", "code": "ESI", "lat": 17.4649, "lng": 78.4564, "index": 8},
                    {"name": "S.R. Nagar", "code": "SRN", "lat": 17.4588, "lng": 78.4644, "index": 9},
                    {"name": "Ameerpet", "code": "AMP", "lat": 17.4373, "lng": 78.4482, "index": 10},
                    {"name": "Punjagutta", "code": "PJG", "lat": 17.4311, "lng": 78.4517, "index": 11},
                    {"name": "Irrum Manzil", "code": "IRM", "lat": 17.4254, "lng": 78.4567, "index": 12},
                    {"name": "Khairatabad", "code": "KHB", "lat": 17.4189, "lng": 78.4653, "index": 13},
                    {"name": "Lakdi-ka-pul", "code": "LKP", "lat": 17.4101, "lng": 78.4717, "index": 14},
                    {"name": "Assembly", "code": "ASM", "lat": 17.4021, "lng": 78.4789, "index": 15},
                    {"name": "Nampally", "code": "NMP", "lat": 17.3951, "lng": 78.4856, "index": 16},
                    {"name": "Gandhi Bhavan", "code": "GBH", "lat": 17.3888, "lng": 78.4921, "index": 17},
                    {"name": "Osmania Medical College", "code": "OMC", "lat": 17.3824, "lng": 78.4989, "index": 18},
                    {"name": "MG Bus Station", "code": "MGBS", "lat": 17.3749, "lng": 78.5045, "index": 19},
                    {"name": "Malakpet", "code": "MKP", "lat": 17.3697, "lng": 78.5123, "index": 20},
                    {"name": "New Market", "code": "NMK", "lat": 17.3642, "lng": 78.5201, "index": 21},
                    {"name": "Musarambagh", "code": "MBG", "lat": 17.3586, "lng": 78.5279, "index": 22},
                    {"name": "Dilsukhnagar", "code": "DSN", "lat": 17.3531, "lng": 78.5357, "index": 23},
                    {"name": "Chaitanyapuri", "code": "CHP", "lat": 17.3475, "lng": 78.5435, "index": 24},
                    {"name": "Victoria Memorial", "code": "VCM", "lat": 17.3419, "lng": 78.5513, "index": 25},
                    {"name": "L.B. Nagar", "code": "LBN", "lat": 17.3364, "lng": 78.5591, "index": 26}
                ]
            },
            "blue_line": {
                "name": "Blue Line",
                "color": "#4444FF",
                "stations": [
                    {"name": "Nagole", "code": "NGL", "lat": 17.3364, "lng": 78.6789, "index": 0},
                    {"name": "Uppal", "code": "UPL", "lat": 17.4064, "lng": 78.5591, "index": 1},
                    {"name": "Stadium", "code": "STD", "lat": 17.4125, "lng": 78.5513, "index": 2},
                    {"name": "NGRI", "code": "NGR", "lat": 17.4186, "lng": 78.5435, "index": 3},
                    {"name": "Habsiguda", "code": "HBS", "lat": 17.4247, "lng": 78.5357, "index": 4},
                    {"name": "Tarnaka", "code": "TNK", "lat": 17.4308, "lng": 78.5279, "index": 5},
                    {"name": "Mettuguda", "code": "MTG", "lat": 17.4369, "lng": 78.5201, "index": 6},
                    {"name": "Secunderabad East", "code": "SCE", "lat": 17.4443, "lng": 78.5045, "index": 7},
                    {"name": "Parade Ground", "code": "PGD", "lat": 17.4504, "lng": 78.4989, "index": 8},
                    {"name": "Paradise", "code": "PRD", "lat": 17.4565, "lng": 78.4933, "index": 9},
                    {"name": "Rasoolpura", "code": "RSP", "lat": 17.4626, "lng": 78.4877, "index": 10},
                    {"name": "Prakash Nagar", "code": "PKN", "lat": 17.4687, "lng": 78.4821, "index": 11},
                    {"name": "Begumpet", "code": "BGP", "lat": 17.4748, "lng": 78.4765, "index": 12},
                    {"name": "Ameerpet", "code": "AMP_BLUE", "lat": 17.4373, "lng": 78.4482, "index": 13},
                    {"name": "Madhura Nagar", "code": "MDN", "lat": 17.4312, "lng": 78.4426, "index": 14},
                    {"name": "Yusufguda", "code": "YSG", "lat": 17.4251, "lng": 78.4370, "index": 15},
                    {"name": "Road No. 5 Jubilee Hills", "code": "JH5", "lat": 17.4190, "lng": 78.4314, "index": 16},
                    {"name": "Jubilee Hills Check Post", "code": "JCP", "lat": 17.4129, "lng": 78.4258, "index": 17},
                    {"name": "Peddamma Gudi", "code": "PMG", "lat": 17.4068, "lng": 78.4202, "index": 18},
                    {"name": "Madhapur", "code": "MDP", "lat": 17.4007, "lng": 78.4146, "index": 19},
                    {"name": "Durgam Cheruvu", "code": "DGC", "lat": 17.3946, "lng": 78.4090, "index": 20},
                    {"name": "HITEC City", "code": "HTC", "lat": 17.3885, "lng": 78.4034, "index": 21},
                    {"name": "Raidurg", "code": "RDG", "lat": 17.3824, "lng": 78.3978, "index": 22}
                ]
            },
            "green_line": {
                "name": "Green Line",
                "color": "#44AA44",
                "stations": [
                    {"name": "JBS Parade Ground", "code": "JBS", "lat": 17.4504, "lng": 78.4989, "index": 0},
                    {"name": "Secunderabad West", "code": "SCW", "lat": 17.4443, "lng": 78.5045, "index": 1},
                    {"name": "Gandhi Hospital", "code": "GDH", "lat": 17.4382, "lng": 78.5101, "index": 2},
                    {"name": "Musheerabad", "code": "MSH", "lat": 17.4321, "lng": 78.5157, "index": 3},
                    {"name": "RTC X Roads", "code": "RTC", "lat": 17.4260, "lng": 78.5213, "index": 4},
                    {"name": "Chikkadpally", "code": "CKD", "lat": 17.4199, "lng": 78.5269, "index": 5},
                    {"name": "Narayanguda", "code": "NRG", "lat": 17.4138, "lng": 78.5325, "index": 6},
                    {"name": "Sultan Bazaar", "code": "SLB", "lat": 17.4077, "lng": 78.5381, "index": 7},
                    {"name": "MG Bus Station", "code": "MGBS_GREEN", "lat": 17.3749, "lng": 78.5045, "index": 8}
                ]
            }
        };

        this.fareStructure = {
            "0-2": {"token": 12, "smart_card": 11},
            "2-4": {"token": 19, "smart_card": 17},
            "4-6": {"token": 32, "smart_card": 28},
            "6-9": {"token": 42, "smart_card": 37},
            "9-12": {"token": 52, "smart_card": 47},
            "12-15": {"token": 56, "smart_card": 51},
            "15-18": {"token": 63, "smart_card": 56},
            "18-21": {"token": 68, "smart_card": 61},
            "21-24": {"token": 72, "smart_card": 65},
            "24+": {"token": 76, "smart_card": 69}
        };

        this.processMetroData();
    }

    processMetroData() {
        this.stations = [];
        
        // Create stations list with unique IDs
        Object.entries(this.metroData).forEach(([lineId, line]) => {
            line.stations.forEach(station => {
                this.stations.push({
                    ...station,
                    lineId,
                    lineName: line.name,
                    lineColor: line.color,
                    uniqueId: `${lineId}_${station.index}`
                });
            });
        });
        
        console.log(`Loaded ${this.stations.length} station instances`);
    }

    initializeUI() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        this.updateSelectionStatus();
    }

    initializeMap() {
        this.map = L.map('metro-map').setView([17.4065, 78.4772], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        this.addMetroLines();
        this.addInteractiveStations();
    }

    addMetroLines() {
        Object.values(this.metroData).forEach(line => {
            const coordinates = line.stations.map(station => [station.lat, station.lng]);
            
            L.polyline(coordinates, {
                color: line.color,
                weight: 4,
                opacity: 0.7,
                smoothFactor: 1
            }).addTo(this.map);
        });
    }

    addInteractiveStations() {
        this.stations.forEach(station => {
            const marker = L.circleMarker([station.lat, station.lng], {
                color: '#ffffff',
                fillColor: station.lineColor,
                fillOpacity: 0.8,
                radius: 7,
                weight: 2
            }).addTo(this.map);

            this.stationMarkers.set(station.uniqueId, marker);

            const popupContent = `
                <div class="station-popup">
                    <h4>${station.name}</h4>
                    <div class="station-code">${station.code}</div>
                    <div class="station-line" style="color: ${station.lineColor};">
                        ${station.lineName}
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent);

            // Fixed click handler
            marker.on('click', () => {
                this.handleStationClick(station);
            });

            marker.on('mouseover', () => {
                if (!this.isStationSelected(station.uniqueId)) {
                    marker.setStyle({radius: 9, weight: 3});
                }
            });

            marker.on('mouseout', () => {
                if (!this.isStationSelected(station.uniqueId)) {
                    marker.setStyle({radius: 7, weight: 2});
                }
            });
        });
    }

    handleStationClick(station) {
        console.log('Station clicked:', station.name);
        
        if (!this.selectedSource) {
            // First click - set as source
            console.log('Setting source:', station.name);
            this.selectStation(station, 'source');
        } else if (!this.selectedDest && station.name !== this.selectedSource.name) {
            // Second click - set as destination (if different from source)
            console.log('Setting destination:', station.name);
            this.selectStation(station, 'dest');
        } else if (station.name === this.selectedSource.name) {
            this.showNotification('⚠️', 'Source and destination cannot be the same station');
        } else if (this.selectedDest) {
            // Both already selected, reset and start fresh
            this.resetSelection();
            this.selectStation(station, 'source');
        }
    }

    selectStation(station, type) {
        console.log(`Selecting station ${station.name} as ${type}`);
        
        if (type === 'source') {
            // Clear previous source
            if (this.selectedSource) {
                this.resetStationMarker(this.selectedSource);
            }
            
            this.selectedSource = station;
            this.updateStationMarker(station, 'source');
            
        } else if (type === 'dest') {
            // Clear previous destination
            if (this.selectedDest) {
                this.resetStationMarker(this.selectedDest);
            }
            
            this.selectedDest = station;
            this.updateStationMarker(station, 'dest');
        }

        this.updateSelectionStatus();
        this.updateDropdowns();

        // Calculate and display results if both stations selected
        if (this.selectedSource && this.selectedDest) {
            console.log('Both stations selected, calculating results');
            setTimeout(() => {
                this.calculateAndDisplayResults();
            }, 100);
        } else {
            this.hideResultsPanel();
            this.clearRoute();
        }
    }

    updateStationMarker(station, type) {
        const marker = this.stationMarkers.get(station.uniqueId);
        if (!marker) return;

        if (type === 'source') {
            marker.setStyle({
                fillColor: '#2196F3',
                color: '#ffffff',
                radius: 10,
                weight: 3,
                fillOpacity: 1
            });
            console.log('Updated source marker to blue');
        } else if (type === 'dest') {
            marker.setStyle({
                fillColor: '#F44336',
                color: '#ffffff',
                radius: 10,
                weight: 3,
                fillOpacity: 1
            });
            console.log('Updated destination marker to red');
        }
    }

    resetStationMarker(station) {
        const marker = this.stationMarkers.get(station.uniqueId);
        if (!marker) return;

        marker.setStyle({
            fillColor: station.lineColor,
            color: '#ffffff',
            radius: 7,
            weight: 2,
            fillOpacity: 0.8
        });
    }

    isStationSelected(stationId) {
        return (this.selectedSource && this.selectedSource.uniqueId === stationId) ||
               (this.selectedDest && this.selectedDest.uniqueId === stationId);
    }

    updateSelectionStatus() {
        const sourceIndicator = document.getElementById('sourceIndicator');
        const destIndicator = document.getElementById('destIndicator');
        const sourceStation = document.getElementById('sourceStation');
        const destStation = document.getElementById('destStation');
        const quickSwap = document.getElementById('quickSwap');

        // Reset classes
        sourceIndicator.className = 'step-indicator';
        destIndicator.className = 'step-indicator';

        // Update source indicator
        if (this.selectedSource) {
            sourceIndicator.classList.add('completed');
            sourceStation.textContent = this.selectedSource.name;
        } else {
            sourceIndicator.classList.add('active');
            sourceStation.textContent = 'Click any station';
        }

        // Update destination indicator
        if (this.selectedDest) {
            destIndicator.classList.add('completed');
            destStation.textContent = this.selectedDest.name;
        } else {
            if (this.selectedSource) {
                destIndicator.classList.add('active');
                destStation.textContent = 'Click destination';
            } else {
                destStation.textContent = 'Then click destination';
            }
        }

        // Show swap button if both stations selected
        quickSwap.style.display = (this.selectedSource && this.selectedDest) ? 'block' : 'none';
    }

    calculateAndDisplayResults() {
        if (!this.selectedSource || !this.selectedDest) return;

        console.log('Calculating results for:', this.selectedSource.name, '->', this.selectedDest.name);

        const distance = this.calculateDistance(
            this.selectedSource.lat, this.selectedSource.lng,
            this.selectedDest.lat, this.selectedDest.lng
        );
        
        const estimatedTime = Math.max(Math.ceil(distance * 2.5), 5);
        const fare = this.getFareByDistance(distance);

        console.log('Calculated:', {distance, estimatedTime, fare});

        // Update results panel
        document.getElementById('panelDistance').textContent = `${distance.toFixed(1)} km`;
        document.getElementById('panelTime').textContent = `${estimatedTime} min`;
        document.getElementById('tokenAmount').textContent = `₹${fare.token}`;
        document.getElementById('smartAmount').textContent = `₹${fare.smart_card}`;
        document.getElementById('savingsAmount').textContent = `Save ₹${fare.token - fare.smart_card}`;

        const route = this.calculateRoute(this.selectedSource, this.selectedDest);
        this.displayRoutePath(route);
        this.drawRoute();
        this.showResultsPanel();

        // Auto zoom to show both stations
        const bounds = L.latLngBounds([
            [this.selectedSource.lat, this.selectedSource.lng],
            [this.selectedDest.lat, this.selectedDest.lng]
        ]);
        this.map.fitBounds(bounds.pad(0.2));

        this.showNotification('✅', `Route: ₹${fare.smart_card} (${distance.toFixed(1)}km, ${estimatedTime}min)`);
    }

    calculateRoute(source, dest) {
        let steps = [];
        
        if (source.lineId === dest.lineId) {
            steps.push({
                type: 'travel',
                from: source.name,
                to: dest.name,
                line: source.lineName,
                color: source.lineColor,
                stations: Math.abs(dest.index - source.index)
            });
        } else {
            steps.push({
                type: 'travel',
                from: source.name,
                to: 'Ameerpet',
                line: source.lineName,
                color: source.lineColor
            });
            
            steps.push({
                type: 'interchange',
                station: 'Ameerpet',
                from: source.lineName,
                to: dest.lineName
            });
            
            steps.push({
                type: 'travel',
                from: 'Ameerpet',
                to: dest.name,
                line: dest.lineName,
                color: dest.lineColor
            });
        }
        
        return steps;
    }

    displayRoutePath(route) {
        const routePath = document.getElementById('routePath');
        
        if (!route.length) {
            routePath.innerHTML = '';
            return;
        }
        
        const stepsHtml = route.map(step => {
            if (step.type === 'travel') {
                return `
                    <div class="path-step">
                        <div class="path-icon" style="background: ${step.color};">
                            🚇
                        </div>
                        <div class="path-text">
                            ${step.from} → ${step.to}
                            <br><small>${step.line}</small>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="path-step">
                        <div class="path-icon interchange-icon">
                            ↔
                        </div>
                        <div class="path-text">
                            Change at ${step.station}
                            <br><small>${step.from} → ${step.to}</small>
                        </div>
                    </div>
                `;
            }
        }).join('');
        
        routePath.innerHTML = `<h4>Route</h4>${stepsHtml}`;
    }

    drawRoute() {
        this.clearRoute();
        
        if (!this.selectedSource || !this.selectedDest) return;

        const coordinates = [
            [this.selectedSource.lat, this.selectedSource.lng],
            [this.selectedDest.lat, this.selectedDest.lng]
        ];
        
        this.routeLine = L.polyline(coordinates, {
            color: '#2196F3',
            weight: 5,
            opacity: 0.8,
            dashArray: '10, 5'
        }).addTo(this.map);
        
        console.log('Route line drawn');
    }

    clearRoute() {
        if (this.routeLine) {
            this.map.removeLayer(this.routeLine);
            this.routeLine = null;
        }
    }

    populateStationSelects() {
        const selects = ['source-station', 'dest-station', 'fare-from', 'fare-to'];
        const uniqueStations = [];
        const stationNames = new Set();
        
        this.stations.forEach(station => {
            if (!stationNames.has(station.name)) {
                stationNames.add(station.name);
                uniqueStations.push(station);
            }
        });
        
        const sortedStations = uniqueStations.sort((a, b) => a.name.localeCompare(b.name));

        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (!select) return;

            const firstOption = select.querySelector('option');
            select.innerHTML = firstOption.outerHTML;

            sortedStations.forEach(station => {
                const option = document.createElement('option');
                option.value = station.name;
                option.textContent = `${station.name} (${station.code})`;
                select.appendChild(option);
            });
        });
    }

    updateDropdowns() {
        if (this.selectedSource) {
            const sourceSelect = document.getElementById('source-station');
            const fareFromSelect = document.getElementById('fare-from');
            if (sourceSelect) sourceSelect.value = this.selectedSource.name;
            if (fareFromSelect) fareFromSelect.value = this.selectedSource.name;
        }
        
        if (this.selectedDest) {
            const destSelect = document.getElementById('dest-station');
            const fareToSelect = document.getElementById('fare-to');
            if (destSelect) destSelect.value = this.selectedDest.name;
            if (fareToSelect) fareToSelect.value = this.selectedDest.name;
        }
    }

    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            });
        }

        // Reset selection - FIXED
        const resetBtn = document.getElementById('resetSelection');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                console.log('Reset button clicked');
                this.resetSelection();
            });
        }

        // Quick swap
        const swapBtn = document.getElementById('swapStationsBtn');
        if (swapBtn) {
            swapBtn.addEventListener('click', () => {
                this.swapStations();
            });
        }

        // Instructions - FIXED
        const gotItBtn = document.getElementById('gotItBtn');
        if (gotItBtn) {
            gotItBtn.addEventListener('click', () => {
                console.log('Got it button clicked');
                this.hideInstructions();
            });
        }

        // Panel close
        const closePanelBtn = document.getElementById('closePanelBtn');
        if (closePanelBtn) {
            closePanelBtn.addEventListener('click', () => {
                this.hideResultsPanel();
            });
        }

        // Tools toggle
        const toolsToggle = document.getElementById('toolsToggle');
        if (toolsToggle) {
            toolsToggle.addEventListener('click', () => {
                this.toggleTools();
            });
        }

        // Route planner
        const findRouteBtn = document.getElementById('findRoute');
        if (findRouteBtn) {
            findRouteBtn.addEventListener('click', () => {
                this.handleRouteFromDropdown();
            });
        }

        // Fare calculator
        const calculateFareBtn = document.getElementById('calculateFare');
        if (calculateFareBtn) {
            calculateFareBtn.addEventListener('click', () => {
                this.handleFareFromDropdown();
            });
        }

        // Dropdown changes
        const sourceSelect = document.getElementById('source-station');
        if (sourceSelect) {
            sourceSelect.addEventListener('change', (e) => {
                if (e.target.value) this.selectStationByName(e.target.value, 'source');
            });
        }

        const destSelect = document.getElementById('dest-station');
        if (destSelect) {
            destSelect.addEventListener('change', (e) => {
                if (e.target.value) this.selectStationByName(e.target.value, 'dest');
            });
        }
    }

    selectStationByName(stationName, type) {
        const station = this.stations.find(s => s.name === stationName);
        if (station) {
            this.selectStation(station, type);
        }
    }

    resetSelection() {
        console.log('Resetting selection');
        
        // Clear selections and reset markers
        if (this.selectedSource) {
            this.resetStationMarker(this.selectedSource);
            this.selectedSource = null;
        }
        
        if (this.selectedDest) {
            this.resetStationMarker(this.selectedDest);
            this.selectedDest = null;
        }

        // Clear UI
        this.updateSelectionStatus();
        this.hideResultsPanel();
        this.clearRoute();
        
        // Reset dropdowns
        const selects = ['source-station', 'dest-station', 'fare-from', 'fare-to'];
        selects.forEach(id => {
            const select = document.getElementById(id);
            if (select) select.value = '';
        });

        // Reset map view
        this.map.setView([17.4065, 78.4772], 11);
        
        this.showNotification('🔄', 'Selection reset. Click any station to start!');
    }

    swapStations() {
        if (!this.selectedSource || !this.selectedDest) return;

        const tempSource = this.selectedSource;
        this.selectedSource = this.selectedDest;
        this.selectedDest = tempSource;

        this.updateStationMarker(this.selectedSource, 'source');
        this.updateStationMarker(this.selectedDest, 'dest');

        this.updateSelectionStatus();
        this.updateDropdowns();
        this.calculateAndDisplayResults();

        this.showNotification('🔄', 'Stations swapped!');
    }

    handleRouteFromDropdown() {
        const sourceValue = document.getElementById('source-station').value;
        const destValue = document.getElementById('dest-station').value;

        if (!sourceValue || !destValue) {
            this.showNotification('⚠️', 'Please select both source and destination');
            return;
        }

        this.selectStationByName(sourceValue, 'source');
        this.selectStationByName(destValue, 'dest');
    }

    handleFareFromDropdown() {
        const fromValue = document.getElementById('fare-from').value;
        const toValue = document.getElementById('fare-to').value;

        if (!fromValue || !toValue) {
            this.showNotification('⚠️', 'Please select both stations');
            return;
        }

        this.selectStationByName(fromValue, 'source');
        this.selectStationByName(toValue, 'dest');
    }

    toggleTools() {
        const toolsContent = document.getElementById('toolsContent');
        const toggleBtn = document.getElementById('toolsToggle');
        const isVisible = toolsContent.style.display !== 'none';
        
        toolsContent.style.display = isVisible ? 'none' : 'block';
        
        const toolsIcon = toggleBtn.querySelector('.tools-icon');
        const toolsText = toggleBtn.querySelector('.tools-text');
        
        if (toolsIcon && toolsText) {
            toolsIcon.textContent = isVisible ? '⚙️' : '✖️';
            toolsText.textContent = isVisible ? 'More Tools' : 'Hide Tools';
        }
    }

    showResultsPanel() {
        const panel = document.getElementById('resultsPanel');
        if (panel) {
            panel.classList.add('show');
            console.log('Results panel shown');
        }
    }

    hideResultsPanel() {
        const panel = document.getElementById('resultsPanel');
        if (panel) {
            panel.classList.remove('show');
        }
    }

    showInstructions() {
        const overlay = document.getElementById('instructionsOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
            console.log('Instructions shown');
        }
    }

    hideInstructions() {
        const overlay = document.getElementById('instructionsOverlay');
        if (overlay) {
            overlay.style.display = 'none';
            console.log('Instructions hidden');
        }
    }

    getFareByDistance(distance) {
        if (distance <= 2) return this.fareStructure["0-2"];
        if (distance <= 4) return this.fareStructure["2-4"];
        if (distance <= 6) return this.fareStructure["4-6"];
        if (distance <= 9) return this.fareStructure["6-9"];
        if (distance <= 12) return this.fareStructure["9-12"];
        if (distance <= 15) return this.fareStructure["12-15"];
        if (distance <= 18) return this.fareStructure["15-18"];
        if (distance <= 21) return this.fareStructure["18-21"];
        if (distance <= 24) return this.fareStructure["21-24"];
        return this.fareStructure["24+"];
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const dLat = this.toRad(lat2 - lat1);
        const dLng = this.toRad(lng2 - lng1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    showNotification(icon, message) {
        const toast = document.getElementById('notificationToast');
        const toastIcon = document.getElementById('toastIcon');
        const toastMessage = document.getElementById('toastMessage');

        if (toastIcon && toastMessage && toast) {
            toastIcon.textContent = icon;
            toastMessage.textContent = message;

            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.metroApp = new EnhancedMetroMate();
});