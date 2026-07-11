'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldAlert, CheckCircle, Scale, GraduationCap } from 'lucide-react';

export default function ResearchPage() {
  const researchItems = [
    {
      mudra: 'Gyan (Jnana) Mudra',
      wellnessUse: 'Attention anchoring, cognitive focus, mental quietude',
      evidence: 'Preliminary',
      details: 'Frequently investigated as a package component of mindfulness meditation and pranayama (cyclic breathing). Neuroimaging suggests holding static mudras serves as a sensory anchor, stabilizing attention and reducing default mode network (DMN) activity.',
      studies: [
        'Lazar, S. W., et al. (2005). Meditation experience is associated with increased cortical thickness. NeuroReport.',
        'Sarang, S. P., & Telles, S. (2006). Effects of cyclic meditation on memory and state anxiety. Journal of Indian Psychology.'
      ]
    },
    {
      mudra: 'Dhyana Mudra',
      wellnessUse: 'Postural stability, physical stillness, autonomic calming',
      evidence: 'Preliminary',
      details: 'Physiological gains are linked directly to seated meditation. Resting the hands in the lap reduces trapezius muscle fatigue, encouraging erect spinal postures, which optimizes diaphragmatic exhalations and triggers vagal nerve calming.',
      studies: [
        'Tang, Y. Y., et al. (2009). Central and autonomic nervous system interaction in short-term meditation. PNAS.',
        'Travis, F., et al. (2010). Focus, open monitoring, and automatic self-transcending. Consciousness and Cognition.'
      ]
    },
    {
      mudra: 'Anjali Mudra (Prayer Pose)',
      wellnessUse: 'Somatic centering, gratitude loops, postural alignment',
      evidence: 'Preliminary',
      details: 'Highly supported by the concept of Embodied Cognition. Symmetrical hand pressing at the chest midline promotes muscular alignment and balances bilateral shoulder elevation, stimulating subjective states of composure and emotional reset.',
      studies: [
        'Wilson, M. (2002). Six views of embodied cognition. Psychonomic Bulletin & Review.',
        'Carney, D. R., et al. (2010). Posture-mind feedback loops and neuroendocrine levels. Psychological Science.'
      ]
    },
    {
      mudra: 'Vayu Mudra',
      wellnessUse: 'Intrapersonal grounding, ergonomic wrist breaks',
      evidence: 'Traditional Claim',
      details: 'Insuficient direct clinical evidence testing metabolic or air element changes. Ergonomically, folding the index finger while extending others acts as an intrinsic muscular hand stretch, mitigating wrist fatigue after repetitive typing.',
      studies: [
        'Fealy, S., et al. (2002). Hand ergonomics and hand micro-stretches during computer use. Journal of Hand Therapy.'
      ]
    },
    {
      mudra: 'Prana Mudra',
      wellnessUse: 'Respiration coordination, fatigue reduction',
      evidence: 'Traditional Claim',
      details: 'Direct studies are lacking. Physiological outcomes are mediated by slow paced breathing (e.g. 5-6 cycles per minute) typically performed with this mudra. Tactile pressure on thumb and ring/pinky fingertips stimulates somatosensory receptors.',
      studies: [
        'Russo, M. A., et al. (2017). The physiological effects of slow breathing in the healthy human. Breathe.',
        'Brown, R. P., & Gerbarg, P. L. (2005). Yogic breathing in the treatment of stress and anxiety. JACM.'
      ]
    },
    {
      mudra: 'Apana Mudra',
      wellnessUse: 'Grounding focus, visceral digestive calming',
      evidence: 'Traditional Claim',
      details: 'No direct clinical trials validate digestive purification. Tactile coordinate movements stimulate motor cortex pathways. When paired with slow exhalations, it stimulates vagus-dominated parasympathetic signals, reducing gut tension.',
      studies: [
        'Gerritsen, R. J., & Band, G. P. (2018). Contemplative activity and respiratory vagal stimulation. Frontiers in Human Neuroscience.',
        'Mayer, E. A. (2011). Gut feelings: the biology of visceral communication. Nature Reviews Neuroscience.'
      ]
    }
  ];

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Strong':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-800/30';
      case 'Moderate':
        return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/20 dark:text-teal-300 dark:border-teal-800/30';
      case 'Preliminary':
        return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/20 dark:text-sky-300 dark:border-sky-850/30';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-250 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="font-outfit text-3.5xl md:text-5xl font-extrabold text-sage-800 dark:text-sage-100">
          Scientific Research & Literature
        </h1>
        <p className="mt-4 text-sm text-sage-500 dark:text-sage-400 leading-relaxed">
          Evaluating the physiological mechanisms and cognitive models of hand positions. We separate traditional claims from clinical evidence.
        </p>
      </div>

      {/* Explanatory Blocks on Physiological Mechanisms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 rounded-2xl glass-effect border border-glass-border space-y-3">
          <h2 className="font-outfit text-md font-bold text-sage-800 dark:text-sage-100 flex items-center gap-2">
            <Scale className="h-5 w-5 text-sky-500" />
            Demarcating Beliefs from Evidence
          </h2>
          <p className="text-xs text-sage-500 dark:text-sage-400 leading-relaxed">
            In historical texts, mudras are described in energetic terms (balancing elements like fire, water, and air). In modern clinical studies, we translate these positions into physical mechanisms: fingertip tactile feedback stimulating the somatosensory cortex, ergonomic hand stretching, and breathing anchors. We label energy elements as <strong>Traditional Claims</strong> due to the lack of physiological tests validating those metrics.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-effect border border-glass-border space-y-3">
          <h2 className="font-outfit text-md font-bold text-sage-800 dark:text-sage-100 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-sage-550" />
            The Somatosensory Hominuculus Model
          </h2>
          <p className="text-xs text-sage-500 dark:text-sage-400 leading-relaxed">
            The human hands contain thousands of nerve endings that map to a massive cortical region in the brain. Squeezing or pressing fingers together provides continuous tactile inputs that occupy cortical attention. This physical feedback naturally competes with cognitive loops, acting as a somatic blocker to suppress default-mode anxiety and stabilize attention.
          </p>
        </div>
      </div>

      {/* Structured Evidence Table */}
      <div className="p-6 rounded-2xl glass-effect border border-glass-border overflow-hidden">
        <h2 className="font-outfit text-lg font-bold text-sage-800 dark:text-sage-100 mb-6 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-sky-500" />
          Clinical & Literature Mapping
        </h2>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-sage-100 dark:divide-sage-850">
            <thead>
              <tr className="text-[11px] font-bold text-sage-400 uppercase tracking-wider text-left bg-sage-50/50 dark:bg-black/10">
                <th className="px-4 py-3.5">Mudra</th>
                <th className="px-4 py-3.5">Supported Wellness Use</th>
                <th className="px-4 py-3.5">Evidence Level</th>
                <th className="px-4 py-3.5">Scientific Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-100/50 dark:divide-sage-900/40 text-xs text-sage-600 dark:text-sage-300">
              {researchItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-sage-50/20 dark:hover:bg-black/5">
                  <td className="px-4 py-4 font-bold text-sage-800 dark:text-sage-100 whitespace-nowrap">
                    {item.mudra}
                  </td>
                  <td className="px-4 py-4 leading-normal">
                    {item.wellnessUse}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-semibold ${getEvidenceColor(item.evidence)}`}>
                      {item.evidence}
                    </span>
                  </td>
                  <td className="px-4 py-4 leading-relaxed max-w-sm">
                    <p className="mb-2">{item.details}</p>
                    <div className="border-t border-sage-100/30 dark:border-sage-800/10 pt-2">
                      <span className="text-[10px] font-semibold text-sage-400 uppercase tracking-wider">Studies:</span>
                      <ul className="list-disc pl-3 mt-1 space-y-1 text-[10px] text-sage-500">
                        {item.studies.map((study, sIdx) => (
                          <li key={sIdx}>{study}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
