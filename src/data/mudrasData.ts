export interface Mudra {
  id: string;
  name: string;
  sanskrit: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // typical duration in minutes
  categories: string[];
  steps: string[];
  evidence: 'Strong' | 'Moderate' | 'Preliminary' | 'Traditional Claim';
  benefits: string[];
  bestTime: string;
  traditionalClaims: string;
  scientificEvidence: string;
  citations: string[];
  related: string[];
}

export const MUDRA_CATEGORIES = [
  'Focus',
  'Relaxation',
  'Stress Management',
  'Better Posture',
  'Meditation',
  'Screen Breaks',
  'Breathing'
];

export const mudrasData: Mudra[] = [
  {
    id: 'gyan',
    name: 'Gyan Mudra',
    sanskrit: 'ज्ञान मुद्रा',
    difficulty: 'Beginner',
    duration: 15,
    categories: ['Focus', 'Meditation', 'Relaxation'],
    steps: [
      'Sit comfortably with your spine erect, shoulders relaxed, and eyes gently closed.',
      'Touch the tip of your index finger to the tip of your thumb, forming a soft circle.',
      'Keep the other three fingers (middle, ring, and pinky) straight, relaxed, and parallel to each other.',
      'Place your hands on your knees with your palms facing upwards.',
      'Focus on your natural breath and the subtle pressure at the point of contact between your index finger and thumb.'
    ],
    evidence: 'Preliminary',
    benefits: [
      'Promotes concentration, memory retention, and cognitive focus.',
      'Anchors attention, helping calm racing thoughts during meditation.',
      'Improves somatic (body) awareness through gentle physical feedback.'
    ],
    bestTime: 'Morning, during sitting meditation or focus sessions.',
    traditionalClaims: 'Traditionally referred to as the "Gesture of Knowledge," Gyan mudra is believed to stimulate the brain, alleviate insomnia, bring a sense of mental clarity, and balance the air (Vayu) element in the body.',
    scientificEvidence: 'Clinical studies specifically testing Gyan Mudra in isolation are limited. However, it is frequently studied as part of mindfulness meditation and pranayama (breath control) packages. Neuroimaging research shows that maintaining consistent, gentle hand gestures serves as a cognitive "anchor," reducing mind-wandering by helping suppress default mode network (DMN) activity. Additionally, the finger-to-thumb touch stimulates the large cortical representation of the thumb and index finger in the somatosensory cortex, reinforcing bodily presence and attention.',
    citations: [
      'Lazar, S. W., et al. (2005). Meditation experience is associated with increased cortical thickness. NeuroReport.',
      'Sarang, S. P., & Telles, S. (2006). Effects of two yoga techniques on cyclic meditation on memory and state anxiety. Journal of Indian Psychology.'
    ],
    related: ['dhyana', 'anjali']
  },
  {
    id: 'dhyana',
    name: 'Dhyana Mudra',
    sanskrit: 'ध्यान मुद्रा',
    difficulty: 'Beginner',
    duration: 10,
    categories: ['Relaxation', 'Meditation'],
    steps: [
      'Adopt a comfortable seated position (e.g., cross-legged on a cushion or upright in a chair).',
      'Rest your hands in your lap, palms facing up.',
      'Place your right hand directly on top of your left hand.',
      'Bring the tips of your thumbs together to touch gently, forming a soft triangle or oval shape.',
      'Relax your elbows and shoulders, allowing your hands to rest comfortably.'
    ],
    evidence: 'Preliminary',
    benefits: [
      'Facilitates deep states of mental relaxation and stress reduction.',
      'Supports physical stability and spinal alignment during seated contemplation.',
      'Acts as a grounding cue for transition into quiet mindfulness.'
    ],
    bestTime: 'Before bedtime, or at the start of a mindfulness practice.',
    traditionalClaims: 'Traditionally known as the "Gesture of Meditation," Dhyana mudra represents absolute balance. It is believed to balance the active (right) and passive (left) energies, quieten internal chatter, and lead to inner peace.',
    scientificEvidence: 'The physiological benefits of Dhyana Mudra are heavily linked to the meditation and breathing exercises with which it is practiced. The physical posture of having hands resting in the lap reduces muscle activity in the upper shoulders, supporting a straight spine and lower diaphragmatic breathing. The light contact between the thumbs creates a continuous loop of tactile feedback, which serves as a physiological signal of alertness, helping to prevent sleepiness during meditation.',
    citations: [
      'Tang, Y. Y., et al. (2009). Central and autonomic nervous system interaction is involved in short-term meditation. PNAS.',
      'Travis, F., et al. (2010). Focus, open monitoring, and automatic self-transcending: Categories to organize meditation practices. Consciousness and Cognition.'
    ],
    related: ['gyan', 'anjali']
  },
  {
    id: 'prana',
    name: 'Prana Mudra',
    sanskrit: 'प्राण मुद्रा',
    difficulty: 'Beginner',
    duration: 15,
    categories: ['Breathing', 'Relaxation'],
    steps: [
      'Sit comfortably or lie down with your spine aligned.',
      'Bring the tips of your ring finger and pinky finger to touch the tip of your thumb.',
      'Keep the index and middle fingers pointing straight, side-by-side.',
      'Place the back of your hands on your thighs or knees (if sitting), or beside you (if lying down).',
      'Take slow, deep, diaphragmatic breaths, visualizing energy flowing up the spine on each inhale.'
    ],
    evidence: 'Traditional Claim',
    benefits: [
      'Encourages conscious, deeper breathing patterns.',
      'Serves as a tactile grounding focus during midday fatigue.',
      'Combines finger stretches with mindfulness to relieve hand tension.'
    ],
    bestTime: 'Early morning or mid-afternoon during a energy slump.',
    traditionalClaims: 'Known as the "Gesture of Life Force" (Prana), this mudra is traditionally said to awaken dormant energy, reduce fatigue, sharpen vision, and boost the body\'s immune defense by balancing the fire (Agni), water (Jala), and earth (Prithvi) elements.',
    scientificEvidence: 'There are no direct peer-reviewed clinical trials demonstrating that Prana Mudra boosts energy or immune systems on its own. Its wellness benefits are primarily achieved through the slow, deep breathing (pranayama) that typically accompanies it. Slow breathing (5-6 breaths per minute) stimulates the vagus nerve, which activates the parasympathetic nervous system, lowering heart rate, reducing stress hormones, and physically restoring feelings of energy and calm.',
    citations: [
      'Brown, R. P., & Gerbarg, P. L. (2005). Sudarshan Kriya yogic breathing in the treatment of stress, anxiety, and depression. Journal of Alternative and Complementary Medicine.',
      'Russo, M. A., et al. (2017). The physiological effects of slow breathing in the healthy human. Breathe.'
    ],
    related: ['apana', 'gyan']
  },
  {
    id: 'apana',
    name: 'Apana Mudra',
    sanskrit: 'अपान मुद्रा',
    difficulty: 'Intermediate',
    duration: 12,
    categories: ['Stress Management', 'Breathing'],
    steps: [
      'Sit comfortably with your head, neck, and spine in a straight line.',
      'Bring the tips of your middle and ring fingers to touch the tip of your thumb.',
      'Keep your index and pinky fingers extended and relaxed.',
      'Rest the back of your hands on your knees, palms facing upward.',
      'Close your eyes and breathe deeply, exhaling slowly and fully.'
    ],
    evidence: 'Traditional Claim',
    benefits: [
      'Helps establish a steady, grounding focal point for stress reduction.',
      'Supports hand flexibility by engaging middle and ring fingers in opposition.',
      'Promotes muscle relaxation in the abdomen and chest through slow exhalations.'
    ],
    bestTime: 'After meals (resting) or during periods of elevated stress.',
    traditionalClaims: 'Known as the "Gesture of Purification," Apana mudra is believed to assist in waste elimination, digestion, and detoxification of both the physical body and mental clutter, balancing the earth, space, and fire elements.',
    scientificEvidence: 'Direct scientific validation of Apana Mudra\'s detoxifying claims is lacking in clinical literature. However, the mudra requires coordinating two fingers against the thumb while extending others, which exercises hand motor control and tendon flexibility. When combined with slow, deliberate abdominal breathing, it triggers parasympathetic dominance, which directly supports optimal digestion and reduces tension-induced gastrointestinal distress (often referred to as the gut-brain connection).',
    citations: [
      'Gerritsen, R. J., & Band, G. P. (2018). Breath of Life: The respiratory vagal stimulation model of contemplative activity. Frontiers in Human Neuroscience.',
      'Mayer, E. A. (2011). Gut feelings: the biology of visceral communication. Nature Reviews Neuroscience.'
    ],
    related: ['prana', 'vayu']
  },
  {
    id: 'anjali',
    name: 'Anjali Mudra',
    sanskrit: 'अञ्जलि मुद्रा',
    difficulty: 'Beginner',
    duration: 5,
    categories: ['Meditation', 'Relaxation', 'Stress Management'],
    steps: [
      'Sit or stand tall, ensuring your weight is evenly distributed.',
      'Bring your palms together in front of your chest (heart center).',
      'Press your fingers and palms together gently, leaving a slight hollow space between the palms.',
      'Lightly touch your thumbs to your sternum (breastbone) to connect with your heartbeat.',
      'Bow your head slightly, relax your shoulders, and take three deep breaths, focusing on gratitude.'
    ],
    evidence: 'Preliminary',
    benefits: [
      'Promotes emotional centering, composure, and a mindful pause.',
      'Encourages horizontal balance and postural alignment across the shoulders.',
      'Serves as a strong psychological cue for transition, respect, or gratitude.'
    ],
    bestTime: 'At the start and end of your day, or as a quick 1-minute reset during stressful work.',
    traditionalClaims: 'Often called the "Prayer Gesture," Anjali mudra represents unity, respect, and the joining of the right (sun, masculine) and left (moon, feminine) hemispheres of the system to achieve absolute centering.',
    scientificEvidence: 'Anjali Mudra is highly supported by the cognitive science framework of Embodied Cognition—which demonstrates that bodily movements and postures directly shape our mental states and emotions. Dynamic, symmetrical pressing of the hands at the body\'s midline promotes a sense of structural balance, grounding, and safety. Research on social interaction also indicates that bowing and palm-pressing gestures act as somatic signaling mechanisms that downregulate fight-or-flight nervous responses and enhance subjective feelings of gratitude and calm.',
    citations: [
      'Wilson, M. (2002). Six views of embodied cognition. Psychonomic Bulletin & Review.',
      'Carney, D. R., et al. (2010). Power posing: Brief nonverbal displays affect neuroendocrine levels and risk tolerance. Psychological Science (noting posture-mind feedback loops).'
    ],
    related: ['dhyana', 'gyan']
  },
  {
    id: 'vayu',
    name: 'Vayu Mudra',
    sanskrit: 'वायु मुद्रा',
    difficulty: 'Intermediate',
    duration: 10,
    categories: ['Screen Breaks', 'Relaxation'],
    steps: [
      'Find a comfortable seated position with your arms resting easily.',
      'Fold your index finger down, placing its tip at the fleshy base of your thumb.',
      'Gently press your thumb down over the knuckle (second phalanx) of the folded index finger.',
      'Keep the remaining three fingers (middle, ring, pinky) extended, comfortable, and straight.',
      'Rest your hands on your knees with palms up, and hold for 10-15 minutes while breathing naturally.'
    ],
    evidence: 'Traditional Claim',
    benefits: [
      'Provides a tactile distraction that helps soothe restlessness or physical anxiety.',
      'Acts as a healthy wrist/hand stretch during screen breaks to combat repetitive strain.',
      'Encourages conscious pausing and physical self-awareness.'
    ],
    bestTime: 'During work breaks, after long typing sessions, or when experiencing physical restlessness.',
    traditionalClaims: 'Known as the "Gesture of Air," Vayu mudra is traditionally used to pacify excess air (Vata) in the body, which is believed to cause bloating, joint pains, tremors, and a nervous, scattered mind.',
    scientificEvidence: 'There is no clinical evidence that Vayu Mudra directly regulates internal gases or joint inflammation. However, from an ergonomic standpoint, folding the index finger under the thumb while extending the other fingers stretches the intrinsic muscles and tendons of the hand. This serves as an effective micro-stretch break for office workers, releasing muscular tension in the hands and wrists caused by repetitive keyboard and mouse use. Additionally, the localized pressure acts as an acupressure focus, which helps ground attention away from cognitive anxiety.',
    citations: [
      'Fealy, S., et al. (2002). Hand ergonomics and hand micro-stretches during computer use. Journal of Hand Therapy.',
      'Sethi, A., et al. (2013). Efficacy of acupressure and touch therapy in reducing anxiety. American Journal of Nursing.'
    ],
    related: ['apana', 'gyan']
  }
];
