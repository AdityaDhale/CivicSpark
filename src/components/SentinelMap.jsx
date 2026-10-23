import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  AlertTriangle, 
  MapPin, 
  ShieldAlert, 
  Flame, 
  CheckCircle2, 
  ThumbsUp, 
  Eye, 
  Share2, 
  ArrowRight, 
  FileText, 
  TrendingDown, 
  Filter, 
  Clock, 
  Building2,
  ExternalLink,
  Sparkles,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export default function SentinelMap({ 
  hazards, 
  onVerifyHazard, 
  onSelectHazardForInspection, 
  onSelectHazardForEscalation,
  onSelectHazardForSimulation,
  onOpenReportAtCoord 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [selectedHazard, setSelectedHazard] = useState(hazards[0] || null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [justVerifiedId, setJustVerifiedId] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  // Filtered hazards
  const filteredHazards = hazards.filter((h) => {
    if (activeFilter !== 'all' && h.category !== activeFilter) return false;
    if (activeStatusFilter !== 'all' && h.status !== activeStatusFilter) return false;
    return true;
  });

  // Initialize Leaflet Map safely
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      if (mapContainerRef.current._leaflet_id) {
        mapContainerRef.current._leaflet_id = null;
      }

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      }).setView([30.2685, -97.7420], 14);

      // Standard OpenStreetMap tiles (100% reliable)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Click on map to add report
      map.on('click', (e) => {
        if (onOpenReportAtCoord) {
          onOpenReportAtCoord(e.latlng.lat, e.latlng.lng);
        }
      });

      mapInstanceRef.current = map;

      // Invalidate size once layout settles
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 150);
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 500);

      const handleResize = () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      };
      window.addEventListener('resize', handleResize);

      setMapReady(true);
    } catch (err) {
      console.error("Leaflet initialization error:", err);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn("Leaflet cleanup warning:", e);
        }
        mapInstanceRef.current = null;
        setMapReady(false);
      }
    };
  }, []);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    filteredHazards.forEach((h) => {
      const isSelected = selectedHazard && selectedHazard.id === h.id;
      const isCritical = h.severity === 'critical';

      const colorBg = 
        h.severity === 'critical' ? '#ef4444' : 
        h.severity === 'severe' ? '#f59e0b' : 
        h.severity === 'moderate' ? '#3b82f6' : '#10b981';

      const iconSvg = `
        <div style="position: relative; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;">
          ${isCritical ? `<div class="radar-ping" style="position: absolute; width: 44px; height: 44px; border-radius: 9999px; background: ${colorBg};"></div>` : ''}
          <div style="
            position: relative;
            width: ${isSelected ? '38px' : '32px'};
            height: ${isSelected ? '38px' : '32px'};
            border-radius: 9999px;
            background: #0f172a;
            border: 3px solid ${colorBg};
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.6);
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <span style="font-size: 13px; font-weight: 800; color: ${colorBg}; font-family: monospace;">
              ${h.urgencyScore}
            </span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-hazard-marker',
        html: iconSvg,
        iconSize: [42, 42],
        iconAnchor: [21, 21]
      });

      const marker = L.marker([h.lat, h.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedHazard(h);
        sounds.playClick();
        map.panTo([h.lat, h.lng], { animate: true, duration: 0.6 });
      });

      markersRef.current[h.id] = marker;
    });
  }, [filteredHazards, selectedHazard, mapReady]);

  // Handle Verify Click
  const handleVerify = (hazard) => {
    sounds.playVerify();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    setJustVerifiedId(hazard.id);
    setTimeout(() => setJustVerifiedId(null), 1500);
    onVerifyHazard(hazard.id);
  };

  return (
    <div className="relative w-full h-[calc(100vh-7rem)] min-h-[580px] flex flex-col lg:flex-row overflow-hidden bg-[#0a0e17]">
      {/* Map Area */}
      <div className="relative flex-1 h-full w-full">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Top Floating Filter Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-400">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Category:</span>
            </div>
            {[
              { id: 'all', label: 'All Hazards' },
              { id: 'pothole', label: '🕳️ Potholes' },
              { id: 'sidewalk_ada', label: '♿ ADA Sidewalks' },
              { id: 'lighting', label: '💡 Lighting' },
              { id: 'water_main', label: '💧 Water/Leaks' },
              { id: 'electrical', label: '⚡ Electrical' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f.id); sounds.playClick(); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="hidden sm:flex items-center gap-1 p-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl pointer-events-auto text-xs">
            <span className="text-slate-400 px-2 font-mono">Status:</span>
            {['all', 'escalated', 'verified', 'in_progress', 'resolved'].map((s) => (
              <button
                key={s}
                onClick={() => { setActiveStatusFilter(s); sounds.playClick(); }}
                className={`px-2 py-1 rounded-md capitalize font-mono text-[11px] transition-all cursor-pointer ${
                  activeStatusFilter === s
                    ? 'bg-slate-700 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Helper Bar on Map */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/80 shadow-lg text-xs font-mono text-slate-300 pointer-events-auto">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Tip: Click any coordinate on map to pin a new hazard report</span>
          </div>
        </div>
      </div>

      {/* Side Hazard Details Drawer */}
      <div className="w-full lg:w-[440px] xl:w-[480px] h-[55%] lg:h-full bg-slate-900/95 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-slate-800 p-4 sm:p-6 overflow-y-auto z-20 flex flex-col justify-between shadow-2xl">
        {selectedHazard ? (
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono ${
                  selectedHazard.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  selectedHazard.severity === 'severe' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {selectedHazard.severity} Severity
                </span>
                
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedHazard.reportedAgo}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                {selectedHazard.title}
              </h2>

              <p className="text-xs font-mono text-amber-400/90 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{selectedHazard.address}</span>
              </p>
            </div>

            {/* Urgency & Risk Score Meter */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400">
                  AI Hazard Urgency Index
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black font-mono text-amber-400">
                    {selectedHazard.urgencyScore}
                  </span>
                  <span className="text-xs font-mono text-slate-400">/ 100</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-red-900/40 text-red-300 font-mono border border-red-800/40">
                    Immediate Action
                  </span>
                </div>
              </div>

              {/* Citizen Verification Pill */}
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400">
                  Neighbor Verified
                </span>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {selectedHazard.verificationCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              {selectedHazard.description}
            </div>

            {/* Municipal Code Citation */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Responsible Agency & Statutory Code</span>
              </div>
              <div className="font-mono text-slate-300">{selectedHazard.agency}</div>
              <div className="font-mono text-[11px] text-amber-400/80 mt-0.5">
                Violates: {selectedHazard.municipalCode}
              </div>
            </div>

            {/* AI Diagnostics Snapshot */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Vision Scan Diagnostic
                </span>
                <span className="font-mono text-slate-400 text-[11px]">
                  Conf: {selectedHazard.aiVisionScan?.confidence}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Early Repair Cost</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    ${selectedHazard.aiVisionScan?.immediateRepairCost}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">60-Day Inaction Cost</span>
                  <span className="text-red-400 font-bold text-sm">
                    ${selectedHazard.aiVisionScan?.costOfInaction60Days?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Button */}
            <div className="pt-2">
              <button
                onClick={() => handleVerify(selectedHazard)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-lg active:scale-98 ${
                  justVerifiedId === selectedHazard.id
                    ? 'bg-emerald-500 text-slate-950 scale-102'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${justVerifiedId === selectedHazard.id ? 'animate-bounce' : ''}`} />
                <span>
                  {justVerifiedId === selectedHazard.id ? 'Verified! Co-signed +1' : `Verify This Hazard (+1 Neighbor Co-Sign)`}
                </span>
              </button>
            </div>

            {/* Deep Links to other tools */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => { onSelectHazardForInspection(selectedHazard); sounds.playClick(); }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-cyan-500/20 text-center transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4 mb-1 text-cyan-400" />
                <span className="text-[11px] font-semibold">Inspect AI</span>
              </button>

              <button
                onClick={() => { onSelectHazardForSimulation(selectedHazard); sounds.playClick(); }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border border-amber-500/20 text-center transition-all cursor-pointer"
              >
                <TrendingDown className="w-4 h-4 mb-1 text-amber-400" />
                <span className="text-[11px] font-semibold">Simulate Risk</span>
              </button>

              <button
                onClick={() => { onSelectHazardForEscalation(selectedHazard); sounds.playClick(); }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-orange-300 border border-orange-500/20 text-center transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 mb-1 text-orange-400" />
                <span className="text-[11px] font-semibold">311 Petition</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-6">
            <MapPin className="w-12 h-12 text-slate-600 mb-3 animate-bounce" />
            <p className="text-sm font-semibold text-slate-300">No Hazard Selected</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Click on any pin on the Sentinel Map to view live computer vision triage, risk metrics, and city escalation status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
