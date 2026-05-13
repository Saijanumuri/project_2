# Bharat Niti — Component Structure

This folder contains all React components for the Bharat Niti application, refactored from the original monolithic `App.js` for better maintainability and code organization.

## 📁 Component Overview

```
src/
├── components/
│   ├── Header.js           # Top navigation bar with search and view switcher
│   ├── KPIBand.js          # National-level KPI ribbon
│   ├── Sidebar.js          # Left sidebar with filters and district list
│   ├── MapPanel.js         # Interactive Leaflet map with markers
│   ├── RightPanel.js       # District details panel with AI chat
│   ├── Analytics.js        # Analytics dashboard view
│   ├── Convergence.js      # Convergence table view
│   ├── CTARAPage.js        # CTARA research themes view
│   └── README.md           # This file
├── data.js                 # District data and helper functions
├── styles.js               # Global CSS-in-JS styles
├── App.js                  # Main app component (refactored)
├── App_backup.js           # Original monolithic App.js (backup)
└── index.js                # React entry point
```

## 🧩 Component Details

### Header.js
**Props:** `view`, `setView`, `search`, `setSearch`, `onSearch`  
**Purpose:** Top navigation bar with:
- Bharat Niti branding
- Search input for districts/states
- View switcher pills (Map, Analytics, Convergence, CTARA)

---

### KPIBand.js
**Props:** None (uses static KPIS data)  
**Purpose:** Horizontal ribbon displaying 5 national-level KPIs:
- MGNREGA Active HH
- PMAY-G Completed
- PMGSY Roads
- JJM Tap HH
- SHG Members

---

### Sidebar.js
**Props:** `layer`, `setLayer`, `state`, `setState`, `sort`, `setSort`, `sel`, `onSel`  
**Purpose:** Left sidebar with:
- State filter dropdown
- Sort options (distress, convergence, JJM, CTARA, A-Z)
- Map layer selector (7 schemes)
- Scrollable district list with scores

**Dependencies:** `districts`, `getConv`, `getCTARA`, `distressInfo`, `pctColor`, `stateList` from `data.js`

---

### MapPanel.js
**Props:** `sel`, `onSel`, `layer`, `setLayer`, `stateFilter`  
**Purpose:** Interactive Leaflet map with:
- Circle markers for each district
- Color-coded by implementation level
- Tooltips with scheme data
- Layer switcher buttons
- Legend for implementation levels

**Dependencies:** `districts`, `getConv`, `getCTARA`, `getFU`, `distressInfo`, `pctColor`, `fmtL` from `data.js`

**External:** Leaflet.js (loaded via CDN in App.js)

---

### RightPanel.js
**Props:** `d` (selected district), `onClose` (unused)  
**Purpose:** Right panel showing:
- District header with tags (distress, convergence, CTARA)
- Hero card with convergence score
- CTARA development score breakdown
- 5 MoRD scheme implementation cards
- Implementation gaps list
- Policy brief download button
- AI chat interface (Claude integration)

**Dependencies:** `BENCHMARKS`, `getConv`, `getCTARA`, `getFU`, `distressInfo`, `fmtL` from `data.js`

**External:** Claude AI API (Anthropic)

---

### Analytics.js
**Props:** `onSel`  
**Purpose:** Analytics dashboard with 6 cards:
- Most Distressed Districts
- Lowest JJM Coverage
- Lowest PMAY Fund Utilization
- Lowest Convergence
- Lowest CTARA Score
- Lowest Road Connectivity

**Dependencies:** `districts`, `getConv`, `getCTARA`, `getFU`, `distressInfo` from `data.js`

---

### Convergence.js
**Props:** `onSel`  
**Purpose:** Full convergence table showing:
- All 65 districts sorted by convergence score
- Scheme-wise performance bars (MGNREGA, PMAY-G, PMGSY, JJM, NRLM)
- Red highlighting for below-benchmark performance
- CTARA score and fund utilization columns

**Dependencies:** `districts`, `BENCHMARKS`, `getConv`, `getCTARA`, `getFU`, `distressInfo` from `data.js`

---

### CTARAPage.js
**Props:** `onSel`  
**Purpose:** CTARA research intelligence view with:
- 6 research theme cards (Water, Energy, Livelihoods, Roads, Agriculture, Housing)
- Intervention count per theme
- Top 12 districts by CTARA score
- 4-metric breakdown per district

**Dependencies:** `districts`, `getCTARA` from `data.js`

---

## 🔄 Data Flow

```
App.js (State Management)
  ├─> Header (view, search)
  ├─> KPIBand (static)
  ├─> Sidebar (filters, selection)
  ├─> MapPanel (map rendering, selection)
  ├─> Analytics (district selection)
  ├─> Convergence (district selection)
  ├─> CTARAPage (district selection)
  └─> RightPanel (selected district data)
```

**State Variables:**
- `view` — Current view (Map, Analytics, Convergence, CTARA)
- `sel` — Selected district object
- `layer` — Active map layer (conv, ctara, mg, pm, pg, jj, nl)
- `state` — State filter (empty = all states)
- `sort` — District list sort order
- `search` — Search query string
- `mapOK` — Leaflet loaded flag

---

## 🎨 Styling

All CSS is defined in `src/styles.js` and injected once in `App.js` via:

```javascript
const style = document.createElement('style');
style.id = 'bharat-niti-styles';
style.textContent = CSS;
document.head.appendChild(style);
```

**Why CSS-in-JS?**
- Single-file distribution (no external CSS files)
- Scoped to the app (no global pollution)
- Easy to maintain alongside components

---

## 🚀 Adding New Components

1. Create `src/components/YourComponent.js`
2. Import required data/helpers from `data.js`
3. Define props interface
4. Export default function
5. Import in `App.js` and add to render tree
6. Add CSS classes to `src/styles.js` if needed

**Example:**

```javascript
// src/components/NewView.js
import { districts } from '../data';

function NewView({ onSel }) {
  return (
    <div className="ctr new-view">
      {districts.map(d => (
        <div key={d.id} onClick={() => onSel(d)}>
          {d.name}
        </div>
      ))}
    </div>
  );
}

export default NewView;
```

---

## ✅ Benefits of This Structure

1. **Maintainability** — Each component is self-contained and easy to update
2. **Reusability** — Components can be reused in different contexts
3. **Testability** — Individual components can be unit tested
4. **Readability** — Clear separation of concerns
5. **Scalability** — Easy to add new views and features
6. **Collaboration** — Multiple developers can work on different components

---

## 📝 Notes

- **Original App.js** is backed up as `App_backup.js`
- **No functionality changed** — this is a pure refactor
- **Build size unchanged** — same bundle size as before
- **All features work** — map, analytics, AI chat, policy briefs, etc.

---

**Refactored:** May 13, 2026  
**Original Lines:** 949 (App.js)  
**New Structure:** 8 components + 1 main App (avg ~150 lines each)
