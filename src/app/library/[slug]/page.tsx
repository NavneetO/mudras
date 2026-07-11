'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Calendar, HelpCircle, AlertCircle, Bookmark, BookmarkCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { mudrasData } from '@/data/mudrasData';
import { useMudra } from '@/context/MudraContext';
import { MudraIllustration } from '@/components/MudraIllustration';
import { MudraCard } from '@/components/MudraCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return mudrasData.map((mudra) => ({
    slug: mudra.id,
  }));
}

export default function MudraDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const { isBookmarked, toggleBookmark } = useMudra();

  // Find mudra data
  const mudra = mudrasData.find((m) => m.id === slug);

  if (!mudra) {
    notFound();
  }

  const bookmarked = isBookmarked(mudra.id);

  // Filter out invalid/empty related links
  const relatedMudras = mudrasData.filter(
    (m) => mudra.related.includes(m.id) && m.id !== mudra.id
  );

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Strong':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/30';
      case 'Moderate':
        return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800/30';
      case 'Preliminary':
        return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-850/30';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-250 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/library"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-500 hover:text-sky-500 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Library
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Hand Illustration & Quick Specs (4 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl glass-effect border border-glass-border flex flex-col items-center text-center">
            {/* SVG Illustration Container */}
            <div className="w-56 h-56 md:w-64 md:h-64 mb-6">
              <MudraIllustration id={mudra.id} />
            </div>

            {/* Names */}
            <h1 className="font-outfit text-3xl font-bold text-sage-800 dark:text-sage-100">
              {mudra.name}
            </h1>
            <p className="text-sm text-sage-400 italic mt-1 font-medium">{mudra.sanskrit}</p>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(mudra.id)}
              className={`mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${
                bookmarked
                  ? 'bg-sky-50 border-sky-300 text-sky-600 dark:bg-sky-950/20 dark:border-sky-800 dark:text-sky-300'
                  : 'bg-white/40 dark:bg-black/20 border-sage-200 dark:border-sage-800 text-sage-600 dark:text-sage-350 hover:bg-sage-50'
              }`}
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-sky-500 fill-sky-500/10" />
                  Bookmarked in Favorites
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  Bookmark Mudra
                </>
              )}
            </button>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl glass-effect border border-glass-border flex items-start gap-3">
              <Clock className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold uppercase text-sage-400 tracking-wider">Suggested</h4>
                <p className="text-sm font-semibold text-sage-700 dark:text-sage-200 mt-0.5">
                  {mudra.duration} minutes
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-effect border border-glass-border flex items-start gap-3">
              <Calendar className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold uppercase text-sage-400 tracking-wider">Best Time</h4>
                <p className="text-[11px] font-semibold text-sage-700 dark:text-sage-200 mt-0.5 leading-snug">
                  {mudra.bestTime}
                </p>
              </div>
            </div>
          </div>

          {/* Start Routine Quick Link */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sage-500 to-sky-500 text-white shadow-md shadow-sage-500/10">
            <h3 className="font-outfit font-bold text-lg mb-1">Ready to Practice?</h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Open this gesture inside our interactive timer interface and coordinate it with deep breath guidance.
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-sage-800 hover:bg-sky-50 text-xs font-bold transition-all"
            >
              Open Daily Practice
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Execution steps & scientific evidence (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* How to Perform */}
          <section className="p-6 md:p-8 rounded-2xl glass-effect border border-glass-border space-y-5">
            <h2 className="font-outfit text-xl font-bold text-sage-800 dark:text-sage-100 border-b border-sage-100 dark:border-sage-900/60 pb-3">
              How to Perform
            </h2>
            <ol className="space-y-4">
              {mudra.steps.map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-300 text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-sage-600 dark:text-sage-350 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Possible Benefits */}
          <section className="p-6 md:p-8 rounded-2xl glass-effect border border-glass-border space-y-5">
            <h2 className="font-outfit text-xl font-bold text-sage-800 dark:text-sage-100 border-b border-sage-100 dark:border-sage-900/60 pb-3">
              Possible Benefits
            </h2>
            <ul className="space-y-3">
              {mudra.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sage-500/10 text-sage-600 dark:text-sage-300 text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <p className="text-xs text-sage-600 dark:text-sage-350 leading-relaxed">{benefit}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Scientific Evidence vs Traditional Claims */}
          <section className="p-6 md:p-8 rounded-2xl glass-effect border border-glass-border space-y-6">
            <div className="flex items-center justify-between border-b border-sage-100 dark:border-sage-900/60 pb-3">
              <h2 className="font-outfit text-xl font-bold text-sage-800 dark:text-sage-100">
                Scientific & Evidence Evaluation
              </h2>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold ${getEvidenceColor(mudra.evidence)}`}>
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                {mudra.evidence}
              </span>
            </div>

            {/* Scientific Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Modern Clinical Perspective
              </h3>
              <p className="text-xs text-sage-600 dark:text-sage-350 leading-relaxed">
                {mudra.scientificEvidence}
              </p>
            </div>

            {/* Traditional Claims */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sage-500">
                Traditional Beliefs & Claims
              </h3>
              <p className="text-xs text-sage-600 dark:text-sage-350 leading-relaxed italic bg-sage-50/50 dark:bg-black/10 p-3.5 rounded-xl border border-glass-border">
                {mudra.traditionalClaims}
              </p>
            </div>

            {/* Citations / Literature references */}
            {mudra.citations.length > 0 && (
              <div className="space-y-3 border-t border-sage-100 dark:border-sage-800/20 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sage-400">
                  Academic References
                </h4>
                <ul className="space-y-2 text-[11px] text-sage-500 dark:text-sage-400 list-disc pl-4 leading-relaxed">
                  {mudra.citations.map((cite, idx) => (
                    <li key={idx}>{cite}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

        </div>
      </div>

      {/* Related Mudras (bottom) */}
      {relatedMudras.length > 0 && (
        <section className="mt-16 border-t border-sage-100 dark:border-sage-900/60 pt-12">
          <h2 className="font-outfit text-2xl font-bold text-sage-800 dark:text-sage-100 mb-8 text-center md:text-left">
            Related Mudras
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedMudras.slice(0, 3).map((relatedMudra, idx) => (
              <MudraCard key={relatedMudra.id} mudra={relatedMudra} index={idx} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
