import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake,
  Check
} from 'lucide-react';
import { COMMUNITY_BOUNTIES } from '../data/mockHazards';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export default function CommunityBounties({ onOpenReportModal }) {
  const [bounties, setBounties] = useState(COMMUNITY_BOUNTIES);
  const [claimedBounties, setClaimedBounties] = useState({});
  const [showProofModal, setShowProofModal] = useState(null);

  const handleJoinBounty = (bountyId) => {
    sounds.playVerify();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });

    setClaimedBounties((prev) => ({
      ...prev,
      [bountyId]: true
    }));

    setBounties((prev) =>
      prev.map((b) => {
        if (b.id === bountyId) {
          return {
            ...b,
            volunteersClaimed: b.volunteersClaimed + 1
          };
        }
        return b;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
            <HeartHandshake className="w-4 h-4" />
            <span>Grassroots Tactical Mitigation Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Community Action Bounties & Volunteer Fixes
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            When municipal backlogs delay permanent repairs, neighbors mobilize tactical low-cost interventions (high-vis warning paint, rubber ramps, foliage trimming) to protect pedestrians today.
          </p>
        </div>

        {/* Civic Impact Stats */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono">
            <span className="text-[10px] text-slate-400 block">VOLUNTEERS ACTIVE</span>
            <span className="text-xl font-bold text-amber-400">128</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono">
            <span className="text-[10px] text-slate-400 block">TACTICAL FIXES</span>
            <span className="text-xl font-bold text-emerald-400">42 Deployed</span>
          </div>
        </div>
      </div>

      {/* Bounties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bounties.map((bounty) => {
          const isClaimed = claimedBounties[bounty.id];
          const isFullyClaimed = bounty.volunteersClaimed >= bounty.volunteersNeeded;

          return (
            <div
              key={bounty.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-xl ${
                bounty.status === 'completed'
                  ? 'bg-slate-950/80 border-emerald-500/30'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                {/* Bounty Top Tag */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    bounty.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {bounty.status === 'completed' ? '✓ Completed' : '⚡ Open Bounty'}
                  </span>

                  <span className="flex items-center gap-1 text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                    <Award className="w-3.5 h-3.5" />
                    +{bounty.rewardPoints} Civic XP
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                  {bounty.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {bounty.description}
                </p>

                {/* Specs */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Time Required:
                    </span>
                    <span className="text-slate-200">{bounty.estimatedMinutes} minutes</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      Volunteers:
                    </span>
                    <span className="text-amber-300 font-bold">
                      {bounty.volunteersClaimed} of {bounty.volunteersNeeded} joined
                    </span>
                  </div>

                  {/* Tools required tags */}
                  <div>
                    <span className="block text-[11px] text-slate-500 mb-1">Tools Provided/Needed:</span>
                    <div className="flex flex-wrap gap-1">
                      {bounty.toolsRequired.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                {bounty.status === 'completed' ? (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center font-mono text-xs text-emerald-300 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Verified Fixed: {bounty.completedProof?.date}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleJoinBounty(bounty.id)}
                    disabled={isClaimed}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isClaimed
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>You're on the Volunteer Roster!</span>
                      </>
                    ) : (
                      <>
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Join Volunteer Squad ({bounty.volunteersNeeded - bounty.volunteersClaimed} slots left)</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
