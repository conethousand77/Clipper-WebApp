import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  ArrowLeft, 
  Film, 
  CheckCircle2, 
  Info,
  Layers,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Clip } from '../types';
import { PhoneMockup } from './PhoneMockup';

interface ResultScreenProps {
  completedClips: Clip[];
  currentClipId?: string;
  onSelectClip: (clip: Clip) => void;
  onBackToDashboard: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  completedClips,
  currentClipId,
  onSelectClip,
  onBackToDashboard
}) => {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedSrt, setCopiedSrt] = useState(false);

  // Active clip
  const activeClip = completedClips.find(c => c.id === currentClipId) || completedClips[0];

  // Fire celebratory confetti on first mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!activeClip) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <Film className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">Belum Ada Video Yang Selesai Dirender</h2>
        <p className="text-sm text-slate-400">
          Silakan pilih klip di Clip Review dan mulai proses render terlebih dahulu.
        </p>
        <button
          onClick={onBackToDashboard}
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs transition-colors"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  // Generate SRT format text
  const generateSrtText = (): string => {
    if (!activeClip.words || activeClip.words.length === 0) {
      return `1\n00:00:00,000 --> 00:00:05,000\n${activeClip.headlineLevel1}\n\n2\n00:00:05,000 --> 00:00:10,000\n${activeClip.headlineLevel2}`;
    }
    return activeClip.words.map((w, i) => {
      const startSec = w.start.toFixed(3).replace('.', ',');
      const endSec = w.end.toFixed(3).replace('.', ',');
      return `${i + 1}\n00:00:${startSec.padStart(6, '0')} --> 00:00:${endSec.padStart(6, '0')}\n${w.word}\n`;
    }).join('\n');
  };

  // Download simulation handlers
  const handleDownloadVideo = () => {
    // Simulated video download trigger
    const link = document.createElement('a');
    link.href = activeClip.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    link.download = `${activeClip.title.replace(/[^a-zA-Z0-9]/g, '_')}_1080x1920.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCover = () => {
    const link = document.createElement('a');
    link.href = activeClip.coverUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop';
    link.download = `${activeClip.title.replace(/[^a-zA-Z0-9]/g, '_')}_Cover.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyCaption = () => {
    const fullCaption = `${activeClip.headlineLevel1}\n${activeClip.headlineLevel2}\n\n${activeClip.shareCopy || 'Tonton sampai habis biar paham konteksnya!'}\n\n${(activeClip.hashtags || ['#fyp', '#podcast', '#viral']).join(' ')}`;
    navigator.clipboard.writeText(fullCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleDownloadSrt = () => {
    const srtContent = generateSrtText();
    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeClip.title.replace(/[^a-zA-Z0-9]/g, '_')}_Subtitle.srt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Render Selesai (1080x1920 Vertikal)</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">
            Klip Siap Digunakan & Didownload
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Download file video MP4, sampul HD, transkrip SRT, dan salin copywriting caption TikTok/Reels manual.
          </p>
        </div>

        {/* Clip Switcher if multiple finished */}
        {completedClips.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Pilih Klip:</span>
            <select
              value={activeClip.id}
              onChange={(e) => {
                const found = completedClips.find(c => c.id === e.target.value);
                if (found) onSelectClip(found);
              }}
              className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-rose-500"
            >
              {completedClips.map((c, i) => (
                <option key={c.id} value={c.id}>
                  #{i + 1}: {c.title.slice(0, 28)}...
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Studio View: Phone Mockup on Left + Download Actions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Phone Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <PhoneMockup clip={activeClip} showSafeZoneToggle={false} />
        </div>

        {/* Right: Download Hub & Copywriting Center */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Download Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            
            {/* Meta info of the clip */}
            <div className="space-y-2 border-b border-slate-800 pb-5">
              <span className="text-xs font-extrabold uppercase tracking-wide text-rose-400">
                {activeClip.config.templateStyle.toUpperCase()} TEMPLATE
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                {activeClip.headlineLevel1}
              </h2>
              <p className="text-sm font-bold text-slate-300">
                {activeClip.headlineLevel2}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400 font-mono">
                <span>Durasi: {activeClip.duration}s</span>
                <span>•</span>
                <span>Resolusi: 1080x1920 MP4</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold">Skor AI: {activeClip.score}/10</span>
              </div>
            </div>

            {/* Primary Download Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleDownloadVideo}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-emerald-950/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>Download Video MP4 (1080x1920 Full HD)</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDownloadCover}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Download Sampul / Cover HD</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSrt}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Download Subtitle (.SRT)</span>
                </button>
              </div>
            </div>

            {/* Policy Reminder Banner (No auto-upload as strictly required) */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-400">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-300">Mode Unduh Manual:</span>{' '}
                Sesuai kebijakan keamanan akun dan ketentuan platform, Clip Studio tidak melakukan upload otomatis ke media sosial manapun. Silakan download file video di atas dan upload langsung melalui aplikasi TikTok, Instagram, atau YouTube Anda.
              </div>
            </div>

            {/* AI Copywriting & Caption Generator for TikTok/Reels */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Rekomendasi Caption & Hashtag TikTok/Reels</span>
                </label>
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="flex items-center gap-1 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors"
                >
                  {copiedCaption ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Semua</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 font-sans text-xs text-slate-200 leading-relaxed">
                <p className="font-bold text-white">
                  {activeClip.headlineLevel1} 🔥
                </p>
                <p className="text-slate-300">
                  {activeClip.headlineLevel2}
                </p>
                <p className="text-slate-400">
                  {activeClip.shareCopy || 'Baru tahu rahasia ini sekarang! Menurut kalian gimana? Tulis pendapat kalian di kolom komentar ya! 👇'}
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-rose-400 font-semibold font-mono text-[11px]">
                  {(activeClip.hashtags || ['#fyp', '#podcastindonesia', '#viral', '#reelsindonesia', '#belajarbisnis']).map((tag, i) => (
                    <span key={i} className="hover:underline cursor-pointer">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Navigation to Dashboard */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Dashboard Utama</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
