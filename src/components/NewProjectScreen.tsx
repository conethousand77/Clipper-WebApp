import React, { useState } from 'react';
import { 
  Link2, 
  Sparkles, 
  Youtube, 
  AlertTriangle, 
  Flame, 
  Check, 
  Play, 
  Clock, 
  Layers, 
  Loader2, 
  ShieldCheck, 
  Info,
  ArrowRight
} from 'lucide-react';
import { POPULAR_INDONESIAN_PODCASTS, YouTubePreset } from '../lib/sampleData';
import { Project } from '../types';

interface NewProjectScreenProps {
  onStartProcessing: (params: {
    youtubeUrl: string;
    topicCategory: 'Finance & Bisnis' | 'Motivasi & Mindset' | 'Drama & Wawancara' | 'Edukasi & Tech' | 'Umum';
    targetDuration: 'short' | 'medium' | 'standard';
    selectedPreset?: YouTubePreset;
  }) => Promise<void>;
  isProcessing: boolean;
  processingStage: string;
  processingProgress: number;
}

export const NewProjectScreen: React.FC<NewProjectScreenProps> = ({
  onStartProcessing,
  isProcessing,
  processingStage,
  processingProgress
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Finance & Bisnis' | 'Motivasi & Mindset' | 'Drama & Wawancara' | 'Edukasi & Tech' | 'Umum'>('Drama & Wawancara');
  const [targetDuration, setTargetDuration] = useState<'short' | 'medium' | 'standard'>('medium');
  const [selectedPreset, setSelectedPreset] = useState<YouTubePreset | null>(null);
  const [urlError, setUrlError] = useState('');

  const handleSelectPreset = (preset: YouTubePreset) => {
    setSelectedPreset(preset);
    setYoutubeUrl(preset.url);
    setSelectedCategory(preset.category);
    setUrlError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl.trim()) {
      setUrlError('Silakan masukkan link URL YouTube atau pilih salah satu preset di bawah.');
      return;
    }

    // Basic YouTube validation
    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
      setUrlError('Format link tidak valid. Harap masukkan link YouTube (contoh: https://www.youtube.com/watch?v=...)');
      return;
    }

    setUrlError('');
    onStartProcessing({
      youtubeUrl,
      topicCategory: selectedCategory,
      targetDuration,
      selectedPreset: selectedPreset || undefined
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Youtube className="w-4 h-4 text-red-500" />
          <span>New Project Clipper</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Masukkan Link YouTube Podcast
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          AI akan memindai transkrip penuh, mendeteksi punchline, hook pembicara, dan memotong 5-10 klip pendek 9:16 siap posting.
        </p>
      </div>

      {/* Main Input Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Processing Overlay if running */}
        {isProcessing && (
          <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 shadow-2xl shadow-rose-900/50">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
              <Sparkles className="w-5 h-5 text-amber-300 absolute -top-2 -right-2 animate-bounce" />
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-black text-white">
                Memproses Video & Menganalisis Klip
              </h3>
              <p className="text-sm text-rose-400 font-semibold animate-pulse">
                {processingStage || 'Menghubungkan ke Gemini AI Engine...'}
              </p>
              <p className="text-xs text-slate-400">
                Proses ini berjalan di background cloud. AI sedang mengevaluasi retensi hook dan memotong frame wajah.
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Progress Analisis</span>
                <span>{processingProgress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-400 rounded-full transition-all duration-300 shadow-lg"
                  style={{ width: `${Math.max(5, processingProgress)}%` }}
                ></div>
              </div>
            </div>

            {/* Pipeline Stage Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400 pt-2 w-full max-w-lg">
              <div className={`p-2 rounded-lg border text-center ${processingProgress >= 20 ? 'bg-rose-950/40 border-rose-500/40 text-rose-300 font-bold' : 'bg-slate-900 border-slate-800'}`}>
                1. Audio Extraction
              </div>
              <div className={`p-2 rounded-lg border text-center ${processingProgress >= 50 ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 font-bold' : 'bg-slate-900 border-slate-800'}`}>
                2. Word Timestamp
              </div>
              <div className={`p-2 rounded-lg border text-center ${processingProgress >= 75 ? 'bg-indigo-950/40 border-indigo-500/40 text-indigo-300 font-bold' : 'bg-slate-900 border-slate-800'}`}>
                3. Gemini Scoring
              </div>
              <div className={`p-2 rounded-lg border text-center ${processingProgress >= 95 ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800'}`}>
                4. Layout 9:16
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* YouTube Link Field */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-200">
              Link Video YouTube (Podcast / Wawancara)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Link2 className="w-5 h-5 text-rose-500" />
              </div>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => {
                  setYoutubeUrl(e.target.value);
                  setSelectedPreset(null);
                  setUrlError('');
                }}
                placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                className="w-full pl-12 pr-28 py-3.5 bg-slate-950 border border-slate-700 rounded-2xl text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-mono"
              />
              <button
                type="button"
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    if (text) {
                      setYoutubeUrl(text);
                      setUrlError('');
                    }
                  } catch (e) {
                    console.log('Clipboard permission not granted');
                  }
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
              >
                Paste
              </button>
            </div>
            {urlError && (
              <p className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 mt-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{urlError}</span>
              </p>
            )}
          </div>

          {/* Preset Buttons for Instant 1-Click Test */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Atau Coba Cepat Preset Podcast Populer Indonesia:</span>
              </span>
              <span className="text-[11px] text-slate-500">1-Klik Langsung Isi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {POPULAR_INDONESIAN_PODCASTS.map((preset) => {
                const isSelected = selectedPreset?.id === preset.id || youtubeUrl === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-rose-500/10 border-rose-500 shadow-md shadow-rose-950/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <img 
                      src={preset.thumbnail} 
                      alt={preset.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-800" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-rose-400 truncate">
                          {preset.channel}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                      </div>
                      <p className="text-xs font-semibold text-slate-200 line-clamp-2 leading-tight mt-0.5">
                        {preset.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                        Durasi: {preset.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Opsi Kategori / Fokus AI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Fokus Kategori Konten
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-rose-500"
              >
                <option value="Drama & Wawancara">Drama & Wawancara (Ghibah, Emosi, Pengakuan)</option>
                <option value="Finance & Bisnis">Finance & Bisnis (Omset, Investasi, Mindset)</option>
                <option value="Motivasi & Mindset">Motivasi & Mindset (Kebangkitan, Disiplin)</option>
                <option value="Edukasi & Tech">Edukasi & Tech (Tips Praktis, Tutorial)</option>
                <option value="Umum">Umum / Semua Jenis Podcast</option>
              </select>
            </div>

            {/* Target Duration */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Target Durasi Potongan Klip
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'short', label: '20-40s', desc: 'Short Hook' },
                  { id: 'medium', label: '40-60s', desc: 'TikTok Ideal' },
                  { id: 'standard', label: '60-90s', desc: 'In-Depth' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTargetDuration(item.id as any)}
                    className={`py-2 px-2 rounded-xl text-center border transition-all ${
                      targetDuration === item.id
                        ? 'bg-rose-600/20 text-rose-300 border-rose-500/50 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Legal / ToS Disclaimer Notice (as requested by user) */}
          <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Catatan Penggunaan & Ketentuan YouTube:</span>{' '}
              Mengunduh video YouTube untuk penggunaan di luar ketentuan wajar/pribadi memerlukan izin dari pemilik hak cipta dan kepatuhan terhadap YouTube Terms of Service. Pastikan Anda memiliki hak atau izin saat mempublikasikan ulang konten podcast.
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-base shadow-xl shadow-rose-950/50 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-white" />
              <span>Proses Video & Temukan Klip Viral Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
