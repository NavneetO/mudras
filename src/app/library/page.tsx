'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, RotateCcw, BookHeart, Filter, SlidersHorizontal } from 'lucide-react';
import { mudrasData, MUDRA_CATEGORIES } from '@/data/mudrasData';
import { MudraCard } from '@/components/MudraCard';
import { useMudra } from '@/context/MudraContext';

// Client component wrapper for Suspense
function LibraryContent() {
  const searchParams = useSearchParams();
  const { bookmarks } = useMudra();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState<string>('default');

  // Load initial params
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    const filterParam = searchParams.get('filter');
    if (filterParam === 'bookmarked') {
      setShowOnlyBookmarked(true);
    }
  }, [searchParams]);

  // Filter mudras
  const filteredMudras = mudrasData.filter((mudra) => {
    // 1. Search Query (matches name, sanskrit, or benefits)
    const matchesSearch =
      searchQuery === '' ||
      mudra.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mudra.sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mudra.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mudra.traditionalClaims.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category Filter
    const matchesCategory =
      selectedCategory === 'All' || mudra.categories.includes(selectedCategory);

    // 3. Difficulty Filter
    const matchesDifficulty =
      selectedDifficulty === 'All' || mudra.difficulty === selectedDifficulty;

    // 4. Bookmark Filter
    const matchesBookmark = !showOnlyBookmarked || bookmarks.includes(mudra.id);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark;
  });

  // Sort mudras
  const sortedMudras = [...filteredMudras].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'duration-asc') {
      return a.duration - b.duration;
    }
    if (sortBy === 'duration-desc') {
      return b.duration - a.duration;
    }
    if (sortBy === 'difficulty-asc') {
      const difficultyOrder: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }
    return 0; // Default sorting (dataset order)
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setShowOnlyBookmarked(false);
    setSortBy('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-outfit text-3xl md:text-4xl font-extrabold text-sage-800 dark:text-sage-100">
          Mudra Library
        </h1>
        <p className="mt-2 text-sm text-sage-500 dark:text-sage-400 max-w-xl">
          Browse through our curated collection of somatic hand exercises. Filter by your wellness goal or difficulty level.
        </p>
      </div>

      {/* Filter and Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Filter Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl glass-effect border border-glass-border">
            <div className="flex items-center justify-between pb-4 border-b border-sage-100 dark:border-sage-900/60 mb-5">
              <span className="flex items-center gap-2 font-bold text-sm text-sage-800 dark:text-sage-100">
                <SlidersHorizontal className="h-4 w-4 text-sky-500" />
                Filters
              </span>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[11px] text-sage-400 hover:text-sky-500 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-sage-400 uppercase tracking-wider">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find by goal or name..."
                  className="w-full text-xs rounded-xl border border-sage-200 dark:border-sage-800 bg-white/40 dark:bg-black/20 pl-8 pr-3 py-2.5 text-sage-700 dark:text-sage-200 focus:outline-hidden focus:border-sky-400"
                />
                <Search className="absolute left-2.5 top-3 h-3.5 w-3.5 text-sage-400" />
              </div>
            </div>

            {/* Bookmarks Toggle */}
            <div className="mb-6">
              <button
                onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  showOnlyBookmarked
                    ? 'bg-sky-50 border-sky-300 text-sky-700 dark:bg-sky-950/20 dark:border-sky-800 dark:text-sky-300 font-semibold'
                    : 'bg-white/40 dark:bg-black/20 border-sage-200 dark:border-sage-800 text-sage-600 dark:text-sage-350 hover:bg-sage-50/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookHeart className="h-4 w-4" />
                  Show Bookmarked Only
                </span>
                <span className="bg-sage-100/50 dark:bg-sage-900/40 px-2 py-0.5 rounded text-[10px]">
                  {bookmarks.length}
                </span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-sage-400 uppercase tracking-wider block">Category</label>
              <div className="flex flex-wrap gap-1.5 max-h-[220px] overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-sage-600 border-sage-600 text-white font-medium'
                      : 'bg-white/40 dark:bg-black/20 border-sage-200 dark:border-sage-800 text-sage-600 dark:text-sage-300 hover:bg-sage-50'
                  }`}
                >
                  All Categories
                </button>
                {MUDRA_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                      selectedCategory === cat
                        ? 'bg-sage-600 border-sage-600 text-white font-medium'
                        : 'bg-white/40 dark:bg-black/20 border-sage-200 dark:border-sage-800 text-sage-600 dark:text-sage-300 hover:bg-sage-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-sage-400 uppercase tracking-wider block">Difficulty</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-2 text-xs rounded-lg border transition-all text-center ${
                      selectedDifficulty === diff
                        ? 'bg-sage-600 border-sage-600 text-white font-medium'
                        : 'bg-white/40 dark:bg-black/20 border-sage-200 dark:border-sage-800 text-sage-600 dark:text-sage-300 hover:bg-sage-50'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-sage-400 uppercase tracking-wider block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs rounded-xl border border-sage-200 dark:border-sage-800 bg-white/40 dark:bg-black/20 p-2.5 text-sage-700 dark:text-sage-200 focus:outline-hidden focus:border-sky-400"
              >
                <option value="default">Default Order</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="duration-asc">Duration (Short-Long)</option>
                <option value="duration-desc">Duration (Long-Short)</option>
                <option value="difficulty-asc">Difficulty (Easy-Hard)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Cards Grid */}
        <div className="lg:col-span-3">
          {sortedMudras.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedMudras.map((mudra, idx) => (
                <MudraCard key={mudra.id} mudra={mudra} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl glass-effect border border-glass-border">
              <div className="inline-flex p-4 rounded-full bg-sage-50 dark:bg-sage-950/20 text-sage-400 mb-4">
                <Filter className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-sage-800 dark:text-sage-100">No Mudras Found</h3>
              <p className="text-xs text-sage-500 mt-1 max-w-sm mx-auto">
                No hand gestures match your current search queries or filter attributes. Try clearing filters to explore the rest.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MudraLibraryPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh] text-sage-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400" />
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
