import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Loader2, 
  Film, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { Clip, Project } from '../types';

interface RenderStatusScreenProps {
  renderingClips: Clip[];
  allCompletedClips: Clip[];
  onViewResults: (clip: Clip) => void;
  onNavigateToDashboard: () => void;
}

export const RenderStatusScreen: React.FC<RenderStatusScreenProps> = ({
  renderingClips,
  allCompletedClips,
  onViewResults,
  onNavigateToDashboard
}) => {
  const isAnyRendering = renderingClips.some(c => c.renderStatus === 'rendering');

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>Cloud Render Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Status Antrean & Render Video
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Video Anda sedang diproses oleh cloud worker kami. Anda dapat meninggalkan halaman ini dan kembali lagi kapan saja — status tersinkronisasi otomatis.
        </p>
      </div>

      {/* Cloud Background Notice Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Pemrosesan Berjalan di Background Cloud</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Render video 1080x1920 60FPS dengan subtitle karaoke dan background cutout memakan waktu sekitar 30-90 detik per klip. Anda tidak perlu menunggu di halaman ini — database Firestore menyimpan progres Anda secara real-time.
          </p>
        </div>
      </div>

      {/* Rendering Active Clips List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span>Antrean Pemrosesan Aktif</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-purple-400 font-mono">
              {renderingClips.length}
            </span>
          </h3>
        </div>

        {renderingClips.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Tidak Ada Render Yang Sedang Berjalan</h4>
            <p className="text-xs text-slate-400">
              Semua klip telah selesai diproses atau belum ada antrean baru.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {renderingClips.map((clip) => {
              const isFinished = clip.renderStatus === 'completed';

              return (
                <div 
                  key={clip.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {clip.config.templateStyle.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Durasi: {clip.duration}s • 1080x1920 Vertikal
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-white">
                        {clip.headlineLevel1}
                      </h4>
                      <p className="text-xs font-semibold text-slate-400">
                        {clip.headlineLevel2}
                      </p>
                    </div>

                    {/* Status Pill */}
                    <div>
                      {isFinished ? (
                        <button
                          onClick={() => onViewResults(clip)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Lihat & Download</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Rendering {clip.renderProgress}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar & Stage Description */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">
                        {clip.renderStage || 'Memulai render engine...'}
                      </span>
                      <span className="text-purple-400 font-mono font-bold">
                        {clip.renderProgress}%
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          isFinished 
                            ? 'bg-emerald-500' 
                            : 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500'
                        }`}
                        style={{ width: `${Math.max(5, clip.renderProgress)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Visual Render Pipeline Steps */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-500 pt-1">
                    <div className={`p-1.5 rounded border text-center ${clip.renderProgress >= 25 ? 'bg-purple-950/40 border-purple-500/30 text-purple-300 font-bold' : 'border-slate-800'}`}>
                      1. Tracking Wajah
                    </div>
                    <div className={`p-1.5 rounded border text-center ${clip.renderProgress >= 50 ? 'bg-purple-950/40 border-purple-500/30 text-purple-300 font-bold' : 'border-slate-800'}`}>
                      2. Subtitle Karaoke
                    </div>
                    <div className={`p-1.5 rounded border text-center ${clip.renderProgress >= 75 ? 'bg-purple-950/40 border-purple-500/30 text-purple-300 font-bold' : 'border-slate-800'}`}>
                      3. B-Roll & Pop-in
                    </div>
                    <div className={`p-1.5 rounded border text-center ${clip.renderProgress >= 100 ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 font-bold' : 'border-slate-800'}`}>
                      4. MP4 Encoding
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Clips Section */}
      {allCompletedClips.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Klip Yang Sudah Selesai Dirender ({allCompletedClips.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allCompletedClips.map((clip) => (
              <div 
                key={clip.id}
                onClick={() => onViewResults(clip)}
                className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-emerald-400">
                    Selesai • 1080p MP4
                  </span>
                  <h5 className="text-xs font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                    {clip.headlineLevel1}
                  </h5>
                  <p className="text-[11px] text-slate-400 truncate">
                    {clip.title}
                  </p>
                </div>
                <button
                  type="button"
                  className="p-2 rounded-xl bg-emerald-600 group-hover:bg-emerald-500 text-white shrink-0 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to Dashboard */}
      <div className="text-center pt-6">
        <button
          onClick={onNavigateToDashboard}
          className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          ← Kembali ke Dashboard Project
        </button>
      </div>

    </div>
  );
};
