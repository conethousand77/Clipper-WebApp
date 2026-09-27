import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Flame, 
  Clock, 
  Sliders, 
  Play, 
  ArrowRight, 
  Layout, 
  CheckSquare, 
  Square, 
  Eye, 
  Layers,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Project, Clip } from '../types';
import { PhoneMockup } from './PhoneMockup';

interface ClipReviewScreenProps {
  project: Project;
  selectedClipIds: string[];
  onToggleClipSelection: (clipId: string) => void;
  onSelectAllClips: () => void;
  onDeselectAllClips: () => void;
  onProceedToEditing: (singleClip?: Clip) => void;
  onBackToDashboard: () => void;
}

export const ClipReviewScreen: React.FC<ClipReviewScreenProps> = ({
  project,
  selectedClipIds,
  onToggleClipSelection,
  onSelectAllClips,
  onDeselectAllClips,
  onProceedToEditing,
  onBackToDashboard
}) => {
  const clips = project.clips || [];
  const [previewClip, setPreviewClip] = useState<Clip | null>(clips[0] || null);

  const allSelected = clips.length > 0 && selectedClipIds.length === clips.length;

  return (
    <div className="space-y-8 animate-fade-in pb-28">
      
      {/* Top Banner / Project Info */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={project.thumbnailUrl} 
            alt={project.title} 
            className="w-20 h-14 sm:w-24 sm:h-16 rounded-xl object-cover shrink-0 border border-slate-700 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                {project.channelName}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">
                {project.durationFormatted}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">
              {project.title}
            </h2>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ditemukan <strong className="text-amber-300 font-bold">{clips.length} segmen viral</strong> siap repurpose</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={allSelected ? onDeselectAllClips : onSelectAllClips}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            {allSelected ? (
              <>
                <CheckSquare className="w-4 h-4 text-rose-400" />
                <span>Batal Pilih Semua</span>
              </>
            ) : (
              <>
                <Square className="w-4 h-4 text-slate-400" />
                <span>Pilih Semua Klip</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Review Section: Grid of Clips + Live Phone Preview modal or side panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Clips List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span>Rekomendasi Klip AI</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-rose-400 font-mono">
                {clips.length}
              </span>
            </h3>
            <span className="text-xs text-slate-500">
              Pilih klip yang ingin diedit & dirender
            </span>
          </div>

          <div className="space-y-4">
            {clips.map((clip, index) => {
              const isSelected = selectedClipIds.includes(clip.id);
              const isPreviewing = previewClip?.id === clip.id;

              return (
                <div
                  key={clip.id}
                  className={`relative p-5 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-slate-900/90 border-rose-500/60 shadow-lg shadow-rose-950/20'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Checkbox */}
                    <button
                      onClick={() => onToggleClipSelection(clip.id)}
                      className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                        isSelected
                          ? 'bg-rose-600 border-rose-500 text-white'
                          : 'bg-slate-950 border-slate-700 hover:border-rose-400 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    {/* Clip Details */}
                    <div className="flex-1 min-w-0 space-y-3">
                      
                      {/* Top Badges: Index, Score, Viral badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-mono font-bold text-slate-300 flex items-center justify-center">
                            #{index + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>Skor AI: {clip.score} / 10</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-rose-400" />
                            <span>{clip.viralFactor === 'explosive' ? 'Explosive Viral' : 'High Retensi'}</span>
                          </span>
                        </div>

                        {/* Timing */}
                        <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {Math.floor(clip.startTime / 60)}:{(clip.startTime % 60).toString().padStart(2, '0')} - {Math.floor(clip.endTime / 60)}:{(clip.endTime % 60).toString().padStart(2, '0')}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-rose-400 font-bold">{clip.duration}s</span>
                        </div>
                      </div>

                      {/* Hook & Headline */}
                      <div>
                        <h4 className="text-base font-black text-white group-hover:text-rose-300 transition-colors">
                          {clip.headlineLevel1}
                        </h4>
                        <p className="text-xs font-bold text-slate-300 mt-0.5">
                          {clip.headlineLevel2}
                        </p>
                      </div>

                      {/* AI Reason */}
                      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
                        <strong className="text-amber-400 font-semibold block mb-0.5">
                          💡 Mengapa Klip Ini Menarik:
                        </strong>
                        {clip.scoreReason}
                      </div>

                      {/* Metadata Recommendation Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <div className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                          <Layout className="w-3 h-3 text-cyan-400" />
                          <span>Mode Layout: <strong>{clip.recommendedLayout.toUpperCase()}</strong></span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                          <span>Rasio: <strong>{clip.recommendedRatio}</strong></span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-purple-300">
                          <Tag className="w-3 h-3" />
                          <span>{clip.emotionTag}</span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                        <button
                          type="button"
                          onClick={() => setPreviewClip(clip)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            isPreviewing
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isPreviewing ? 'Sedang Ditampilkan' : 'Preview Mockup HP'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onProceedToEditing(clip)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-white text-xs font-semibold transition-colors ml-auto"
                        >
                          <span>Atur Template Klip Ini</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Phone Mockup Preview */}
        <div className="lg:col-span-5 sticky top-24 flex flex-col items-center">
          {previewClip ? (
            <div className="w-full flex justify-center">
              <PhoneMockup clip={previewClip} showSafeZoneToggle={false} />
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 bg-slate-900/50 border border-slate-800 rounded-3xl">
              Pilih klip di samping untuk memuat preview.
            </div>
          )}
        </div>

      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 border-t border-slate-800 backdrop-blur-xl p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold">
              {selectedClipIds.length}
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {selectedClipIds.length} Klip Terpilih
              </p>
              <p className="text-xs text-slate-400 hidden sm:block">
                Siap dilanjutkan ke Editing Setup (pemilihan template, layout, b-roll, subtitle)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
            >
              Kembali ke Dashboard
            </button>
            <button
              onClick={() => onProceedToEditing()}
              disabled={selectedClipIds.length === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-950/40 disabled:opacity-50 transition-all cursor-pointer"
            >
              <span>Lanjut ke Editing Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
