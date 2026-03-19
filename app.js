const MAJOR_CITIES = [
  { city: 'New York',      timezone: 'America/New_York',               lat: 40.71,  lon: -74.01  },
  { city: 'Los Angeles',   timezone: 'America/Los_Angeles',            lat: 34.05,  lon: -118.24 },
  { city: 'Chicago',       timezone: 'America/Chicago',                lat: 41.85,  lon: -87.65  },
  { city: 'São Paulo',     timezone: 'America/Sao_Paulo',              lat: -23.55, lon: -46.63  },
  { city: 'London',        timezone: 'Europe/London',                  lat: 51.51,  lon: -0.13   },
  { city: 'Paris',         timezone: 'Europe/Paris',                   lat: 48.85,  lon: 2.35    },
  { city: 'Berlin',        timezone: 'Europe/Berlin',                  lat: 52.52,  lon: 13.41   },
  { city: 'Moscow',        timezone: 'Europe/Moscow',                  lat: 55.75,  lon: 37.62   },
  { city: 'Dubai',         timezone: 'Asia/Dubai',                     lat: 25.20,  lon: 55.27   },
  { city: 'Mumbai',        timezone: 'Asia/Kolkata',                   lat: 19.08,  lon: 72.88   },
  { city: 'Bangkok',       timezone: 'Asia/Bangkok',                   lat: 13.75,  lon: 100.52  },
  { city: 'Singapore',     timezone: 'Asia/Singapore',                 lat: 1.35,   lon: 103.82  },
  { city: 'Shanghai',      timezone: 'Asia/Shanghai',                  lat: 31.22,  lon: 121.46  },
  { city: 'Tokyo',         timezone: 'Asia/Tokyo',                     lat: 35.69,  lon: 139.69  },
  { city: 'Seoul',         timezone: 'Asia/Seoul',                     lat: 37.57,  lon: 126.98  },
  { city: 'Sydney',        timezone: 'Australia/Sydney',               lat: -33.87, lon: 151.21  },
  { city: 'Auckland',      timezone: 'Pacific/Auckland',               lat: -36.87, lon: 174.77  },
  { city: 'Honolulu',      timezone: 'Pacific/Honolulu',               lat: 21.31,  lon: -157.86 },
  { city: 'Anchorage',     timezone: 'America/Anchorage',              lat: 61.22,  lon: -149.90 },
  { city: 'Mexico City',   timezone: 'America/Mexico_City',            lat: 19.43,  lon: -99.13  },
  { city: 'Toronto',       timezone: 'America/Toronto',                lat: 43.65,  lon: -79.38  },
  { city: 'Vancouver',     timezone: 'America/Vancouver',              lat: 49.25,  lon: -123.12 },
  { city: 'Buenos Aires',  timezone: 'America/Argentina/Buenos_Aires', lat: -34.61, lon: -58.38  },
  { city: 'Cairo',         timezone: 'Africa/Cairo',                   lat: 30.06,  lon: 31.25   },
  { city: 'Nairobi',       timezone: 'Africa/Nairobi',                 lat: -1.29,  lon: 36.82   },
  { city: 'Lagos',         timezone: 'Africa/Lagos',                   lat: 6.45,   lon: 3.40    },
  { city: 'Johannesburg',  timezone: 'Africa/Johannesburg',            lat: -26.20, lon: 28.04   },
  { city: 'Istanbul',      timezone: 'Europe/Istanbul',                lat: 41.01,  lon: 28.95   },
  { city: 'Riyadh',        timezone: 'Asia/Riyadh',                    lat: 24.69,  lon: 46.72   },
  { city: 'Karachi',       timezone: 'Asia/Karachi',                   lat: 24.86,  lon: 67.01   },
  { city: 'Dhaka',         timezone: 'Asia/Dhaka',                     lat: 23.72,  lon: 90.41   },
  { city: 'Jakarta',       timezone: 'Asia/Jakarta',                   lat: -6.21,  lon: 106.85  },
  { city: 'Taipei',        timezone: 'Asia/Taipei',                    lat: 25.05,  lon: 121.53  },
  { city: 'Kolkata',       timezone: 'Asia/Kolkata',                   lat: 22.57,  lon: 88.36   },
  { city: 'Ho Chi Minh',   timezone: 'Asia/Ho_Chi_Minh',               lat: 10.82,  lon: 106.63  },
  { city: 'Kuala Lumpur',  timezone: 'Asia/Kuala_Lumpur',              lat: 3.15,   lon: 101.69  },
  { city: 'Perth',         timezone: 'Australia/Perth',                lat: -31.95, lon: 115.86  },
  { city: 'UTC',           timezone: 'UTC',                            lat: 51.48,  lon: 0.00    },
];

// WMO weather interpretation codes → emoji + label
const WMO_CODES = {
  0:  { emoji: '☀️',  label: 'Clear' },
  1:  { emoji: '🌤️', label: 'Mostly Clear' },
  2:  { emoji: '⛅',  label: 'Partly Cloudy' },
  3:  { emoji: '☁️',  label: 'Overcast' },
  45: { emoji: '🌫️', label: 'Foggy' },
  48: { emoji: '🌫️', label: 'Icy Fog' },
  51: { emoji: '🌦️', label: 'Light Drizzle' },
  53: { emoji: '🌦️', label: 'Drizzle' },
  55: { emoji: '🌧️', label: 'Heavy Drizzle' },
  61: { emoji: '🌧️', label: 'Light Rain' },
  63: { emoji: '🌧️', label: 'Rain' },
  65: { emoji: '🌧️', label: 'Heavy Rain' },
  71: { emoji: '🌨️', label: 'Light Snow' },
  73: { emoji: '❄️',  label: 'Snow' },
  75: { emoji: '❄️',  label: 'Heavy Snow' },
  77: { emoji: '🌨️', label: 'Snow Grains' },
  80: { emoji: '🌦️', label: 'Showers' },
  81: { emoji: '🌧️', label: 'Showers' },
  82: { emoji: '⛈️',  label: 'Heavy Showers' },
  85: { emoji: '🌨️', label: 'Snow Showers' },
  86: { emoji: '❄️',  label: 'Heavy Snow Showers' },
  95: { emoji: '⛈️',  label: 'Thunderstorm' },
  96: { emoji: '⛈️',  label: 'Thunderstorm' },
  99: { emoji: '⛈️',  label: 'Thunderstorm' },
};

const DEFAULT_CITIES = [
  'New York', 'London', 'Tokyo', 'Sydney', 'Dubai', 'Paris',
];

const STORAGE_KEY = 'world-clock-timezones';
const WEATHER_TTL = 15 * 60 * 1000; // 15 minutes

let activeTimezones = [];
const weatherCache = new Map(); // timezone → { data, fetchedAt }
let showAnalog = false;

// ── Weather ───────────────────────────────────────────────────────────────────

async function fetchWeather(cityObj) {
  const { timezone, lat, lon } = cityObj;
  if (lat == null || lon == null) return null;

  const cached = weatherCache.get(timezone);
  if (cached && Date.now() - cached.fetchedAt < WEATHER_TTL) return cached.data;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                `&current=temperature_2m,weather_code&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('fetch failed');
    const json = await res.json();
    const data = {
      temp: Math.round(json.current.temperature_2m),
      code: json.current.weather_code,
    };
    weatherCache.set(timezone, { data, fetchedAt: Date.now() });
    return data;
  } catch {
    return null;
  }
}

function weatherHTML(data) {
  if (!data) return '<span class="weather-unavailable">Weather unavailable</span>';
  const info = WMO_CODES[data.code] ?? { emoji: '🌡️', label: '' };
  return `<span class="weather-emoji">${info.emoji}</span>` +
         `<span class="weather-temp">${data.temp}°C</span>` +
         `<span class="weather-label">${info.label}</span>`;
}

async function loadWeatherForCard(card, cityObj) {
  const el = card.querySelector('.weather-display');
  if (!el) return;
  const data = await fetchWeather(cityObj);
  el.innerHTML = weatherHTML(data);
}

// ── State ─────────────────────────────────────────────────────────────────────

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // Re-merge with MAJOR_CITIES to pick up lat/lon fields
      return JSON.parse(saved)
        .map(s => MAJOR_CITIES.find(c => c.timezone === s.timezone) ?? s)
        .filter(Boolean);
    }
  } catch {}
  return DEFAULT_CITIES.map(name => MAJOR_CITIES.find(c => c.city === name)).filter(Boolean);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activeTimezones));
}

// ── Time formatting ───────────────────────────────────────────────────────────

function getOffsetLabel(timezone) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en', {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    });
    const parts = formatter.formatToParts(now);
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    return tzPart ? tzPart.value : timezone;
  } catch {
    return timezone;
  }
}

function formatTime(timezone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  const parts = formatter.formatToParts(now);
  const get = type => parts.find(p => p.type === type)?.value ?? '';
  return {
    hours: get('hour'),
    minutes: get('minute'),
    seconds: get('second'),
    ampm: get('dayPeriod'),
  };
}

function formatDate(timezone) {
  const now = new Date();
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(now);
}

// ── Card ──────────────────────────────────────────────────────────────────────

function createClockCard(cityObj) {
  const card = document.createElement('div');
  card.className = 'clock-card';
  card.dataset.timezone = cityObj.timezone;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.innerHTML = '&times;';
  removeBtn.title = 'Remove';
  removeBtn.addEventListener('click', () => removeClock(cityObj.timezone));

  const cityName = document.createElement('div');
  cityName.className = 'city-name';
  cityName.textContent = cityObj.city;

  const tzLabel = document.createElement('div');
  tzLabel.className = 'tz-label';
  tzLabel.textContent = getOffsetLabel(cityObj.timezone);

  const analogClock = document.createElement('div');
  analogClock.className = 'analog-clock';
  analogClock.innerHTML = `
    <div class="analog-face">
      <div class="hand hour-hand"></div>
      <div class="hand minute-hand"></div>
      <div class="hand second-hand"></div>
      <div class="clock-center"></div>
    </div>
  `;

  const timeDisplay = document.createElement('div');
  timeDisplay.className = 'time-display';

  const dateDisplay = document.createElement('div');
  dateDisplay.className = 'date-display';

  const weatherDisplay = document.createElement('div');
  weatherDisplay.className = 'weather-display';
  weatherDisplay.innerHTML = '<span class="weather-loading">Loading weather…</span>';

  card.append(removeBtn, cityName, tzLabel, analogClock, timeDisplay, dateDisplay, weatherDisplay);

  updateCard(card, cityObj.timezone);
  loadWeatherForCard(card, cityObj);
  return card;
}

function updateCard(card, timezone) {
  const { hours, minutes, seconds, ampm } = formatTime(timezone);

  // Digital
  const timeDisplay = card.querySelector('.time-display');
  timeDisplay.innerHTML =
    `${hours}:${minutes}<span class="seconds">:${seconds}</span><span class="ampm">${ampm}</span>`;
  card.querySelector('.date-display').textContent = formatDate(timezone);

  // Analog hands
  const now = new Date();
  const local = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const h = local.getHours() % 12;
  const m = local.getMinutes();
  const s = local.getSeconds();
  const hourDeg   = h * 30 + m * 0.5;
  const minuteDeg = m * 6 + s * 0.1;
  const secondDeg = s * 6;
  card.querySelector('.hour-hand').style.transform   = `rotate(${hourDeg}deg)`;
  card.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
  card.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;
}

// ── Grid ──────────────────────────────────────────────────────────────────────

function renderEmptyState() {
  const grid = document.getElementById('clocks-grid');
  grid.innerHTML = '';
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  empty.innerHTML = '<span>🌍</span>No clocks added yet. Use the dropdown above to add one!';
  grid.appendChild(empty);
}

function renderClocks() {
  const grid = document.getElementById('clocks-grid');
  grid.innerHTML = '';
  if (activeTimezones.length === 0) {
    renderEmptyState();
    return;
  }
  activeTimezones.forEach(cityObj => {
    grid.appendChild(createClockCard(cityObj));
  });
}

function tick() {
  document.querySelectorAll('.clock-card').forEach(card => {
    updateCard(card, card.dataset.timezone);
  });
}

function addClock(cityObj) {
  if (activeTimezones.some(c => c.timezone === cityObj.timezone)) return;
  activeTimezones.push(cityObj);
  saveState();

  const grid = document.getElementById('clocks-grid');
  const empty = grid.querySelector('.empty-state');
  if (empty) empty.remove();
  grid.appendChild(createClockCard(cityObj));
}

function removeClock(timezone) {
  activeTimezones = activeTimezones.filter(c => c.timezone !== timezone);
  saveState();
  const card = document.querySelector(`.clock-card[data-timezone="${CSS.escape(timezone)}"]`);
  if (card) card.remove();
  if (activeTimezones.length === 0) renderEmptyState();
}

function populateSelect() {
  const select = document.getElementById('timezone-select');
  MAJOR_CITIES.forEach(({ city, timezone }) => {
    const opt = document.createElement('option');
    opt.value = timezone;
    opt.textContent = city;
    select.appendChild(opt);
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  populateSelect();

  activeTimezones = loadState();
  renderClocks();

  document.getElementById('add-btn').addEventListener('click', () => {
    const select = document.getElementById('timezone-select');
    const timezone = select.value;
    if (!timezone) return;
    const cityObj = MAJOR_CITIES.find(c => c.timezone === timezone);
    if (cityObj) addClock(cityObj);
    select.value = '';
  });

  setInterval(tick, 1000);

  // Refresh weather every 15 minutes
  setInterval(() => {
    document.querySelectorAll('.clock-card').forEach(card => {
      const tz = card.dataset.timezone;
      const cityObj = activeTimezones.find(c => c.timezone === tz);
      if (cityObj) loadWeatherForCard(card, cityObj);
    });
  }, WEATHER_TTL);
}

// ── Analog / Digital toggle ───────────────────────────────────────────────────

const CLOCK_MODE_KEY = 'world-clock-mode';

function initClockToggle() {
  const btn = document.getElementById('clock-toggle');
  if (localStorage.getItem(CLOCK_MODE_KEY) === 'analog') setClockMode(true);

  btn.addEventListener('click', () => {
    setClockMode(!showAnalog);
    localStorage.setItem(CLOCK_MODE_KEY, showAnalog ? 'analog' : 'digital');
  });
}

function setClockMode(analog) {
  showAnalog = analog;
  document.body.classList.toggle('show-analog', analog);
  document.getElementById('clock-toggle').textContent = analog ? '🔢 Digital' : '🕐 Analog';
}

// ── Theme toggle ──────────────────────────────────────────────────────────────

const THEME_KEY = 'world-clock-theme';

function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'steampunk') applyTheme('steampunk');

  btn.addEventListener('click', () => {
    const next = document.body.classList.contains('steampunk') ? 'default' : 'steampunk';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

function applyTheme(theme) {
  const btn = document.getElementById('theme-toggle');
  if (theme === 'steampunk') {
    document.body.classList.add('steampunk');
    btn.textContent = '🔵 Default';
  } else {
    document.body.classList.remove('steampunk');
    btn.textContent = '⚙️ Steampunk';
  }
}

document.addEventListener('DOMContentLoaded', () => { init(); initTheme(); initClockToggle(); });
