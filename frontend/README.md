# FireWatch AI — Frontend Module
**Module Owner: ANVI (Frontend & UI/UX Lead)**

This directory contains the production-grade React application for FireWatch AI.

---

## 🎨 Visual Identity & Design System
- **Theme:** Minimal, modern, dark geospatial intelligence command centre
- **Surfaces:**
  - Main background: `#0D0F10`
  - Secondary background: `#141718`
  - Card surfaces: `#191D1E`
  - Elevated surfaces: `#202526`
  - Borders: `#2B3031`
- **Typography:** Inter hierarchy with compact monospace metrics
- **Accent Orange:** `#D97735` (strictly reserved for primary actions, active indicators, and small highlights)
- **Wildfire Risk Severity Color System:**
  - 🟢 **Low (<35%):** `#43A879`
  - 🟡 **Moderate (35–54%):** `#D5B34A`
  - 🟠 **High (55–74%):** `#DB873A`
  - 🔴 **Very High (75–87%):** `#D95343`
  - 🟣 **Extreme (≥88%):** `#8F2528`

---

## 📁 Architecture & File Layout
```text
frontend/
├── src/
│   ├── assets/              <- Static assets & icons
│   ├── components/
│   │   ├── common/          <- Card, RiskBadge, Button, StatMetric, SimulationDisclaimer, Toast, LoadingSpinner
│   │   ├── layout/          <- Sidebar, Navbar, Footer
│   │   ├── dashboard/       <- MetricsOverview, EnvironmentalSummaryCard, RiskDistributionWidget, RecentPredictionsTable, ActiveAlertsList, MiniMapCard
│   │   ├── maps/            <- RiskMapContainer (Leaflet), LocationInfoDrawer, MapLegend
│   │   ├── charts/          <- RiskPieChart, TrendLineChart, EnvironmentalComparisonChart
│   │   └── alerts/          <- AlertCard, AlertFilterBar
│   ├── pages/
│   │   ├── Dashboard.jsx    <- Central command overview
│   │   ├── RiskMap.jsx      <- Interactive Leaflet geospatial map + simulator
│   │   ├── HistoricalData.jsx <- Incident archive, comparisons & trend charts
│   │   ├── Alerts.jsx       <- Early warnings & mitigation directives
│   │   ├── About.jsx        <- Scientific foundations & team module division
│   │   └── NotFound.jsx     <- 404 handler
│   ├── layouts/
│   │   └── MainLayout.jsx   <- Master layout with responsive drawer & toasts
│   ├── services/
│   │   ├── api.js           <- Centralized fetch client (mock/live toggle)
│   │   ├── mockData.js      <- Isolated realistic simulation telemetry
│   │   ├── riskService.js   <- Risk & prediction API methods
│   │   ├── weatherService.js<- Meteorology API methods
│   │   └── alertService.js  <- Early warning API methods
│   ├── context/
│   │   └── AppContext.jsx   <- Global state (selected location, toasts, alert counts)
│   ├── utils/
│   │   ├── constants.js     <- Design tokens, color maps, thresholds
│   │   └── formatters.js    <- Date, coordinates, risk styling formatters
│   ├── styles/
│   │   ├── globals.css      <- Tailwind directives & custom scrollbars
│   │   └── variables.css    <- CSS variables
│   ├── App.jsx              <- Route definitions
│   └── main.jsx             <- Application entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🚀 Development Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173).

### 3. Build for Production
```bash
npm run build
```

---

## 🔄 Toggling Mock vs Live API Mode
In `.env`:
```ini
# Use mock data (runs without backend or database)
VITE_USE_MOCK_API=true

# Connect to Khushi's live FastAPI backend
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

