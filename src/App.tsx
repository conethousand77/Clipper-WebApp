import React, { useState, useEffect } from 'react';
import { 
  Project, 
  Clip, 
  AppUser, 
  ClipEditingConfig 
} from './types';
import { 
  auth, 
  onAuthStateChanged, 
  logoutUser, 
  saveProjectToFirestore, 
  deleteProjectFromFirestore,
  fetchUserProjects,
  subscribeToUserProjects,
  getLocalCachedProjects,
  saveLocalCachedProjects
} from './lib/firebase';
import { 
  POPULAR_INDONESIAN_PODCASTS, 
  YouTubePreset, 
  createInitialSampleProjects,
  createFullClipObject
} from './lib/sampleData';
import { Navbar } from './components/Navbar';
import { DashboardScreen } from './components/DashboardScreen';
import { NewProjectScreen } from './components/NewProjectScreen';
import { ClipReviewScreen } from './components/ClipReviewScreen';
import { EditingSetupScreen } from './components/EditingSetupScreen';
import { RenderStatusScreen } from './components/RenderStatusScreen';
import { ResultScreen } from './components/ResultScreen';
import { AuthModal } from './components/AuthModal';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'new-project' | 'clip-review' | 'editing-setup' | 'render-status' | 'result'>('dashboard');

  // User State
  const [user, setUser] = useState<AppUser | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Projects & Active Data
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [selectedClipIds, setSelectedClipIds] = useState<string[]>([]);
  const [currentResultClipId, setCurrentResultClipId] = useState<string | undefined>(undefined);

  // Processing New Project State
  const [isProcessingNewProject, setIsProcessingNewProject] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);

  // Listen to Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const appUser: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          isAnonymous: firebaseUser.isAnonymous
        };
        setUser(appUser);
      } else {
        // Auto default to guest or local user for seamless testing
        setUser({
          uid: 'clipper-guest',
          email: null,
          displayName: 'Guest Clipper',
          photoURL: null,
          isAnonymous: true
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync projects from Firestore or Local Cache
  useEffect(() => {
    if (!user) return;

    // Load initial cached projects or seed if totally empty
    const cached = getLocalCachedProjects();
    if (cached && cached.length > 0) {
      setProjects(cached);
      if (!activeProjectId) {
        setActiveProjectId(cached[0].id);
      }
    } else {
      // Seed default projects
      const initial = createInitialSampleProjects(user.uid);
      setProjects(initial);
      saveLocalCachedProjects(initial);
      setActiveProjectId(initial[0].id);
    }

    // Attach real-time Firestore listener
    const unsubscribe = subscribeToUserProjects(user.uid, (updatedProjects) => {
      if (updatedProjects && updatedProjects.length > 0) {
        setProjects(updatedProjects);
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  // Current active project
  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0] || null;

  // Sync selected clip IDs when project changes
  useEffect(() => {
    if (activeProject?.clips && activeProject.clips.length > 0) {
      // Select all clips by default if not set
      setSelectedClipIds(prev => {
        const valid = prev.filter(id => activeProject.clips?.some(c => c.id === id));
        return valid.length > 0 ? valid : activeProject.clips!.map(c => c.id);
      });
    }
  }, [activeProjectId]);

  // Gather rendering clips & completed clips
  const allRenderingClips: Clip[] = [];
  const allCompletedClips: Clip[] = [];
  projects.forEach(p => {
    p.clips?.forEach(c => {
      if (c.renderStatus === 'rendering') allRenderingClips.push(c);
      if (c.renderStatus === 'completed') allCompletedClips.push(c);
    });
  });

  // Selected Clip Objects for editing
  const selectedClips = (activeProject?.clips || []).filter(c => selectedClipIds.includes(c.id));

  // Handler: Start Video Processing (New Project)
  const handleStartProcessing = async (params: {
    youtubeUrl: string;
    topicCategory: 'Finance & Bisnis' | 'Motivasi & Mindset' | 'Drama & Wawancara' | 'Edukasi & Tech' | 'Umum';
    targetDuration: 'short' | 'medium' | 'standard';
    selectedPreset?: YouTubePreset;
  }) => {
    setIsProcessingNewProject(true);
    setProcessingProgress(15);
    setProcessingStage('Menghubungkan ke YouTube stream & ekstraksi audio...');

    const newProjectId = `proj-${Date.now()}`;

    try {
      // Step 1: Simulate extraction
      await new Promise(r => setTimeout(r, 600));
      setProcessingProgress(35);
      setProcessingStage('Speech-to-text transkripsi otomatis dengan timestamp per kata...');

      // Step 2: Call server-side endpoint with Gemini API
      await new Promise(r => setTimeout(r, 800));
      setProcessingProgress(65);
      setProcessingStage('Gemini 3.8 Flash AI membaca transkrip & mencari 5 segmen paling viral...');

      let finalClips: Clip[] = [];
      let videoTitle = params.selectedPreset?.title || 'Diskusi Podcast Menarik';
      let channelName = params.selectedPreset?.channel || 'YouTube Podcast';
      let durationFormatted = params.selectedPreset?.duration || '48m 15s';
      let thumbnailUrl = params.selectedPreset?.thumbnail || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop';

      try {
        const response = await fetch('/api/analyze-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            youtubeUrl: params.youtubeUrl,
            topicCategory: params.topicCategory,
            projectId: newProjectId
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.clips && data.clips.length > 0) {
            finalClips = data.clips;
            if (data.title) videoTitle = data.title;
            if (data.channel) channelName = data.channel;
            if (data.duration) durationFormatted = data.duration;
          }
        }
      } catch (apiErr) {
        console.warn('API call fallback:', apiErr);
      }

      // If no clips returned from API, fallback to preset or smart templates
      if (finalClips.length === 0) {
        if (params.selectedPreset) {
          finalClips = params.selectedPreset.clips.map((c, i) => 
            createFullClipObject(newProjectId, c, i)
          );
        } else {
          // Generate generic high-virality clips
          finalClips = POPULAR_INDONESIAN_PODCASTS[0].clips.map((c, i) => 
            createFullClipObject(newProjectId, c, i)
          );
        }
      }

      setProcessingProgress(90);
      setProcessingStage('Menganalisis layout rasio 9:16 & facial expression frames...');
      await new Promise(r => setTimeout(r, 600));

      setProcessingProgress(100);
      setProcessingStage('Selesai! Klip siap direview.');

      const newProject: Project = {
        id: newProjectId,
        userId: user?.uid || 'clipper-guest',
        title: videoTitle,
        channelName: channelName,
        youtubeUrl: params.youtubeUrl,
        durationFormatted: durationFormatted,
        durationSeconds: 2890,
        thumbnailUrl: thumbnailUrl,
        status: 'ready',
        processingProgress: 100,
        processingStage: 'Siap direview',
        clipCount: finalClips.length,
        createdAt: Date.now(),
        topicCategory: params.topicCategory,
        clips: finalClips
      };

      // Save to state & Firestore
      const updatedList = [newProject, ...projects];
      setProjects(updatedList);
      setActiveProjectId(newProjectId);
      setSelectedClipIds(finalClips.map(c => c.id));
      await saveProjectToFirestore(newProject);

      setIsProcessingNewProject(false);
      setCurrentTab('clip-review');

    } catch (err) {
      console.error('Processing error:', err);
      setIsProcessingNewProject(false);
      alert('Terjadi kesalahan saat memproses video. Silakan coba lagi.');
    }
  };

  // Handler: Toggle Clip Selection
  const handleToggleClipSelection = (clipId: string) => {
    setSelectedClipIds(prev => 
      prev.includes(clipId) ? prev.filter(id => id !== clipId) : [...prev, clipId]
    );
  };

  const handleSelectAllClips = () => {
    if (activeProject?.clips) {
      setSelectedClipIds(activeProject.clips.map(c => c.id));
    }
  };

  const handleDeselectAllClips = () => {
    setSelectedClipIds([]);
  };

  // Handler: Update Clip Editing Configuration
  const handleUpdateClipConfig = (clipId: string, updatedConfig: Partial<ClipEditingConfig>) => {
    if (!activeProject) return;

    const updatedClips = (activeProject.clips || []).map(clip => {
      if (clip.id === clipId) {
        return {
          ...clip,
          config: {
            ...clip.config,
            ...updatedConfig
          }
        };
      }
      return clip;
    });

    const updatedProject = { ...activeProject, clips: updatedClips };
    updateProjectInStateAndStore(updatedProject);
  };

  // Handler: Apply Config to All Selected Clips
  const handleApplyConfigToAll = (templateConfig: ClipEditingConfig) => {
    if (!activeProject) return;

    const updatedClips = (activeProject.clips || []).map(clip => {
      if (selectedClipIds.includes(clip.id)) {
        return {
          ...clip,
          config: {
            ...clip.config,
            templateStyle: templateConfig.templateStyle,
            layoutMode: templateConfig.layoutMode,
            cutoutBackground: templateConfig.cutoutBackground,
            captionKaraoke: templateConfig.captionKaraoke,
            captionColor: templateConfig.captionColor,
            showKeyMetricPopin: templateConfig.showKeyMetricPopin,
            showReactiveEmojis: templateConfig.showReactiveEmojis,
            showBroll: templateConfig.showBroll,
            colorGradePreset: templateConfig.colorGradePreset,
            autoMicroZoom: templateConfig.autoMicroZoom
          }
        };
      }
      return clip;
    });

    const updatedProject = { ...activeProject, clips: updatedClips };
    updateProjectInStateAndStore(updatedProject);
  };

  // Helper to persist project updates
  const updateProjectInStateAndStore = (updatedProj: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProj.id ? updatedProj : p));
    saveProjectToFirestore(updatedProj);
  };

  // Handler: Start Cloud Background Render for Selected Clips
  const handleStartRender = (clipIds: string[]) => {
    if (!activeProject) return;

    // Set clips to rendering status
    const updatedClips = (activeProject.clips || []).map(c => {
      if (clipIds.includes(c.id)) {
        return {
          ...c,
          renderStatus: 'rendering' as const,
          renderProgress: 10,
          renderStage: 'Memulai cloud worker: Speech alignment & tracking...'
        };
      }
      return c;
    });

    const updatedProject: Project = {
      ...activeProject,
      status: 'rendering',
      clips: updatedClips
    };

    updateProjectInStateAndStore(updatedProject);
    setCurrentTab('render-status');

    // Simulate Cloud Background Worker step-by-step
    simulateCloudRendering(activeProject.id, clipIds);
  };

  // Background Cloud Rendering Engine Simulator
  const simulateCloudRendering = (projectId: string, clipIds: string[]) => {
    const stages = [
      { progress: 25, stage: 'Tracking wajah & cropping 9:16 vertikal...' },
      { progress: 50, stage: 'Sinkronisasi subtitle karaoke & warna highlight...' },
      { progress: 75, stage: 'Compositing B-roll visual & pop-in statistik...' },
      { progress: 95, stage: 'Encoding akhir MP4 1080x1920 60FPS...' },
      { progress: 100, stage: 'Selesai — Siap didownload Full HD' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= stages.length) {
        clearInterval(interval);
      }

      setProjects(currentProjects => {
        const proj = currentProjects.find(p => p.id === projectId);
        if (!proj || !proj.clips) return currentProjects;

        const stageInfo = stages[Math.min(currentStep, stages.length - 1)];
        const isDone = currentStep >= stages.length - 1;

        const updatedClips = proj.clips.map(c => {
          if (clipIds.includes(c.id)) {
            return {
              ...c,
              renderProgress: stageInfo.progress,
              renderStage: stageInfo.stage,
              renderStatus: (isDone ? 'completed' : 'rendering') as any,
              videoUrl: isDone ? (c.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4') : c.videoUrl
            };
          }
          return c;
        });

        const hasRemainingRendering = updatedClips.some(c => c.renderStatus === 'rendering');

        const updatedProj: Project = {
          ...proj,
          status: hasRemainingRendering ? 'rendering' : 'completed',
          clips: updatedClips
        };

        saveProjectToFirestore(updatedProj);

        return currentProjects.map(p => p.id === projectId ? updatedProj : p);
      });
    }, 1800); // Progress updates smoothly every ~1.8 seconds in background
  };

  // Handler: Delete Project
  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Yakin ingin menghapus project ini beserta seluruh klipnya?')) return;
    await deleteProjectFromFirestore(projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (activeProjectId === projectId) {
      const remaining = projects.filter(p => p.id !== projectId);
      setActiveProjectId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Handler: Load Sample Podcast
  const handleLoadSample = async () => {
    const sample = createInitialSampleProjects(user?.uid || 'clipper-guest');
    setProjects(sample);
    saveLocalCachedProjects(sample);
    setActiveProjectId(sample[0].id);
    setSelectedClipIds((sample[0].clips || []).map(c => c.id));
    setCurrentTab('clip-review');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={async () => {
          await logoutUser();
          setUser(null);
        }}
        hasActiveProject={!!activeProject}
        hasSelectedClips={selectedClips.length > 0}
        renderingCount={allRenderingClips.length}
      />

      {/* Main Screen Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {currentTab === 'dashboard' && (
          <DashboardScreen
            projects={projects}
            onSelectProject={(p) => {
              setActiveProjectId(p.id);
              setCurrentTab('clip-review');
            }}
            onNewProject={() => setCurrentTab('new-project')}
            onDeleteProject={handleDeleteProject}
            onLoadSample={handleLoadSample}
            onDirectToResult={(p) => {
              setActiveProjectId(p.id);
              const completedClip = p.clips?.find(c => c.renderStatus === 'completed');
              if (completedClip) setCurrentResultClipId(completedClip.id);
              setCurrentTab('result');
            }}
          />
        )}

        {currentTab === 'new-project' && (
          <NewProjectScreen
            onStartProcessing={handleStartProcessing}
            isProcessing={isProcessingNewProject}
            processingStage={processingStage}
            processingProgress={processingProgress}
          />
        )}

        {currentTab === 'clip-review' && activeProject && (
          <ClipReviewScreen
            project={activeProject}
            selectedClipIds={selectedClipIds}
            onToggleClipSelection={handleToggleClipSelection}
            onSelectAllClips={handleSelectAllClips}
            onDeselectAllClips={handleDeselectAllClips}
            onProceedToEditing={(singleClip) => {
              if (singleClip) {
                setSelectedClipIds([singleClip.id]);
              }
              setCurrentTab('editing-setup');
            }}
            onBackToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'editing-setup' && (
          <EditingSetupScreen
            selectedClips={selectedClips}
            onUpdateClipConfig={handleUpdateClipConfig}
            onApplyConfigToAll={handleApplyConfigToAll}
            onStartRender={handleStartRender}
            onBackToReview={() => setCurrentTab('clip-review')}
          />
        )}

        {currentTab === 'render-status' && (
          <RenderStatusScreen
            renderingClips={allRenderingClips}
            allCompletedClips={allCompletedClips}
            onViewResults={(clip) => {
              setCurrentResultClipId(clip.id);
              setCurrentTab('result');
            }}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'result' && (
          <ResultScreen
            completedClips={allCompletedClips}
            currentClipId={currentResultClipId}
            onSelectClip={(c) => setCurrentResultClipId(c.id)}
            onBackToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
      />

    </div>
  );
}
