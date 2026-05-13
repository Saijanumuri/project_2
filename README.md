# 🇮🇳 Bharat Niti — Rural Intelligence Platform

> Data-driven intelligence for rural development schemes across India

**CTARA IIT Bombay × Ministry of Rural Development, Government of India**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Bundle Size](https://img.shields.io/badge/bundle-82.71%20KB-blue)]()
[![React](https://img.shields.io/badge/React-19.2.5-61dafb)]()
[![License](https://img.shields.io/badge/license-Private-red)]()

---

## 📋 Overview

Bharat Niti is a comprehensive web application that provides real-time intelligence on rural development schemes across 65 Indian districts. It combines geospatial visualization, multi-scheme analytics, and AI-powered policy insights to help policymakers identify implementation gaps and prioritize interventions.

### Key Features

- 🗺️ **Interactive Map** — Leaflet-based visualization with 65 districts across 20+ states
- 📊 **Multi-Scheme Tracking** — MGNREGA, PMAY-G, PMGSY, JJM, DAY-NRLM
- 🎯 **CTARA Development Score** — Composite index across 6 research themes
- 🤖 **AI Policy Analyst** — Claude AI integration for contextual insights
- 📈 **Analytics Dashboard** — Distress rankings, coverage gaps, fund utilization
- 📄 **Policy Briefs** — Downloadable district-level reports

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ctara_p_2

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Generates optimized static files in the `build/` folder.

---

## 🏗️ Project Structure

```
bharat-niti/
├── public/
│   ├── index.html              # HTML template
│   ├── manifest.json           # PWA manifest
│   └── robots.txt              # SEO configuration
├── src/
│   ├── components/             # React components
│   │   ├── Header.js           # Navigation bar
│   │   ├── KPIBand.js          # National KPI ribbon
│   │   ├── Sidebar.js          # Filters & district list
│   │   ├── MapPanel.js         # Interactive Leaflet map
│   │   ├── RightPanel.js       # District details & AI chat
│   │   ├── Analytics.js        # Analytics dashboard
│   │   ├── Convergence.js      # Convergence table
│   │   ├── CTARAPage.js        # CTARA research view
│   │   └── README.md           # Component documentation
│   ├── App.js                  # Main application
│   ├── data.js                 # District data & helpers
│   ├── styles.js               # Global CSS
│   ├── index.js                # React entry point
│   └── index.css               # CSS reset
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 📊 Data Coverage

### Geographic Coverage

- **Districts:** 65
- **States:** 20+
- **Regions:** North, South, East, West, Central, Northeast

### Schemes Tracked

| Scheme | Full Name | Metrics |
|--------|-----------|---------|
| **MGNREGA** | Mahatma Gandhi NREGA | Completion %, Wages, Person-days |
| **PMAY-G** | PM Awaas Yojana (Gramin) | Houses completed, Fund utilization |
| **PMGSY** | PM Gram Sadak Yojana | Road connectivity, Habitations |
| **JJM** | Jal Jeevan Mission | Tap coverage, Water quality |
| **DAY-NRLM** | Deendayal Antyodaya Yojana | SHGs, Bank linkage, Loans |

### Data Sources

- MGNREGA MIS (FY 2023-24)
- PMAY-G AWAAS+ Portal (2024)
- PMGSY OMMS Dashboard (2024)
- JJM eJalShakti Dashboard (2024)
- DAY-NRLM MIS (2024)
- Census 2011, NFHS-5, Agriculture Census 2022

---

## 🎯 Core Metrics

### Convergence Score (0-100)

Average implementation across all 5 schemes:

```
(MGNREGA% + PMAY% + PMGSY% + JJM% + NRLM%) / 5
```

### CTARA Development Score (0-100)

Composite index across 6 themes:

- 💧 Water & Sanitation
- ⚡ Rural Energy
- 🌾 Livelihoods & NREGA
- 🛣️ Roads & Connectivity
- 🌱 Agriculture & Land
- 🏠 Rural Housing

### Distress Index (1-10)

Multi-dimensional indicator combining:
- Literacy rate
- Sex ratio
- Electrification
- Groundwater stress
- Rainfall dependency
- Irrigation coverage
- Agricultural yield

---

## 🤖 AI Integration

### Claude AI Policy Analyst

Powered by Anthropic's Claude 3.5 Sonnet, the AI analyst provides:

- District-specific policy recommendations
- Scheme gap analysis
- CTARA research theme mapping
- Intervention prioritization
- Fund utilization diagnostics

### Setup (Optional)

To enable AI features:

1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. Create a `.env` file in the project root:
   ```env
   REACT_APP_CLAUDE_KEY=sk-ant-your-key-here
   ```
3. Restart the development server

**Note:** For production, route API calls through a backend proxy to secure the key.

---

## 🎨 Technology Stack

### Frontend

- **React 19.2.5** — UI framework
- **Leaflet 1.9.4** — Interactive maps
- **Google Fonts** — Sora, JetBrains Mono

### External APIs

- **OpenStreetMap** — Map tiles
- **Anthropic Claude** — AI policy analysis
- **Vercel Analytics** — Usage tracking

### Build Tools

- **Create React App 5.0.1** — Build toolchain
- **Webpack** — Module bundler
- **Babel** — JavaScript compiler

---

## 📱 Views

### 1. Map View (Default)

- Interactive Leaflet map with district markers
- 7 layer options (Convergence, CTARA, 5 schemes)
- Color-coded by implementation level
- Tooltips with scheme data
- Click to view full district analysis

### 2. Analytics View

6 analytical cards showing:
- Most distressed districts
- Lowest JJM coverage
- Lowest PMAY fund utilization
- Lowest convergence
- Lowest CTARA score
- Lowest road connectivity

### 3. Convergence View

Sortable table of all 65 districts with:
- Scheme-wise performance bars
- Red highlighting for below-benchmark
- CTARA score and fund utilization
- Click-to-analyze functionality

### 4. CTARA View

Research intelligence dashboard with:
- 6 theme cards with intervention counts
- Top 12 districts by CTARA score
- 4-metric breakdown per district

---

## 🔧 Configuration

### Environment Variables

```env
# Optional: Claude AI API key
REACT_APP_CLAUDE_KEY=sk-ant-your-key-here
```

### Package.json Scripts

```json
{
  "start": "react-scripts start",      // Development server
  "build": "react-scripts build",      // Production build
  "test": "react-scripts test",        // Run tests
  "eject": "react-scripts eject"       // Eject from CRA
}
```

### Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Settings → Environment Variables → REACT_APP_CLAUDE_KEY
```

### Netlify

```bash
# Build the app
npm run build

# Drag & drop the build/ folder to netlify.com
```

### GitHub Pages

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/repo-name"

# Deploy
npm run build
npx gh-pages -d build
```

### Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
EXPOSE 3000
```

---

## 📈 Performance

### Bundle Size

- **Main JS:** 82.71 KB (gzipped)
- **CSS:** 263 B (gzipped)
- **Total:** ~83 KB

### Lighthouse Scores (Target)

- ⚡ Performance: 90+
- ♿ Accessibility: 95+
- ✅ Best Practices: 90+
- 🔍 SEO: 100

### Load Time

- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Largest Contentful Paint: <2.5s

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Manual Testing Checklist

- [ ] Map loads with all 65 districts
- [ ] District selection updates right panel
- [ ] View switching works (Map, Analytics, Convergence, CTARA)
- [ ] Search finds districts by name/state
- [ ] Filters update district list
- [ ] AI chat responds (if API key configured)
- [ ] Policy brief downloads as TXT
- [ ] Responsive on mobile/tablet

---

## 🤝 Contributing

This is a government project. For contributions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

**Private** — CTARA IIT Bombay × Ministry of Rural Development, Government of India

---

## 📞 Support

### Documentation

- [Component Documentation](src/components/README.md)
- [Refactoring Summary](REFACTORING_SUMMARY.md)
- [Cleanup Summary](CLEANUP_SUMMARY.md)
- [Full Documentation](PROJECT_DOCUMENTATION.md)

### Contact

- **Project Lead:** CTARA IIT Bombay
- **Partner:** Ministry of Rural Development, GoI
- **Website:** [ctara.iitb.ac.in](https://www.ctara.iitb.ac.in)

---

## 🙏 Acknowledgments

- **CTARA IIT Bombay** — Research and technology development
- **Ministry of Rural Development** — Data and policy guidance
- **OpenStreetMap** — Map tiles
- **Anthropic** — Claude AI
- **React Team** — Framework
- **Leaflet** — Mapping library

---

## 📝 Changelog

### Version 1.0.0 (Current)

- ✅ Initial release
- ✅ 65 districts across 20+ states
- ✅ 5 MoRD schemes integrated
- ✅ CTARA development score
- ✅ AI-powered policy analysis
- ✅ Interactive map visualization
- ✅ Analytics dashboard
- ✅ Policy brief generation
- ✅ Vercel Analytics integration
- ✅ Component-based architecture
- ✅ Production-ready build

---

<div align="center">

**Built with ❤️ for Rural India**

[CTARA IIT Bombay](https://www.ctara.iitb.ac.in) × [Ministry of Rural Development](https://rural.nic.in)

</div>
