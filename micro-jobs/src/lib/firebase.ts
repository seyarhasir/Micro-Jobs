import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Mock Firebase config for development
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-api-key",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "mock-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "mock-project.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "mock-app-id",
};

// Only initialize Firebase if we have real credentials
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  // Real Firebase initialization
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  // Mock Firebase services for development
  console.log("🔥 Using mock Firebase services for development");

  // Create mock objects that won't cause errors
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: any) => {
      // Immediately call with null user (not logged in)
      callback(null);
      return () => {}; // unsubscribe function
    },
    signInWithEmailAndPassword: async () => {
      throw new Error(
        "Firebase not configured. Please set up Firebase credentials."
      );
    },
    createUserWithEmailAndPassword: async () => {
      throw new Error(
        "Firebase not configured. Please set up Firebase credentials."
      );
    },
    signOut: async () => {
      throw new Error(
        "Firebase not configured. Please set up Firebase credentials."
      );
    },
  };

  db = {
    collection: () => ({
      doc: () => ({
        get: async () => ({ exists: () => false }),
        set: async () => {},
        update: async () => {},
        delete: async () => {},
      }),
    }),
  };

  storage = {
    ref: () => ({
      put: async () => ({ ref: { getDownloadURL: async () => "" } }),
      getDownloadURL: async () => "",
    }),
  };
}

export { auth, db, storage };
export default app;
