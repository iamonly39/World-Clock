const MAJOR_CITIES = [
  { city: 'New York',      timezone: 'America/New_York' },
  { city: 'Los Angeles',   timezone: 'America/Los_Angeles' },
  { city: 'Chicago',       timezone: 'America/Chicago' },
  { city: 'São Paulo',     timezone: 'America/Sao_Paulo' },
  { city: 'London',        timezone: 'Europe/London' },
  { city: 'Paris',         timezone: 'Europe/Paris' },
  { city: 'Berlin',        timezone: 'Europe/Berlin' },
  { city: 'Moscow',        timezone: 'Europe/Moscow' },
  { city: 'Dubai',         timezone: 'Asia/Dubai' },
  { city: 'Mumbai',        timezone: 'Asia/Kolkata' },
  { city: 'Bangkok',       timezone: 'Asia/Bangkok' },
  { city: 'Singapore',     timezone: 'Asia/Singapore' },
  { city: 'Shanghai',      timezone: 'Asia/Shanghai' },
  { city: 'Tokyo',         timezone: 'Asia/Tokyo' },
  { city: 'Seoul',         timezone: 'Asia/Seoul' },
  { city: 'Sydney',        timezone: 'Australia/Sydney' },
  { city: 'Auckland',      timezone: 'Pacific/Auckland' },
  { city: 'Honolulu',      timezone: 'Pacific/Honolulu' },
  { city: 'Anchorage',     timezone: 'America/Anchorage' },
  { city: 'Mexico City',   timezone: 'America/Mexico_City' },
  { city: 'Toronto',       timezone: 'America/Toronto' },
  { city: 'Vancouver',     timezone: 'America/Vancouver' },
  { city: 'Buenos Aires',  timezone: 'America/Argentina/Buenos_Aires' },
  { city: 'Cairo',         timezone: 'Africa/Cairo' },
  { city: 'Nairobi',       timezone: 'Africa/Nairobi' },
  { city: 'Lagos',         timezone: 'Africa/Lagos' },
  { city: 'Johannesburg',  timezone: 'Africa/Johannesburg' },
  { city: 'Istanbul',      timezone: 'Europe/Istanbul' },
  { city: 'Riyadh',        timezone: 'Asia/Riyadh' },
  { city: 'Karachi',       timezone: 'Asia/Karachi' },
  { city: 'Dhaka',         timezone: 'Asia/Dhaka' },
  { city: 'Jakarta',       timezone: 'Asia/Jakarta' },
  { city: 'Taipei',        timezone: 'Asia/Taipei' },
  { city: 'Kolkata',       timezone: 'Asia/Kolkata' },
  { city: 'Ho Chi Minh',   timezone: 'Asia/Ho_Chi_Minh' },
  { city: 'Kuala Lumpur',  timezone: 'Asia/Kuala_Lumpur' },
  { city: 'Perth',         timezone: 'Australia/Perth' },
  { city: 'UTC',           timezone: 'UTC' },
];

const DEFAULT_CITIES = [
  'New York', 'London', 'Tokyo', 'Sydney', 'Dubai', 'Paris',
];

const STORAGE_KEY = 'world-clock-timezones';

let activeTimezones = [];

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return DEFAULT_CITIES.map(name => MAJOR_CITIES.find(c => c.city === name)).filter(Boolean);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activeTimezones));
}

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

  const timeDisplay = document.createElement('div');
  timeDisplay.className = 'time-display';

  const dateDisplay = document.createElement('div');
  dateDisplay.className = 'date-display';

  card.append(removeBtn, cityName, tzLabel, timeDisplay, dateDisplay);

  updateCard(card, cityObj.timezone);
  return card;
}

function updateCard(card, timezone) {
  const { hours, minutes, seconds, ampm } = formatTime(timezone);
  const timeDisplay = card.querySelector('.time-display');
  timeDisplay.innerHTML =
    `${hours}:${minutes}<span class="seconds">:${seconds}</span><span class="ampm">${ampm}</span>`;
  card.querySelector('.date-display').textContent = formatDate(timezone);
}

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
}

document.addEventListener('DOMContentLoaded', init);
