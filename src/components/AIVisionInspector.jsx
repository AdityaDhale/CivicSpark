import React, { useState, useEffect } from 'react';
import { 
  Scan, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  DollarSign, 
  Scale, 
  FileText, 
  Layers, 
  Cpu, 
  RefreshCw,
  Camera,
  Check
} from 'lucide-react';
import { AI_PRESET_SCENARIOS } from '../data/mockHazards';
import { sounds } from '../utils/soundEffects';

export default function AIVisionInspector({ onEscalateFromInspector }) {
  const [selectedPreset, setSelectedPreset] = useState(AI_PRESET_SCENARIOS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customDetection, setCustomDetection] = useState(null);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setUploadedImage(null);
    setCustomDetection(null);
    setScanCompleted(false);
    triggerScan();
  };

  const triggerScan = () => {
    sounds.playScan();
    setIsScanning(true);
    setScanCompleted(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      sounds.playAlert();
    }, 1200);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setSelectedPreset(null);
        setCustomDetection({
          name: "User Captured Municipal Hazard",
          detectedClass: "Classified Municipal Safety Infraction",
          confidence: 96.8,
          metrics: {
            depth: "Estimated ~4.2 inches",
            width: "Estimated ~32.0 inches",
            urgency: 89,
            riskScore: "High Pedestrian / Vehicle Vulnerability"
          },
          ordinanceViolation: "COA Municipal Infrastructure Code §14-2: Immediate safety hazard requiring priority municipal dispatch within 48h.",
          costComparison: {
            earlyPatch: "$175 (Immediate repair)",
            delay60Days: "$19,500 (Delayed degradation & damage liability)"
          }
        });
        triggerScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const currentData = selectedPreset || customDetection || AI_PRESET_SCENARIOS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>NextSpark Edge Vision & Triage Model</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Hazard Vision & Triage Inspector
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Autonomous computer vision engine that identifies physical infrastructure failure, extracts dimensional risk parameters, cites municipal ordinance codes, and models the cost of municipal inaction.
          </p>
        </div>

        {/* Scan Action Controls */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-all shadow-md">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Upload Photo</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
          </label>

          <button
            onClick={triggerScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Analyzing Matrix...' : 'Re-Run AI Triage'}</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Tabs */}
      <div>
        <span className="text-xs font-mono text-slate-400 block mb-2 uppercase tracking-wider">
          Select Standard Verification Scenarios:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {AI_PRESET_SCENARIOS.map((p) => {
            const isSelected = selectedPreset?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/80 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold truncate">{p.name}</div>
                <div className="text-[11px] font-mono text-cyan-400/80 mt-0.5">
                  Severity: {p.metrics.urgency}/100
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Camera / Visual Frame (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group">
            {/* Background Procedural / Uploaded Image */}
            {uploadedImage ? (
              <img 
                src={uploadedImage} 
                alt="Uploaded Hazard" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="relative w-full h-full bg-[#111827] flex items-center justify-center p-8">
                {/* Visual Representation Graphic */}
                <div className="absolute inset-0 bg-radial from-slate-800/40 to-slate-950/90 pointer-events-none" />
                
                {/* Procedural Hazard Visuals based on preset category */}
                {currentData.category === 'pothole' && (
                  <div className="relative w-72 h-56 rounded-[40%] bg-gradient-to-br from-stone-900 via-neutral-950 to-stone-900 border-4 border-dashed border-stone-700/60 shadow-inner flex items-center justify-center">
                    <div className="w-52 h-36 rounded-[45%] bg-[#080808] border border-amber-900/50 flex flex-col items-center justify-center p-4">
                      <div className="w-24 h-1.5 bg-amber-700/70 rotate-12 mb-2 rounded shadow" />
                      <div className="w-32 h-1.5 bg-amber-800/80 -rotate-6 mb-1 rounded shadow" />
                      <span className="text-[11px] font-mono text-stone-500 font-bold">
                        [SUB-BASE FRACTURE 5.2" DEPTH]
                      </span>
                    </div>
                  </div>
                )}

                {currentData.category === 'sidewalk_ada' && (
                  <div className="relative w-80 h-56 bg-stone-800 rounded-lg p-4 border border-stone-700 flex flex-col justify-between">
                    <div className="grid grid-cols-6 gap-2 w-full">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <div key={i} className="h-5 rounded-full bg-amber-400/80 shadow-sm" />
                      ))}
                    </div>
                    <div className="h-12 w-full bg-red-950/80 border-2 border-red-500/60 rounded flex items-center justify-center">
                      <span className="text-xs font-mono font-bold text-red-300">
                        ⚠️ 4.1" DISPLACED CURB DROP-OFF
                      </span>
                    </div>
                  </div>
                )}

                {currentData.category === 'electrical' && (
                  <div className="relative w-64 h-72 bg-zinc-800 border-2 border-zinc-600 rounded-xl p-4 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-3 animate-pulse">
                      <AlertTriangle className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="w-full space-y-1.5 font-mono text-[10px] text-center text-red-400">
                      <div className="bg-red-950/80 py-1 rounded border border-red-500/40">
                        ⚡ LIVE 240V EXPOSED CONDUCTOR
                      </div>
                      <div className="text-slate-400">CABINET SEAL TAMPERED</div>
                    </div>
                  </div>
                )}

                {currentData.category === 'lighting' && (
                  <div className="relative w-full h-full bg-[#030712] flex items-center justify-center">
                    <div className="flex gap-12 items-center">
                      <div className="w-4 h-32 bg-slate-800 flex flex-col items-center justify-start">
                        <div className="w-8 h-3 bg-slate-700 rounded-t" />
                        <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 mt-1" />
                      </div>
                      <div className="text-center font-mono text-xs text-amber-500/80 bg-slate-900/90 px-4 py-2 rounded-xl border border-amber-500/30">
                        🌑 0.02 LUX (ZERO ILLUMINATION)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Scanning Laser Animation */}
            {isScanning && (
              <div className="absolute inset-0 z-30 pointer-events-none">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce" />
                <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px]" />
                <div className="absolute top-4 left-4 font-mono text-xs text-cyan-300 bg-slate-950/90 px-3 py-1.5 rounded-lg border border-cyan-500/40 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>CONVOLUTING TENSORS: 44.1 FPS</span>
                </div>
              </div>
            )}

            {/* Bounding Box Overlay when completed */}
            {scanCompleted && (
              <div className="absolute inset-10 z-20 pointer-events-none border-2 border-cyan-400/80 rounded-xl bg-cyan-500/5 shadow-[0_0_30px_rgba(6,182,212,0.25)] flex flex-col justify-between p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold bg-cyan-500 text-slate-950 px-2 py-0.5 rounded shadow">
                    {currentData.detectedClass}
                  </span>
                  <span className="font-mono text-xs font-bold bg-slate-950/90 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded">
                    Confidence: {currentData.confidence}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                  <span>DIMENSIONS: {currentData.metrics.width} × {currentData.metrics.depth}</span>
                  <span className="text-amber-400 font-bold">URGENCY: {currentData.metrics.urgency}/100</span>
                </div>
              </div>
            )}
          </div>

          {/* Under-canvas Diagnostic Telemetry */}
          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">MODEL ARCHITECTURE</span>
              <span className="text-white font-semibold">Gemini 3.8 + YOLOv10-Civic</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">INFERENCE LATENCY</span>
              <span className="text-cyan-400 font-semibold">142 ms (Edge Quantized)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">GEO-VALIDITY CHECK</span>
              <span className="text-emerald-400 font-semibold">Verified District 9</span>
            </div>
          </div>
        </div>

        {/* Right: AI Synthesis & Triage Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Diagnostic Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Automated Triage Summary
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {currentData.name}
                </h3>
              </div>
              <div className="text-right font-mono">
                <span className="text-2xl font-black text-amber-400">
                  {currentData.metrics.urgency}
                </span>
                <span className="text-xs text-slate-400 block">/100 Urgency</span>
              </div>
            </div>

            {/* Impact Metric Chips */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">
                Impact On Vulnerable Road Users:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(currentData.metrics).map(([key, val]) => {
                  if (key === 'urgency') return null;
                  return (
                    <div key={key} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase block truncate">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-bold text-amber-300 mt-0.5 block">
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Statutory Ordinance Code Citation */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Statutory Municipal Violation Identified:</span>
              </div>
              <p className="text-xs font-mono text-slate-300 leading-relaxed">
                {currentData.ordinanceViolation}
              </p>
            </div>

            {/* Cost Differential Calculator */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Cost of Municipal Inaction vs. Early Remedy</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                  <span className="text-[10px] text-slate-400 block">PROACTIVE FIX</span>
                  <span className="text-emerald-400 font-extrabold text-sm block mt-0.5">
                    {currentData.costComparison.earlyPatch}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/30">
                  <span className="text-[10px] text-slate-400 block">60-DAY DELAY</span>
                  <span className="text-red-400 font-extrabold text-sm block mt-0.5">
                    {currentData.costComparison.delay60Days}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Early intervention saves municipal taxpayers over 98% in long-term structural repairs and emergency litigation costs.
              </p>
            </div>

            {/* Escalation Action Button */}
            <button
              onClick={() => {
                if (onEscalateFromInspector) {
                  onEscalateFromInspector(currentData);
                }
                sounds.playAlert();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer active:scale-98"
            >
              <FileText className="w-4 h-4" />
              <span>Draft Official 311 Escalation Packet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
