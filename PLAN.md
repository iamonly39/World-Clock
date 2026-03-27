# Meeting Planner Panel — Implementation Plan

## Overview

Add a collapsible "Meeting Planner" panel between the header controls and the clocks grid. The panel lets a user pick a duration, build an attendee list from the same city/timezone data the app already has, and get ranked recommended meeting times based on who fits a configurable work window (8:30 AM – 5:00 PM).

---

## UI Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  📅 Meeting Planner                                       [▲/▼]  │
├──────────────────────────────────────────────────────────────────┤
│  Duration  [30 min ▼]                                            │
│                                                                  │
│  Attendees  [Select city... ▼]  [+ Add]                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  New York  (GMT−5)                                  [×] │    │
│  │  London    (GMT+0)                                  [×] │    │
│  │  Tokyo     (GMT+9)                                  [×] │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  [🔍 Find Meeting Times]                                         │
│                                                                  │
│  ── Results ──────────────────────────────────────────────────  │
│  ✅ Works for everyone                                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  10:00 AM EST  •  3:00 PM GMT  •  11:00 PM JST (next)   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ⚠️  Best partial options (Tokyo outside window)                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  8:30 AM EST  •  1:30 PM GMT  •  9:30 PM JST            │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

The panel is **collapsed by default** (just the header bar visible). A chevron button expands/collapses it. State is persisted in localStorage.

---

## Algorithm

### Search space
Iterate every **30-minute slot** across a 24-hour UTC day (48 slots total).
For each slot, convert the candidate start time into every attendee's local timezone and evaluate whether the meeting fits within **8:30 AM – 5:00 PM** local time.

```
fits(attendee, slotUTC, durationMin) =
  localStart >= 8:30 AND localStart + duration <= 17:00
```

### Scoring and bucketing
Each slot gets a **score** = number of attendees who fit.

- **Perfect slots** — score == attendeeCount → collected first
- **Best partial slots** — highest score below perfect, grouped by score, up to the top 3 unique score tiers

### Deduplication / grouping
Adjacent 30-minute slots that are all "perfect" are merged into a **window** (e.g., "9:00 AM – 11:30 AM EST is available"). Only the earliest start of each contiguous block is shown (avoids showing 9:00, 9:30, 10:00 as three separate results).

### No-overlap case
When New York + Tokyo are paired, there is genuinely no overlap in business hours. The UI shows the partial options clearly with a per-attendee badge: 🟢 in window / 🔴 outside window.

### Output structure
```javascript
{
  perfect: [
    { utcDate, localTimes: [{ city, tz, localTime, inWindow }], score }
  ],
  partial: [
    { score, slots: [ ...same shape ] }  // grouped by score descending
  ]
}
```

---

## State

```javascript
const meetingState = {
  duration: 60,       // minutes — driven by <select>
  attendees: [],      // array of cityObj: { city, timezone, lat, lon }
  open: false         // panel collapsed?
};
const MEETING_KEY = 'world-clock-meeting';  // localStorage key
```

`meetingState` is saved/loaded from localStorage (duration + attendee timezone list; panel open/closed state).

---

## New Functions in app.js

| Function | Purpose |
|---|---|
| `buildMeetingPanel()` | Creates and returns the panel DOM; called once from `init()` |
| `renderAttendees()` | Redraws the attendee chip list inside the panel |
| `addAttendee(cityObj)` | Pushes to `meetingState.attendees`, calls `renderAttendees()` |
| `removeAttendee(tz)` | Splices from attendees, rerenders |
| `findMeetingTimes()` | Core algorithm; returns `{ perfect, partial }` |
| `renderMeetingResults(results)` | Builds result cards in the results area |
| `saveMeetingState()` | Persists to localStorage |
| `loadMeetingState()` | Restores from localStorage at init |

---

## Files Changed

### `index.html`
- Add `<section id="meeting-panel"></section>` between the `.add-clock` bar and `#clocks-grid`
- (Panel contents are built dynamically by `buildMeetingPanel()`)

### `app.js`
- Add `MEETING_KEY` constant
- Add `meetingState` object
- Add all new functions listed above
- Call `buildMeetingPanel()` and `loadMeetingState()` from `init()`

### `style.css`
- `.meeting-panel` — container, border, border-radius, collapsed/expanded states
- `.meeting-panel-header` — flex row, chevron button
- `.attendee-chip` — pill with city name, offset label, remove ×
- `.meeting-result-card` — result slot card, with 🟢/🔴 per-attendee badges
- `.meeting-result-card.perfect` — green left border accent
- `.meeting-result-card.partial` — amber left border accent
- Steampunk overrides for panel border/background colors

---

## Edge Cases

| Case | Handling |
|---|---|
| 0 attendees | "Add at least one attendee" message shown in results |
| 1 attendee | Any slot in their 8:30–5 window is perfect; show first 3 |
| Duration > 8.5 hrs | Impossible to fit in any window; show explicit error |
| Attendee timezone already in list | Silently skip duplicate |
| No overlap at all | Show best partial options only with clear label |
| Meeting spans midnight for some | Show "(next day)" or "(prev day)" tag on local time |

---

## What Is NOT in scope (keep it simple)

- Drag-to-reorder attendees
- Saving named "meeting templates"
- Recurring meeting logic
- Integration with calendar apps
- Custom work hour windows per attendee (could be v2)
