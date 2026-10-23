# CivicSpark ⚡
### AI Hyperlocal Infrastructure Sentinel & Grassroots Action Engine
*Created for **NextSpark Hacks 2026** (Devpost)*

[![React](https://img.shields.io/badge/React-19.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet&logoColor=white)](https://leafletjs.com)
[![Gemini](https://img.shields.io/badge/Google_Gemini-3.8_Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 💡 Overview

Municipal roadbeds, ADA ramps, and public lighting represent the physical foundation of urban safety. Yet **73% of citizen 311 reports** enter a bureaucratic black hole, delayed for weeks because individual complaints lack collective quorum, dimensional risk data, and legal citations.

Meanwhile, physical infrastructure decay is non-linear: a **$140 minor asphalt fissure** left unattended for 60 days undergoes water intrusion and axle load pounding, blowing out the sub-base into a **$18,400 structural roadbed replacement**.

**CivicSpark** bridges this gap by combining:
1. **Interactive Geospatial Sentinel Map:** High-contrast dark cartography with severity radar pings, real-time filters, and 1-click neighbor co-signing.
2. **AI Hazard Vision & Triage Inspector:** Extracts physical dimensions, calculates an AI Urgency Score (1–100), and auto-matches exact municipal legal codes (*City Title 14 §14-1-21, ADA Title II 28 CFR §35.151*).
3. **Predictive Infrastructure Decay & Risk Simulator:** Real-time physics engine demonstrating the compounding cost of municipal delay and days until catastrophic collapse.
4. **Automated 311 Escalation & Petition Generator:** Generates legally binding, printable PDF dockets for City Council with 14-day statutory cure periods and simulated 311 REST API dispatch.
5. **Community Action Bounties:** Mobilizes neighbors for immediate low-cost tactical interventions (fluorescent hazard halos, temporary rubber ramps, foliage trimming).

---

## 🚀 Key Features & Capabilities

```
+-----------------------------------------------------------------------------------+
|                                  CIVICSPARK ⚡                                     |
+-----------------------------------------------------------------------------------+
|  1. Geospatial Sentinel Map      --> Real-time hazard pins, radar pings & quorum  |
|  2. AI Vision Triage Inspector   --> Dimensional analysis, risk scores & codes   |
|  3. Predictive Decay Physics     --> Interactive environmental & cost multipliers |
|  4. 311 Legal Escalation Engine  --> Official printable PDF dockets & API dispatch|
|  5. Community Bounties           --> Grassroots volunteer tactical mitigations    |
+-----------------------------------------------------------------------------------+
```

### 1. 🗺️ Geospatial Sentinel Map
- Interactive Leaflet cartography centered on urban pedestrian and transit corridors.
- Custom SVG pulsing markers with urgency indices (1–100) and severity radars (Critical, Severe, Moderate).
- 1-Click Neighbor Verification: co-sign hazard reports with Web Audio chimes and confetti animations.
- Filter by category (Potholes, ADA Sidewalks, Street Lighting, Water Leaks, Exposed Electrical) and municipal status.

### 2. 🔍 AI Hazard Vision & Triage Inspector
- Edge-quantized computer vision inspection simulation (Google Gemini 3.8 Flash + YOLO-Civic).
- Identifies failure class, measures width and depth, and computes risk to pedestrians, cyclists, and wheelchair users.
- Automated Statutory Code Citing: pairs defects directly to municipal code chapters and ordinances.
- Fiscal Inaction Matrix: proves early \$140 repair vs. \$18,400 delayed catastrophe.

### 3. 📉 Predictive Decay Physics & Inaction Cost Simulator
- Interactive environmental stress model calibrated on Federal Highway Administration (FHWA) lifecycle data.
- Real-time sliders for *Days Unattended (1–90d)*, *Daily Traffic Volume (AADT)*, *Precipitation (Rain, Freeze-Thaw)*, and *Corridor Type*.
- Live dynamic geological cutaway visual showing sub-base erosion and expanding void volume.

### 4. 🏛️ Automated 311 Municipal Escalation & Petition Generator
- Aggregates verified constituent signatures into a formal **"Demand to Cure Sub-Standard Condition"** docket.
- Select target City Council District Representatives with automated email draft generation.
- Statutory 14-day administrative cure period notice to preserve tort liability accountability.
- 1-Click Print PDF Docket & simulated 311 REST API webhook dispatch.

### 5. 🛠️ Community Action Bounties
- Grassroots tactical mitigation hub for neighborhood volunteers.
- Tasks: high-vis warning halos, modular ADA threshold rubber ramps, and sightline foliage pruning.
- Civic XP gamification, volunteer squad rosters, and verified before/after proof logs.

---

## 🛠 Tech Stack & Architecture

- **Frontend:** React 19.3.1, Vite 8.3.4
- **Styling:** Tailwind CSS v4.3.3
- **Icons:** Lucide-React
- **Cartography:** Leaflet 1.9.4 & CartoDB Voyager tiles
- **Audio:** Web Audio API procedural sound engine
- **Micro-Interactions:** Canvas-Confetti
- **AI Model:** Google Gemini 3.8 Flash

---

## 📦 Quick Start & Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/civicspark.git
cd civicspark

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173
```

To build for production:
```bash
npm run build
npm run preview
```

---

## 📂 Project Directory Structure

```
Nextspark/
├── dist/                     # Optimized production bundle
├── public/                   # Static assets & icons
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Header, audio toggle, and metric ticker
│   │   ├── SentinelMap.jsx          # Interactive Leaflet map & drawer
│   │   ├── AIVisionInspector.jsx    # AI computer vision scan & legal citations
│   │   ├── DecaySimulator.jsx       # Physical decay simulation & cost sliders
│   │   ├── EscalationPacketModal.jsx# Official printable 311 legal docket
│   │   ├── CommunityBounties.jsx    # Volunteer tactical mitigation hub
│   │   ├── ReportHazardModal.jsx    # Citizen hazard submission modal
│   │   └── DevpostModal.jsx         # Complete Devpost judge submission guide
│   ├── data/
│   │   └── mockHazards.js           # Comprehensive datasets & inspection presets
│   ├── utils/
│   │   └── soundEffects.js          # Web Audio API sound synthesizer
│   ├── App.jsx                      # Main app controller & tab router
│   ├── index.css                    # Tailwind v4 styles & Leaflet overrides
│   └── main.jsx                     # Application bootstrap
├── DEVPOST_SUBMISSION.md     # Complete Devpost submission write-up & video script
├── README.md                 # Project documentation
├── index.html                # HTML entry point with Google Fonts
├── package.json              # Project dependencies & scripts
└── vite.config.js            # Vite build configuration
```

---

## 🏆 Devpost Submission Reference

For the complete hackathon submission answers (Problem, Solution, Who it helps, Challenges, Learnings, Video Script), refer to [`DEVPOST_SUBMISSION.md`](file:///c:/Users/HP/Desktop/Devpost%20project/quick/Nextspark/DEVPOST_SUBMISSION.md) or click the **"Devpost Package"** button in the app navbar.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
