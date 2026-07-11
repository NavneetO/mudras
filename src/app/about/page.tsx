'use client';

import React from 'react';
import { ShieldCheck, HeartPulse, Bell, CalendarClock, Info, Activity } from 'lucide-react';
import { useMudra } from '@/context/MudraContext';

export default function AboutPage() {
  const {
    reminderEnabled,
    setReminderEnabled,
    reminderTime,
    setReminderTime
  } = useMudra();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. Page Header */}
      <div className="text-center">
        <h1 className="font-outfit text-3.5xl md:text-5xl font-extrabold text-sage-800 dark:text-sage-100">
          About MudraMind
        </h1>
        <p className="mt-4 text-sm text-sage-500 dark:text-sage-400 max-w-xl mx-auto leading-relaxed">
          Complementary somatic practices designed for desk workers, meditation enthusiasts, and daily mindfulness breaks.
        </p>
      </div>

      {/* 2. Core Philosophy & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl glass-effect border border-glass-border space-y-3">
          <h2 className="font-outfit text-md font-bold text-sage-800 dark:text-sage-100 flex items-center gap-2">
            <Activity className="h-5 w-5 text-sky-500" />
            Our Core Mission
          </h2>
          <p className="text-xs text-sage-500 dark:text-sage-400 leading-relaxed">
            MudraMind was built to bridge the gap between traditional hand gestures (mudras) and modern physiological wellbeing. In a world of digital screens, our hands undergo static cramps while our minds handle constant cognitive overload. MudraMind introduces mudras as ergonomic micro-breaks and attention anchors to ground our bodies back into active, physical awareness.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-effect border border-glass-border space-y-3">
          <h2 className="font-outfit text-md font-bold text-sage-800 dark:text-sage-100 flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-sage-550" />
            Complementary Wellness
          </h2>
          <p className="text-xs text-sage-500 dark:text-sage-400 leading-relaxed">
            We advocate for mudras as supporting habits. Like taking a deep breath or doing a gentle desk shoulder stretch, mudras are easy physical resets. By holding a simple finger configuration, you coordinate posture, focus, and respiration rate, helping quiet the fight-or-flight nervous response without complicated setups or gear.
          </p>
        </div>
      </div>

      {/* 3. Daily Reminder Configuration Panel */}
      <section className="p-6 md:p-8 rounded-2xl glass-effect border border-sky-400/10 bg-sky-500/5 dark:bg-sky-400/5 space-y-5">
        <h2 className="font-outfit text-lg font-bold text-sage-800 dark:text-sage-100 flex items-center gap-2">
          <Bell className="h-5 w-5 text-sky-500 animate-pulse-slow" />
          Configure Daily Mindfulness Reminders
        </h2>
        <p className="text-xs text-sage-500 dark:text-sage-400 leading-relaxed">
          Set up a daily desktop notification reminder to step away from your screen, stretch your hands, and hold your preferred mudra routine for 5 minutes. (Reminders run periodically while this site is open in a browser tab).
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
          {/* Toggle status */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-sage-200 peer-focus:outline-hidden rounded-full peer dark:bg-sage-850 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-sage-350 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-sage-600 peer-checked:bg-sky-550"></div>
            </label>
            <span className="text-xs font-semibold text-sage-700 dark:text-sage-200">
              {reminderEnabled ? 'Reminders Enabled' : 'Reminders Muted'}
            </span>
          </div>

          {/* Time Picker */}
          {reminderEnabled && (
            <div className="flex items-center gap-2 animate-in fade-in duration-300">
              <CalendarClock className="h-4 w-4 text-sage-400" />
              <span className="text-xs text-sage-500 dark:text-sage-400">Time:</span>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="text-xs rounded-lg border border-sage-255 dark:border-sage-800 bg-white dark:bg-black/30 p-1.5 text-sage-800 dark:text-sage-100 focus:outline-hidden focus:border-sky-400"
              />
            </div>
          )}
        </div>
      </section>

      {/* 4. Bold Medical Disclaimer Block */}
      <section id="disclaimer" className="p-6 md:p-8 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex flex-col md:flex-row items-start gap-5">
        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <div className="space-y-3">
          <h2 className="font-outfit text-md font-bold text-accent-amber-dark dark:text-accent-amber">
            Official Medical Disclaimer & Guidance
          </h2>
          <div className="text-xs text-sage-500 dark:text-sage-400 space-y-3 leading-relaxed">
            <p>
              MudraMind promotes yoga mudras and somatic breathing exercises as complementary wellness habits, <strong>not</strong> medical treatments. The information provided on this platform represents historical practices, modern ergonomic tips, and preliminary cognitive science frameworks. None of the pages, timers, or datasets on MudraMind should be considered clinical advice or therapeutic cures.
            </p>
            <p>
              These exercises are not intended to diagnose, treat, prevent, or cure any physical ailments (such as chronic joint arthritis, cardiovascular anomalies, digestive systems issues) or mental illnesses (such as acute clinical anxiety or severe depressive disorders). They have not been approved as medical systems by the FDA or global medicinal regulation departments.
            </p>
            <p>
              Always consult a certified medical practitioner or physical therapist if you have concerns about your health, wrist fatigue, or general posture. Do not neglect or delay professional clinical consultations due to information read on this website.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Ergonomic Break Quick Tip */}
      <div className="p-6 rounded-2xl border border-glass-border glass-effect flex gap-4 items-center">
        <div className="p-2.5 rounded-full bg-sky-50 dark:bg-sky-950/20 text-sky-500 shrink-0">
          <Info className="h-5 w-5" />
        </div>
        <p className="text-xs text-sage-500 dark:text-sage-450 leading-relaxed">
          <strong>Quick Ergonomic Tip:</strong> For every 45 minutes of typing or trackpad use, pause for a 2-minute hand release. Gently open and close your palms, shake out your wrists, and adopt a simple mudra posture to restore healthy alignment.
        </p>
      </div>

    </div>
  );
}
