# 🕐 World Clock Dashboard - Steampunk Edition

A richly-styled world clock dashboard showing real-time information across all major timezones (AMER, EMEA, APJ) with analog and digital clock displays, integrated weather information, and a retro-steampunk aesthetic.

## Features

✨ **Steampunk Styling**
- Brass and copper color scheme with authentic steampunk design
- Glowing effects and ornamental borders
- Animated rotating gears in the header
- Intricate dial patterns and shadow effects

🕰️ **Dual Clock Displays**
- **Analog Clocks**: Traditional clockface with hour, minute, and second hands
- **Digital Clocks**: Seven-segment style digital time display with date
- Toggle switch with retro/steampunk appearance
- Smooth transitions between display modes

🌍 **Global Coverage**
- **AMER**: New York, Los Angeles, Toronto, Mexico City, São Paulo, Santiago
- **EMEA**: London, Paris, Berlin, Dubai, Cairo, Johannesburg
- **APJ**: Tokyo, Shanghai, Sydney, Singapore, Hong Kong, Mumbai

🌤️ **Live Weather Data**
- Current temperature and conditions for each city
- Weather icons that reflect actual conditions
- Automatic updates via Open-Meteo API (no API key required)

🎨 **Professional UI/UX**
- Region-based tab navigation
- Responsive grid layout
- Hover effects and animations
- Loading spinner during initialization
- Mobile-friendly design

## Project Structure

```
World-Clock/
├── index.html      # HTML structure and layout
├── styles.css      # Steampunk styling and animations
├── script.js       # Clock logic, time calculations, weather API
└── README.md       # This file
```

## How to Use

1. **Open the dashboard** in a modern web browser
2. **Toggle Display Mode**: Click the retro toggle switch to switch between:
   - Analog display (left position)
   - Digital display (right position)
3. **Navigate Regions**: Use the region tabs to switch between:
   - AMERICAS (AMER)
   - EMEA (Europe, Middle East, Africa)
   - APJ (Asia-Pacific & Japan)
4. **View Information**: Each city card displays:
   - City name and timezone
   - Current time (analog or digital)
   - Weather icon and temperature
   - Weather condition description

## Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Advanced styling with gradients, shadows, and animations
- **Vanilla JavaScript**: No external dependencies for core functionality
- **Open-Meteo API**: Free weather data (no authentication required)

### Clock Implementation

#### Analog Clocks
- SVG hour markers
- CSS-based hand animations
- Real-time rotation calculations based on hour, minute, and second values
- Smooth continuous updates (1000ms interval)

#### Digital Clocks
- Custom seven-segment style font appearance
- Time format: HH:MM:SS
- Date format: DAY DD/MM/YYYY
- Full timezone support via JavaScript's `toLocaleString()`

### Weather Data
- API: Open-Meteo (free, no API key required)
- Endpoint: `api.open-meteo.com/v1/forecast`
- Current conditions with automatic interpretation
- Temperature in Celsius
- Cached responses for performance

## Color Scheme

| Element | Color | Hex |
|---------|-------|-----|
| Primary Brass | Bright Brass | #D4AF37 |
| Dark Brass | Dark Brass | #AA8C2C |
| Light Brass | Cream | #E5D4A8 |
| Dark Metal | Steel | #2C3E50 |
| Copper | Copper | #B87333 |
| Accent | Deep Red | #8B0000 |

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Lightweight (~15KB assets)
- No external dependencies
- Efficient CSS animations using transforms and opacity
- Weather data caching to minimize API calls
- Viewport-based rendering

## Future Enhancements

- [ ] Timezone offset indicators
- [ ] Alarm functionality
- [ ] Custom city selection
- [ ] 12/24 hour format toggle
- [ ] Sunrise/sunset times
- [ ] Moon phase information
- [ ] Stock market opening/closing indicators
- [ ] Local time format preferences

## License

Free to use and modify for personal and commercial projects.

## Attribution

- Weather data provided by Open-Meteo (openmeteo.com)
- No external libraries or code dependencies used
- Steampunk design inspired by Victorian-era mechanical designs

---

**Created with ⚙️ and dedication to the steampunk aesthetic**
