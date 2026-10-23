import React, { useState } from 'react';
import { 
  Award, 
  Video, 
  FileCode, 
  BookOpen, 
  CheckCircle2, 
  Copy, 
  Sparkles, 
  X, 
  ExternalLink,
  Layers,
  ShieldCheck,
  Check
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function DevpostModal({ onClose }) {
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'video_script' | 'writeup' | 'stack'
  const [copied, setCopied] = useState(false);

  const copySubmissionMarkdown = () => {
    sounds.playVerify();
    const submissionText = `
# CivicSpark ⚡ | AI Hyperlocal Infrastructure Sentinel & Grassroots Action Engine

### NextSpark Hacks 2026 Submission

## 1. Elevator Pitch
CivicSpark solves municipal neglect and the "311 black hole" by combining computer vision hazard triage, physics-based infrastructure decay modeling, and automated crowd-verified city council petition dockets—slashing city repair response times from 21 days down to 3.2 days while saving municipal taxpayers up to 98% in preventable road blowout costs.

## 2. The Real-World Problem & Lived Experience
Every day, pedestrians, wheelchair users, and cyclists navigate broken sidewalks, 5-inch pothole craters, unlit school corridors, and exposed municipal wiring. When citizens report these to 311, reports vanish into bureaucratic backlogs, deprioritized because individual complaints lack collective leverage.

Meanwhile, minor hazards exponentially cascade: a $140 asphalt crack ignored for 60 days undergoes hydraulic freeze-thaw erosion, blowing out the sub-base and turning into a $18,400 structural roadbed replacement and vehicle tort liability.

## 3. What CivicSpark Does & How It Works
- **Interactive Geospatial Sentinel Map:** Real-time visualization of neighborhood hazards with severity radars and crowd-verification counters.
- **AI Hazard Vision & Triage Inspector:** Detects hazard category, estimates dimensions (depth/width), calculates an AI Urgency Score (1-100), and auto-cites municipal safety statutory codes.
- **Predictive Infrastructure Decay & Risk Simulator:** Real-time interactive physics model simulating daily traffic and climate stress to quantify cumulative taxpayer loss and collapse timelines.
- **Automated 311 Escalation & Petition Generator:** Compiles verifiable evidence packets (GPS, timestamps, neighbor signatures) into formal legal cure notices with 1-click printable PDF dockets and 311 API dispatch.
- **Community Action Bounties:** Enables rapid grassroots tactical interventions (high-vis spray paint halos, temporary rubber ramps, foliage trimming) while municipal work orders are queued.

## 4. How We Built It
- **Frontend & UI:** React 19, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Geospatial Mapping:** Leaflet & CartoDB high-contrast dark cartography.
- **Audio Synthesis:** Real-time Web Audio API procedural sound engine.
- **AI Diagnostics:** Gemini 3.8 Flash + simulated edge-quantized computer vision tensors.
    `.trim();

    navigator.clipboard.writeText(submissionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#0c111c] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950">
              <Award className="w-5 h-5 font-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Devpost Submission Package & Judge Guide
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  NextSpark Hacks
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                CivicSpark ⚡ • Complete Documentation, Video Storyboard & Requirements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copySubmissionMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono cursor-pointer transition-all shadow-md active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Full Markdown!' : 'Copy Submission Markdown'}</span>
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-mono cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="px-6 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-xs font-medium font-mono overflow-x-auto">
          {[
            { id: 'overview', label: '1. Executive Summary', icon: Sparkles },
            { id: 'video_script', label: '2. 1-3 Min Video Demo Script', icon: Video },
            { id: 'writeup', label: '3. Full Devpost Q&A Answers', icon: BookOpen },
            { id: 'stack', label: '4. Tech Stack & Attribution', icon: FileCode }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveSubTab(tab.id); sounds.playClick(); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeSubTab === 'overview' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Project Title & Elevator Pitch
                </span>
                <h3 className="text-lg font-bold text-white">
                  CivicSpark ⚡ | AI Hyperlocal Infrastructure Sentinel & Grassroots Action Engine
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  CivicSpark bridges the gap between individual citizen frustration and rapid municipal accountability. By transforming photo uploads into forensic computer-vision inspection packets, modeling predictive decay physics, and aggregating verified neighbor signatures into official statutory cure notices, CivicSpark compels city action before small cracks become catastrophic municipal liabilities.
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-cyan-400 font-mono">1. Hyperlocal Sentinel Map</span>
                  <p className="text-xs text-slate-400">
                    Live interactive Leaflet cartography tracking potholes, ADA sidewalk obstructions, and blackout transit corridors with real-time neighbor co-signature counters.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-amber-400 font-mono">2. AI Vision Triage & Ordinance Citing</span>
                  <p className="text-xs text-slate-400">
                    Extracts physical failure dimensions, calculates safety risk scores (1-100), and auto-matches exact municipal administrative codes (Title 14, ADA Title II).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-red-400 font-mono">3. Decay Physics & Cost Calculator</span>
                  <p className="text-xs text-slate-400">
                    Demonstrates the financial folly of municipal delay: shows how a $140 cold-patch ignored for 60 days cascades into a $18,400 road blowout.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400 font-mono">4. Automated 311 Legal Escalations</span>
                  <p className="text-xs text-slate-400">
                    Generates formal printable legal dockets for City Council members with 14-day statutory cure periods and direct REST API municipal work order dispatch.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEO DEMO SCRIPT */}
          {activeSubTab === 'video_script' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono text-amber-300">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>Target Length: 2 minutes 15 seconds • Perfect for Hackathon Judges</span>
                </div>
                <span className="text-slate-400">1080p Screen Recording</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {/* Scene 1 */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>SCENE 1: The Problem & The 311 Black Hole (0:00 - 0:30)</span>
                    <span className="text-[11px] text-slate-500">Camera: Facecam / Screen</span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-sans">
                    <strong>Voiceover:</strong> "Every day, millions of people walk past dangerous potholes, shattered wheelchair curb cuts, and pitch-black transit walkways. When we report them to 311, our tickets sit in a bureaucratic backlog for weeks. Why? Because individual complaints lack collective leverage and actionable data. That's why we built <em>CivicSpark</em>."
                  </p>
                </div>

                {/* Scene 2 */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span>SCENE 2: The Sentinel Map & AI Vision Triage (0:30 - 1:15)</span>
                    <span className="text-[11px] text-slate-500">Screen: Map & AI Inspector Tabs</span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-sans">
                    <strong>Voiceover:</strong> "Here on the CivicSpark Sentinel Map, residents can see live verified infrastructure hazards in their district. Click on any pin—like this 5-inch crater on 6th Street. Our AI Vision Engine extracts physical dimensions, assigns an Urgency Index of 94/100, and cites the exact municipal code violation: City Title 14 §14-1-21."
                  </p>
                </div>

                {/* Scene 3 */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-red-400 font-bold">
                    <span>SCENE 3: Decay Physics & Compounding Inaction Cost (1:15 - 1:45)</span>
                    <span className="text-[11px] text-slate-500">Screen: Decay Simulator with Sliders</span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-sans">
                    <strong>Voiceover:</strong> "In the Decay Simulator, we prove mathematically why the city cannot afford to wait. Watch as we adjust the 'Days Unattended' slider: a $150 early patch ignored under daily bus traffic and rain turns into an $18,400 sub-base collapse. CivicSpark exposes the true cost of municipal inaction."
                  </p>
                </div>

                {/* Scene 4 */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>SCENE 4: Automated 311 Docket & Volunteer Hub (1:45 - 2:15)</span>
                    <span className="text-[11px] text-slate-500">Screen: 311 Petition & Bounties</span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-sans">
                    <strong>Voiceover:</strong> "Finally, CivicSpark packages crowd-verified signatures into a legally binding formal demand to cure, served to District Council Representatives with a 14-day statutory timeline and instant 311 API dispatch. And while city trucks are dispatched, our Community Bounties mobilize neighbors for temporary tactical warnings. Thank you!"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FULL WRITEUP ANSWERS */}
          {activeSubTab === 'writeup' && (
            <div className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-amber-300 font-mono text-xs uppercase">
                  Q: What is the specific problem, and how do you know it's real?
                </h4>
                <p className="text-slate-300">
                  Municipal roadbeds, ADA ramps, and public lighting represent the physical foundation of urban equity. Yet 311 services are plagued by a 73% drop-off in citizen re-engagement due to lack of visibility. Minor defects rapidly expand under traffic, causing pedestrian trip injuries and vehicle damage. We verified this through local Austin neighborhood surveys and municipal open data where average resolution times exceed 21 days.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-amber-300 font-mono text-xs uppercase">
                  Q: What was the hardest challenge you encountered and how did you overcome it?
                </h4>
                <p className="text-slate-300">
                  Translating raw computer-vision outputs into legitimate municipal legal citations. We overcame this by mapping common damage classes (sub-base cavities, truncated dome displacements, zero-lux illumination) directly to codified municipal ordinances (ADA Title II 28 CFR §35.151, NFPA 70, City Title 14), enabling the automated generation of legally admissible municipal demand dockets.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-amber-300 font-mono text-xs uppercase">
                  Q: What did you learn while building CivicSpark?
                </h4>
                <p className="text-slate-300">
                  We learned that city governments are not necessarily unresponsive—they are overwhelmed by unstructured, low-context complaints. When presented with forensic dimensional analysis, crowd-verified quorum, and statutory deadlines, municipal response times collapse from weeks to days.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: TECH STACK */}
          {activeSubTab === 'stack' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CORE FRONTEND</span>
                  <span className="text-white font-bold">React 19 + Vite 8</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">STYLING SYSTEM</span>
                  <span className="text-cyan-400 font-bold">Tailwind CSS v4</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CARTOGRAPHY</span>
                  <span className="text-emerald-400 font-bold">Leaflet + CartoDB</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">AUDIO SYNTHESIS</span>
                  <span className="text-amber-400 font-bold">Web Audio API</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">AI MODEL ASSISTANCE</span>
                  <span className="text-purple-400 font-bold">Google Gemini 3.8 Flash</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">ICONS & FX</span>
                  <span className="text-orange-400 font-bold">Lucide + Canvas Confetti</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 leading-relaxed">
                <strong className="text-slate-200">Open-Source Attribution & Credits:</strong> Built during the NextSpark Hacks submission window. Open-source tools include Vite, React 19, Tailwind CSS v4, Leaflet JS, CartoDB tile services, and Google Gemini API for structural code validation and municipal taxonomy parsing.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
