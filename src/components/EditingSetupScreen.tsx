import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Layers, 
  Type, 
  Palette, 
  Image as ImageIcon, 
  Check, 
  Smile, 
  Upload, 
  ZoomIn, 
  Flame, 
  ArrowRight, 
  Copy, 
  SplitSquareVertical, 
  Crop, 
  Maximize2,
  Film,
  Camera,
  Play
} from 'lucide-react';
import { 
  Clip, 
  TemplateStyle, 
  LayoutMode, 
  CutoutBackground, 
  ColorGradePreset 
} from '../types';
import { PhoneMockup } from './PhoneMockup';
import { LayoutVisualPreview } from './LayoutVisualPreview';
import { CapcutSubtitleSelector } from './CapcutSubtitleSelector';

interface EditingSetupScreenProps {
  selectedClips: Clip[];
  onUpdateClipConfig: (clipId: string, updatedConfig: Partial<Clip['config']>) => void;
  onApplyConfigToAll: (templateClipConfig: Clip['config']) => void;
  onStartRender: (clipIds: string[]) => void;
  onBackToReview: () => void;
}

export const EditingSetupScreen: React.FC<EditingSetupScreenProps> = ({
  selectedClips,
  onUpdateClipConfig,
  onApplyConfigToAll,
  onStartRender,
  onBackToReview
}) => {
  const [activeClipIndex, setActiveClipIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'template' | 'captions' | 'visuals' | 'covers'>('template');
  const [showAppliedToast, setShowAppliedToast] = useState(false);

  const currentClip = selectedClips[activeClipIndex] || selectedClips[0];
  if (!currentClip) {
    return (
      <div className="p-12 text-center text-slate-400">
        Tidak ada klip yang dipilih. Silakan kembali ke Clip Review.
      </div>
    );
  }

  const config = currentClip.config;

  const updateCurrent = (patch: Partial<Clip['config']>) => {
    onUpdateClipConfig(currentClip.id, patch);
  };

  const handleApplyToAll = () => {
    onApplyConfigToAll(config);
    setShowAppliedToast(true);
    setTimeout(() => setShowAppliedToast(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-28">
      
      {/* Top Header & Clip Switcher Strip */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Editing Setup Studio</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedClips.length} Klip Siap Diedit
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-white mt-1">
              Kostumisasi Template & Elemen Visual Klip
            </h1>
          </div>

          {/* Apply To All Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyToAll}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span>Terapkan Style Ini ke Semua Klip</span>
            </button>
            {showAppliedToast && (
              <span className="text-xs text-emerald-400 font-semibold animate-pulse">
                ✓ Diterapkan!
              </span>
            )}
          </div>
        </div>

        {/* Clip Selector Tabs (if more than 1 clip selected) */}
        {selectedClips.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            {selectedClips.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveClipIndex(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  idx === activeClipIndex
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/40'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>#{idx + 1}</span>
                <span className="truncate max-w-[120px]">{c.title}</span>
                <span className="text-[10px] opacity-75 font-mono">({c.duration}s)</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Two-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Phone Mockup Preview */}
        <div className="lg:col-span-5 sticky top-20 flex flex-col items-center">
          <PhoneMockup clip={currentClip} showSafeZoneToggle={false} />
        </div>

        {/* Right Column: Customization Controls with Tabs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Studio Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
            {[
              { id: 'template', label: '1. Template & Layout', icon: Layers },
              { id: 'captions', label: '2. Teks & Subtitle', icon: Type },
              { id: 'visuals', label: '3. Visual & B-Roll', icon: Palette },
              { id: 'covers', label: '4. Sampul / Thumbnail', icon: Camera }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4 text-rose-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: TEMPLATE & LAYOUT */}
          {activeTab === 'template' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Template Styles */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Pilih Gaya Template Editing Otomatis
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Style 1: Creator Hormozi */}
                  <div
                    onClick={() => updateCurrent({ templateStyle: 'creator-hormozi', layoutMode: 'fill' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      config.templateStyle === 'creator-hormozi'
                        ? 'bg-rose-500/10 border-rose-500 ring-1 ring-rose-500'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-rose-400 uppercase">Modern Creator</span>
                      {config.templateStyle === 'creator-hormozi' && <Check className="w-4 h-4 text-rose-400" />}
                    </div>
                    <h4 className="text-sm font-bold text-white">Gaya Hormozi / Ali Abdaal</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Headline 2-level tebal, subtitle karaoke kuning emas, pop-in grafis angka besar, emoji reaktif.
                    </p>
                  </div>

                  {/* Style 2: Subject Cutout Pop-Art */}
                  <div
                    onClick={() => updateCurrent({ templateStyle: 'subject-cutout' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      config.templateStyle === 'subject-cutout'
                        ? 'bg-rose-500/10 border-rose-500 ring-1 ring-rose-500'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-amber-400 uppercase">AI Cutout Pop-Art</span>
                      {config.templateStyle === 'subject-cutout' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <h4 className="text-sm font-bold text-white">Cutout Subjek + Background Grafis</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Pembicara dipisah dari background asli, ditaruh di atas preset sunburst comic, mesh glow, atau neon.
                    </p>
                  </div>

                  {/* Style 3: Minimalist Aesthetic */}
                  <div
                    onClick={() => updateCurrent({ templateStyle: 'minimalist-aesthetic', layoutMode: 'fit' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      config.templateStyle === 'minimalist-aesthetic'
                        ? 'bg-rose-500/10 border-rose-500 ring-1 ring-rose-500'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-cyan-400 uppercase">Minimalist Clean</span>
                      {config.templateStyle === 'minimalist-aesthetic' && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <h4 className="text-sm font-bold text-white">Clean Typography & Fit Blur</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Layout Full Fit elegan dengan ambient background blur dari video itu sendiri, font modern putih bersih.
                    </p>
                  </div>

                  {/* Style 4: Reaction Format */}
                  <div
                    onClick={() => updateCurrent({ templateStyle: 'reaction-mode' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      config.templateStyle === 'reaction-mode'
                        ? 'bg-rose-500/10 border-rose-500 ring-1 ring-rose-500'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-purple-400 uppercase">Reaction Format</span>
                      {config.templateStyle === 'reaction-mode' && <Check className="w-4 h-4 text-purple-400" />}
                    </div>
                    <h4 className="text-sm font-bold text-white">Format Video Reaksi</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Bagian atas menampilkan screenshot berita/topik, bagian bawah menampilkan reaksi wajah narasumber.
                    </p>
                  </div>

                </div>
              </div>

              {/* Mode Layout Selection with Visual YouTube Previews */}
              <LayoutVisualPreview
                currentMode={config.layoutMode}
                onSelectMode={(mode) => updateCurrent({ layoutMode: mode })}
                youtubeThumbnail={currentClip.faceCovers?.[0]?.imageUrl}
                channelName={currentClip.title}
              />

              {/* Sub-options for Cutout Background */}
              {config.templateStyle === 'subject-cutout' && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Pilihan Preset Background Cutout
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'sunburst', label: 'Sunburst Comic', bg: 'bg-rose-600' },
                      { id: 'mesh-gradient', label: 'Dark Mesh Glow', bg: 'bg-gradient-to-tr from-indigo-700 to-rose-600' },
                      { id: 'neon-glow', label: 'Neon Cyber', bg: 'bg-gradient-to-tr from-cyan-600 to-purple-800' },
                      { id: 'studio-dark', label: 'Studio Slate Dark', bg: 'bg-slate-900' }
                    ].map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => updateCurrent({ cutoutBackground: bg.id as CutoutBackground })}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 ${
                          config.cutoutBackground === bg.id
                            ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${bg.bg} shrink-0`}></div>
                        <span className="text-xs truncate">{bg.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-options for Reaction Mode */}
              {config.templateStyle === 'reaction-mode' && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Konten Layar Atas Video Reaksi
                  </label>
                  <div className="space-y-2">
                    <input 
                      type="text"
                      value={config.reactionMediaTitle || ''}
                      onChange={(e) => updateCurrent({ reactionMediaTitle: e.target.value })}
                      placeholder="Judul topik screenshot (contoh: Tweet Viral Skandal Skincare)"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const custom = prompt('Masukkan URL gambar screenshot berita/topik:', config.reactionMediaUrl);
                          if (custom) updateCurrent({ reactionMediaUrl: custom });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold hover:bg-purple-900/80 transition-colors flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Ganti Screenshot / Media Topik</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: TEKS & SUBTITLE */}
          {activeTab === 'captions' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Headline 2-Level */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-rose-400">
                  Headline Text 2-Level (AI Auto-Generated)
                </label>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Baris 1: Hook Pembuka Singkat (Huruf Sedang + Emoji)
                    </span>
                    <input 
                      type="text"
                      value={config.headlineLevel1}
                      onChange={(e) => updateCurrent({ headlineLevel1: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Baris 2: Kalimat Punchline Utama (Ukuran Besar & Tebal)
                    </span>
                    <input 
                      type="text"
                      value={config.headlineLevel2}
                      onChange={(e) => updateCurrent({ headlineLevel2: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-black uppercase text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Subtitle Karaoke Settings with CapCut Pro Subtitle Engine */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Subtitle Karaoke Dinamis (CapCut Engine)</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Viral Presets
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Kata muncul satu per satu mengikuti suara dengan animasi spring bounce, pop-up 3D, dan box stabilo ala CapCut.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={config.captionKaraoke}
                      onChange={(e) => updateCurrent({ captionKaraoke: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>

                {config.captionKaraoke && (
                  <div className="pt-2 border-t border-slate-800">
                    <CapcutSubtitleSelector
                      config={config}
                      onChange={updateCurrent}
                    />
                  </div>
                )}
              </div>

              {/* Pop-in Graphic & Reactive Emojis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">Pop-in Grafis Angka/Statistik</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Animasi kartu angka saat statistik disebut.
                    </p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={config.showKeyMetricPopin}
                    onChange={(e) => updateCurrent({ showKeyMetricPopin: e.target.checked })}
                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">Sticker / Emoji Reaktif</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Emoji muncul otomatis sesuai emosi kalimat.
                    </p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={config.showReactiveEmojis}
                    onChange={(e) => updateCurrent({ showReactiveEmojis: e.target.checked })}
                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: VISUAL & B-ROLL */}
          {activeTab === 'visuals' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* B-roll Otomatis */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">B-Roll Otomatis Berbasis Topik</h4>
                    <p className="text-xs text-slate-400">
                      Sistem menyelipkan visual pendukung yang relevan saat narasumber membahas topik tertentu.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={config.showBroll}
                      onChange={(e) => updateCurrent({ showBroll: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>

                {config.showBroll && currentClip.bRollMoments && currentClip.bRollMoments.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Visual B-Roll Yang Terdeteksi AI:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentClip.bRollMoments.map((broll, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                          <img src={broll.imageUrl} alt={broll.topic} className="w-12 h-10 object-cover rounded-lg" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">{broll.topic}</p>
                            <span className="text-[10px] text-rose-400 font-mono">
                              Detik ke-{broll.start}s - {broll.end}s
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Color Grading Presets */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Preset Color Grading Sinematik
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cinematic-teal', label: 'Cinematic Teal' },
                    { id: 'moody-dark', label: 'Moody Contrast' },
                    { id: 'vibrant-pop', label: 'Vibrant Pop' },
                    { id: 'vintage-warm', label: 'Vintage Film' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => updateCurrent({ colorGradePreset: preset.id as ColorGradePreset })}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        config.colorGradePreset === preset.id
                          ? 'bg-rose-500/10 border-rose-500 text-rose-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Micro-zoom effect */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Auto Micro-Zoom pada Punchline</h4>
                  <p className="text-xs text-slate-400">
                    Zoom in halus (1.08x) otomatis ketika ada penekanan kata atau angka penting untuk meningkatkan retensi.
                  </p>
                </div>
                <input 
                  type="checkbox"
                  checked={config.autoMicroZoom}
                  onChange={(e) => updateCurrent({ autoMicroZoom: e.target.checked })}
                  className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                />
              </div>

            </div>
          )}

          {/* TAB 4: SAMPUL / COVER (THUMBNAIL) */}
          {activeTab === 'covers' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Pilih Frame Sampul / Cover Video</h4>
                    <p className="text-xs text-slate-400">
                      AI otomatis memilih frame ekspresi wajah paling ekspresif dari klip ini. Klik salah satu frame untuk menjadikannya thumbnail TikTok/Reels!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {(currentClip.faceCovers || []).map((frame, idx) => {
                    const isSelected = config.selectedCoverIndex === idx;
                    return (
                      <div
                        key={frame.id}
                        onClick={() => updateCurrent({ selectedCoverIndex: idx })}
                        className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer group transition-all ${
                          isSelected
                            ? 'border-rose-500 ring-2 ring-rose-500/50 shadow-xl'
                            : 'border-slate-800 hover:border-slate-600 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="aspect-[9/14] relative bg-slate-950">
                          <img 
                            src={frame.imageUrl} 
                            alt={frame.expression} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                          
                          {/* Selected check badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}

                          {/* Overlay Headline text preview */}
                          <div className="absolute top-3 inset-x-2 text-center">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-black/75 text-[9px] font-extrabold uppercase text-amber-300">
                              {config.headlineLevel1.slice(0, 18)}...
                            </span>
                          </div>

                          {/* Expression info */}
                          <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-lg bg-black/80 backdrop-blur text-left">
                            <p className="text-[11px] font-bold text-white truncate">
                              {frame.expression}
                            </p>
                            <p className="text-[9px] text-slate-400 truncate">
                              {frame.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Selesai Menata Gaya Editing?</h4>
              <p className="text-xs text-slate-400">
                Lanjutkan ke proses render cloud background 1080x1920 MP4.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onBackToReview}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={() => onStartRender(selectedClips.map(c => c.id))}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs sm:text-sm font-black shadow-xl shadow-rose-950/50 hover:scale-102 transition-all cursor-pointer"
              >
                <Film className="w-4 h-4" />
                <span>Mulai Render {selectedClips.length} Klip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
