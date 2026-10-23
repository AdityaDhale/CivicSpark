import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SentinelMap from './components/SentinelMap';
import AIVisionInspector from './components/AIVisionInspector';
import DecaySimulator from './components/DecaySimulator';
import EscalationPacketModal from './components/EscalationPacketModal';
import CommunityBounties from './components/CommunityBounties';
import ReportHazardModal from './components/ReportHazardModal';
import DevpostModal from './components/DevpostModal';
import { INITIAL_HAZARDS } from './data/mockHazards';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [hazards, setHazards] = useState(INITIAL_HAZARDS);
  const [selectedHazard, setSelectedHazard] = useState(INITIAL_HAZARDS[0]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDevpostModalOpen, setIsDevpostModalOpen] = useState(false);
  const [isEscalationModalOpen, setIsEscalationModalOpen] = useState(false);
  const [initialReportCoords, setInitialReportCoords] = useState(null);
  const [soundMuted, setSoundMuted] = useState(false);

  // Upvote / Verify hazard
  const handleVerifyHazard = (hazardId) => {
    setHazards((prev) =>
      prev.map((h) => {
        if (h.id === hazardId) {
          const nextCount = h.verificationCount + 1;
          const nextStatus = nextCount >= 80 ? 'escalated' : nextCount >= 50 ? 'verified' : h.status;
          return {
            ...h,
            verificationCount: nextCount,
            status: nextStatus
          };
        }
        return h;
      })
    );
  };

  // Add newly reported citizen hazard
  const handleAddHazard = (newHazard) => {
    setHazards((prev) => [newHazard, ...prev]);
    setSelectedHazard(newHazard);
    setActiveTab('map');
  };

  const handleSelectHazardForInspection = (hazard) => {
    setSelectedHazard(hazard);
    setActiveTab('inspector');
  };

  const handleSelectHazardForSimulation = (hazard) => {
    setSelectedHazard(hazard);
    setActiveTab('simulator');
  };

  const handleSelectHazardForEscalation = (hazard) => {
    setSelectedHazard(hazard);
    setIsEscalationModalOpen(true);
  };

  const handleOpenReportAtCoord = (lat, lng) => {
    setInitialReportCoords({ lat, lng });
    setIsReportModalOpen(true);
  };

  const totalVerifiedSum = hazards.reduce((acc, h) => acc + h.verificationCount, 0);

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => { setInitialReportCoords(null); setIsReportModalOpen(true); }}
        onOpenDevpostModal={() => setIsDevpostModalOpen(true)}
        totalHazardsCount={hazards.length}
        verifiedCount={totalVerifiedSum}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
      />

      {/* Main Viewport */}
      <main className="flex-1 w-full">
        {activeTab === 'map' && (
          <SentinelMap
            hazards={hazards}
            onVerifyHazard={handleVerifyHazard}
            onSelectHazardForInspection={handleSelectHazardForInspection}
            onSelectHazardForEscalation={handleSelectHazardForEscalation}
            onSelectHazardForSimulation={handleSelectHazardForSimulation}
            onOpenReportAtCoord={handleOpenReportAtCoord}
          />
        )}

        {activeTab === 'inspector' && (
          <AIVisionInspector
            onEscalateFromInspector={(hazardData) => {
              setIsEscalationModalOpen(true);
            }}
          />
        )}

        {activeTab === 'simulator' && (
          <DecaySimulator
            selectedHazard={selectedHazard}
            onSwitchToEscalation={() => setIsEscalationModalOpen(true)}
          />
        )}

        {activeTab === 'escalation' && (
          <div className="py-8">
            <EscalationPacketModal
              selectedHazard={selectedHazard}
              onClose={() => setActiveTab('map')}
            />
          </div>
        )}

        {activeTab === 'bounties' && (
          <CommunityBounties
            onOpenReportModal={() => { setInitialReportCoords(null); setIsReportModalOpen(true); }}
          />
        )}
      </main>

      {/* Modals */}
      {isReportModalOpen && (
        <ReportHazardModal
          initialCoords={initialReportCoords}
          onClose={() => { setIsReportModalOpen(false); setInitialReportCoords(null); }}
          onAddHazard={handleAddHazard}
        />
      )}

      {isDevpostModalOpen && (
        <DevpostModal
          onClose={() => setIsDevpostModalOpen(false)}
        />
      )}

      {isEscalationModalOpen && (
        <EscalationPacketModal
          selectedHazard={selectedHazard}
          onClose={() => setIsEscalationModalOpen(false)}
        />
      )}

      {/* Persistent Footer */}
      <footer className="border-t border-slate-800 bg-[#070b12] py-6 px-4 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-slate-300 font-bold">CivicSpark ⚡ Sentinel Protocol</span>
            <span className="text-slate-600">|</span>
            <span>Built for NextSpark Hacks 2026</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => setIsDevpostModalOpen(true)}
              className="hover:text-amber-400 cursor-pointer transition-colors"
            >
              Devpost Guide & Script
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('inspector')}
              className="hover:text-cyan-400 cursor-pointer transition-colors"
            >
              AI Vision Engine
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('simulator')}
              className="hover:text-amber-400 cursor-pointer transition-colors"
            >
              Decay Physics
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
