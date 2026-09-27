import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  Firestore
} from 'firebase/firestore';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { Project, Clip, AppUser } from '../types';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId if provided
export const db: Firestore = getFirestore(app, firebaseConfigJson.firestoreDatabaseId || '(default)');

// Initialize Auth
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { onAuthStateChanged };

// Auth helper methods
export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function loginAsGuest(): Promise<User> {
  const result = await signInAnonymously(auth);
  return result.user;
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// Local storage fallback key
const LOCAL_STORAGE_PROJECTS_KEY = 'clip_studio_projects_cache';

export function getLocalCachedProjects(): Project[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not read from local storage:', err);
    return [];
  }
}

export function saveLocalCachedProjects(projects: Project[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  } catch (err) {
    console.warn('Could not save to local storage:', err);
  }
}

// Firestore Project Operations
export async function saveProjectToFirestore(project: Project): Promise<void> {
  try {
    const projectRef = doc(db, 'projects', project.id);
    await setDoc(projectRef, project, { merge: true });
  } catch (err) {
    console.warn('Firestore write warning (saving locally as fallback):', err);
  }

  // Update local cache as well
  const current = getLocalCachedProjects();
  const index = current.findIndex(p => p.id === project.id);
  let updated: Project[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = project;
  } else {
    updated = [project, ...current];
  }
  saveLocalCachedProjects(updated);
}

export async function deleteProjectFromFirestore(projectId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'projects', projectId));
  } catch (err) {
    console.warn('Firestore delete error:', err);
  }

  const current = getLocalCachedProjects();
  saveLocalCachedProjects(current.filter(p => p.id !== projectId));
}

export async function fetchUserProjects(userId: string): Promise<Project[]> {
  try {
    const q = query(
      collection(db, 'projects'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    const projects: Project[] = [];
    snap.forEach((d) => projects.push(d.data() as Project));
    if (projects.length > 0) {
      saveLocalCachedProjects(projects);
      return projects;
    }
  } catch (err) {
    console.warn('Firestore fetch fallback:', err);
  }
  return getLocalCachedProjects();
}

export function subscribeToUserProjects(
  userId: string,
  onUpdate: (projects: Project[]) => void
): () => void {
  try {
    const q = query(
      collection(db, 'projects'),
      where('userId', '==', userId)
    );
    return onSnapshot(
      q,
      (snapshot) => {
        const projects: Project[] = [];
        snapshot.forEach((d) => projects.push(d.data() as Project));
        // Sort descending by createdAt
        projects.sort((a, b) => b.createdAt - a.createdAt);
        saveLocalCachedProjects(projects);
        onUpdate(projects);
      },
      (err) => {
        console.warn('Snapshot listener error, using cache:', err);
        onUpdate(getLocalCachedProjects());
      }
    );
  } catch (err) {
    console.warn('Failed to attach snapshot listener:', err);
    onUpdate(getLocalCachedProjects());
    return () => {};
  }
}
