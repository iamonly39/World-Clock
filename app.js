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

// ── Analog clock face (SVG) ───────────────────────────────────────────────────

function buildAnalogFace(cityName) {
  const marks = [];

  // 60 tick marks: dots for minutes, dashes for hours
  for (let i = 0; i < 60; i++) {
    const rad = (i * 6 - 90) * Math.PI / 180;
    const isMainHour = i % 15 === 0;
    const isHour     = i % 5 === 0;
    if (isHour) {
      const outer = 82, inner = isMainHour ? 72 : 76;
      const w = isMainHour ? 3.5 : 2.5;
      const x1 = (100 + inner * Math.cos(rad)).toFixed(2);
      const y1 = (100 + inner * Math.sin(rad)).toFixed(2);
      const x2 = (100 + outer * Math.cos(rad)).toFixed(2);
      const y2 = (100 + outer * Math.sin(rad)).toFixed(2);
      marks.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#111" stroke-width="${w}" stroke-linecap="square"/>`);
    } else {
      const r = 79;
      const cx = (100 + r * Math.cos(rad)).toFixed(2);
      const cy = (100 + r * Math.sin(rad)).toFixed(2);
      marks.push(`<circle cx="${cx}" cy="${cy}" r="1.4" fill="#444"/>`);
    }
  }

  // Numbers 1–12
  const numR = 63;
  for (let n = 1; n <= 12; n++) {
    const rad = (n * 30 - 90) * Math.PI / 180;
    const x = (100 + numR * Math.cos(rad)).toFixed(2);
    const y = (100 + numR * Math.sin(rad)).toFixed(2);
    marks.push(`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-family="'Helvetica Neue',Arial,sans-serif" font-size="12" fill="#111">${n}</text>`);
  }

  const label = (cityName || '').toUpperCase();

  return `<svg class="analog-face" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="99" fill="#1c1c1c"/>
  <circle class="clock-face-bg" cx="100" cy="100" r="84" fill="#ffffff"/>
  ${marks.join('\n  ')}
  <text class="clock-city-label" x="100" y="126" text-anchor="middle" dominant-baseline="central" font-family="'Helvetica Neue',Arial,sans-serif" font-size="9.5" font-weight="500" letter-spacing="2" fill="#111">${label}</text>
  <line class="hour-hand"   x1="100" y1="100" x2="100" y2="50"  stroke="#111" stroke-width="5.5" stroke-linecap="round"/>
  <line class="minute-hand" x1="100" y1="100" x2="100" y2="24"  stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
  <line class="second-hand" x1="100" y1="115" x2="100" y2="22"  stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
  <circle class="clock-cap" cx="100" cy="100" r="3.5" fill="#b8860b"/>
</svg>`;
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
  analogClock.innerHTML = buildAnalogFace(cityObj.city);

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
  // Apply current display mode
  if (showAnalog) {
    analogClock.style.display = 'block';
    timeDisplay.style.display = 'none';
    dateDisplay.style.display = 'none';
  }
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
  const face = card.querySelector('.analog-face');
  if (face) {
    face.querySelector('.hour-hand').setAttribute('transform', `rotate(${hourDeg}, 100, 100)`);
    face.querySelector('.minute-hand').setAttribute('transform', `rotate(${minuteDeg}, 100, 100)`);
    face.querySelector('.second-hand').setAttribute('transform', `rotate(${secondDeg}, 100, 100)`);
  }
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
  document.getElementById('clock-toggle').textContent = analog ? '🔢 Digital' : '🕐 Analog';
  document.querySelectorAll('.clock-card').forEach(card => {
    card.querySelector('.analog-clock').style.display  = analog ? 'block' : 'none';
    card.querySelector('.time-display').style.display  = analog ? 'none'  : '';
    card.querySelector('.date-display').style.display  = analog ? 'none'  : '';
  });
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

// ── Meeting Planner ───────────────────────────────────────────────────────────

const MEETING_KEY = 'world-clock-meeting';

const meetingState = {
  duration: 60,
  attendees: [],
  open: false
};

function saveMeetingState() {
  localStorage.setItem(MEETING_KEY, JSON.stringify({
    duration: meetingState.duration,
    attendees: meetingState.attendees.map(a => a.timezone),
    open: meetingState.open
  }));
}

function loadMeetingState() {
  try {
    const saved = JSON.parse(localStorage.getItem(MEETING_KEY) || '{}');
    if (saved.duration) meetingState.duration = saved.duration;
    if (saved.open)     meetingState.open = saved.open;
    if (Array.isArray(saved.attendees)) {
      meetingState.attendees = saved.attendees
        .map(tz => MAJOR_CITIES.find(c => c.timezone === tz))
        .filter(Boolean);
    }
  } catch {}
}

function addAttendee(cityObj) {
  if (meetingState.attendees.some(a => a.timezone === cityObj.timezone)) return;
  meetingState.attendees.push(cityObj);
  saveMeetingState();
  renderAttendees();
}

function removeAttendee(timezone) {
  meetingState.attendees = meetingState.attendees.filter(a => a.timezone !== timezone);
  saveMeetingState();
  renderAttendees();
}

function renderAttendees() {
  const list = document.getElementById('meeting-attendee-list');
  if (!list) return;
  list.innerHTML = '';
  if (meetingState.attendees.length === 0) {
    list.innerHTML = '<span class="meeting-hint">No attendees added yet.</span>';
    return;
  }
  meetingState.attendees.forEach(a => {
    const chip = document.createElement('div');
    chip.className = 'attendee-chip';
    chip.innerHTML = `
      <span class="chip-city">${a.city}</span>
      <span class="chip-offset">${getOffsetLabel(a.timezone)}</span>
      <button class="chip-remove" title="Remove">&times;</button>
    `;
    chip.querySelector('.chip-remove').addEventListener('click', () => removeAttendee(a.timezone));
    list.appendChild(chip);
  });
}

function pickSpaced(slots, count) {
  const MIN_GAP_MS = 2 * 60 * 60 * 1000;
  const picks = [];
  for (const s of slots) {
    if (picks.length >= count) break;
    const last = picks[picks.length - 1];
    if (!last || s.slotDate - last.slotDate >= MIN_GAP_MS) picks.push(s);
  }
  return picks;
}

function findMeetingTimes(attendees, durationMinutes) {
  const WORK_START  = 8.5;
  const WORK_END    = 17.0;
  const durationHrs = durationMinutes / 60;

  if (attendees.length === 0) return { noAttendees: true, perfect: [], partial: [] };
  if (durationHrs > (WORK_END - WORK_START)) return { impossible: true, perfect: [], partial: [] };

  const base = new Date();
  base.setUTCHours(0, 0, 0, 0);

  const slots = [];
  for (let i = 0; i < 48; i++) {
    const slotDate = new Date(base.getTime() + i * 30 * 60 * 1000);
    const attendeeResults = attendees.map(a => {
      const local     = new Date(slotDate.toLocaleString('en-US', { timeZone: a.timezone }));
      const localHour = local.getHours() + local.getMinutes() / 60;
      const inWindow  = localHour >= WORK_START && (localHour + durationHrs) <= WORK_END;
      const timeStr   = local.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      const dayOffset = local.getDate() - slotDate.getUTCDate();
      return { city: a.city, timezone: a.timezone, timeStr, inWindow, dayOffset };
    });
    slots.push({ slotDate, attendeeResults, score: attendeeResults.filter(r => r.inWindow).length });
  }

  const n = attendees.length;
  const perfect = pickSpaced(slots.filter(s => s.score === n), 3);

  let partial = [];
  if (perfect.length === 0 && n > 1) {
    const maxScore = Math.max(...slots.map(s => s.score));
    if (maxScore > 0) partial = pickSpaced(slots.filter(s => s.score === maxScore), 3);
  }

  return { noAttendees: false, impossible: false, perfect, partial };
}

function buildResultCard(slot) {
  const card = document.createElement('div');
  card.className = 'meeting-result-card';
  slot.attendeeResults.forEach(r => {
    const row = document.createElement('div');
    row.className = 'result-row';
    let dayTag = '';
    if (r.dayOffset > 0)      dayTag = ' <span class="day-tag">+1d</span>';
    else if (r.dayOffset < 0) dayTag = ' <span class="day-tag">-1d</span>';
    row.innerHTML = `
      <span class="result-dot ${r.inWindow ? 'green' : 'red'}"></span>
      <span class="result-city">${r.city}</span>
      <span class="result-time">${r.timeStr}${dayTag}</span>
    `;
    card.appendChild(row);
  });
  return card;
}

function renderMeetingResults(results) {
  const area = document.getElementById('meeting-results');
  if (!area) return;
  area.innerHTML = '';

  if (results.noAttendees) {
    area.innerHTML = '<p class="meeting-hint">Add at least one attendee to find meeting times.</p>';
    return;
  }
  if (results.impossible) {
    area.innerHTML = '<p class="meeting-hint meeting-error">Duration exceeds the 8:30 AM – 5:00 PM work window. Choose a shorter meeting.</p>';
    return;
  }
  if (results.perfect.length === 0 && results.partial.length === 0) {
    area.innerHTML = '<p class="meeting-hint">No suitable times found. Try a shorter duration.</p>';
    return;
  }

  if (results.perfect.length > 0) {
    const h = document.createElement('p');
    h.className = 'results-heading perfect';
    h.textContent = '\u2705 Works for everyone';
    area.appendChild(h);
    results.perfect.forEach(s => area.appendChild(buildResultCard(s)));
  }

  if (results.partial.length > 0) {
    const out = results.partial[0].attendeeResults.filter(r => !r.inWindow).map(r => r.city).join(', ');
    const h = document.createElement('p');
    h.className = 'results-heading partial';
    h.textContent = '\u26a0\ufe0f Best option \u2014 outside window for: ' + out;
    area.appendChild(h);
    results.partial.forEach(s => area.appendChild(buildResultCard(s)));
  }
}

function buildMeetingPanel() {
  const panel = document.getElementById('meeting-panel');
  panel.className = 'meeting-panel' + (meetingState.open ? ' open' : '');

  panel.innerHTML = `
    <div class="meeting-panel-header">
      <span class="meeting-title">\ud83d\udcc5 Meeting Planner</span>
      <button class="meeting-chevron" title="Toggle">${meetingState.open ? '\u25b2' : '\u25bc'}</button>
    </div>
    <div class="meeting-panel-body">
      <div class="meeting-controls">
        <label class="meeting-label">Duration
          <select id="meeting-duration">
            <option value="30">30 min</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
            <option value="180">3 hours</option>
          </select>
        </label>
        <label class="meeting-label">Add attendee
          <div class="meeting-add-row">
            <select id="meeting-tz-select">
              <option value="">-- Select city --</option>
            </select>
            <button id="meeting-add-btn">+ Add</button>
          </div>
        </label>
      </div>
      <div id="meeting-attendee-list" class="meeting-attendee-list"></div>
      <button id="meeting-find-btn" class="meeting-find-btn">\ud83d\udd0d Find Meeting Times</button>
      <div id="meeting-results" class="meeting-results"></div>
    </div>
  `;

  const sel = panel.querySelector('#meeting-tz-select');
  MAJOR_CITIES.forEach(({ city, timezone }) => {
    const opt = document.createElement('option');
    opt.value = timezone;
    opt.textContent = city;
    sel.appendChild(opt);
  });

  panel.querySelector('#meeting-duration').value = meetingState.duration;

  panel.querySelector('.meeting-chevron').addEventListener('click', () => {
    meetingState.open = !meetingState.open;
    panel.classList.toggle('open', meetingState.open);
    panel.querySelector('.meeting-chevron').textContent = meetingState.open ? '\u25b2' : '\u25bc';
    saveMeetingState();
  });

  panel.querySelector('#meeting-duration').addEventListener('change', e => {
    meetingState.duration = parseInt(e.target.value, 10);
    saveMeetingState();
  });

  panel.querySelector('#meeting-add-btn').addEventListener('click', () => {
    const tz = panel.querySelector('#meeting-tz-select').value;
    if (!tz) return;
    const cityObj = MAJOR_CITIES.find(c => c.timezone === tz);
    if (cityObj) addAttendee(cityObj);
    panel.querySelector('#meeting-tz-select').value = '';
  });

  panel.querySelector('#meeting-find-btn').addEventListener('click', () => {
    renderMeetingResults(findMeetingTimes(meetingState.attendees, meetingState.duration));
  });
}

function initMeetingPanel() {
  loadMeetingState();
  buildMeetingPanel();
  renderAttendees();
}

document.addEventListener('DOMContentLoaded', () => { init(); initTheme(); initClockToggle(); initMeetingPanel(); });
