'use client';

import React from 'react';

interface MudraIllustrationProps {
  id: string;
  className?: string;
}

export const MudraIllustration: React.FC<MudraIllustrationProps> = ({ id, className = 'w-full h-full' }) => {
  // Common container with calming background circles and responsive bounds
  const renderSvgContent = () => {
    switch (id) {
      case 'gyan':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-sage-500 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {/* Wrist & Palm Silhouette */}
            <path d="M 60,160 Q 60,110 75,90" strokeDasharray="none" />
            <path d="M 140,160 Q 140,120 130,105" />
            
            {/* Extended Pinky Finger */}
            <path d="M 130,105 Q 148,80 150,50 Q 148,42 140,48 Q 132,54 123,88" />
            
            {/* Extended Ring Finger */}
            <path d="M 123,88 Q 132,60 131,35 Q 128,28 120,32 Q 112,36 109,78" />
            
            {/* Extended Middle Finger */}
            <path d="M 109,78 Q 112,50 110,25 Q 105,18 97,22 Q 90,26 94,80" />
            
            {/* Index Finger & Thumb touching in a circle */}
            {/* Index Finger bending down */}
            <path d="M 94,80 Q 90,105 76,110 C 65,114 62,94 72,86 C 78,82 85,82 89,89" />
            {/* Thumb extending up to meet */}
            <path d="M 75,90 Q 55,100 50,112 C 45,124 55,130 68,124 C 77,120 83,110 89,89" />
            
            {/* Glowing tactile pressure connection point */}
            <circle cx="89" cy="89" r="7" className="fill-sky-400/20 stroke-sky-400 stroke-[1.5] animate-pulse-slow" />
            <circle cx="89" cy="89" r="2" className="fill-sky-400 stroke-none" />
          </svg>
        );

      case 'dhyana':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-sage-500 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {/* Left Hand sitting below */}
            <path d="M 40,120 Q 50,140 100,140 Q 150,140 160,120" />
            <path d="M 50,130 Q 80,145 100,145 Q 120,145 150,130" />
            
            {/* Right Hand sitting on top */}
            <path d="M 45,110 Q 55,130 100,130 Q 145,130 155,110" />
            <path d="M 55,118 Q 80,133 100,133 Q 120,133 145,118" />
            
            {/* Left Thumb pointing up-center */}
            <path d="M 75,110 Q 90,95 96,90" />
            {/* Right Thumb pointing up-center to touch */}
            <path d="M 125,110 Q 110,95 104,90" />
            
            {/* Connection of thumbs at the peak */}
            <path d="M 96,90 C 99,87 101,87 104,90" strokeWidth="4" className="stroke-sky-500" />
            
            {/* Glowing triangle / connection point */}
            <circle cx="100" cy="89" r="6" className="fill-sky-400/20 stroke-sky-400 stroke-[1.5] animate-pulse-slow" />
            <circle cx="100" cy="89" r="1.5" className="fill-sky-400 stroke-none" />
            
            {/* Lap base indicator */}
            <path d="M 30,150 L 170,150" className="stroke-sage-300/40" strokeWidth="1" />
          </svg>
        );

      case 'prana':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-sage-500 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {/* Wrist & Palm */}
            <path d="M 60,160 Q 60,110 75,90" />
            <path d="M 140,160 Q 140,120 130,105" />
            
            {/* Extended Index Finger */}
            <path d="M 75,90 Q 72,55 70,30 Q 77,22 84,28 Q 90,34 89,80" />
            
            {/* Extended Middle Finger */}
            <path d="M 89,80 Q 94,52 95,27 Q 102,20 109,26 Q 114,32 108,82" />
            
            {/* Bent Ring Finger touching thumb */}
            <path d="M 108,82 Q 120,95 110,110 C 100,120 94,106 100,98" />
            
            {/* Bent Pinky Finger touching thumb */}
            <path d="M 130,105 Q 135,115 125,120 C 114,124 106,112 112,104" />
            
            {/* Thumb extending to meet them */}
            <path d="M 58,118 Q 75,122 92,112 Q 102,106 105,98" />
            
            {/* Multi-point contact glow */}
            <circle cx="103" cy="101" r="8" className="fill-sky-400/20 stroke-sky-400 stroke-[1.5] animate-pulse-slow" />
            <circle cx="103" cy="101" r="2.5" className="fill-sky-400 stroke-none" />
          </svg>
        );

      case 'apana':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-sage-500 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {/* Wrist & Palm */}
            <path d="M 60,160 Q 60,110 75,90" />
            <path d="M 140,160 Q 140,120 130,105" />
            
            {/* Extended Index Finger */}
            <path d="M 75,90 Q 65,60 62,35 Q 70,28 77,32 Q 85,38 85,82" />
            
            {/* Bent Middle Finger touching thumb */}
            <path d="M 85,82 Q 95,102 98,110 C 95,118 84,110 88,98" />
            
            {/* Bent Ring Finger touching thumb */}
            <path d="M 115,88 Q 112,104 108,112 C 104,118 94,110 98,98" />
            
            {/* Extended Pinky Finger */}
            <path d="M 130,105 Q 145,85 148,55 Q 142,48 135,52 Q 128,58 122,86" />
            
            {/* Thumb extending to meet middle and ring finger tips */}
            <path d="M 58,118 Q 75,124 93,115 Q 98,111 99,105" />
            
            {/* Contact Glow */}
            <circle cx="98" cy="109" r="8" className="fill-sky-400/20 stroke-sky-400 stroke-[1.5] animate-pulse-slow" />
            <circle cx="98" cy="109" r="2.5" className="fill-sky-400 stroke-none" />
          </svg>
        );

      case 'anjali':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-sage-500 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {/* Symmetrical Left Hand */}
            <path d="M 65,160 C 65,130 70,110 80,90 Q 85,70 85,40 C 85,35 90,32 94,35 C 98,38 98,42 98,90" />
            <path d="M 50,150 Q 58,125 72,110" strokeDasharray="3 3" className="stroke-sage-300" />
            
            {/* Symmetrical Right Hand */}
            <path d="M 135,160 C 135,130 130,110 120,90 Q 115,70 115,40 C 115,35 110,32 106,35 C 102,38 102,42 102,90" />
            <path d="M 150,150 Q 142,125 128,110" strokeDasharray="3 3" className="stroke-sage-300" />

            {/* Midline Press (Prayer boundary) */}
            <line x1="100" y1="38" x2="100" y2="155" strokeWidth="1" className="stroke-sky-400/40" />
            
            {/* Thumb Bases touching sternum concept */}
            <path d="M 98,125 Q 100,120 102,125" />
            <path d="M 92,135 Q 100,125 108,135" />

            {/* Glow at heart center line */}
            <circle cx="100" cy="90" r="10" className="fill-sky-400/10 stroke-sky-400/30 stroke-[1] animate-pulse-slow" />
            <circle cx="100" cy="90" r="4" className="fill-sky-400 stroke-none" />
          </svg>
        );

      case 'vayu':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-sage-500 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {/* Wrist & Palm */}
            <path d="M 60,160 Q 60,110 75,90" />
            <path d="M 140,160 Q 140,120 130,105" />
            
            {/* Index Finger folded deep down to thumb base */}
            <path d="M 75,90 Q 65,100 68,115 C 72,122 84,115 82,105" />
            
            {/* Thumb folded down over the index finger */}
            <path d="M 58,110 Q 72,105 82,105 C 88,105 84,95 78,95" strokeWidth="4" className="stroke-sky-500" />
            
            {/* Extended Middle Finger */}
            <path d="M 85,82 Q 95,45 96,22 Q 103,15 110,21 Q 115,27 108,80" />
            
            {/* Extended Ring Finger */}
            <path d="M 108,80 Q 118,50 119,28 Q 126,20 132,26 Q 136,32 126,84" />
            
            {/* Extended Pinky Finger */}
            <path d="M 126,84 Q 140,65 142,42 Q 148,36 153,42 Q 155,48 142,95" />

            {/* Pressure spot */}
            <circle cx="78" cy="105" r="7" className="fill-sky-400/20 stroke-sky-400 stroke-[1.5] animate-pulse-slow" />
            <circle cx="78" cy="105" r="1.5" className="fill-sky-400 stroke-none" />
          </svg>
        );

      default:
        // Placeholder/Default hand icon
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full text-sage-400 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="50" y="50" width="100" height="100" rx="10" strokeDasharray="4 4" />
            <text x="100" y="105" textAnchor="middle" className="fill-current text-xs stroke-none font-sans">Mudra Pose</text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center bg-radial from-sage-50 to-transparent dark:from-sage-950/20 rounded-full p-6 ${className}`}>
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 border border-sage-100/40 dark:border-sage-800/10 rounded-full scale-[0.95] pointer-events-none" />
      <div className="absolute inset-0 border border-sky-100/30 dark:border-sky-850/5 rounded-full scale-[0.8] pointer-events-none" />
      
      {/* Primary SVG Illustration */}
      <div className="relative w-full h-full animate-float">
        {renderSvgContent()}
      </div>
    </div>
  );
};
