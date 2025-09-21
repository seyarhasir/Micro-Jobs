"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: "employer" | "worker"
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              name: userData.name,
              avatar: userData.avatar,
              phone: userData.phone,
              role: userData.role,
              createdAt: userData.createdAt?.toDate() || new Date(),
              updatedAt: userData.updatedAt?.toDate() || new Date(),
            });
          }
        } catch (error) {
          console.log("Mock Firebase: No user data available");
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.message.includes("Firebase not configured")) {
        throw new Error(
          "Authentication is not available in demo mode. Please set up Firebase to enable login."
        );
      }
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: "employer" | "worker"
  ) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(firebaseUser, { displayName: name });

      // Create user document in Firestore
      const userData = {
        name,
        email,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, "users", firebaseUser.uid), userData);
    } catch (error: any) {
      if (error.message.includes("Firebase not configured")) {
        throw new Error(
          "Registration is not available in demo mode. Please set up Firebase to enable registration."
        );
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      if (error.message.includes("Firebase not configured")) {
        // Mock logout - just clear the user state
        setUser(null);
        setFirebaseUser(null);
      } else {
        throw error;
      }
    }
  };

  const value = {
    user,
    firebaseUser,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
