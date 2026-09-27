import React from 'react';
import { 
  Sparkles, 
  Check, 
  Type, 
  Layers, 
  Zap, 
  Sliders, 
  Palette,
  Flame,
  Award
} from 'lucide-react';
import { 
  ClipEditingConfig, 
  CapcutSubtitlePreset, 
  SubtitleAnimation, 
  SubtitleWordsDisplay 
} from '../types';

interface CapcutSubtitleSelectorProps {
  config: ClipEditingConfig;
  onChange: (patch: Partial<ClipEditingConfig>) => void;
}

export interface PresetMeta {
  id: CapcutSubtitlePreset;
  title: string;
  creatorTag: string;
  description: string;
  badgeColor: string;
  previewWord: string;
  previewClass: string;
  bgBoxClass: string;
}

export const CAPCUT_PRESETS: PresetMeta[] = [
  {
    id: 'hormozi-gold',
    title: 'Hormozi Gold',
    creatorTag: 'Alex Hormozi',
    description: 'Font tebal, stroke 3D hitam, kata aktif berubah kuning emas dengan pantulan bounce.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    previewWord: '100 MILIAR',
    previewClass: 'text-amber-400 capcut-stroke-3d animate-capcut-bounce font-black',
    bgBoxClass: 'bg-black/85 border border-white/10'
  },
  {
    id: 'mrbeast-pop',
    title: 'MrBeast Pop-Up',
    creatorTag: 'MrBeast / Gaming',
    description: 'Gaya comic tebal dengan drop shadow 3D tebal dan warna kuning/cyan cerah berenergi tinggi.',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    previewWord: 'GILA BANGET!',
    previewClass: 'text-yellow-300 capcut-stroke-mrbeast animate-capcut-zoom font-black',
    bgBoxClass: 'bg-transparent'
  },
  {
    id: 'highlighter-marker',
    title: 'Marker Stabilo',
    creatorTag: 'Ali Abdaal',
    description: 'Efek spidol stabilo kuning neon menimpa kata kunci penting dengan rotasi miring estetik.',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    previewWord: 'RAHASIA SUKSES',
    previewClass: 'text-slate-950 font-black capcut-marker',
    bgBoxClass: 'bg-black/60 backdrop-blur-md border border-white/10'
  },
  {
    id: 'solo-one-word',
    title: 'Solo 1-Kata Hormozi',
    creatorTag: 'Ultra Retention',
    description: 'Hanya 1 kata besar muncul di tengah layar berganti kilat. Sangat adiktif untuk hook awal!',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    previewWord: 'FOKUS!',
    previewClass: 'text-white capcut-stroke-3d animate-capcut-bounce text-lg font-black tracking-wider',
    bgBoxClass: 'bg-rose-600/90 shadow-xl'
  },
  {
    id: 'neon-cyber',
    title: 'Neon Cyber Glow',
    creatorTag: 'Tech & Future',
    description: 'Aura cahaya neon cyan menyala di sekitar kata saat diucapkan, gaya modern clean.',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    previewWord: 'AI REVOLUTION',
    previewClass: 'text-cyan-300 capcut-neon-cyan animate-capcut-pulse font-extrabold',
    bgBoxClass: 'bg-slate-950/80 border border-cyan-500/30'
  },
  {
    id: 'emerald-hustle',
    title: 'Emerald Cuan',
    creatorTag: 'Finance & Bisnis',
    description: 'Warna hijau uang dolar dengan highlight tebal, sangat pas untuk podcast bisnis dan investasi.',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    previewWord: 'OMSET 500JT',
    previewClass: 'text-emerald-400 capcut-stroke-3d animate-capcut-bounce font-black',
    bgBoxClass: 'bg-black/85 border border-emerald-500/30'
  },
  {
    id: 'red-breaking',
    title: 'Breaking Alert',
    creatorTag: 'Drama / Wawancara',
    description: 'Box merah terang dengan tulisan putih tebal untuk momen kontroversial atau pengakuan mengejutkan.',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    previewWord: 'TERBONGKAR!',
    previewClass: 'text-white capcut-stroke-3d font-black',
    bgBoxClass: 'bg-red-600 shadow-lg shadow-red-950/50'
  },
  {
    id: 'minimalist-pill',
    title: 'Minimalist Glass Pill',
    creatorTag: 'Aesthetic Podcast',
    description: 'Kapsul hitam transparan kaca dengan tipografi putih modern dan highlight pastel kalem.',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    previewWord: 'Mindset Juara',
    previewClass: 'text-white font-extrabold',
    bgBoxClass: 'bg-slate-900/80 backdrop-blur-md border border-white/20'
  }
];

export const CapcutSubtitleSelector: React.FC<CapcutSubtitleSelectorProps> = ({
  config,
  onChange
}) => {
  const handleApplyPreset = (preset: PresetMeta) => {
    switch (preset.id) {
      case 'hormozi-gold':
        onChange({
          capcutPreset: 'hormozi-gold',
          captionColor: 'yellow',
          subtitleAnimation: 'bounce',
          wordsDisplay: '3-4-words',
          subtitleStroke: 'super-3d',
          subtitleFontSize: 'large',
          subtitleUppercase: true,
          subtitleBackgroundBox: 'black-pill'
        });
        break;
      case 'mrbeast-pop':
        onChange({
          capcutPreset: 'mrbeast-pop',
          captionColor: 'yellow',
          subtitleAnimation: 'zoom',
          wordsDisplay: '3-4-words',
          subtitleStroke: 'super-3d',
          subtitleFontSize: 'huge',
          subtitleUppercase: true,
          subtitleBackgroundBox: 'none'
        });
        break;
      case 'highlighter-marker':
        onChange({
          capcutPreset: 'highlighter-marker',
          captionColor: 'yellow',
          subtitleAnimation: 'bounce',
          wordsDisplay: '3-4-words',
          subtitleStroke: 'none',
          subtitleFontSize: 'large',
          subtitleUppercase: true,
          subtitleBackgroundBox: 'marker'
        });
        break;
      case 'solo-one-word':
        onChange({
          capcutPreset: 'solo-one-word',
          captionColor: 'white',
          subtitleAnimation: 'bounce',
          wordsDisplay: '1-word',
          subtitleStroke: 'super-3d',
          subtitleFontSize: 'huge',
          subtitleUppercase: true,
          subtitleBackgroundBox: 'solid-box'
        });
        break;
      case 'neon-cyber':
        onChange({
          capcutPreset: 'neon-cyber',
          captionColor: 'cyan',
          subtitleAnimation: 'glow',
          wordsDisplay: '3-4-words',
          subtitleStroke: 'none',
          subtitleFontSize: 'large',
          subtitleUppercase: true,
          subtitleBackgroundBox: 'neon-glow'
        });
        break;
      case 'emerald-hustle':
        onChange({
          capcutPreset: 'emerald-hustle',
          captionColor: 'green',
          subtitleAnimation: 'bounce',
          wordsDisplay: '3-4-words',
          subtitleStroke: 'super-3d',
          subtitleFontSize: 'large',
          subtitleUppercase: true,
          subtitleBackgroundBox: 'black-pill'
        });
        break;
      case 'red-breaking':
        onChange({
          capcutPreset: 'red-breaking',
          captionColor: 'white',
          subtitleAnimation: 'zoom',
          wordsDisplay: '3-4-words',
          subtitleStroke: 'super-3d',
          subtitleFontSize: 'large',
          subtitleUppercase: true,
          subtitleBackgroundBox: 'solid-box'
        });
        break;
      case 'minimalist-pill':
        onChange({
          capcutPreset: 'minimalist-pill',
          captionColor: 'white',
          subtitleAnimation: 'zoom',
          wordsDisplay: 'full-sentence',
          subtitleStroke: 'none',
          subtitleFontSize: 'medium',
          subtitleUppercase: false,
          subtitleBackgroundBox: 'black-pill'
        });
        break;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* CapCut Presets Library Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 fill-amber-400" />
              <span>Koleksi Preset Subtitle Viral CapCut</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Pro Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Pilih 1 dari 8 gaya teks subtitle animasi yang terbukti mendongkrak retensi penonton di TikTok & Shorts:
          </p>
        </div>
      </div>

      {/* Grid of 8 CapCut Subtitle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CAPCUT_PRESETS.map((preset) => {
          const isSelected = config.capcutPreset === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-rose-500/10 border-rose-500 shadow-xl shadow-rose-950/40 ring-1 ring-rose-500'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 z-10 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              {/* Creator Tag & Title */}
              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide border mb-1.5 ${preset.badgeColor}`}>
                  {preset.creatorTag}
                </span>
                <h4 className="text-sm font-black text-white group-hover:text-rose-300 transition-colors">
                  {preset.title}
                </h4>
              </div>

              {/* Live Preview Box of the Subtitle Style */}
              <div className="my-3 py-3 px-2 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center text-center overflow-hidden min-h-[58px]">
                <div className={`px-2.5 py-1 rounded-lg ${preset.bgBoxClass}`}>
                  <span className={`text-xs sm:text-sm tracking-wide ${preset.previewClass}`}>
                    {preset.previewWord}
                  </span>
                </div>
              </div>

              {/* Short explanation */}
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Advanced Fine-Tuning Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Kustomisasi Detail Teks Subtitle
            </h4>
          </div>
          <span className="text-[11px] text-slate-500">
            Diterapkan langsung ke preview
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* 1. Animation Mode */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Animasi Kata Diucapkan
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'bounce', label: 'Spring Bounce 🚀' },
                { id: 'zoom', label: 'Pop Zoom 🔍' },
                { id: 'glow', label: 'Neon Glow ✨' },
                { id: 'pulse', label: 'Pulse Flash ⚡' }
              ].map((anim) => (
                <button
                  key={anim.id}
                  type="button"
                  onClick={() => onChange({ subtitleAnimation: anim.id as SubtitleAnimation })}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    config.subtitleAnimation === anim.id
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {anim.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Words Per Screen */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Jumlah Kata per Layar
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: '1-word', label: '1 Kata Solo', desc: 'Hormozi' },
                { id: '3-4-words', label: '3-4 Kata', desc: 'Standar' },
                { id: 'full-sentence', label: '1 Kalimat', desc: 'Rapi' }
              ].map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => onChange({ wordsDisplay: w.id as SubtitleWordsDisplay })}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    config.wordsDisplay === w.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <div className="text-xs">{w.label}</div>
                  <div className="text-[9px] text-slate-500">{w.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Text Size & Uppercase */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Ukuran Font Subtitle
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'medium', label: 'Sedang' },
                { id: 'large', label: 'Besar' },
                { id: 'huge', label: 'Jumbo' }
              ].map((sz) => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => onChange({ subtitleFontSize: sz.id as any })}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    config.subtitleFontSize === sz.id
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>

            <div className="pt-1.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400">
                Huruf Besar (UPPERCASE)
              </span>
              <input 
                type="checkbox"
                checked={config.subtitleUppercase}
                onChange={(e) => onChange({ subtitleUppercase: e.target.checked })}
                className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* 4. Stroke & Background Box style */}
        <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Garis Luar / Stroke 3D
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'none', label: 'Polos' },
                { id: 'thick', label: 'Stroke Sedang' },
                { id: 'super-3d', label: 'Super 3D Hitam' }
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => onChange({ subtitleStroke: st.id as any })}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    config.subtitleStroke === st.id
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Model Box Latar Subtitle
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'black-pill', label: 'Black Glass' },
                { id: 'marker', label: 'Stabilo' },
                { id: 'solid-box', label: 'Solid Bar' },
                { id: 'none', label: 'Tanpa Box' }
              ].map((bx) => (
                <button
                  key={bx.id}
                  type="button"
                  onClick={() => onChange({ subtitleBackgroundBox: bx.id as any })}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    config.subtitleBackgroundBox === bx.id
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {bx.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
