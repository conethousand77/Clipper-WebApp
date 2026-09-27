import React, { useState } from 'react';
import { 
  Plus, 
  Sparkles, 
  Clock, 
  Trash2, 
  ArrowRight, 
  Search, 
  Filter, 
  Video, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  Share2, 
  Flame, 
  PlayCircle,
  FileVideo,
  Download
} from 'lucide-react';
import { Project, ProjectStatus } from '../types';

interface DashboardScreenProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNewProject: () => void;
  onDeleteProject: (projectId: string) => void;
  onLoadSample: () => void;
  onDirectToResult: (project: Project) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  projects,
  onSelectProject,
  onNewProject,
  onDeleteProject,
  onLoadSample,
  onDirectToResult
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.channelName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalClips = projects.reduce((acc, p) => acc + (p.clips?.length || p.clipCount || 0), 0);
  const completedClips = projects.reduce((acc, p) => {
    return acc + (p.clips?.filter(c => c.renderStatus === 'completed').length || 0);
  }, 0);
  const estimatedHoursSaved = (totalClips * 0.75).toFixed(1); // avg 45 mins saved per short clip

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Hero / Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-900 border border-rose-900/30 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workspace Clipper Indonesia</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Otomatisasi Klip Podcast YouTube ke TikTok & Reels
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Tempel link podcast panjang, AI cari segmen paling viral, auto potong 9:16, pasang subtitle karaoke, hook headline, dan B-roll. Siap didownload tanpa repot editing manual!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={onNewProject}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-950/50 hover:scale-102 active:scale-98 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Proses Video Baru</span>
            </button>
            <button
              onClick={onLoadSample}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Load Sample Podcast</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4.5">
          <p className="text-xs font-semibold text-slate-400">Total Video Diproses</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-white">{projects.length}</span>
            <span className="text-xs text-rose-400 font-medium">Podcast</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4.5">
          <p className="text-xs font-semibold text-slate-400">Klip Pendek Ditemukan</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-white">{totalClips}</span>
            <span className="text-xs text-amber-400 font-medium">Segmen Viral</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4.5">
          <p className="text-xs font-semibold text-slate-400">Klip Selesai Dirender</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">{completedClips}</span>
            <span className="text-xs text-emerald-500 font-medium">Siap Download</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4.5">
          <p className="text-xs font-semibold text-slate-400">Waktu Edit Terhemat</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">{estimatedHoursSaved}</span>
            <span className="text-xs text-cyan-500 font-medium">Jam Produktif</span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Cari judul podcast atau channel YouTube..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-500 mr-1 hidden sm:block" />
          {[
            { id: 'all', label: 'Semua Status' },
            { id: 'completed', label: 'Selesai' },
            { id: 'ready', label: 'Siap Review' },
            { id: 'processing', label: 'Sedang Proses' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-900/40 border border-slate-800/80 rounded-3xl">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Belum Ada Video di Project</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-6">
            Mulai dengan menempelkan link YouTube podcast atau gunakan template preset Indonesia yang sudah siap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onNewProject}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all"
            >
              + Proses Link YouTube
            </button>
            <button
              onClick={onLoadSample}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition-all"
            >
              Load Sample Denny Sumargo
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const hasCompletedClips = project.clips?.some(c => c.renderStatus === 'completed');
            
            return (
              <div 
                key={project.id}
                className="group relative bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/20 flex flex-col justify-between"
              >
                {/* Thumbnail & Badges */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img 
                    src={project.thumbnailUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur text-[11px] font-bold text-amber-300 border border-white/10">
                    {project.topicCategory}
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur text-[11px] font-mono text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{project.durationFormatted}</span>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute top-3 right-3">
                    {project.status === 'processing' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Menganalisis...</span>
                      </span>
                    )}
                    {project.status === 'ready' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span>Siap Review</span>
                      </span>
                    )}
                    {project.status === 'completed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Selesai</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                      {project.channelName}
                    </p>
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-rose-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-3">
                    {/* Clip count & viral potential */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <FileVideo className="w-4 h-4 text-slate-500" />
                        <span>{project.clips?.length || project.clipCount} Klip Ditemukan</span>
                      </span>
                      <span className="font-semibold text-amber-400 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        <span>High Virality</span>
                      </span>
                    </div>

                    {/* Progress Bar if processing */}
                    {project.status === 'processing' && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>{project.processingStage || 'Ekstraksi segmen...'}</span>
                          <span>{project.processingProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
                            style={{ width: `${project.processingProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-rose-600 text-white font-semibold text-xs transition-colors"
                      >
                        <span>Buka Klip Review</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {hasCompletedClips && (
                        <button
                          onClick={() => onDirectToResult(project)}
                          title="Langsung ke Hasil Download"
                          className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => onDeleteProject(project.id)}
                        title="Hapus Project"
                        className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
