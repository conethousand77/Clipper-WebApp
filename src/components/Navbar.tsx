import React from 'react';
import { 
  Sparkles, 
  Video, 
  Sliders, 
  Clock, 
  CheckCircle2, 
  FolderKanban, 
  PlusCircle, 
  User as UserIcon, 
  LogOut, 
  Cpu
} from 'lucide-react';
import { AppUser } from '../types';

interface NavbarProps {
  currentTab: 'dashboard' | 'new-project' | 'clip-review' | 'editing-setup' | 'render-status' | 'result';
  onNavigate: (tab: 'dashboard' | 'new-project' | 'clip-review' | 'editing-setup' | 'render-status' | 'result') => void;
  user: AppUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  hasActiveProject: boolean;
  hasSelectedClips: boolean;
  renderingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  user,
  onOpenAuth,
  onLogout,
  hasActiveProject,
  hasSelectedClips,
  renderingCount
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 shadow-lg shadow-rose-950/50 group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-rose-400 transition-colors">
                  Clip Studio
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  AI Clipper
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                YouTube Podcast to Viral TikTok/Reels
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-slate-800 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-slate-400" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => onNavigate('new-project')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'new-project'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-rose-400" />
              <span>New Project</span>
            </button>

            {hasActiveProject && (
              <button
                onClick={() => onNavigate('clip-review')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  currentTab === 'clip-review'
                    ? 'bg-slate-800 text-white shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Clip Review</span>
              </button>
            )}

            {hasSelectedClips && (
              <button
                onClick={() => onNavigate('editing-setup')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  currentTab === 'editing-setup'
                    ? 'bg-slate-800 text-white shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Editing Setup</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('render-status')}
              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'render-status'
                  ? 'bg-slate-800 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Render Status</span>
              {renderingCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-purple-500 text-white animate-pulse">
                  {renderingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('result')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'result'
                  ? 'bg-slate-800 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Result & Download</span>
            </button>
          </nav>

          {/* User / Actions */}
          <div className="flex items-center gap-3">
            {/* Cloud Worker Status */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cloud Render Engine</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            </div>

            {user ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1 pr-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    user.displayName?.[0] || 'C'
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-slate-200 truncate max-w-[100px]">
                    {user.displayName || (user.isAnonymous ? 'Guest Clipper' : user.email?.split('@')[0])}
                  </p>
                  <p className="text-[10px] text-slate-500">Firestore Synced</p>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Masuk Akun</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-800/80 bg-slate-950 px-2 py-1 gap-1 text-xs">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            currentTab === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate('new-project')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            currentTab === 'new-project' ? 'bg-rose-600 text-white' : 'text-slate-400'
          }`}
        >
          + New Project
        </button>
        {hasActiveProject && (
          <button
            onClick={() => onNavigate('clip-review')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentTab === 'clip-review' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Clip Review
          </button>
        )}
        {hasSelectedClips && (
          <button
            onClick={() => onNavigate('editing-setup')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              currentTab === 'editing-setup' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Editing Setup
          </button>
        )}
        <button
          onClick={() => onNavigate('render-status')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            currentTab === 'render-status' ? 'bg-slate-800 text-white' : 'text-slate-400'
          }`}
        >
          Render ({renderingCount})
        </button>
        <button
          onClick={() => onNavigate('result')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            currentTab === 'result' ? 'bg-slate-800 text-white' : 'text-slate-400'
          }`}
        >
          Result
        </button>
      </div>
    </header>
  );
};
