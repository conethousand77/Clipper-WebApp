import type { Project, Clip, TemplateStyle, LayoutMode, CutoutBackground, ColorGradePreset } from '../types/index.ts';

export interface YouTubePreset {
  id: string;
  title: string;
  channel: string;
  url: string;
  duration: string;
  category: 'Finance & Bisnis' | 'Motivasi & Mindset' | 'Drama & Wawancara' | 'Edukasi & Tech' | 'Umum';
  thumbnail: string;
  videoPlaceholderUrl: string;
  speaker1Name: string;
  speaker2Name?: string;
  clips: Partial<Clip>[];
}

export const POPULAR_INDONESIAN_PODCASTS: YouTubePreset[] = [
  {
    id: 'curhat-bang-denny-richard',
    title: 'BONGKAR SEMUA KASUS MAFIA KECANTIKAN! DARI NYARIS MASUK PENJARA SAMPAI OMSET 500 MILIAR',
    channel: 'CURHAT BANG Denny Sumargo',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '1j 42m',
    category: 'Drama & Wawancara',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    videoPlaceholderUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    speaker1Name: 'Denny Sumargo',
    speaker2Name: 'dr. Richard Lee',
    clips: [
      {
        id: 'clip-densu-1',
        title: 'Momen Diancam & Rugi 50 Miliar',
        headlineLevel1: 'DITIPU 50 MILIAR?! 😱',
        headlineLevel2: 'DOKTER RICHARD NYARIS GULUNG TIKAR',
        score: 9.8,
        scoreReason: 'Hook sangat kuat di 3 detik pertama dengan angka 50 Miliar dan ketegangan emosional tinggi.',
        viralFactor: 'explosive',
        startTime: 412,
        endTime: 468,
        duration: 56,
        recommendedRatio: '9:16',
        recommendedLayout: 'fill',
        emotionTag: 'Rahasia Bisnis',
        words: [
          { word: "Banyak", start: 0.0, end: 0.3 },
          { word: "orang", start: 0.3, end: 0.6 },
          { word: "nggak", start: 0.6, end: 0.8 },
          { word: "tahu,", start: 0.8, end: 1.2 },
          { word: "tahun", start: 1.2, end: 1.5 },
          { word: "2020", start: 1.5, end: 1.9, highlight: true },
          { word: "aku", start: 1.9, end: 2.1 },
          { word: "rugi", start: 2.1, end: 2.5, highlight: true },
          { word: "Rp 50", start: 2.5, end: 3.1, highlight: true, punchline: true },
          { word: "MILIAR", start: 3.1, end: 3.8, highlight: true, punchline: true },
          { word: "dalam", start: 3.8, end: 4.1 },
          { word: "waktu", start: 4.1, end: 4.4 },
          { word: "semalam!", start: 4.4, end: 5.1, highlight: true },
          { word: "Semua", start: 5.2, end: 5.5 },
          { word: "stok", start: 5.5, end: 5.8 },
          { word: "disita,", start: 5.8, end: 6.3 },
          { word: "rekening", start: 6.3, end: 6.7 },
          { word: "dibekukan.", start: 6.7, end: 7.4 },
          { word: "Tapi", start: 7.6, end: 7.9 },
          { word: "aku", start: 7.9, end: 8.1 },
          { word: "selalu", start: 8.1, end: 8.4 },
          { word: "ingat", start: 8.4, end: 8.7 },
          { word: "satu", start: 8.7, end: 9.0 },
          { word: "prinsip:", start: 9.0, end: 9.6, highlight: true },
          { word: "Mental", start: 9.7, end: 10.1, highlight: true },
          { word: "pemenang", start: 10.1, end: 10.6, highlight: true },
          { word: "nggak", start: 10.6, end: 10.9 },
          { word: "bisa", start: 10.9, end: 11.2 },
          { word: "dirampas", start: 11.2, end: 11.7 },
          { word: "siapapun!", start: 11.7, end: 12.5, highlight: true, punchline: true },
          { word: "Dalam", start: 12.7, end: 13.0 },
          { word: "6", start: 13.0, end: 13.3, highlight: true },
          { word: "bulan,", start: 13.3, end: 13.7 },
          { word: "kita", start: 13.7, end: 14.0 },
          { word: "bangkit", start: 14.0, end: 14.4 },
          { word: "lipat", start: 14.4, end: 14.8 },
          { word: "tiga", start: 14.8, end: 15.2 },
          { word: "kali", start: 15.2, end: 15.5 },
          { word: "lipat!", start: 15.5, end: 16.2, highlight: true }
        ],
        keyMetrics: [
          { numberText: "Rp 50 MILIAR", label: "TOTAL KERUGIAN", timestamp: 2.8 },
          { numberText: "6 BULAN", label: "WAKTU BANGKIT", timestamp: 13.1 }
        ],
        reactiveEmojis: [
          { emoji: "😱", label: "Shock", timestamp: 3.0 },
          { emoji: "💸", label: "Money Loss", timestamp: 4.8 },
          { emoji: "🦁", label: "Mental Juara", timestamp: 10.5 },
          { emoji: "🚀", label: "Growth", timestamp: 15.3 }
        ],
        bRollMoments: [
          {
            query: "warehouse inventory seizure",
            topic: "Penyitaan Barang & Kerugian",
            start: 5.0,
            end: 7.2,
            imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop"
          },
          {
            query: "financial exponential chart growth",
            topic: "Grafik Pertumbuhan Bangkit",
            start: 13.5,
            end: 15.8,
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop"
          }
        ],
        faceCovers: [
          {
            id: 'cover-1',
            timestamp: 2.9,
            expression: 'Shock & Mata Melotot',
            description: 'Ekspresi dramatis saat menyebut kerugian 50M',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'
          },
          {
            id: 'cover-2',
            timestamp: 10.2,
            expression: 'Tatapan Tajam & Yakin',
            description: 'Intensitas emosional puncak prinsip mental juara',
            imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'
          },
          {
            id: 'cover-3',
            timestamp: 15.5,
            expression: 'Senyum Sombong Positif',
            description: 'Ekspresi kebangkitan dan keberhasilan',
            imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop'
          }
        ]
      },
      {
        id: 'clip-densu-2',
        title: 'Rahasia Skincare Murah vs Mahal',
        headlineLevel1: 'JANGAN MAU DIBODOHI! 🤫',
        headlineLevel2: 'KANDUNGAN SKINCARE 100RB VS 1 JUTA SAMA!',
        score: 9.4,
        scoreReason: 'Informasi kontroversial edukatif yang memicu debat di kolom komentar (engagement magnet).',
        viralFactor: 'viral',
        startTime: 1240,
        endTime: 1295,
        duration: 55,
        recommendedRatio: '9:16',
        recommendedLayout: 'split',
        emotionTag: 'Mindblowing',
        words: [
          { word: "Orang", start: 0.0, end: 0.3 },
          { word: "Indonesia", start: 0.3, end: 0.7 },
          { word: "sering", start: 0.7, end: 1.0 },
          { word: "tertipu", start: 1.0, end: 1.4, highlight: true },
          { word: "kemasan", start: 1.4, end: 1.8 },
          { word: "mewah.", start: 1.8, end: 2.3 },
          { word: "Niacinamide", start: 2.5, end: 3.2, highlight: true },
          { word: "itu", start: 3.2, end: 3.4 },
          { word: "bahan", start: 3.4, end: 3.8 },
          { word: "baku-nya", start: 3.8, end: 4.3 },
          { word: "cuma", start: 4.3, end: 4.6 },
          { word: "Rp 15.000", start: 4.6, end: 5.3, highlight: true, punchline: true },
          { word: "per", start: 5.3, end: 5.5 },
          { word: "botol!", start: 5.5, end: 6.2, highlight: true, punchline: true },
          { word: "Lalu", start: 6.4, end: 6.7 },
          { word: "kenapa", start: 6.7, end: 7.0 },
          { word: "dijual", start: 7.0, end: 7.3 },
          { word: "1", start: 7.3, end: 7.6, highlight: true },
          { word: "JUTA?", start: 7.6, end: 8.3, highlight: true },
          { word: "Karena", start: 8.5, end: 8.8 },
          { word: "80%", start: 8.8, end: 9.3, highlight: true },
          { word: "biayanya", start: 9.3, end: 9.7 },
          { word: "buat", start: 9.7, end: 10.0 },
          { word: "endorse", start: 10.0, end: 10.5, highlight: true },
          { word: "artis!", start: 10.5, end: 11.3, highlight: true }
        ],
        keyMetrics: [
          { numberText: "Rp 15.000", label: "HARGA ASLI BAHAN", timestamp: 4.8 },
          { numberText: "80%", label: "BIAYA MARKETING", timestamp: 8.9 }
        ],
        reactiveEmojis: [
          { emoji: "🤫", label: "Rahasia", timestamp: 1.2 },
          { emoji: "🧪", label: "Lab Formula", timestamp: 3.0 },
          { emoji: "💸", label: "Uang Marketing", timestamp: 9.2 }
        ],
        bRollMoments: [
          {
            query: "cosmetic laboratory pipette chemical",
            topic: "Laboratorium Skincare",
            start: 2.8,
            end: 5.0,
            imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop"
          }
        ],
        faceCovers: [
          {
            id: 'cover-2a',
            timestamp: 5.1,
            expression: 'Menunjuk Kamera Tegas',
            description: 'Gerakan tangan membongkar rahasia',
            imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'
          },
          {
            id: 'cover-2b',
            timestamp: 7.8,
            expression: 'Denny Sumargo Kaget',
            description: 'Reaksi host Denny Sumargo melongo',
            imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop'
          }
        ]
      }
    ]
  },
  {
    id: 'raymond-chin-keuangan',
    title: 'CARA GUA BANGUN ASSET 100 MILIAR DI USIA 28 TAHUN (Sistem Tanpa Spekulasi)',
    channel: 'Raymond Chin',
    url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    duration: '48m 15s',
    category: 'Finance & Bisnis',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
    videoPlaceholderUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    speaker1Name: 'Raymond Chin',
    clips: [
      {
        id: 'clip-raymond-1',
        title: 'Aturan 50-30-20 Sudah Usang',
        headlineLevel1: 'STOP PAKAI RUMUS 50-30-20! ❌',
        headlineLevel2: 'INI CARA CEPAT KAYA ANAK MUDA 2026',
        score: 9.6,
        scoreReason: 'Menyerang common belief dengan solusi alternatif yang tajam, target audience Gen Z & Milenial.',
        viralFactor: 'explosive',
        startTime: 180,
        endTime: 232,
        duration: 52,
        recommendedRatio: '9:16',
        recommendedLayout: 'fill',
        emotionTag: 'Rahasia Bisnis',
        words: [
          { word: "Kalau", start: 0.0, end: 0.2 },
          { word: "gaji", start: 0.2, end: 0.5 },
          { word: "kamu", start: 0.5, end: 0.7 },
          { word: "masih", start: 0.7, end: 1.0 },
          { word: "dibawah", start: 1.0, end: 1.3 },
          { word: "Rp 10", start: 1.3, end: 1.7, highlight: true },
          { word: "Juta,", start: 1.7, end: 2.1, highlight: true },
          { word: "lupakan", start: 2.2, end: 2.6, highlight: true },
          { word: "rumus", start: 2.6, end: 2.9 },
          { word: "50-30-20!", start: 2.9, end: 3.7, highlight: true, punchline: true },
          { word: "Kamu", start: 3.9, end: 4.1 },
          { word: "nggak", start: 4.1, end: 4.3 },
          { word: "akan", start: 4.3, end: 4.6 },
          { word: "kaya", start: 4.6, end: 4.9 },
          { word: "dari", start: 4.9, end: 5.2 },
          { word: "hemat", start: 5.2, end: 5.6, highlight: true },
          { word: "kopi", start: 5.6, end: 6.0 },
          { word: "susu.", start: 6.0, end: 6.5 },
          { word: "Fokus-mu", start: 6.8, end: 7.3, highlight: true },
          { word: "CUMA", start: 7.3, end: 7.7, highlight: true, punchline: true },
          { word: "SATU:", start: 7.7, end: 8.2, highlight: true, punchline: true },
          { word: "Naikin", start: 8.3, end: 8.7, highlight: true },
          { word: "SKILL", start: 8.7, end: 9.3, highlight: true },
          { word: "dan", start: 9.3, end: 9.5 },
          { word: "income", start: 9.5, end: 10.0, highlight: true },
          { word: "300%", start: 10.0, end: 10.8, highlight: true, punchline: true },
          { word: "dalam", start: 10.8, end: 11.1 },
          { word: "12", start: 11.1, end: 11.4, highlight: true },
          { word: "bulan!", start: 11.4, end: 12.1, highlight: true }
        ],
        keyMetrics: [
          { numberText: "< Rp 10 JUTA", label: "BATAS GAJI AWAL", timestamp: 1.8 },
          { numberText: "+300%", label: "TARGET INCOME BOOSTER", timestamp: 10.2 }
        ],
        reactiveEmojis: [
          { emoji: "❌", label: "Salah Kaprah", timestamp: 3.2 },
          { emoji: "☕", label: "Kopi Hemat", timestamp: 5.8 },
          { emoji: "🚀", label: "Skill Booster", timestamp: 9.0 },
          { emoji: "💰", label: "Uang Berlipat", timestamp: 10.5 }
        ],
        bRollMoments: [
          {
            query: "stock market crypto graph money",
            topic: "Grafik Finansial Portofolio",
            start: 4.5,
            end: 6.5,
            imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop"
          }
        ],
        faceCovers: [
          {
            id: 'cover-rc1',
            timestamp: 3.5,
            expression: 'Tangan Mengibas Menolak',
            description: 'Gesture menyuruh berhenti buang waktu',
            imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop'
          },
          {
            id: 'cover-rc2',
            timestamp: 8.8,
            expression: 'Fokus Tajam ke Depan',
            description: 'Gaya presentasi investor profesional',
            imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop'
          }
        ]
      }
    ]
  },
  {
    id: 'close-the-door-deddy-sandiaga',
    title: 'MENTERI TURUN TANGAN! BUKA-BUKAAN PAJAK KONTEN KREATOR & REGULASI TIKTOK SHOP',
    channel: 'Deddy Corbuzier',
    url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    duration: '1j 15m',
    category: 'Drama & Wawancara',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    videoPlaceholderUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    speaker1Name: 'Deddy Corbuzier',
    speaker2Name: 'Sandiaga Uno',
    clips: [
      {
        id: 'clip-deddy-1',
        title: 'Kenapa TikTok Shop Wajib Diatur',
        headlineLevel1: 'UMKM MATI GARA-GARA INI? ⚠️',
        headlineLevel2: 'DEDDY SKAKMAT ATURAN IMPOR BARANG',
        score: 9.3,
        scoreReason: 'Perdebatan panas isu regulasi nasional yang mempengaruhi jutaan seller lokal.',
        viralFactor: 'viral',
        startTime: 620,
        endTime: 678,
        duration: 58,
        recommendedRatio: '9:16',
        recommendedLayout: 'split',
        emotionTag: 'Mindblowing',
        words: [
          { word: "Kalau", start: 0.0, end: 0.2 },
          { word: "baju", start: 0.2, end: 0.5 },
          { word: "dari", start: 0.5, end: 0.7 },
          { word: "luar", start: 0.7, end: 0.9 },
          { word: "negeri", start: 0.9, end: 1.3 },
          { word: "masuk", start: 1.3, end: 1.6 },
          { word: "cuma", start: 1.6, end: 1.9 },
          { word: "Rp 5.000", start: 1.9, end: 2.6, highlight: true, punchline: true },
          { word: "per", start: 2.6, end: 2.8 },
          { word: "pcs,", start: 2.8, end: 3.3 },
          { word: "penjahit", start: 3.5, end: 4.0 },
          { word: "di", start: 4.0, end: 4.2 },
          { word: "Tanah", start: 4.2, end: 4.6, highlight: true },
          { word: "Abang", start: 4.6, end: 5.1, highlight: true },
          { word: "bisa", start: 5.1, end: 5.4 },
          { word: "makan", start: 5.4, end: 5.8 },
          { word: "apa,", start: 5.8, end: 6.3 },
          { word: "Bro?!", start: 6.3, end: 7.1, highlight: true, punchline: true }
        ],
        keyMetrics: [
          { numberText: "Rp 5.000", label: "HARGA BARANG IMPOR", timestamp: 2.3 }
        ],
        reactiveEmojis: [
          { emoji: "⚠️", label: "Peringatan", timestamp: 1.5 },
          { emoji: "🧵", label: "Tekstil UMKM", timestamp: 4.3 },
          { emoji: "🔥", label: "Debat Panas", timestamp: 6.5 }
        ],
        bRollMoments: [
          {
            query: "traditional market closed empty shops",
            topic: "Suasana Pasar Tanah Abang Sepi",
            start: 3.5,
            end: 5.5,
            imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop"
          }
        ],
        faceCovers: [
          {
            id: 'cover-dc1',
            timestamp: 6.5,
            expression: 'Deddy Mendebat Tajam',
            description: 'Ekspresi frontal khas podcast Deddy',
            imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'
          }
        ]
      }
    ]
  }
];

export function buildDefaultEditingConfig(clip: Partial<Clip>): Clip['config'] {
  return {
    templateStyle: 'creator-hormozi',
    layoutMode: clip.recommendedLayout || 'fill',
    cutoutBackground: 'mesh-gradient',
    headlineLevel1: clip.headlineLevel1 || 'RAHASIA BESAR TERBONGKAR 😱',
    headlineLevel2: clip.headlineLevel2 || 'JANGAN SAMPAI KAMU NYESEL SEUMUR HIDUP',
    captionKaraoke: true,
    captionColor: 'yellow',
    
    // CapCut Pro Subtitle Settings
    capcutPreset: 'hormozi-gold',
    subtitleAnimation: 'bounce',
    wordsDisplay: '3-4-words',
    subtitleStroke: 'super-3d',
    subtitleFontSize: 'large',
    subtitleUppercase: true,
    subtitleBackgroundBox: 'black-pill',

    showKeyMetricPopin: true,
    showReactiveEmojis: true,
    showBroll: true,
    colorGradePreset: 'cinematic-teal',
    autoMicroZoom: true,
    reactionMediaTitle: 'Berita Hangat / Screenshot Viral Terkait',
    selectedCoverIndex: 0
  };
}

export function createFullClipObject(projectId: string, partial: Partial<Clip>, index: number): Clip {
  const clipId = partial.id || `clip-${projectId}-${index + 1}`;
  const config = buildDefaultEditingConfig(partial);

  return {
    id: clipId,
    projectId,
    title: partial.title || `Segmen Viral #${index + 1}`,
    headlineLevel1: partial.headlineLevel1 || 'VIRAL HOOK PODCAST 🔥',
    headlineLevel2: partial.headlineLevel2 || 'POIN PENTING YANG BIKIN TERKEJUT',
    score: partial.score || 9.2,
    scoreReason: partial.scoreReason || 'Segmen ini memiliki retensi tinggi dengan pembuka kontroversial dan emosi membara.',
    viralFactor: partial.viralFactor || 'viral',
    startTime: partial.startTime || 120,
    endTime: partial.endTime || 180,
    duration: partial.duration || 60,
    recommendedRatio: partial.recommendedRatio || '9:16',
    recommendedLayout: partial.recommendedLayout || 'fill',
    emotionTag: partial.emotionTag || 'Mindblowing',
    words: partial.words || [
      { word: "Ini", start: 0.0, end: 0.3 },
      { word: "rahasia", start: 0.3, end: 0.7, highlight: true },
      { word: "yang", start: 0.7, end: 0.9 },
      { word: "nggak", start: 0.9, end: 1.2 },
      { word: "pernah", start: 1.2, end: 1.5 },
      { word: "dibahas", start: 1.5, end: 2.0 },
      { word: "di", start: 2.0, end: 2.2 },
      { word: "manapun!", start: 2.2, end: 2.9, highlight: true, punchline: true }
    ],
    keyMetrics: partial.keyMetrics || [
      { numberText: "10X LIPAT", label: "POTENSI VIRAL", timestamp: 1.5 }
    ],
    reactiveEmojis: partial.reactiveEmojis || [
      { emoji: "🔥", label: "Fire", timestamp: 1.0 },
      { emoji: "🤯", label: "Mindblown", timestamp: 2.5 }
    ],
    bRollMoments: partial.bRollMoments || [
      {
        query: "successful entrepreneur luxury lifestyle",
        topic: "Visual Kesuksesan",
        start: 1.5,
        end: 3.5,
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop"
      }
    ],
    faceCovers: partial.faceCovers || [
      {
        id: 'cover-default-1',
        timestamp: 1.2,
        expression: 'Fokus & Menggebrak',
        description: 'Momen puncak intonasi suara',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'
      }
    ],
    config,
    renderStatus: 'pending',
    renderProgress: 0,
    renderStage: 'Menunggu antrian...',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    coverUrl: partial.faceCovers?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    shareCopy: `🔥 BONGKAR RAHASIA INI! Baru sadar ternyata selama ini kita salah paham banget. Simak penjelasannya sampai habis!\n\nTag teman kamu yang butuh denger ini! 👇`,
    hashtags: ['#fyp', '#podcastindonesia', '#viralvideo', '#reelsindonesia', '#belajarbisnis', '#mindset']
  };
}

export function createInitialSampleProjects(userId: string): Project[] {
  const p1Clips = POPULAR_INDONESIAN_PODCASTS[0].clips.map((c, idx) => 
    createFullClipObject('proj-sample-densu', c, idx)
  );

  // Set first clip of sample 1 as completed so user can test the Result screen immediately!
  p1Clips[0].renderStatus = 'completed';
  p1Clips[0].renderProgress = 100;
  p1Clips[0].renderStage = 'Siap didownload (1080x1920 Full HD)';

  const p2Clips = POPULAR_INDONESIAN_PODCASTS[1].clips.map((c, idx) => 
    createFullClipObject('proj-sample-raymond', c, idx)
  );

  return [
    {
      id: 'proj-sample-densu',
      userId,
      title: POPULAR_INDONESIAN_PODCASTS[0].title,
      channelName: POPULAR_INDONESIAN_PODCASTS[0].channel,
      youtubeUrl: POPULAR_INDONESIAN_PODCASTS[0].url,
      durationFormatted: POPULAR_INDONESIAN_PODCASTS[0].duration,
      durationSeconds: 6120,
      thumbnailUrl: POPULAR_INDONESIAN_PODCASTS[0].thumbnail,
      status: 'completed',
      processingProgress: 100,
      processingStage: 'Selesai — 5 klip siap diedit & dirender',
      clipCount: p1Clips.length,
      createdAt: Date.now() - 3600000 * 3, // 3 hours ago
      topicCategory: 'Drama & Wawancara',
      clips: p1Clips
    },
    {
      id: 'proj-sample-raymond',
      userId,
      title: POPULAR_INDONESIAN_PODCASTS[1].title,
      channelName: POPULAR_INDONESIAN_PODCASTS[1].channel,
      youtubeUrl: POPULAR_INDONESIAN_PODCASTS[1].url,
      durationFormatted: POPULAR_INDONESIAN_PODCASTS[1].duration,
      durationSeconds: 2895,
      thumbnailUrl: POPULAR_INDONESIAN_PODCASTS[1].thumbnail,
      status: 'ready',
      processingProgress: 100,
      processingStage: 'AI Selesai menganalisis klip viral',
      clipCount: p2Clips.length,
      createdAt: Date.now() - 3600000 * 24, // 1 day ago
      topicCategory: 'Finance & Bisnis',
      clips: p2Clips
    }
  ];
}
