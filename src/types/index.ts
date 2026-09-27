export type ProjectStatus = 'processing' | 'ready' | 'rendering' | 'completed' | 'failed';

export type ClipVirality = 'good' | 'viral' | 'explosive';

export type RatioType = '9:16' | '1:1' | '16:9';

export type LayoutMode = 'fill' | 'split' | 'fit';

export type TemplateStyle = 
  | 'creator-hormozi' 
  | 'subject-cutout' 
  | 'minimalist-aesthetic' 
  | 'reaction-mode' 
  | 'podcast-split';

export type CutoutBackground = 
  | 'sunburst' 
  | 'mesh-gradient' 
  | 'neon-glow' 
  | 'solid-slate' 
  | 'studio-dark';

export type ColorGradePreset = 
  | 'natural' 
  | 'cinematic-teal' 
  | 'moody-dark' 
  | 'vibrant-pop' 
  | 'vintage-warm';

export interface KaraokeWord {
  word: string;
  start: number;
  end: number;
  highlight?: boolean;
  punchline?: boolean;
}

export interface KeyMetricCallout {
  numberText: string;
  label: string;
  timestamp: number;
}

export interface ReactiveEmoji {
  emoji: string;
  label: string;
  timestamp: number;
}

export interface BRollMoment {
  query: string;
  topic: string;
  start: number;
  end: number;
  imageUrl: string;
}

export interface FaceCoverFrame {
  id: string;
  timestamp: number;
  expression: string;
  description: string;
  imageUrl: string;
}

export type CapcutSubtitlePreset = 
  | 'hormozi-gold' 
  | 'mrbeast-pop' 
  | 'highlighter-marker' 
  | 'neon-cyber' 
  | 'solo-one-word' 
  | 'minimalist-pill' 
  | 'red-breaking' 
  | 'emerald-hustle';

export type SubtitleAnimation = 'bounce' | 'zoom' | 'glow' | 'pulse';
export type SubtitleWordsDisplay = '1-word' | '3-4-words' | 'full-sentence';

export interface ClipEditingConfig {
  templateStyle: TemplateStyle;
  layoutMode: LayoutMode;
  cutoutBackground: CutoutBackground;
  headlineLevel1: string;
  headlineLevel2: string;
  captionKaraoke: boolean;
  captionColor: 'yellow' | 'green' | 'cyan' | 'white' | 'red' | 'purple';
  
  // CapCut Pro Subtitle Engine
  capcutPreset: CapcutSubtitlePreset;
  subtitleAnimation: SubtitleAnimation;
  wordsDisplay: SubtitleWordsDisplay;
  subtitleStroke: 'none' | 'thick' | 'super-3d';
  subtitleFontSize: 'small' | 'medium' | 'large' | 'huge';
  subtitleUppercase: boolean;
  subtitleBackgroundBox: 'none' | 'black-pill' | 'marker' | 'solid-box' | 'neon-glow';

  showKeyMetricPopin: boolean;
  showReactiveEmojis: boolean;
  showBroll: boolean;
  colorGradePreset: ColorGradePreset;
  autoMicroZoom: boolean;
  reactionMediaUrl?: string;
  reactionMediaTitle?: string;
  selectedCoverIndex: number;
  customOverlayText?: string;
}

export interface Clip {
  id: string;
  projectId: string;
  title: string;
  headlineLevel1: string;
  headlineLevel2: string;
  score: number; // 1-10
  scoreReason: string;
  viralFactor: ClipVirality;
  startTime: number; // in seconds
  endTime: number;
  duration: number;
  recommendedRatio: RatioType;
  recommendedLayout: LayoutMode;
  emotionTag: 'Mindblowing' | 'Motivasi' | 'Rahasia Bisnis' | 'Ghibah/Drama' | 'Edukatif' | 'Emosional';
  words: KaraokeWord[];
  keyMetrics: KeyMetricCallout[];
  reactiveEmojis: ReactiveEmoji[];
  bRollMoments: BRollMoment[];
  faceCovers: FaceCoverFrame[];
  config: ClipEditingConfig;
  
  // Render details
  renderStatus: 'pending' | 'rendering' | 'completed' | 'failed';
  renderProgress: number; // 0 - 100
  renderStage: string;
  videoUrl?: string;
  coverUrl?: string;
  shareCopy?: string;
  hashtags?: string[];
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  channelName: string;
  youtubeUrl: string;
  durationFormatted: string;
  durationSeconds: number;
  thumbnailUrl: string;
  status: ProjectStatus;
  processingProgress: number;
  processingStage?: string;
  clipCount: number;
  createdAt: number;
  topicCategory: 'Finance & Bisnis' | 'Motivasi & Mindset' | 'Drama & Wawancara' | 'Edukasi & Tech' | 'Umum';
  clips?: Clip[];
}

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
}
