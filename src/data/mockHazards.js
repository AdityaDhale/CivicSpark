// Comprehensive Mock Data for CivicSpark Hyperlocal Infrastructure Sentinel

export const INITIAL_HAZARDS = [
  {
    id: "haz-101",
    title: "Crater-Depth Pothole with Exposed Steel Rebar",
    category: "pothole",
    severity: "critical",
    urgencyScore: 94,
    lat: 30.2695,
    lng: -97.7410,
    address: "412 E 6th St & Neches St, Austin, TX",
    neighborhood: "Downtown Innovation Corridor",
    description: "Massive 5-inch deep asphalt crater located directly across the cyclist and bus lane. Exposed rusted reinforcement mesh has already punctured three bicycle tires and caused a scooter rider to crash.",
    reportedBy: "Marcus Vance (Bicycle Commuter)",
    reportedAgo: "5 hours ago",
    reportedDate: "2026-10-23T19:30:00Z",
    verificationCount: 89,
    status: "escalated",
    agency: "Austin Transportation & Public Works",
    municipalCode: "COA Title 14 §14-1-21 (Roadbed Structural Disrepair)",
    aiVisionScan: {
      confidence: 99.2,
      hazardClass: "Type-IV Asymmetrical Sub-base Cavity",
      depthInches: 5.2,
      widthInches: 44.5,
      pedestrianRiskScore: 96,
      cyclistRiskScore: 98,
      structuralCompromise: "Complete loss of binding asphalt; water pooling eroding underlying limestone bed",
      immediateRepairCost: 185,
      costOfInaction60Days: 18400,
      boundingCoords: { x: 22, y: 35, w: 56, h: 48 }
    },
    decaySimulation: {
      freezeThawRisk: "Extreme",
      dailyTraffic: 14200,
      daysUnattended: 14,
      projectedCatastrophicFailureDays: 6
    },
    petitionDocket: {
      docketNumber: "CS-2026-TPW-8902",
      signaturesGoal: 100,
      currentSignatures: 89,
      districtRep: "Council Member Zohaib Qadri (District 9)",
      councilEmail: "district9@austintexas.gov",
      formalNoticeSent: true,
      lastMunicipalAction: "311 Escalation Tier-1 Legal Docket Served on Oct 23"
    },
    photoType: "pothole_rebar"
  },
  {
    id: "haz-102",
    title: "Broken ADA Curb Cut with 4-Inch Vertical Drop-off",
    category: "sidewalk_ada",
    severity: "critical",
    urgencyScore: 91,
    lat: 30.2648,
    lng: -97.7455,
    address: "201 W Cesar Chavez St (Pedestrian Crossing)",
    neighborhood: "Lady Bird Lake Civic District",
    description: "Shattered tactile concrete ramp at primary pedestrian intersection. Electric wheelchair user flipped backwards on Tuesday attempting to navigate the jagged concrete lip.",
    reportedBy: "Lucia Gomez (Adaptive Mobility Advocate)",
    reportedAgo: "1 day ago",
    reportedDate: "2026-10-22T14:15:00Z",
    verificationCount: 114,
    status: "escalated",
    agency: "Office of Civil Rights & ADA Compliance",
    municipalCode: "ADA Title II 28 CFR §35.151 (Inaccessible Right-of-Way)",
    aiVisionScan: {
      confidence: 97.8,
      hazardClass: "Catastrophic Pedestrian Grade Breach",
      depthInches: 4.1,
      widthInches: 36.0,
      pedestrianRiskScore: 92,
      cyclistRiskScore: 78,
      structuralCompromise: "Displaced truncated domes causing wheelchair tip hazard and blind cane entanglement",
      immediateRepairCost: 450,
      costOfInaction60Days: 45000,
      boundingCoords: { x: 18, y: 28, w: 64, h: 54 }
    },
    decaySimulation: {
      freezeThawRisk: "High",
      dailyTraffic: 8600,
      daysUnattended: 21,
      projectedCatastrophicFailureDays: 10
    },
    petitionDocket: {
      docketNumber: "CS-2026-ADA-1104",
      signaturesGoal: 150,
      currentSignatures: 114,
      districtRep: "Council Member Ryan Alter (District 5)",
      councilEmail: "district5@austintexas.gov",
      formalNoticeSent: true,
      lastMunicipalAction: "ADA Title II Formal Demand Letter Dispatched"
    },
    photoType: "curb_broken"
  },
  {
    id: "haz-103",
    title: "Blackout Corridor: 6 Dead Streetlights on School Walkway",
    category: "lighting",
    severity: "severe",
    urgencyScore: 86,
    lat: 30.2720,
    lng: -97.7340,
    address: "1100 E 11th St (Near Kealing Middle School)",
    neighborhood: "East Austin Heritage Corridor",
    description: "Six consecutive LED streetlamps out for 250 meters. Students walking home from after-school robotics and sports must traverse pitch black sidewalks adjacent to high-speed traffic.",
    reportedBy: "Derrick Jenkins (PTA Safety Chair)",
    reportedAgo: "2 days ago",
    reportedDate: "2026-10-21T18:00:00Z",
    verificationCount: 76,
    status: "verified",
    agency: "Austin Energy Street Lighting Division",
    municipalCode: "Austin Code of Ordinances §15-9-33 (Public Lumens Safety)",
    aiVisionScan: {
      confidence: 96.5,
      hazardClass: "Zero-Lux Commercial Arterial Failure",
      depthInches: 0,
      widthInches: 820,
      pedestrianRiskScore: 94,
      cyclistRiskScore: 91,
      structuralCompromise: "Blown ground-level junction fuse following weekend rainstorm",
      immediateRepairCost: 320,
      costOfInaction60Days: 22000,
      boundingCoords: { x: 10, y: 15, w: 80, h: 70 }
    },
    decaySimulation: {
      freezeThawRisk: "Moderate",
      dailyTraffic: 6100,
      daysUnattended: 12,
      projectedCatastrophicFailureDays: 4
    },
    petitionDocket: {
      docketNumber: "CS-2026-LGT-4421",
      signaturesGoal: 100,
      currentSignatures: 76,
      districtRep: "Council Member Natasha Harper-Madison (District 1)",
      councilEmail: "district1@austintexas.gov",
      formalNoticeSent: false,
      lastMunicipalAction: "Awaiting 24 more verified signatures for automated city docket filing"
    },
    photoType: "dark_street"
  },
  {
    id: "haz-104",
    title: "High-Pressure Water Main Heave Flooding Crosswalk",
    category: "water_main",
    severity: "severe",
    urgencyScore: 88,
    lat: 30.2755,
    lng: -97.7445,
    address: "1600 Lavaca St (Near Capitol Grounds)",
    neighborhood: "Capitol Complex District",
    description: "Subterranean pressure pipe rupture lifting road slabs 3 inches. 8,000 gallons per hour discharging across intersection, creating hydroplaning risk and black ice potential.",
    reportedBy: "Sarah Lin (Urban Hydrology Researcher)",
    reportedAgo: "3 hours ago",
    reportedDate: "2026-10-23T21:00:00Z",
    verificationCount: 52,
    status: "in_progress",
    agency: "Austin Water Utility",
    municipalCode: "Austin Utility Code §25-12-61 (Potable Conduit Integrity)",
    aiVisionScan: {
      confidence: 98.9,
      hazardClass: "Hydraulic Sub-Surface Roadway Heave",
      depthInches: 3.5,
      widthInches: 62.0,
      pedestrianRiskScore: 82,
      cyclistRiskScore: 95,
      structuralCompromise: "Hydrostatic pressure undermining granular roadbed; sinkhole formation imminent",
      immediateRepairCost: 850,
      costOfInaction60Days: 92000,
      boundingCoords: { x: 25, y: 30, w: 50, h: 50 }
    },
    decaySimulation: {
      freezeThawRisk: "Catastrophic",
      dailyTraffic: 18000,
      daysUnattended: 3,
      projectedCatastrophicFailureDays: 2
    },
    petitionDocket: {
      docketNumber: "CS-2026-WTR-3091",
      signaturesGoal: 50,
      currentSignatures: 52,
      districtRep: "Council Member Zo Qadri (District 9)",
      councilEmail: "district9@austintexas.gov",
      formalNoticeSent: true,
      lastMunicipalAction: "Austin Water Emergency Dispatch Crew Flagged"
    },
    photoType: "water_leak"
  },
  {
    id: "haz-105",
    title: "Downed High-Voltage Traffic Signal Junction Box",
    category: "electrical",
    severity: "critical",
    urgencyScore: 97,
    lat: 30.2612,
    lng: -97.7530,
    address: "S 1st St & Barton Springs Rd",
    neighborhood: "South Congress Gateway",
    description: "Vehicular sideswipe left municipal electrical cabinet cracked open with 240V live wiring exposed at ankle height right beside dog walking trail and bus stop.",
    reportedBy: "Tomás Reyes (Paramedic)",
    reportedAgo: "45 minutes ago",
    reportedDate: "2026-10-23T23:45:00Z",
    verificationCount: 63,
    status: "escalated",
    agency: "Emergency Infrastructure Response / APD",
    municipalCode: "NFPA 70 / Austin Fire Code §605.3 (Live Conductor Exposure)",
    aiVisionScan: {
      confidence: 99.8,
      hazardClass: "Exposed High-Voltage Pedestrian Hazard",
      depthInches: 0,
      widthInches: 24.0,
      pedestrianRiskScore: 99,
      cyclistRiskScore: 95,
      structuralCompromise: "Unshielded hot lugs accessible to children and domestic animals within 18 inches of sidewalk",
      immediateRepairCost: 290,
      costOfInaction60Days: 78000,
      boundingCoords: { x: 28, y: 20, w: 45, h: 60 }
    },
    decaySimulation: {
      freezeThawRisk: "High",
      dailyTraffic: 22000,
      daysUnattended: 1,
      projectedCatastrophicFailureDays: 1
    },
    petitionDocket: {
      docketNumber: "CS-2026-EMG-9912",
      signaturesGoal: 30,
      currentSignatures: 63,
      districtRep: "Council Member Ryan Alter (District 5)",
      councilEmail: "district5@austintexas.gov",
      formalNoticeSent: true,
      lastMunicipalAction: "Priority 1 Public Safety Hazard Dispatched"
    },
    photoType: "exposed_wire"
  },
  {
    id: "haz-106",
    title: "Blinded Sightline: Overgrown Foliage Blocking Stop Sign",
    category: "debris",
    severity: "moderate",
    urgencyScore: 74,
    lat: 30.2708,
    lng: -97.7275,
    address: "Navasota St & E 12th St",
    neighborhood: "Chestnut Neighborhood",
    description: "Dense invasive honeysuckle and privet bushes completely obscure the octagonal Stop Sign until 10 feet before the intersection. Multiple T-bone close calls this week.",
    reportedBy: "Kendra Washington (Resident)",
    reportedAgo: "3 days ago",
    reportedDate: "2026-10-20T11:00:00Z",
    verificationCount: 41,
    status: "resolved",
    agency: "Urban Forestry & Code Enforcement",
    municipalCode: "Austin City Code §10-5-42 (Intersection Sight Clearance)",
    aiVisionScan: {
      confidence: 95.1,
      hazardClass: "Regulatory Sign Occlusion",
      depthInches: 0,
      widthInches: 48.0,
      pedestrianRiskScore: 78,
      cyclistRiskScore: 82,
      structuralCompromise: "92% obscuration of MUTCD R1-1 regulatory traffic control device",
      immediateRepairCost: 75,
      costOfInaction60Days: 12000,
      boundingCoords: { x: 30, y: 25, w: 40, h: 50 }
    },
    decaySimulation: {
      freezeThawRisk: "Low",
      dailyTraffic: 3400,
      daysUnattended: 15,
      projectedCatastrophicFailureDays: 14
    },
    petitionDocket: {
      docketNumber: "CS-2026-FOR-2109",
      signaturesGoal: 40,
      currentSignatures: 41,
      districtRep: "Council Member Natasha Harper-Madison (District 1)",
      councilEmail: "district1@austintexas.gov",
      formalNoticeSent: true,
      lastMunicipalAction: "Resolved by Community Volunteer Pruning Squad on Oct 22"
    },
    photoType: "foliage_stop"
  }
];

export const COMMUNITY_BOUNTIES = [
  {
    id: "bounty-1",
    title: "High-Vis Neon Spray Paint Safety Perimeter around Neches St Crater",
    hazardId: "haz-101",
    rewardPoints: 250,
    impactType: "Tactical Warning",
    status: "open",
    volunteersClaimed: 2,
    volunteersNeeded: 3,
    estimatedMinutes: 20,
    toolsRequired: ["OSHA fluorescent traffic orange spray paint", "Safety vest"],
    description: "Mark a 3-foot fluorescent safety halo around the 5-inch pothole to alert night cyclists until the city cold-patch truck arrives on Tuesday.",
    completedProof: null
  },
  {
    id: "bounty-2",
    title: "Tactical Rubber Threshold Ramp on Cesar Chavez Curb Cut",
    hazardId: "haz-102",
    rewardPoints: 500,
    impactType: "Accessibility Remedy",
    status: "open",
    volunteersClaimed: 1,
    volunteersNeeded: 2,
    estimatedMinutes: 30,
    toolsRequired: ["Heavy-duty modular rubber curb bridge (provided by CivicSpark)", "Anchor pins"],
    description: "Install a temporary ADA compliant rubber transitional wedge to allow motorized wheelchairs to cross safely while city capital concrete crew is scheduled.",
    completedProof: null
  },
  {
    id: "bounty-3",
    title: "Foliage Pruning on 12th St Blinded Stop Sign",
    hazardId: "haz-106",
    rewardPoints: 350,
    impactType: "Vision Clearance",
    status: "completed",
    volunteersClaimed: 3,
    volunteersNeeded: 3,
    estimatedMinutes: 25,
    toolsRequired: ["Hedge shears", "Biodegradable lawn bags", "Work gloves"],
    description: "Trimmed 15 lbs of overgrown privet branches obscuring the stop sign. 100% sight distance restored for drivers approaching from 150 feet away.",
    completedProof: {
      completedBy: "Marcus V. & Elena R.",
      date: "Oct 22, 2026",
      beforeLabel: "Sign completely hidden behind 4ft bush",
      afterLabel: "Crystal clear sightline restored"
    }
  }
];

export const MUNICIPAL_DISTRICTS = [
  {
    id: "d9",
    name: "District 9 — Downtown & Central",
    rep: "Council Member Zohaib Qadri",
    email: "district9@austintexas.gov",
    avgResolutionDays: 14.2,
    civicSparkPactSigned: true
  },
  {
    id: "d1",
    name: "District 1 — East & Northeast",
    rep: "Council Member Natasha Harper-Madison",
    email: "district1@austintexas.gov",
    avgResolutionDays: 21.6,
    civicSparkPactSigned: true
  },
  {
    id: "d5",
    name: "District 5 — South Central",
    rep: "Council Member Ryan Alter",
    email: "district5@austintexas.gov",
    avgResolutionDays: 16.8,
    civicSparkPactSigned: false
  },
  {
    id: "d2",
    name: "District 2 — Southeast",
    rep: "Council Member Vanessa Fuentes",
    email: "district2@austintexas.gov",
    avgResolutionDays: 24.1,
    civicSparkPactSigned: true
  }
];

export const AI_PRESET_SCENARIOS = [
  {
    id: "preset-pothole",
    name: "Crater Pothole (5.2in Deep)",
    category: "pothole",
    imageLabel: "Active Asphalt Sub-base Cavity with Pooling Water",
    detectedClass: "Type-IV Deep Roadbed Rupture",
    confidence: 99.4,
    metrics: {
      depth: "5.2 inches",
      width: "44.5 inches",
      urgency: 96,
      carTireDamageProbability: "88%",
      pedestrianTwistAnkleRisk: "94%"
    },
    ordinanceViolation: "City Roadbed Safety Code §14-1-21: Roadway crater exceeding 2.0 inches depth on designated transit corridor.",
    costComparison: {
      earlyPatch: "$140 (15 min cold mix)",
      delay60Days: "$17,800 (Full sub-base blowout & vehicle tort claims)"
    }
  },
  {
    id: "preset-ada",
    name: "Shattered Wheelchair Curb Cut",
    category: "sidewalk_ada",
    imageLabel: "Crushed ADA Tactile Ramp Lip (4.1in Drop-off)",
    detectedClass: "Catastrophic ADA Right-of-Way Obstruction",
    confidence: 98.1,
    metrics: {
      depth: "4.1 inches",
      width: "36.0 inches",
      urgency: 92,
      wheelchairOverturnRisk: "98%",
      caneSnagProbability: "91%"
    },
    ordinanceViolation: "Federal ADA Title II §35.151 & Muni Code §14-3: Impassable crosswalk ramp depriving mobility access.",
    costComparison: {
      earlyPatch: "$450 (Tactical rubber/epoxy ramp)",
      delay60Days: "$45,000 (Federal ADA civil injunction & liability)"
    }
  },
  {
    id: "preset-electrical",
    name: "Exposed 240V Junction Box",
    category: "electrical",
    imageLabel: "Cracked High-Voltage Traffic Light Terminal",
    detectedClass: "Live Conductor Pedestrian Threat",
    confidence: 99.9,
    metrics: {
      depth: "N/A",
      width: "24.0 inches",
      urgency: 99,
      electrocutionHazard: "Extremely Critical",
      proximityToSidewalk: "14 inches"
    },
    ordinanceViolation: "NFPA 70 National Electrical Code §110.26 / Municipal Public Safety Mandate: Exposed active 240V terminals.",
    costComparison: {
      earlyPatch: "$290 (Cabinet re-casing & lock)",
      delay60Days: "$1,200,000+ (Catastrophic electrocution liability)"
    }
  },
  {
    id: "preset-lighting",
    name: "Dark Transit Corridor (Zero Lux)",
    category: "lighting",
    imageLabel: "4 Unlit Streetlights Adjacent to Bus Stop",
    detectedClass: "Critical Public Illumination Blackout",
    confidence: 97.2,
    metrics: {
      depth: "N/A",
      width: "180 meters",
      urgency: 87,
      pedestrianCrashRiskAtNight: "+340%",
      crimeVulnerabilityIndex: "High"
    },
    ordinanceViolation: "Muni Lighting Safety Standard §15-9-33: Arterial pedestrian corridor illumination below 0.2 foot-candles.",
    costComparison: {
      earlyPatch: "$310 (Photocell / breaker reset)",
      delay60Days: "$64,000 (Nighttime pedestrian strike & litigation)"
    }
  }
];
