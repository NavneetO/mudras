'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, ClipboardList, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useMudra } from '@/context/MudraContext';
import { Timer } from '@/components/Timer';
import { mudrasData } from '@/data/mudrasData';
import Link from 'next/link';

interface Routine {
  id: string;
  name: string;
  duration: number; // minutes
  description: string;
  mudraIds: string[];
}

export default function PracticePage() {
  const { incrementCompletedSessions } = useMudra();

  // Define routine presets
  const routines: Routine[] = [
    {
      id: 'morning',
      name: 'Morning Alignment',
      duration: 10,
      description: 'Start your day with mental clarity and physical posture alignment.',
      mudraIds: ['gyan', 'dhyana'],
    },
    {
      id: 'work_break',
      name: 'Ergonomic Screen Break',
      duration: 5,
      description: 'Stretch computer-weary hands and pause typing for physical reset.',
      mudraIds: ['vayu'],
    },
    {
      id: 'focus',
      name: 'Deep Focus Booster',
      duration: 12,
      description: 'Ground mental chatter to improve memory retention and study attention.',
      mudraIds: ['gyan'],
    },
    {
      id: 'anxiety_relief',
      name: 'Calming Anxiety Reset',
      duration: 8,
      description: 'Slow down hyper-arousal and settle the nervous system with heart-centered grounding.',
      mudraIds: ['apana', 'anjali'],
    },
    {
      id: 'evening',
      name: 'Evening Wind Down',
      duration: 15,
      description: 'Transition into deep sleep and release accumulated mental fatigue.',
      mudraIds: ['dhyana', 'anjali'],
    },
  ];

  const [activeRoutine, setActiveRoutine] = useState<Routine>(routines[0]);

  // Find actual mudra objects for the active routine
  const activeMudras = mudrasData.filter((m) => activeRoutine.mudraIds.includes(m.id));

  const handleTimerComplete = () => {
    incrementCompletedSessions();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title */}
      <div className="text-center md:text-left mb-10">
        <h1 className="font-outfit text-3xl md:text-4xl font-extrabold text-sage-800 dark:text-sage-100">
          Daily Routine Planner
        </h1>
        <p className="mt-2 text-sm text-sage-500 dark:text-sage-400 max-w-xl">
          Load a curated wellness routine or select your preferred time interval to practice hand exercises and breathing guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Preset Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl glass-effect border border-glass-border">
            <h2 className="font-outfit text-lg font-bold text-sage-800 dark:text-sage-100 mb-5 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-sky-500" />
              Select a Routine Preset
            </h2>

            <div className="space-y-4">
              {routines.map((routine) => {
                const isActive = activeRoutine.id === routine.id;
                return (
                  <button
                    key={routine.id}
                    onClick={() => setActiveRoutine(routine)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-sky-500/5 border-sky-500 dark:bg-sky-400/5 shadow-xs'
                        : 'bg-white/40 dark:bg-black/20 border-sage-200 dark:border-sage-850 hover:bg-sage-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-bold text-sm ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-sage-800 dark:text-sage-150'}`}>
                          {routine.name}
                        </h3>
                        <p className="text-xs text-sage-500 dark:text-sage-400 mt-1 max-w-md">
                          {routine.description}
                        </p>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                        isActive 
                          ? 'bg-sky-500 text-white shadow-xs' 
                          : 'bg-sage-100/60 dark:bg-sage-900/40 text-sage-600 dark:text-sage-300'
                      }`}>
                        {routine.duration} mins
                      </span>
                    </div>

                    {/* Mudra mini chips inside card */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-sage-100/50 dark:border-sage-800/10">
                      <span className="text-[10px] uppercase font-bold text-sage-400 tracking-wider">Gestures:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {mudrasData
                          .filter((m) => routine.mudraIds.includes(m.id))
                          .map((m) => (
                            <span key={m.id} className="text-[10px] px-2 py-0.5 rounded bg-sage-50 dark:bg-sage-950/20 text-sage-600 dark:text-sage-350 border border-sage-150/40">
                              {m.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Routine Instructions */}
          <div className="p-6 rounded-2xl glass-effect border border-glass-border space-y-4">
            <h3 className="font-outfit font-bold text-md text-sage-800 dark:text-sage-100">
              Active Routine Breakdown: <span className="text-sky-500">{activeRoutine.name}</span>
            </h3>

            <div className="space-y-4 pt-2">
              {activeMudras.map((m) => (
                <div key={m.id} className="flex gap-4 p-4 rounded-xl bg-sage-50/50 dark:bg-black/10 border border-glass-border">
                  <div className="w-16 h-16 shrink-0 bg-white dark:bg-black/20 rounded-lg p-1.5">
                    {/* SVG mini illustration */}
                    <div className="w-full h-full text-sage-500 fill-none">
                      {m.id === 'gyan' && (
                        <svg viewBox="0 0 200 200" className="w-full h-full" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M 60,160 Q 60,110 75,90" />
                          <path d="M 140,160 Q 140,120 130,105" />
                          <path d="M 94,80 Q 90,105 76,110 C 65,114 62,94 72,86 C 78,82 85,82 89,89" />
                          <path d="M 75,90 Q 55,100 50,112 C 45,124 55,130 68,124 C 77,120 83,110 89,89" />
                        </svg>
                      )}
                      {m.id === 'dhyana' && (
                        <svg viewBox="0 0 200 200" className="w-full h-full" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M 40,120 Q 50,140 100,140 Q 150,140 160,120" />
                          <path d="M 45,110 Q 55,130 100,130 Q 145,130 155,110" />
                        </svg>
                      )}
                      {m.id === 'anjali' && (
                        <svg viewBox="0 0 200 200" className="w-full h-full" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M 65,160 C 65,130 70,110 80,90 Q 85,70 85,40" />
                          <path d="M 135,160 C 135,130 130,110 120,90 Q 115,70 115,40" />
                        </svg>
                      )}
                      {m.id === 'vayu' && (
                        <svg viewBox="0 0 200 200" className="w-full h-full" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M 60,160 Q 60,110 75,90" />
                          <path d="M 75,90 Q 65,100 68,115 C 72,122 84,115 82,105" />
                          <path d="M 58,110 Q 72,105 82,105" strokeWidth="4" />
                        </svg>
                      )}
                      {m.id === 'apana' && (
                        <svg viewBox="0 0 200 200" className="w-full h-full" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M 60,160 Q 60,110 75,90" />
                          <path d="M 85,82 Q 95,102 98,110 C 95,118 84,110 88,98" />
                        </svg>
                      )}
                      {m.id === 'prana' && (
                        <svg viewBox="0 0 200 200" className="w-full h-full" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M 60,160 Q 60,110 75,90" />
                          <path d="M 108,82 Q 120,95 110,110" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-sage-800 dark:text-sage-100">{m.name}</h4>
                      <Link href={`/library/${m.id}`} className="text-sage-400 hover:text-sky-500" title="View details">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                    <p className="text-[11px] text-sage-500 dark:text-sage-400 leading-snug">
                      <strong>Posture:</strong> {m.steps[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Timer Interface (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Timer
            initialMinutes={activeRoutine.duration}
            title={activeRoutine.name}
            onComplete={handleTimerComplete}
          />

          {/* Guidelines Box */}
          <div className="p-5 rounded-2xl bg-sky-500/5 dark:bg-sky-400/5 border border-sky-400/10 text-xs space-y-2">
            <h4 className="font-bold text-sky-600 dark:text-sky-300 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4" />
              Practice Tips
            </h4>
            <ul className="list-disc pl-4 text-sage-500 dark:text-sage-400 space-y-1">
              <li>Keep your spine vertical and shoulders released.</li>
              <li>Adopt a light touch; do not squeeze or strain finger contacts.</li>
              <li>Rest your arms on your lap or knees to minimize elbow and wrist fatigue.</li>
              <li>Keep sound enabled to hear the synthesized mindfulness bell upon completion.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
