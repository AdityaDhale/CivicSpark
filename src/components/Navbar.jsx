import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  Scan, 
  TrendingDown, 
  FileText, 
  Users, 
  PlusCircle, 
  Award, 
  Volume2, 
  VolumeX, 
  ShieldAlert,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenReportModal, 
  onOpenDevpostModal,
  totalHazardsCount,
  verifiedCount,
  soundMuted,
  setSoundMuted
}) {
  const toggleSound = () => {
    const nextState = !soundMuted;
    setSoundMuted(nextState);
    sounds.toggle(!nextState);
    if (!nextState) sounds.playClick();
  };

  const navItems = [
    { id: 'map', label: 'Sentinel Map', icon: MapPin, badge: totalHazardsCount },
    { id: 'inspector', label: 'AI Vision Triage', icon: Scan, spark: true },
    { id: 'simulator', label: 'Decay & Cost Physics', icon: TrendingDown },
    { id: 'escalation', label: '311 City Petitions', icon: FileText, badge: 'Official' },
    { id: 'bounties', label: 'Volunteer Bounties', icon: Users, badge: 'Active' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0e17]/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner Alert Bar */}
      <div className="bg-gradient-to-r from-amber-600/20 via-orange-500/20 to-amber-600/20 border-b border-amber-500/30 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-300 font-mono">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-semibold tracking-wide">NEXTSPARK HACKS 2026</span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden sm:inline">Hyperlocal Municipal Infrastructure Sentinel & Accountability Protocol</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
          <span className="hidden md:flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>435 Verified Signatures</span>
          </span>
          <span className="hidden lg:flex items-center gap-1.5 text-amber-400">
            <Flame className="w-3.5 h-3.5" />
            <span>$184k Taxpayer Waste Blocked</span>
          </span>
          <button 
            onClick={toggleSound}
            title={soundMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
            className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="text-[11px]">{soundMuted ? 'Muted' : 'Audio On'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => { setActiveTab('map'); sounds.playClick(); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <Zap className="w-5 h-5 text-slate-950 font-black fill-current transform group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                  CivicSpark
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  v1.0 AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Infrastructure Sentinel & 311 Escalation
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); sounds.playClick(); }}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700/80' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.spark && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => { onOpenReportModal(); sounds.playClick(); }}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Report Hazard</span>
              <span className="sm:hidden">Report</span>
            </button>

            <button
              onClick={() => { onOpenDevpostModal(); sounds.playClick(); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-mono text-xs shadow-sm transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline">Devpost Package</span>
              <span className="lg:hidden">Devpost</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="md:hidden flex items-center space-x-2 py-2 overflow-x-auto scrollbar-none border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); sounds.playClick(); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
