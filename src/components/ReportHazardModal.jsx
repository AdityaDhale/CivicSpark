import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Camera, 
  Upload, 
  ShieldAlert, 
  Building2, 
  CheckCircle2, 
  X,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export default function ReportHazardModal({ onClose, onAddHazard, initialCoords }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('pothole');
  const [severity, setSeverity] = useState('critical');
  const [address, setAddress] = useState(
    initialCoords 
      ? `Pin @ ${initialCoords.lat.toFixed(4)}, ${initialCoords.lng.toFixed(4)}` 
      : '702 Colorado St, Austin, TX'
  );
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  const categoryAgencies = {
    pothole: { agency: "Austin Transportation & Public Works", code: "COA Title 14 §14-1-21" },
    sidewalk_ada: { agency: "Office of Civil Rights & ADA Compliance", code: "ADA Title II §35.151" },
    lighting: { agency: "Austin Energy Street Lighting", code: "Muni Lighting Code §15-9" },
    water_main: { agency: "Austin Water Utility", code: "Austin Utility Code §25-12" },
    electrical: { agency: "Emergency Infrastructure Response", code: "NFPA 70 §110.26" },
    debris: { agency: "Urban Forestry & Code Enforcement", code: "City Code §10-5" },
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    sounds.playVerify();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    const agencyInfo = categoryAgencies[category] || categoryAgencies.pothole;
    const urgency = severity === 'critical' ? 95 : severity === 'severe' ? 84 : 72;

    const newHazard = {
      id: `haz-${Date.now()}`,
      title,
      category,
      severity,
      urgencyScore: urgency,
      lat: initialCoords ? initialCoords.lat : 30.2680 + (Math.random() - 0.5) * 0.015,
      lng: initialCoords ? initialCoords.lng : -97.7420 + (Math.random() - 0.5) * 0.015,
      address: address || "Central Urban Corridor, Austin, TX",
      neighborhood: "Downtown Innovation District",
      description: description || "Physical infrastructure hazard observed endangering pedestrians and transit commuters.",
      reportedBy: reportedBy || "Neighborhood Resident (Verified Citizen)",
      reportedAgo: "Just now",
      reportedDate: new Date().toISOString(),
      verificationCount: 1,
      status: "pending",
      agency: agencyInfo.agency,
      municipalCode: agencyInfo.code,
      aiVisionScan: {
        confidence: 97.4,
        hazardClass: "Live Citizen Submission",
        depthInches: 4.0,
        widthInches: 32.0,
        pedestrianRiskScore: urgency,
        cyclistRiskScore: urgency - 5,
        structuralCompromise: "Active safety defect flagged for municipal review",
        immediateRepairCost: 150,
        costOfInaction60Days: 14500
      },
      decaySimulation: {
        freezeThawRisk: "High",
        dailyTraffic: 8000,
        daysUnattended: 0,
        projectedCatastrophicFailureDays: 14
      },
      petitionDocket: {
        docketNumber: `CS-2026-CIT-${Math.floor(1000 + Math.random() * 9000)}`,
        signaturesGoal: 50,
        currentSignatures: 1,
        districtRep: "Council Member Zohaib Qadri",
        councilEmail: "district9@austintexas.gov",
        formalNoticeSent: false,
        lastMunicipalAction: "Awaiting 49 more co-signatures"
      }
    };

    onAddHazard(newHazard);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Report Physical Infrastructure Hazard
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-sans">
          {/* Title */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Hazard Name / Brief Summary *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Broken Storm Grate Swallowing Bike Tires"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>

          {/* Category & Severity Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-mono focus:outline-none focus:border-amber-500"
              >
                <option value="pothole">🕳️ Pothole / Roadbed</option>
                <option value="sidewalk_ada">♿ ADA Sidewalk / Curb</option>
                <option value="lighting">💡 Streetlight / Dark Walkway</option>
                <option value="water_main">💧 Water Main / Leak</option>
                <option value="electrical">⚡ Exposed Wiring</option>
                <option value="debris">🌿 Foliage / Sightline Occlusion</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-red-400 font-mono focus:outline-none focus:border-amber-500"
              >
                <option value="critical">🚨 Critical (Immediate Danger)</option>
                <option value="severe">⚠️ Severe (Damage / Trip Risk)</option>
                <option value="moderate">ℹ️ Moderate (Degradation)</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Street Location / Intersection
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Safety Hazard Description & Impact
            </label>
            <textarea
              rows="3"
              placeholder="Describe physical dimensions, who is at risk (pedestrians, wheelchairs, transit), and any near misses observed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Reporter & Photo Upload */}
          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Your Name / Role (Optional)
              </label>
              <input
                type="text"
                placeholder="Elena R. (Local Resident)"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Attach Evidence Photo
              </label>
              <label className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 cursor-pointer">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span className="truncate">{photoPreview ? 'Photo Selected ✓' : 'Upload Image'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePhotoUpload} 
                />
              </label>
            </div>
          </div>

          {/* Auto Triage Badge */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between font-mono text-[11px] text-amber-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Auto-Routing: {categoryAgencies[category]?.agency}
            </span>
            <span>Ordinance: {categoryAgencies[category]?.code}</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 cursor-pointer transition-all active:scale-98"
            >
              Pin to Sentinel Map & Launch Community Verification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
