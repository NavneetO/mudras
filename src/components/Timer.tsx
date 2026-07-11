'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, Wind } from 'lucide-react';
import { playMindfulnessBell } from '@/lib/audio';

interface TimerProps {
  initialMinutes?: number;
  onComplete?: () => void;
  title?: string;
}

type BreathPhase = 'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)';

export const Timer: React.FC<TimerProps> = ({ initialMinutes = 5, onComplete, title }) => {
  const [duration, setDuration] = useState(initialMinutes * 60); // in seconds
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  
  // Breathing guide states (4-4-4-4 box breathing)
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with prop changes if not running
  useEffect(() => {
    if (!isRunning) {
      setDuration(initialMinutes * 60);
      setTimeLeft(initialMinutes * 60);
      setSessionCompleted(false);
    }
  }, [initialMinutes, isRunning]);

  // Main countdown timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerCompletion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Box Breathing cycle effect (runs only when timer is running)
  useEffect(() => {
    if (isRunning) {
      breathTimerRef.current = setInterval(() => {
        setBreathSeconds((prevSec) => {
          if (prevSec <= 1) {
            // Transition to next phase
            setBreathPhase((prevPhase) => {
              switch (prevPhase) {
                case 'Inhale':
                  return 'Hold (Full)';
                case 'Hold (Full)':
                  return 'Exhale';
                case 'Exhale':
                  return 'Hold (Empty)';
                case 'Hold (Empty)':
                  return 'Inhale';
                default:
                  return 'Inhale';
              }
            });
            return 4; // 4 seconds per box phase
          }
          return prevSec - 1;
        });
      }, 1000);
    } else {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    }

    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [isRunning]);

  const handleTimerCompletion = () => {
    setIsRunning(false);
    setSessionCompleted(true);
    if (soundEnabled) {
      playMindfulnessBell();
    }
    if (onComplete) {
      onComplete();
    }
  };

  const handleStartPause = () => {
    // Initial start audio chime feedback (softer bell pitch)
    if (!isRunning && timeLeft === duration && soundEnabled) {
      playMindfulnessBell();
    }
    setIsRunning(!isRunning);
    setSessionCompleted(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    setBreathPhase('Inhale');
    setBreathSeconds(4);
    setSessionCompleted(false);
  };

  const adjustTime = (minutes: number) => {
    if (isRunning) return;
    const newSeconds = minutes * 60;
    setDuration(newSeconds);
    setTimeLeft(newSeconds);
    setSessionCompleted(false);
  };

  // SVG circular path math
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  // Breathing guide circle scale factor
  const getBreathingScale = () => {
    if (!isRunning) return 'scale-90';
    switch (breathPhase) {
      case 'Inhale':
        // Smoothly expand from 0.85 to 1.15 depending on remaining seconds
        const scaleVal = 1.15 - (breathSeconds / 4) * 0.3;
        return `scale-[${scaleVal.toFixed(2)}]`;
      case 'Hold (Full)':
        return 'scale-115';
      case 'Exhale':
        // Smoothly contract from 1.15 to 0.85
        const contractVal = 0.85 + (breathSeconds / 4) * 0.3;
        return `scale-[${contractVal.toFixed(2)}]`;
      case 'Hold (Empty)':
        return 'scale-85';
      default:
        return 'scale-90';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl glass-effect border border-glass-border shadow-xs max-w-sm w-full mx-auto">
      {title && (
        <h4 className="text-sm font-semibold text-sage-500 uppercase tracking-wider mb-4">
          {title}
        </h4>
      )}

      {/* Circular Timer Visual */}
      <div className="relative w-52 h-52 flex items-center justify-center">
        {/* SVG Progress Circle */}
        <svg className="absolute w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="104"
            cy="104"
            r={radius}
            className="stroke-sage-100 dark:stroke-sage-900 fill-none"
            strokeWidth="6"
          />
          {/* Foreground progress circle */}
          <circle
            cx="104"
            cy="104"
            r={radius}
            className="stroke-sky-400 dark:stroke-sky-500 fill-none transition-all duration-1000 ease-linear"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Dynamic Breathing Guide Ring inside the Timer */}
        <div
          className={`absolute w-36 h-36 rounded-full bg-sage-500/5 dark:bg-sage-300/5 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${getBreathingScale()}`}
        >
          {isRunning ? (
            <div className="flex flex-col items-center text-center">
              <Wind className="h-4 w-4 text-sky-400 animate-pulse-slow mb-0.5" />
              <span className="text-xs font-medium text-sky-600 dark:text-sky-300 uppercase tracking-widest">
                {breathPhase}
              </span>
              <span className="text-[10px] text-sage-400 mt-0.5">
                {breathSeconds}s
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              {sessionCompleted ? (
                <>
                  <Sparkles className="h-6 w-6 text-accent-amber animate-bounce mb-1" />
                  <span className="text-xs font-semibold text-accent-amber-dark dark:text-accent-amber">
                    Namaste
                  </span>
                </>
              ) : (
                <>
                  <Wind className="h-5 w-5 text-sage-400/70 mb-1" />
                  <span className="text-xs text-sage-400">Ready</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Time Text Display */}
        <div className="absolute flex flex-col items-center select-none" style={{ transform: 'translateY(40px)' }}>
          <span className="text-3xl font-bold font-mono tracking-tight text-sage-800 dark:text-sage-100">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Preset Duration Buttons */}
      <div className="flex items-center gap-1.5 mt-6 mb-6">
        {[1, 3, 5, 10, 15].map((m) => (
          <button
            key={m}
            onClick={() => adjustTime(m)}
            disabled={isRunning}
            className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all ${
              duration === m * 60
                ? 'bg-sky-500 border-sky-500 text-white shadow-xs'
                : 'bg-white/50 dark:bg-black/20 border-sage-200 dark:border-sage-800 text-sage-600 dark:text-sage-300 hover:bg-sage-50 dark:hover:bg-sage-950/20'
            } ${isRunning ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {m}m
          </button>
        ))}
      </div>

      {/* Timer Controls */}
      <div className="flex items-center gap-4">
        {/* Toggle Sound */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2.5 rounded-full border transition-all ${
            soundEnabled
              ? 'bg-sage-50 dark:bg-sage-950/40 text-sage-600 dark:text-sage-300 border-sage-200 dark:border-sage-800'
              : 'text-sage-300 dark:text-sage-700 border-transparent'
          }`}
          title={soundEnabled ? 'Chimes enabled' : 'Muted'}
        >
          <Volume2 className="h-4.5 w-4.5" />
        </button>

        {/* Start / Pause */}
        <button
          onClick={handleStartPause}
          className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-750 text-white font-medium shadow-md shadow-sky-500/20 hover:scale-105 transition-all duration-300"
          title={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? <Pause className="h-5.5 w-5.5" /> : <Play className="h-5.5 w-5.5 translate-x-0.5" />}
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="p-2.5 rounded-full border border-sage-200 dark:border-sage-800 text-sage-600 dark:text-sage-300 hover:bg-sage-50 dark:hover:bg-sage-950/40 transition-all"
          title="Reset Timer"
        >
          <RotateCcw className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Guide text */}
      <p className="text-[10px] text-sage-400 mt-4 text-center max-w-[200px]">
        {isRunning 
          ? "Combine with breathing: match the expanding/contracting circle." 
          : "Select a duration, hold your mudra posture, and press start."}
      </p>
    </div>
  );
};
