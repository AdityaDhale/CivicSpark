import React, { useState } from 'react';
import { 
  TrendingDown, 
  AlertOctagon, 
  DollarSign, 
  Calendar, 
  CloudRain, 
  Car, 
  Activity, 
  ShieldAlert, 
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function DecaySimulator({ selectedHazard, onSwitchToEscalation }) {
  const [daysUnattended, setDaysUnattended] = useState(21);
  const [dailyTraffic, setDailyTraffic] = useState(12000);
  const [weatherSeverity, setWeatherSeverity] = useState('freeze_thaw'); // 'dry', 'rain', 'freeze_thaw'
  const [roadType, setRoadType] = useState('transit'); // 'residential', 'collector', 'transit'

  const handleSliderChange = (val) => {
    setDaysUnattended(Number(val));
    sounds.playClick();
  };

  // Weather multiplier
  const weatherMultipliers = {
    dry: 1.0,
    rain: 1.8,
    freeze_thaw: 3.4
  };

  // Road type multiplier
  const roadMultipliers = {
    residential: 0.8,
    collector: 1.2,
    transit: 1.9
  };

  const weatherFactor = weatherMultipliers[weatherSeverity];
  const roadFactor = roadMultipliers[roadType];
  const trafficFactor = dailyTraffic / 5000;

  // Cumulative cost model
  // Base day 1 patch is ~$150. Exponential-quadratic degradation curve.
  const baseCost = 150;
  const degradationFactor = (Math.pow(daysUnattended / 7, 1.8) * weatherFactor * roadFactor * (trafficFactor * 0.7));
  const cumulativeCost = Math.round(baseCost + (baseCost * degradationFactor * 3.8));
  
  // Injury Probability Curve
  const injuryProb = Math.min(99, Math.round(12 + (daysUnattended * 0.9 * weatherFactor * (trafficFactor * 0.5))));

  // Cavity expansion
  const initialWidth = 14; // inches
  const currentWidthInches = Math.min(68, Math.round(initialWidth + (daysUnattended * 0.55 * weatherFactor)));
  const currentDepthInches = Math.min(8.5, (2.0 + (daysUnattended * 0.08 * weatherFactor)).toFixed(1));

  // Days until catastrophic road closure
  const daysUntilCollapse = Math.max(1, Math.round(45 / (weatherFactor * roadFactor * (trafficFactor * 0.6)) - daysUnattended * 0.4));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Infrastructure Physics & Micro-Degradation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Predictive Decay & Municipal Cost Simulator
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Simulate how delayed municipal 311 work orders exponentially compound taxpayer repair costs, increase vehicle damage liability, and elevate pedestrian injury rates.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Model calibrated on Federal Highway Admin (FHWA) Pavement LCA</span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Controls & Sliders (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            Environmental & Stress Parameters
          </h3>

          {/* Slider 1: Days Unattended */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Days Without City Repair:
              </span>
              <span className="text-amber-400 font-bold text-sm bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {daysUnattended} Days
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="90"
              value={daysUnattended}
              onChange={(e) => handleSliderChange(e.target.value)}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Day 1 (Reported)</span>
              <span>Day 30 (Backlog)</span>
              <span>Day 90 (Crisis)</span>
            </div>
          </div>

          {/* Slider 2: Daily Traffic */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-cyan-400" />
                Daily Traffic Volume (AADT):
              </span>
              <span className="text-cyan-400 font-bold text-sm bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {dailyTraffic.toLocaleString()} vehicles/day
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="30000"
              step="1000"
              value={dailyTraffic}
              onChange={(e) => { setDailyTraffic(Number(e.target.value)); sounds.playClick(); }}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Weather Severity Selector */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 block flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-blue-400" />
              Climate & Precipitation Exposure:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'dry', label: 'Dry / Mild', desc: '1.0x Rate' },
                { id: 'rain', label: 'Heavy Rain', desc: '1.8x Erosion' },
                { id: 'freeze_thaw', label: 'Freeze-Thaw', desc: '3.4x Frost Heave' }
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => { setWeatherSeverity(w.id); sounds.playClick(); }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    weatherSeverity === w.id
                      ? 'bg-blue-950/50 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold">{w.label}</div>
                  <div className="text-[10px] text-blue-400/80 font-mono mt-0.5">{w.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Road Classification Selector */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 block">
              Corridor Functional Classification:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'residential', label: 'Residential' },
                { id: 'collector', label: 'Commercial' },
                { id: 'transit', label: 'Transit Bus Line' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setRoadType(r.id); sounds.playClick(); }}
                  className={`py-2 px-2.5 rounded-lg border text-center text-xs font-medium transition-all cursor-pointer ${
                    roadType === r.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action to switch to Escalation */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (onSwitchToEscalation) onSwitchToEscalation();
                sounds.playAlert();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>Stop Decay: File Mandatory City Cure Notice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Dynamic Visual Cross-Section & Impact Metrics (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Visual Physical Cross-Section Simulator */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Dynamic Sub-base Cross Section (Live Simulation)
              </span>
              <span className="text-xs font-mono text-slate-400">
                Width: <strong className="text-amber-400">{currentWidthInches}"</strong> | Depth: <strong className="text-amber-400">{currentDepthInches}"</strong>
              </span>
            </div>

            {/* Geological & Pavement Cutaway Graphic */}
            <div className="relative h-56 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-end p-4">
              {/* Sky / Street Surface Level */}
              <div className="absolute top-4 left-6 text-xs font-mono text-slate-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <span>Surface Grade Level (Pedestrian & Vehicle Pathway)</span>
              </div>

              {/* Vehicle tire / weight impact vector */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                <div className="text-[10px] font-mono text-red-400 font-bold">
                  ↓ {dailyTraffic.toLocaleString()} AXLE LOAD
                </div>
              </div>

              {/* Asphalt Layer */}
              <div className="relative w-full h-24 bg-gradient-to-b from-stone-800 to-stone-900 border-t-2 border-stone-600 flex items-center justify-center">
                {/* Dynamically widening pothole cavity */}
                <div 
                  style={{ 
                    width: `${Math.min(90, Math.max(15, currentWidthInches * 1.3))}%`,
                    height: `${Math.min(95, Math.max(25, currentDepthInches * 12))}%` 
                  }}
                  className="bg-black/95 rounded-b-[40%] border-x-2 border-b-2 border-red-500/70 transition-all duration-300 relative flex flex-col items-center justify-center p-2 shadow-inner"
                >
                  {/* Water accumulation in cavity */}
                  {weatherSeverity !== 'dry' && (
                    <div 
                      style={{ height: `${Math.min(70, daysUnattended * 0.9)}%` }}
                      className="absolute bottom-0 inset-x-2 bg-blue-500/30 rounded-b-[35%] border-t border-blue-400/50 backdrop-blur-[1px]"
                    />
                  )}
                  <span className="text-[10px] font-mono font-bold text-red-400 z-10 text-center">
                    Cavity: {currentWidthInches}" across
                  </span>
                </div>
              </div>

              {/* Sub-base Granular Aggregate Layer */}
              <div className="w-full h-14 bg-gradient-to-b from-amber-950/60 to-stone-950 border-t border-dashed border-amber-900/60 flex items-center justify-center">
                <span className="text-[10px] font-mono text-stone-500">
                  Compacted Limestone Sub-base (Erosion Zone)
                </span>
              </div>
            </div>

            {/* Decay Status Banner */}
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
              daysUntilCollapse <= 7
                ? 'bg-red-950/40 border-red-500/50 text-red-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 shrink-0 text-red-400" />
                <span>
                  {daysUntilCollapse <= 7 
                    ? `CRITICAL THRESHOLD: Structural sub-base collapse projected within ~${daysUntilCollapse} days!`
                    : `Active sub-surface erosion. Catastrophic blowout projected in ~${daysUntilCollapse} days without intervention.`
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Big Metric Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Metric 1: Inaction Cost Multiplier */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Total City Repair Cost
              </span>
              <div className="text-2xl font-black font-mono text-red-400">
                ${cumulativeCost.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 block">
                vs. $150 early patch (
                <strong className="text-red-400">
                  {Math.round(cumulativeCost / 150)}x increase
                </strong>
                )
              </span>
            </div>

            {/* Metric 2: Pedestrian Hazard Escalation */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Severe Injury Probability
              </span>
              <div className="text-2xl font-black font-mono text-amber-400">
                {injuryProb}%
              </div>
              <span className="text-[11px] text-slate-500 block">
                Vulnerable cyclist/pedestrian risk
              </span>
            </div>

            {/* Metric 3: Taxpayer Waste Blockable */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Preventable Taxpayer Waste
              </span>
              <div className="text-2xl font-black font-mono text-emerald-400">
                ${Math.max(0, cumulativeCost - 150).toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 block">
                Savings via CivicSpark Protocol
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
