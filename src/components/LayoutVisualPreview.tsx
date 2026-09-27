import React, { useState } from 'react';
import { 
  Crop, 
  SplitSquareVertical, 
  Maximize2, 
  Check, 
  Info, 
  Play, 
  Youtube, 
  Smartphone, 
  ArrowRight,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';
import { LayoutMode } from '../types';

interface LayoutVisualPreviewProps {
  currentMode: LayoutMode;
  onSelectMode: (mode: LayoutMode) => void;
  youtubeThumbnail?: string;
  channelName?: string;
}

export const LayoutVisualPreview: React.FC<LayoutVisualPreviewProps> = ({
  currentMode,
  onSelectMode,
  youtubeThumbnail = 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
  channelName = 'Podcast YouTube'
}) => {
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);

  // Sample guest/host frames from Indonesian podcast
  const hostImage = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';
  const guestImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop';
  const wideShot = youtubeThumbnail;

  const layoutDetails = {
    fill: {
      title: 'Full / Fill (Crop Wajah 9:16)',
      subtitle: 'Crop terpusat mengikuti wajah pembicara',
      bestFor: 'Cocok untuk 1 pembicara utama, monolog inspiratif, atau saat kamera podcast sedang close-up ke narasumber.',
      pros: 'Layar HP 100% penuh tanpa area kosong, sangat disukai algoritma TikTok & Reels.',
      cons: 'Sisi kiri dan kanan video 16:9 terpotong.'
    },
    split: {
      title: 'Split Screen (2 Orang Atas-Bawah)',
      subtitle: 'Membagi layar jadi 2 video 16:9 bertumpuk',
      bestFor: 'Podcast 2 orang berjauhan (contoh: Host Denny Sumargo di atas, Narasumber dr. Richard di bawah).',
      pros: 'Kedua wajah tetap terlihat jelas bersamaan tanpa terpotong, menangkap reaksi lawan bicara seketika.',
      cons: 'Video pembicara sedikit lebih ramping.'
    },
    fit: {
      title: 'Full Fit (Blur Motion Background)',
      subtitle: 'Video 16:9 utuh di tengah + background blur',
      bestFor: 'Video podcast yang menampilkan slide presentasi, grafik chart saham, cuplikan video bukti, atau wide-angle studio.',
      pros: 'Tidak ada bagian video yang terpotong sama sekali, sisa ruang diisi efek blur ambient bergerak estetik (bukan bar hitam mati).',
      cons: 'Ukuran video utama di tengah relatif lebih kecil dibanding mode Fill.'
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header with Comparison Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Pilihan Mode Layout Video (Dari YouTube 16:9 ke HP 9:16)
          </label>
          <p className="text-[11px] text-slate-400">
            Pilih bagaimana video landscape dari YouTube disesuaikan ke layar vertikal smartphone:
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDetailedComparison(!showDetailedComparison)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-rose-400 border border-slate-800 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showDetailedComparison ? 'Tutup Contoh' : 'Bandingkan Semua Mode'}</span>
        </button>
      </div>

      {/* 3 Interactive Cards with Visual Previews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* MODE 1: FULL / FILL */}
        <div
          onClick={() => onSelectMode('fill')}
          className={`group relative rounded-2xl border-2 p-3.5 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
            currentMode === 'fill'
              ? 'bg-rose-950/20 border-rose-500 shadow-xl shadow-rose-950/30 ring-1 ring-rose-500'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          {/* Active Badge */}
          {currentMode === 'fill' && (
            <div className="absolute top-2.5 right-2.5 z-10 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          )}

          {/* Visual Mini Mockup */}
          <div className="space-y-2">
            <div className="relative mx-auto w-28 h-48 bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner group-hover:scale-102 transition-transform">
              
              {/* Full fill image centered on face */}
              <img 
                src={guestImage} 
                alt="Full Fill Preview" 
                className="w-full h-full object-cover object-center"
              />

              {/* Crop Box Wireframe Simulation */}
              <div className="absolute inset-0 border-2 border-dashed border-rose-500/60 pointer-events-none flex flex-col justify-between p-1.5">
                <span className="text-[8px] font-bold bg-rose-600/90 text-white px-1 rounded uppercase tracking-wider self-start">
                  AI Face Crop
                </span>
                <span className="text-[7px] text-white/90 font-mono bg-black/75 px-1 py-0.5 rounded self-center text-center">
                  Full 1 Layar
                </span>
              </div>
            </div>

            {/* Label & Description */}
            <div className="pt-2 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-black text-white group-hover:text-rose-400 transition-colors">
                <Crop className="w-3.5 h-3.5 text-rose-500" />
                <span>Full / Fill (Crop Wajah)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                Video di-zoom & di-crop mengikuti wajah pembicara agar penuh 1 layar tanpa bar kosong.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-emerald-400 font-semibold text-center">
            ★ Paling Populer di TikTok
          </div>
        </div>

        {/* MODE 2: SPLIT SCREEN */}
        <div
          onClick={() => onSelectMode('split')}
          className={`group relative rounded-2xl border-2 p-3.5 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
            currentMode === 'split'
              ? 'bg-indigo-950/20 border-indigo-500 shadow-xl shadow-indigo-950/30 ring-1 ring-indigo-500'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          {currentMode === 'split' && (
            <div className="absolute top-2.5 right-2.5 z-10 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          )}

          {/* Visual Mini Mockup */}
          <div className="space-y-2">
            <div className="relative mx-auto w-28 h-48 bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner group-hover:scale-102 transition-transform flex flex-col">
              
              {/* Top Panel (Host) */}
              <div className="relative w-full h-1/2 overflow-hidden border-b-2 border-slate-900">
                <img 
                  src={hostImage} 
                  alt="Host Split" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 bg-black/80 text-cyan-300 text-[7px] font-bold px-1 rounded">
                  Host / Pembicara 1
                </span>
              </div>

              {/* Bottom Panel (Guest) */}
              <div className="relative w-full h-1/2 overflow-hidden">
                <img 
                  src={guestImage} 
                  alt="Guest Split" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-rose-600/90 text-white text-[7px] font-bold px-1 rounded">
                  Guest / Pembicara 2
                </span>
              </div>

            </div>

            {/* Label & Description */}
            <div className="pt-2 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-black text-white group-hover:text-indigo-400 transition-colors">
                <SplitSquareVertical className="w-3.5 h-3.5 text-indigo-400" />
                <span>Split Screen (2 Orang)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                Layar dibagi 2 bagian (atas & bawah) untuk podcast 2 orang berjarak.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-indigo-400 font-semibold text-center">
            ★ Terbaik untuk Podcast Dialog
          </div>
        </div>

        {/* MODE 3: FULL FIT */}
        <div
          onClick={() => onSelectMode('fit')}
          className={`group relative rounded-2xl border-2 p-3.5 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
            currentMode === 'fit'
              ? 'bg-cyan-950/20 border-cyan-500 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
          }`}
        >
          {currentMode === 'fit' && (
            <div className="absolute top-2.5 right-2.5 z-10 w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-md">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          )}

          {/* Visual Mini Mockup */}
          <div className="space-y-2">
            <div className="relative mx-auto w-28 h-48 bg-black rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner group-hover:scale-102 transition-transform flex items-center justify-center">
              
              {/* Blurred Ambient Motion Background */}
              <div className="absolute inset-0 w-full h-full scale-125 blur-lg opacity-60 overflow-hidden">
                <img 
                  src={wideShot} 
                  alt="Ambient Background" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Exact 16:9 Video in Center without cropping */}
              <div className="relative z-10 w-full aspect-video border border-white/20 shadow-md overflow-hidden rounded">
                <img 
                  src={wideShot} 
                  alt="Fit Video Center" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0.5 right-1 bg-black/80 text-[6px] font-mono text-white px-0.5 rounded">
                  16:9 UTUH
                </span>
              </div>

              {/* Tag indicator */}
              <div className="absolute top-1 inset-x-1 text-center">
                <span className="bg-cyan-950/80 text-cyan-300 text-[6px] font-bold px-1 py-0.5 rounded border border-cyan-500/30">
                  Ambient Blur
                </span>
              </div>
            </div>

            {/* Label & Description */}
            <div className="pt-2 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-black text-white group-hover:text-cyan-400 transition-colors">
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Fit (Blur Background)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                Video 16:9 utuh di tengah, sisa ruang atas-bawah diisi blur dari video itu sendiri.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-cyan-400 font-semibold text-center">
            ★ Terbaik untuk Grafik & Slide
          </div>
        </div>

      </div>

      {/* Expanded Detailed Comparison Section */}
      {showDetailedComparison && (
        <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 animate-fade-in">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500" />
              <h4 className="text-sm font-bold text-white">
                Simulasi Konversi: Video Asli YouTube 16:9 ➔ Hasil di Layar HP 9:16
              </h4>
            </div>
            <span className="text-xs text-rose-400 font-semibold">
              Mode Aktif: {layoutDetails[currentMode].title}
            </span>
          </div>

          {/* Side by side demonstration */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Original YouTube 16:9 Widescreen */}
            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>Sumber YouTube Asli (16:9 Widescreen)</span>
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  1920x1080 Landscape
                </span>
              </div>

              {/* 16:9 Frame */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-xl">
                <img 
                  src={wideShot} 
                  alt="YouTube Original" 
                  className="w-full h-full object-cover"
                />

                {/* Overlaid Crop Box Indicators depending on currentMode */}
                {currentMode === 'fill' && (
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[35%] border-2 border-dashed border-rose-500 bg-rose-500/10 flex flex-col justify-between p-1.5">
                    <span className="text-[9px] font-black bg-rose-600 text-white px-1 py-0.5 rounded self-center uppercase">
                      Area Crop 9:16
                    </span>
                    <span className="text-[8px] text-white bg-black/80 px-1 rounded text-center">
                      AI Fokus ke Wajah
                    </span>
                  </div>
                )}

                {currentMode === 'split' && (
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full border-r-2 border-dashed border-cyan-400 bg-cyan-500/10 flex items-center justify-center p-1">
                      <span className="text-[9px] font-bold bg-black/80 text-cyan-300 px-1 py-0.5 rounded">
                        Host ➔ Layar Atas
                      </span>
                    </div>
                    <div className="w-1/2 h-full bg-rose-500/10 flex items-center justify-center p-1">
                      <span className="text-[9px] font-bold bg-black/80 text-rose-300 px-1 py-0.5 rounded">
                        Guest ➔ Layar Bawah
                      </span>
                    </div>
                  </div>
                )}

                {currentMode === 'fit' && (
                  <div className="absolute inset-0 border-2 border-cyan-400 bg-cyan-500/5 flex items-center justify-center">
                    <span className="text-[9px] font-bold bg-black/85 text-cyan-300 px-2 py-1 rounded-full border border-cyan-500/40">
                      100% Video Dimasukkan Tanpa Dipotong
                    </span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {currentMode === 'fill' && 'AI otomatis mendeteksi koordinat wajah pembicara di frame 16:9 dan memotong rasio 9:16 tepat di tengah.'}
                {currentMode === 'split' && 'AI memotong 2 sisi frame podcast dan menyusunnya menjadi 2 tingkat vertikal bertumpuk.'}
                {currentMode === 'fit' && 'Video 16:9 dipertahankan secara utuh di tengah, latar belakang diisi pantulan blur dari frame itu sendiri.'}
              </p>
            </div>

            {/* Middle: Transform Arrow */}
            <div className="md:col-span-2 flex flex-col items-center justify-center text-rose-400">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase mt-1 text-slate-400">
                AI Auto Reframe
              </span>
            </div>

            {/* Right: Result on Mobile 9:16 */}
            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-rose-400" />
                  <span>Hasil Vertikal Smartphone (9:16)</span>
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30 font-bold">
                  1080x1920 Vertikal
                </span>
              </div>

              {/* Explanatory Info Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {layoutDetails[currentMode].title}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-semibold">
                  {layoutDetails[currentMode].bestFor}
                </p>
                <div className="grid grid-cols-1 gap-1 text-[11px] pt-1">
                  <div className="text-emerald-400">
                    <strong>Kelebihan:</strong> {layoutDetails[currentMode].pros}
                  </div>
                  <div className="text-slate-400">
                    <strong>Catatan:</strong> {layoutDetails[currentMode].cons}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
