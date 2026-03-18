// ================== WORLD CLOCK CONFIGURATION ================== //

const CITIES_CONFIG = {
    AMER: [
        { name: 'New York', timezone: 'America/New_York', lat: 40.7128, lon: -74.0060 },
        { name: 'Los Angeles', timezone: 'America/Los_Angeles', lat: 34.0522, lon: -118.2437 },
        { name: 'Toronto', timezone: 'America/Toronto', lat: 43.6532, lon: -79.3832 },
        { name: 'Mexico City', timezone: 'America/Mexico_City', lat: 19.4326, lon: -99.1332 },
        { name: 'São Paulo', timezone: 'America/Sao_Paulo', lat: -23.5505, lon: -46.6333 },
        { name: 'Santiago', timezone: 'America/Santiago', lat: -33.8688, lon: -51.2093 }
    ],
    EMEA: [
        { name: 'London', timezone: 'Europe/London', lat: 51.5074, lon: -0.1278 },
        { name: 'Paris', timezone: 'Europe/Paris', lat: 48.8566, lon: 2.3522 },
        { name: 'Berlin', timezone: 'Europe/Berlin', lat: 52.5200, lon: 13.4050 },
        { name: 'Dubai', timezone: 'Asia/Dubai', lat: 25.2048, lon: 55.2708 },
        { name: 'Cairo', timezone: 'Africa/Cairo', lat: 30.0444, lon: 31.2357 },
        { name: 'Johannesburg', timezone: 'Africa/Johannesburg', lat: -26.2023, lon: 28.0436 }
    ],
    APJ: [
        { name: 'Tokyo', timezone: 'Asia/Tokyo', lat: 35.6762, lon: 139.6503 },
        { name: 'Shanghai', timezone: 'Asia/Shanghai', lat: 31.2304, lon: 121.4737 },
        { name: 'Sydney', timezone: 'Australia/Sydney', lat: -33.8688, lon: 151.2093 },
        { name: 'Singapore', timezone: 'Asia/Singapore', lat: 1.3521, lon: 103.8198 },
        { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', lat: 22.2783, lon: 114.1747 },
        { name: 'Mumbai', timezone: 'Asia/Kolkata', lat: 19.0760, lon: 72.8777 }
    ]
};

// ================== STATE MANAGEMENT ================== //

let state = {
    isDigital: false,
    currentRegion: 'AMER',
    weatherCache: {},
    timeIntervalId: null
};

// ================== INITIALIZATION ================== //

document.addEventListener('DOMContentLoaded', () => {
    initializeClocks();
    setupEventListeners();
    startTimeUpdates();
    hideLoadingSpinner();
});

function initializeClocks() {
    Object.entries(CITIES_CONFIG).forEach(([region, cities]) => {
        const regionContainer = document.getElementById(region);
        cities.forEach(city => {
            const card = createClockCard(city, region);
            regionContainer.appendChild(card);
        });
    });
}

function setupEventListeners() {
    // Toggle switch
    document.getElementById('displayToggle').addEventListener('change', (e) => {
        state.isDigital = e.target.checked;
        document.body.classList.toggle('show-digital', state.isDigital);
        updateAllClocks();
    });

    // Region tabs
    document.querySelectorAll('.region-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            document.querySelectorAll('.region-grid').forEach(grid => grid.classList.remove('active-region'));
            document.getElementById(e.target.dataset.region).classList.add('active-region');
            
            state.currentRegion = e.target.dataset.region;
        });
    });
}

function startTimeUpdates() {
    updateAllClocks();
    state.timeIntervalId = setInterval(updateAllClocks, 1000);
}

// ================== CLOCK CARD CREATION ================== //

function createClockCard(city, region) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.dataset.city = city.name;
    card.dataset.timezone = city.timezone;

    const content = document.createElement('div');
    content.className = 'clock-card-content';

    // City name
    const cityName = document.createElement('div');
    cityName.className = 'city-name';
    cityName.textContent = city.name;
    content.appendChild(cityName);

    // Timezone info
    const tzInfo = document.createElement('div');
    tzInfo.className = 'timezone-info';
    tzInfo.textContent = city.timezone;
    content.appendChild(tzInfo);

    // Analog clock
    const analogClock = document.createElement('div');
    analogClock.className = 'analog-clock';
    analogClock.innerHTML = `
        <svg style="position: absolute; width: 100%; height: 100%; z-index: 3;">
            ${generateHourMarkers()}
        </svg>
        <div class="hand hour-hand" data-type="hour"></div>
        <div class="hand minute-hand" data-type="minute"></div>
        <div class="hand second-hand" data-type="second"></div>
        <div class="clock-center"></div>
    `;
    content.appendChild(analogClock);

    // Digital clock
    const digitalClock = document.createElement('div');
    digitalClock.className = 'digital-clock';
    digitalClock.innerHTML = `
        <div class="digital-display">
            <div class="digital-time" data-time="time"></div>
            <div class="digital-date" data-time="date"></div>
        </div>
    `;
    content.appendChild(digitalClock);

    // Weather info
    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';
    weatherInfo.innerHTML = `
        <div class="weather-icon" data-weather="icon">🌤️</div>
        <div class="weather-details">
            <div class="weather-temp" data-weather="temp">--°C</div>
            <div class="weather-condition" data-weather="condition">Loading...</div>
        </div>
    `;
    content.appendChild(weatherInfo);

    card.appendChild(content);

    // Fetch weather
    fetchWeatherForCity(city.lat, city.lon, weatherInfo);

    return card;
}

function generateHourMarkers() {
    let svg = '';
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30) - 90;
        const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
        const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
        const size = i % 3 === 0 ? 2 : 1;
        svg += `<circle cx="${x}" cy="${y}" r="${size}" fill="rgba(0,0,0,0.6)" />`;
    }
    return svg;
}

// ================== TIME UPDATES ================== //

function updateAllClocks() {
    document.querySelectorAll('.clock-card').forEach(card => {
        updateClockCard(card);
    });
    updateLastUpdate();
}

function updateClockCard(card) {
    const timezone = card.dataset.timezone;
    const now = new Date();
    const cityTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));

    if (state.isDigital) {
        updateDigitalDisplay(card, cityTime);
    } else {
        updateAnalogDisplay(card, cityTime);
    }
}

function updateAnalogDisplay(card, cityTime) {
    const hours = cityTime.getHours();
    const minutes = cityTime.getMinutes();
    const seconds = cityTime.getSeconds();

    const hourHand = card.querySelector('.hour-hand');
    const minuteHand = card.querySelector('.minute-hand');
    const secondHand = card.querySelector('.second-hand');

    // Calculate angles
    const secondAngle = (seconds * 6); // 360 / 60
    const minuteAngle = (minutes * 6) + (seconds * 0.1);
    const hourAngle = (hours % 12) * 30 + (minutes * 0.5);

    // Apply rotations
    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
}

function updateDigitalDisplay(card, cityTime) {
    const hours = String(cityTime.getHours()).padStart(2, '0');
    const minutes = String(cityTime.getMinutes()).padStart(2, '0');
    const seconds = String(cityTime.getSeconds()).padStart(2, '0');

    const timeElement = card.querySelector('[data-time="time"]');
    const dateElement = card.querySelector('[data-time="date"]');

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;

    const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][cityTime.getDay()];
    const date = String(cityTime.getDate()).padStart(2, '0');
    const month = String(cityTime.getMonth() + 1).padStart(2, '0');
    const year = cityTime.getFullYear();

    dateElement.textContent = `${dayOfWeek} ${date}/${month}/${year}`;
}

// ================== WEATHER DATA ================== //

async function fetchWeatherForCity(lat, lon, weatherContainer) {
    const cacheKey = `${lat},${lon}`;
    
    if (state.weatherCache[cacheKey]) {
        displayWeather(weatherContainer, state.weatherCache[cacheKey]);
        return;
    }

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
        );
        const data = await response.json();
        
        if (data.current) {
            state.weatherCache[cacheKey] = data.current;
            displayWeather(weatherContainer, data.current);
        }
    } catch (error) {
        console.error('Weather fetch error:', error);
    }
}

function displayWeather(container, weatherData) {
    const temp = Math.round(weatherData.temperature_2m);
    const condition = getWeatherDescription(weatherData.weather_code);
    const icon = getWeatherIcon(weatherData.weather_code);

    container.querySelector('[data-weather="temp"]').textContent = `${temp}°C`;
    container.querySelector('[data-weather="condition"]').textContent = condition;
    container.querySelector('[data-weather="icon"]').textContent = icon;
}

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight showers',
        81: 'Moderate showers',
        82: 'Violent showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Thunderstorm with hail'
    };
    return descriptions[code] || 'Unknown';
}

function getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 86) return '❄️';
    if (code >= 80 && code <= 82) return '🌧️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '🌤️';
}

// ================== UI UTILITIES ================== //

function updateLastUpdate() {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    document.getElementById('lastUpdate').textContent = timeStr;
}

function hideLoadingSpinner() {
    setTimeout(() => {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }, 500);
}
