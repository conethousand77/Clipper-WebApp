import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Music,
  Layers,
  Sparkles,
  Youtube,
  Crop,
  SplitSquareVertical,
  Maximize2,
  Mic
} from 'lucide-react';
import { Clip } from '../types';

interface PhoneMockupProps {
  clip: Clip;
  showSafeZoneToggle?: boolean;
  autoPlay?: boolean;
  coverOnly?: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  clip,
  showSafeZoneToggle = true,
  autoPlay = true,
  coverOnly = false
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay && !coverOnly);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showSafeZone, setShowSafeZone] = useState<boolean>(false);
  const [showYouTube16x9Wireframe, setShowYouTube16x9Wireframe] = useState<boolean>(false);
  const [activeBroll, setActiveBroll] = useState<string | null>(null);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const [isPunchlineZoom, setIsPunchlineZoom] = useState<boolean>(false);

  const duration = Math.min(clip.duration, 60); // Preview timeline up to 60s
  const config = clip.config;

  // Animation frame loop for playback
  useEffect(() => {
    if (coverOnly) {
      setIsPlaying(false);
      return;
    }

    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          if (next >= duration) {
            return 0; // Loop seamlessly
          }
          return parseFloat(next.toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, coverOnly]);

  // Check trigger events based on currentTime
  useEffect(() => {
    // 1. Check B-Roll moments
    if (config.showBroll && clip.bRollMoments && clip.bRollMoments.length > 0) {
      const match = clip.bRollMoments.find(b => currentTime >= b.start && currentTime <= b.end);
      setActiveBroll(match ? match.imageUrl : null);
    } else {
      setActiveBroll(null);
    }

    // 2. Check Key Metrics Pop-in (show for ~2.0 seconds around timestamp)
    if (config.showKeyMetricPopin && clip.keyMetrics && clip.keyMetrics.length > 0) {
      const metric = clip.keyMetrics.find(m => Math.abs(currentTime - m.timestamp) < 1.2);
      setActiveMetric(metric ? `${metric.numberText} • ${metric.label}` : null);
    } else {
      setActiveMetric(null);
    }

    // 3. Check Reactive Emoji (show for ~1.5 seconds)
    if (config.showReactiveEmojis && clip.reactiveEmojis && clip.reactiveEmojis.length > 0) {
      const emoji = clip.reactiveEmojis.find(e => Math.abs(currentTime - e.timestamp) < 1.0);
      setActiveEmoji(emoji ? emoji.emoji : null);
    } else {
      setActiveEmoji(null);
    }

    // 4. Check Micro-zoom for punchline words
    if (config.autoMicroZoom && clip.words) {
      const currentWord = clip.words.find(w => currentTime >= w.start && currentTime <= w.end);
      setIsPunchlineZoom(!!currentWord?.punchline);
    } else {
      setIsPunchlineZoom(false);
    }
  }, [currentTime, clip, config]);

  // Get active karaoke words based on wordsDisplay
  const activeWordIndex = clip.words ? clip.words.findIndex(w => currentTime >= w.start && currentTime <= w.end) : -1;
  const currentActiveWord = activeWordIndex >= 0 ? clip.words[activeWordIndex] : (clip.words?.[0] || null);

  const getDisplayedWords = () => {
    if (!clip.words || clip.words.length === 0) return [];
    
    // Solo 1-word mode (Hormozi Fast Cut)
    if (config.wordsDisplay === '1-word' || config.capcutPreset === 'solo-one-word') {
      return currentActiveWord ? [currentActiveWord] : [clip.words[0]];
    }

    // 3-4 words (Standard TikTok)
    if (config.wordsDisplay === '3-4-words') {
      const start = Math.max(0, activeWordIndex >= 0 ? activeWordIndex - 1 : 0);
      return clip.words.slice(start, start + 3);
    }

    // Full sentence mode
    const start = Math.max(0, activeWordIndex >= 0 ? activeWordIndex - 2 : 0);
    return clip.words.slice(start, start + 6);
  };

  const currentWordSlice = getDisplayedWords();

  // Font size class mapping
  const getFontSizeClass = (): string => {
    switch (config.subtitleFontSize) {
      case 'small': return 'text-xs sm:text-sm';
      case 'medium': return 'text-sm sm:text-base';
      case 'huge': return 'text-lg sm:text-2xl';
      case 'large':
      default:
        return 'text-base sm:text-xl';
    }
  };

  // Stroke class mapping
  const getStrokeClass = (): string => {
    switch (config.subtitleStroke) {
      case 'none': return '';
      case 'thick': return 'caption-stroke-thick';
      case 'super-3d':
      default:
        return 'capcut-stroke-3d';
    }
  };

  // Color grading filter style
  const getColorGradeStyle = (): string => {
    switch (config.colorGradePreset) {
      case 'cinematic-teal':
        return 'contrast(115%) saturate(120%) hue-rotate(-5deg)';
      case 'moody-dark':
        return 'contrast(125%) brightness(92%) saturate(90%)';
      case 'vibrant-pop':
        return 'contrast(110%) saturate(145%) brightness(105%)';
      case 'vintage-warm':
        return 'sepia(25%) contrast(105%) saturate(110%)';
      default:
        return 'none';
    }
  };

  // Caption highlight color
  const getHighlightColorClass = (): string => {
    switch (config.captionColor) {
      case 'green':
        return 'text-emerald-400 bg-emerald-950/80 border-emerald-400/50';
      case 'cyan':
        return 'text-cyan-300 bg-cyan-950/80 border-cyan-400/50';
      case 'white':
        return 'text-white bg-slate-800/90 border-white/50';
      case 'yellow':
      default:
        return 'text-amber-300 bg-amber-950/80 border-amber-400/50';
    }
  };

  const selectedCover = clip.faceCovers?.[config.selectedCoverIndex] || clip.faceCovers?.[0];

  return (
    <div className="flex flex-col items-center">
      {/* Realistic Mobile Device Mockup Frame */}
      <div className="relative w-[320px] h-[640px] sm:w-[340px] sm:h-[680px] bg-slate-900 rounded-[48px] p-3 shadow-2xl shadow-rose-950/30 border-4 border-slate-700/80 ring-1 ring-slate-800 select-none">
        
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40 w-24 h-5 bg-black rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2"></div>
          <div className="w-2 h-2 rounded-full bg-indigo-950"></div>
        </div>

        {/* Screen Bezel Content */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black flex flex-col justify-between">
          
          {/* Main Visual Canvas Area */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-200"
            style={{ 
              transform: isPunchlineZoom ? 'scale(1.08)' : 'scale(1.0)',
              filter: getColorGradeStyle()
            }}
          >
            
            {/* === LAYOUT MODE 1: FULL/FILL (Center crop on speaker) === */}
            {config.layoutMode === 'fill' && !config.templateStyle.includes('reaction') && (
              <div className="relative w-full h-full">
                {/* Background (Normal Video or Cutout) */}
                {config.templateStyle === 'subject-cutout' ? (
                  <div className={`w-full h-full ${
                    config.cutoutBackground === 'sunburst' ? 'sunburst-bg' :
                    config.cutoutBackground === 'mesh-gradient' ? 'bg-gradient-to-br from-indigo-900 via-rose-900 to-amber-700' :
                    config.cutoutBackground === 'neon-glow' ? 'bg-gradient-to-t from-cyan-900 via-purple-900 to-black' :
                    'bg-slate-900'
                  }`}>
                    {/* Simulated Cutout Subject on top of animated background */}
                    <img 
                      src={selectedCover?.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                      alt="Speaker Cutout" 
                      className="w-full h-full object-cover object-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src={selectedCover?.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                      alt="Speaker Full" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-12 left-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur border border-rose-500/40 text-[9px] text-rose-300 font-bold flex items-center gap-1 shadow-md">
                      <Crop className="w-3 h-3 text-rose-400" />
                      <span>AI Face-Crop (Fill 9:16)</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* === LAYOUT MODE 2: SPLIT SCREEN (2 Speakers) === */}
            {config.layoutMode === 'split' && (
              <div className="w-full h-full flex flex-col">
                <div className="relative w-full h-1/2 overflow-hidden border-b-2 border-slate-900">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" 
                    alt="Speaker 1 (Top)" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-12 left-3 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur border border-cyan-500/40 text-[9px] text-cyan-300 font-bold flex items-center gap-1.5 shadow-md">
                    <Mic className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>HOST (YouTube Sisi Kiri)</span>
                  </div>
                </div>
                <div className="relative w-full h-1/2 overflow-hidden">
                  <img 
                    src={selectedCover?.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                    alt="Speaker 2 (Bottom)" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur border border-rose-500/40 text-[9px] text-rose-300 font-bold flex items-center gap-1.5 shadow-md">
                    <Mic className="w-3 h-3 text-rose-400 animate-pulse" />
                    <span>NARASUMBER (YouTube Sisi Kanan)</span>
                  </div>
                </div>
              </div>
            )}

            {/* === LAYOUT MODE 3: FULL FIT (Untouched 16:9 with blurred ambient background) === */}
            {config.layoutMode === 'fit' && (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                {/* Blurred Video Ambient Fill */}
                <div className="absolute inset-0 w-full h-full scale-125 blur-2xl opacity-60 overflow-hidden">
                  <img 
                    src={selectedCover?.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                    alt="Blurred Ambient Background" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Top indicator */}
                <div className="absolute top-12 left-3 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur border border-cyan-400/40 text-[9px] text-cyan-300 font-bold flex items-center gap-1 shadow-md z-20">
                  <Maximize2 className="w-3 h-3 text-cyan-400" />
                  <span>YouTube 16:9 Utuh (No Crop)</span>
                </div>

                {/* Exact 16:9 Content in Center without cropping */}
                <div className="relative z-10 w-full aspect-video shadow-2xl rounded-lg overflow-hidden border border-white/20">
                  <img 
                    src={selectedCover?.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                    alt="Fit 16:9 Video" 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/85 text-[8px] font-mono text-white px-1.5 py-0.5 rounded border border-white/20">
                    YouTube 16:9 Widescreen
                  </span>
                </div>
              </div>
            )}

            {/* === TEMPLATE: REACTION FORMAT === */}
            {config.templateStyle === 'reaction-mode' && (
              <div className="w-full h-full flex flex-col">
                {/* Top: Uploaded screenshot or article */}
                <div className="relative w-full h-[48%] bg-slate-900 border-b-2 border-rose-500 overflow-hidden flex flex-col justify-center items-center p-3 text-center">
                  <img 
                    src={config.reactionMediaUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"} 
                    alt="Reaction Content Screenshot" 
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md px-2 py-1 rounded text-[11px] font-bold text-amber-300 truncate">
                    {config.reactionMediaTitle || "Screenshot Viral Twitter / Berita"}
                  </div>
                </div>
                {/* Bottom: Reactor's face */}
                <div className="relative w-full h-[52%] overflow-hidden">
                  <img 
                    src={selectedCover?.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                    alt="Reactor Face" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* === B-ROLL OVERLAY === */}
            {activeBroll && (
              <div className="absolute inset-0 z-20 w-full h-full bg-black/30 backdrop-blur-xs transition-opacity duration-300">
                <img 
                  src={activeBroll} 
                  alt="Contextual B-Roll" 
                  className="w-full h-full object-cover animate-fade-in"
                />
                <div className="absolute top-24 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] uppercase font-bold text-rose-300 tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  <span>B-Roll Visual</span>
                </div>
              </div>
            )}

          </div>

          {/* === OVERLAYS: HEADLINE (2-LEVEL) === */}
          <div className="relative z-30 pt-14 px-4 text-center">
            {config.headlineLevel1 && (
              <div className="inline-block px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-rose-400 caption-stroke mb-1 shadow-lg">
                {config.headlineLevel1}
              </div>
            )}
            {config.headlineLevel2 && (
              <h2 className="text-base sm:text-lg font-black uppercase text-white tracking-tight caption-stroke-thick leading-tight px-1">
                {config.headlineLevel2}
              </h2>
            )}
          </div>

          {/* === POP-IN STATISTIC / KEY METRIC CALLOUT === */}
          {activeMetric && (
            <div className="absolute z-35 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[270px]">
              <div className="bg-gradient-to-r from-rose-600 to-amber-500 p-0.5 rounded-2xl shadow-2xl animate-bounce">
                <div className="bg-slate-950/95 backdrop-blur-lg px-4 py-3 rounded-2xl text-center">
                  <div className="text-[10px] uppercase tracking-widest text-amber-300 font-black">
                    DATA STATISTIK KUNCI
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow mt-0.5">
                    {activeMetric.split('•')[0]}
                  </div>
                  {activeMetric.includes('•') && (
                    <div className="text-[11px] text-slate-300 font-semibold mt-0.5">
                      {activeMetric.split('•')[1]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* === REACTIVE EMOJI POP-UP === */}
          {activeEmoji && (
            <div className="absolute z-35 top-2/5 right-6 animate-pulse scale-125">
              <span className="text-5xl filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                {activeEmoji}
              </span>
            </div>
          )}

          {/* === KARAOKE CAPTIONS (CapCut Pro Subtitle Engine) === */}
          {config.captionKaraoke && currentWordSlice.length > 0 && (
            <div className="relative z-30 px-3 pb-24 text-center">
              <div 
                className={`inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-2 rounded-2xl max-w-full transition-all ${
                  config.subtitleBackgroundBox === 'none' 
                    ? 'bg-transparent'
                    : config.subtitleBackgroundBox === 'solid-box' 
                      ? config.capcutPreset === 'red-breaking' ? 'bg-red-600 border border-white/20 shadow-2xl' : 'bg-black border border-white/20 shadow-2xl'
                      : config.subtitleBackgroundBox === 'marker'
                        ? 'bg-transparent'
                        : config.subtitleBackgroundBox === 'neon-glow'
                          ? 'bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 shadow-xl shadow-cyan-950/50'
                          : 'bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl'
                }`}
              >
                {currentWordSlice.map((w, idx) => {
                  const isCurrent = currentTime >= w.start && currentTime <= w.end;
                  const wordText = config.subtitleUppercase ? w.word.toUpperCase() : w.word;

                  // Active Animation Class
                  const animClass = isCurrent 
                    ? (config.subtitleAnimation === 'bounce' ? 'animate-capcut-bounce' :
                       config.subtitleAnimation === 'zoom' ? 'animate-capcut-zoom' :
                       config.subtitleAnimation === 'pulse' ? 'animate-capcut-pulse' : 'scale-110')
                    : '';

                  // Dynamic style by CapCut Preset
                  let activeClass = '';
                  let nonActiveClass = '';

                  if (config.capcutPreset === 'hormozi-gold') {
                    activeClass = `text-amber-300 ${getStrokeClass()} drop-shadow-lg scale-120`;
                    nonActiveClass = `text-white ${getStrokeClass()}`;
                  } else if (config.capcutPreset === 'mrbeast-pop') {
                    activeClass = `text-yellow-300 capcut-stroke-mrbeast scale-125`;
                    nonActiveClass = `text-white capcut-stroke-mrbeast`;
                  } else if (config.capcutPreset === 'highlighter-marker') {
                    activeClass = `text-slate-950 font-black capcut-marker scale-110`;
                    nonActiveClass = `text-white caption-stroke-thick`;
                  } else if (config.capcutPreset === 'solo-one-word') {
                    activeClass = `text-white ${getStrokeClass()} font-black text-2xl sm:text-3xl tracking-wider scale-125`;
                    nonActiveClass = `text-white ${getStrokeClass()}`;
                  } else if (config.capcutPreset === 'neon-cyber') {
                    activeClass = `text-cyan-300 capcut-neon-cyan scale-120`;
                    nonActiveClass = `text-slate-200/90`;
                  } else if (config.capcutPreset === 'emerald-hustle') {
                    activeClass = `text-emerald-400 ${getStrokeClass()} scale-120 drop-shadow-md`;
                    nonActiveClass = `text-white ${getStrokeClass()}`;
                  } else if (config.capcutPreset === 'red-breaking') {
                    activeClass = `text-yellow-300 ${getStrokeClass()} scale-115`;
                    nonActiveClass = `text-white ${getStrokeClass()}`;
                  } else if (config.capcutPreset === 'minimalist-pill') {
                    activeClass = `text-rose-400 font-extrabold scale-105`;
                    nonActiveClass = `text-white/90 font-medium`;
                  } else {
                    activeClass = `${getHighlightColorClass()} ${getStrokeClass()} scale-115`;
                    nonActiveClass = `text-white/90 ${getStrokeClass()}`;
                  }

                  return (
                    <span 
                      key={idx}
                      className={`${getFontSizeClass()} font-black tracking-wide transition-all ${
                        isCurrent 
                          ? `${activeClass} ${animClass} z-10` 
                          : w.highlight 
                            ? `text-amber-300 ${getStrokeClass()}` 
                            : nonActiveClass
                      }`}
                    >
                      {wordText}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* === TIKTOK SAFE ZONE OVERLAY (Real preview of UI elements) === */}
          {showSafeZone && (
            <div className="absolute inset-0 z-40 pointer-events-none border-2 border-dashed border-rose-500/60 flex flex-col justify-between p-4">
              
              {/* Right Side Social Action Column */}
              <div className="absolute right-2 bottom-20 flex flex-col items-center gap-3.5 text-white/90">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  </div>
                  <span className="text-[10px] font-bold mt-0.5">142K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold mt-0.5">2.4K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center">
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold mt-0.5">18K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold mt-0.5">Share</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white/40 flex items-center justify-center animate-spin">
                  <Music className="w-4 h-4 text-rose-400" />
                </div>
              </div>

              {/* Bottom Caption Area */}
              <div className="absolute left-3 bottom-5 max-w-[210px] text-left">
                <p className="text-xs font-bold text-white drop-shadow">@clipper_pro_id</p>
                <p className="text-[11px] text-slate-200 line-clamp-2 drop-shadow">
                  Gila sih podcast kali ini beneran ngebuka mata banget! #fyp #podcast #viral
                </p>
              </div>

              {/* Safe zone label */}
              <div className="absolute top-14 right-3 bg-rose-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">
                Safe Zone On
              </div>
            </div>
          )}

          {/* === YOUTUBE 16:9 WIREFRAME COMPARISON OVERLAY === */}
          {showYouTube16x9Wireframe && (
            <div className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-center p-2">
              <div className="w-full aspect-video border-2 border-dashed border-red-500 bg-red-500/10 rounded-lg p-2 flex flex-col justify-between shadow-2xl backdrop-blur-[1px]">
                <div className="flex items-center justify-between">
                  <span className="bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                    <Youtube className="w-2.5 h-2.5" />
                    <span>Frame YouTube Asli 16:9</span>
                  </span>
                  <span className="bg-black/80 text-white text-[8px] font-mono px-1 rounded">
                    1920x1080
                  </span>
                </div>
                <div className="text-center">
                  <span className="bg-black/90 text-red-300 text-[8px] font-mono px-2 py-0.5 rounded border border-red-500/40">
                    {config.layoutMode === 'fill' ? 'Sisi Kiri & Kanan Ter-crop' : config.layoutMode === 'split' ? 'Dipotong Jadi 2 Bagian Bertumpuk' : 'Ditampilkan 100% Utuh di Tengah'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Play/Pause HUD overlay on tap */}
          {!coverOnly && (
            <div 
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 z-30 cursor-pointer flex items-center justify-center group"
            >
              {!isPlaying && (
                <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Media Controller Bar */}
      {!coverOnly && (
        <div className="w-full max-w-[340px] mt-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-colors shadow-md"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          <button
            onClick={() => setCurrentTime(0)}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            title="Restart"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Seek progress bar */}
          <div className="flex-1 flex flex-col justify-center">
            <input 
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={(e) => {
                setCurrentTime(parseFloat(e.target.value));
              }}
              className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

    </div>
  );
};
