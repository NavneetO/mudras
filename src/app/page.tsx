'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Compass, PlayCircle, ShieldCheck, Heart, Sparkles, BrainCircuit } from 'lucide-react';
import { mudrasData } from '@/data/mudrasData';
import { MudraCard } from '@/components/MudraCard';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/library?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/library');
    }
  };

  // Select 3 mudras to feature on the homepage (Gyan, Dhyana, Anjali)
  const featuredMudras = mudrasData.filter((m) =>
    ['gyan', 'dhyana', 'anjali'].includes(m.id)
  );

  const benefits = [
    {
      icon: <BrainCircuit className="h-6 w-6 text-sky-500" />,
      title: 'Cognitive Grounding',
      desc: 'Tactile skin contact between finger tips acts as a physical anchor that redirects attention away from cognitive distractions.',
    },
    {
      icon: <Heart className="h-6 w-6 text-sage-500" />,
      title: 'Stress Regulation',
      desc: 'Integrating mudras with slow, conscious breathing triggers parasympathetic nervous activation, lowering heart rate.',
    },
    {
      icon: <Compass className="h-6 w-6 text-accent-amber-dark dark:text-accent-amber" />,
      title: 'Ergonomic Relief',
      desc: 'Simple posture changes stretch the fingers, thumbs, and wrists, providing key recovery breaks during desk work.',
    },
  ];

  const testimonials = [
    {
      quote: "Holding Gyan Mudra during my daily meditation sessions has given me a concrete physical anchor. Whenever my mind wanders, the physical contact brings me back.",
      author: "Sarah K.",
      role: "Mindfulness Practitioner & Designer",
    },
    {
      quote: "As a software developer, Vayu Mudra serves as my favorite 10-minute micro-stretch routine during coding breaks. It is simple ergonomics meets breathing.",
      author: "David L.",
      role: "Full-Stack Engineer",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-glass-border">
        {/* Soft abstract color blobs for calmness */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-sage-100/40 dark:bg-sage-950/10 filter blur-3xl -z-10 animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-sky-100/40 dark:bg-sky-950/10 filter blur-3xl -z-10 animate-float" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage-50 dark:bg-sage-950/30 text-sage-600 dark:text-sage-300 border border-sage-100 dark:border-sage-900/30 mb-6">
              <Sparkles className="h-3 w-3 text-sky-400" />
              Somatic Wellness & Mindfulness
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-sage-900 dark:text-sage-100 leading-tight"
          >
            Small Hand Gestures.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-600 via-sky-500 to-sky-600 dark:from-sage-400 dark:to-sky-400">
              Better Focus. Calmer Mind.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-sage-500 dark:text-sage-400 max-w-2xl mx-auto leading-relaxed"
          >
            Introduce ancient mudras as modern hand exercises. Explore their physiological link to mindfulness, posture alignment, and body awareness.
          </motion.p>

          {/* Search bar inside Hero */}
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 max-w-lg mx-auto"
          >
            <div className="relative flex items-center rounded-2xl bg-white/70 dark:bg-black/30 glass-effect border border-glass-border p-1.5 shadow-md">
              <div className="flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-sage-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mudras (e.g., Gyan, stress relief, focus)..."
                className="w-full bg-transparent pl-3 pr-2 py-3 text-sm text-sage-800 dark:text-sage-100 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-all shadow-sm"
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* Primary Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/library"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-medium shadow-md shadow-sage-600/10 transition-all hover:translate-y-[-1px]"
            >
              <Compass className="h-5 w-5" />
              Explore Mudras
            </Link>
            <Link
              href="/practice"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/80 dark:bg-black/30 hover:bg-sage-50 dark:hover:bg-sage-950/20 text-sage-700 dark:text-sage-300 font-medium border border-sage-200 dark:border-sage-800 shadow-sm transition-all hover:translate-y-[-1px]"
            >
              <PlayCircle className="h-5 w-5 text-sky-500" />
              Start Practicing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. HOW MUDRAS WORK SECTION */}
      <section className="py-16 md:py-24 bg-white/20 dark:bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-outfit text-3xl font-bold tracking-tight text-sage-800 dark:text-sage-100">
              The Science of Somatic Touch
            </h2>
            <p className="mt-4 text-sm text-sage-500 dark:text-sage-400">
              Traditional wellness meets cognitive science. Hand positions influence attention, breathing, and body awareness through established physical feedback loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl glass-effect border border-glass-border shadow-xs"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-sage-50 dark:bg-sage-950/30 border border-sage-100 dark:border-sage-900/30 mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-sage-800 dark:text-sage-100 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs leading-relaxed text-sage-500 dark:text-sage-400">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Embodied Cognition Explain Block */}
          <div className="mt-12 p-6 rounded-2xl border border-glass-border glass-effect max-w-3xl mx-auto text-center">
            <p className="text-xs text-sage-500 dark:text-sage-300 italic">
              <strong>What is Embodied Cognition?</strong> In modern psychology, this theory details how our motor postures directly shape our mental state. Folding and joining fingers creates unique somatic feedback loops that signal alignment and grounding to the central nervous system.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED MUDRAS */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-12">
            <div>
              <h2 className="font-outfit text-3xl font-bold tracking-tight text-sage-800 dark:text-sage-100">
                Featured Mudras
              </h2>
              <p className="mt-2 text-sm text-sage-500 dark:text-sage-400">
                Begin your journey with three accessible, highly-utilized wellness gestures.
              </p>
            </div>
            <Link
              href="/library"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-sm font-semibold text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 hover:underline"
            >
              View Full Mudra Library &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMudras.map((mudra, idx) => (
              <MudraCard key={mudra.id} mudra={mudra} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="py-16 bg-sage-50/30 dark:bg-black/20 border-t border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-widest text-sky-500 uppercase">
              Community Integration (Fictional Examples)
            </span>
            <h2 className="font-outfit text-2xl font-bold tracking-tight text-sage-800 dark:text-sage-100 mt-2">
              Practitioner Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-effect border border-glass-border relative flex flex-col justify-between">
                <p className="text-sm italic text-sage-600 dark:text-sage-300 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-sage-800 dark:text-sage-100">{t.author}</h4>
                    <p className="text-[10px] text-sage-400">{t.role}</p>
                  </div>
                  <span className="text-[9px] font-semibold bg-sage-100/50 dark:bg-sage-950/20 px-2 py-0.5 rounded text-sage-500 uppercase tracking-wider">
                    Fictional Story
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SCIENTIFIC DISCLAIMER BOX */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-accent-amber-dark dark:text-accent-amber">
              Scientific & Medical Pause Point
            </h3>
            <p className="text-xs text-sage-500 dark:text-sage-400 leading-relaxed">
              MudraMind positions yoga mudras strictly as <strong>complementary, minor somatic practices</strong>. While tactile feedback and paced breathing are scientifically studied for stress down-regulation, mudras do not replace clinical advice, medical interventions, or diagnostic therapeutics. Please consult a health provider for clinical concerns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
