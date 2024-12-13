import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  AuthError
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { getAuthErrorMessage } from './auth-errors';

// Validate required environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
] as const;

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const createUser = async (email: string, password: string, name: string): Promise<UserData> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await sendEmailVerification(user);

    const userData: Omit<UserData, 'id'> = {
      email: user.email!,
      name,
      role: 'user',
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      id: user.uid,
      ...userData,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create user');
  }
};

export const signIn = async (email: string, password: string): Promise<UserData> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }

    const userData = userDoc.data() as Omit<UserData, 'id'>;
    return {
      id: user.uid,
      ...userData,
      createdAt: userData.createdAt instanceof Date ? userData.createdAt : new Date(userData.createdAt),
      updatedAt: userData.updatedAt instanceof Date ? userData.updatedAt : new Date(userData.updatedAt),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to sign in');
  }
};

export const signInWithGoogle = async (): Promise<UserData> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document if first time sign in
      const userData: Omit<UserData, 'id'> = {
        email: user.email!,
        name: user.displayName || 'User',
        role: 'user',
        emailVerified: user.emailVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        id: user.uid,
        ...userData,
      };
    }

    const userData = userDoc.data() as Omit<UserData, 'id'>;
    return {
      id: user.uid,
      ...userData,
      createdAt: userData.createdAt instanceof Date ? userData.createdAt : new Date(userData.createdAt),
      updatedAt: userData.updatedAt instanceof Date ? userData.updatedAt : new Date(userData.updatedAt),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to sign in with Google');
  }
};

export const resetUserPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to reset password');
  }
};

export const getCurrentUser = async (user: FirebaseUser): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data() as Omit<UserData, 'id'>;
    return {
      id: user.uid,
      ...userData,
      createdAt: userData.createdAt instanceof Date ? userData.createdAt : new Date(userData.createdAt),
      updatedAt: userData.updatedAt instanceof Date ? userData.updatedAt : new Date(userData.updatedAt),
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};