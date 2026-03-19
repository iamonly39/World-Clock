# World Clock

A clean, dark-themed world clock app that lets you track time and live weather across the globe.

## Features

- **Multiple city clocks** — add any of 38 major cities from a dropdown
- **Live weather** — each tile shows current temperature (°C), a weather emoji, and condition label, powered by the free [Open-Meteo API](https://open-meteo.com/) (no API key required)
- **Real-time updates** — clocks tick every second; weather refreshes every 15 minutes
- **Persistent state** — your selected cities are saved in `localStorage` and restored on reload
- **Responsive grid** — tiles reflow cleanly across screen sizes
- **Steampunk theme** — click the **⚙️ Steampunk** button in the header to switch to a brass-and-copper aesthetic; click **🔵 Default** to switch back. Theme preference is saved in `localStorage`

## Usage

Open `index.html` in any modern browser — no build step or server required.

To add a city: select it from the dropdown and click **Add Clock**.
To remove a city: click the **×** button on the tile.

## Tech

- Vanilla HTML / CSS / JavaScript (no frameworks)
- [Open-Meteo](https://open-meteo.com/) for weather data
- `Intl.DateTimeFormat` for timezone-aware time formatting
