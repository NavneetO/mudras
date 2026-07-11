'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, Clock, ShieldAlert } from 'lucide-react';
import { Mudra } from '@/data/mudrasData';
import { useMudra } from '@/context/MudraContext';
import { MudraIllustration } from './MudraIllustration';

interface MudraCardProps {
  mudra: Mudra;
  index?: number;
}

export const MudraCard: React.FC<MudraCardProps> = ({ mudra, index = 0 }) => {
  const { isBookmarked, toggleBookmark } = useMudra();
  const bookmarked = isBookmarked(mudra.id);

  // Evidence badge color mapper
  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Strong':
        return 'bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/30';
      case 'Moderate':
        return 'bg-teal-50 text-teal-700 border-teal-250 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800/30';
      case 'Preliminary':
        return 'bg-sky-50 text-sky-700 border-sky-250 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-850/30';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-250 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/30';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-sage-600 bg-sage-50 border-sage-200/50 dark:text-sage-300 dark:bg-sage-950/20';
      case 'Intermediate':
        return 'text-sky-600 bg-sky-50 border-sky-200/50 dark:text-sky-300 dark:bg-sky-950/20';
      default:
        return 'text-amber-600 bg-amber-50 border-amber-200/50 dark:text-amber-300 dark:bg-amber-950/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl glass-effect glass-effect-hover p-6 border border-glass-border shadow-xs"
    >
      {/* Header and Bookmark */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${getDifficultyColor(mudra.difficulty)}`}>
              {mudra.difficulty}
            </span>
          </div>
          <button
            onClick={() => toggleBookmark(mudra.id)}
            className="rounded-full p-2 text-sage-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark Mudra'}
            aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark Mudra'}
          >
            {bookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-sky-500 fill-sky-500/10" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Thumbnail Illustration */}
        <div className="my-4 flex justify-center">
          <Link href={`/library/${mudra.id}`} className="block w-28 h-28 hover:scale-105 transition-transform duration-300">
            <MudraIllustration id={mudra.id} />
          </Link>
        </div>

        {/* Mudra Names */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-sage-800 dark:text-sage-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            <Link href={`/library/${mudra.id}`}>
              {mudra.name}
            </Link>
          </h3>
          <p className="text-xs text-sage-400 italic mt-0.5">{mudra.sanskrit}</p>
        </div>

        {/* Key benefits list snippet */}
        <ul className="text-xs text-sage-600 dark:text-sage-300 space-y-1 mt-4 border-t border-sage-100/50 dark:border-sage-800/20 pt-4">
          {mudra.benefits.slice(0, 2).map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-sky-500 font-bold">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Specs */}
      <div className="mt-6 flex items-center justify-between border-t border-sage-100/50 dark:border-sage-800/20 pt-4 text-xs text-sage-500">
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-sage-400" />
          <span>{mudra.duration} mins</span>
        </div>
        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${getEvidenceColor(mudra.evidence)}`}>
          <ShieldAlert className="h-3 w-3 shrink-0" />
          <span>{mudra.evidence}</span>
        </div>
      </div>
    </motion.div>
  );
};
