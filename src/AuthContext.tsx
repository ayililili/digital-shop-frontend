import { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider } from './firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import {
  getStoredAccessToken,
  loginWithGoogle,
  refreshAccessToken,
  setAccessToken,
} from './api';

export interface BackendUser {
  email: string;
  [key: string]: unknown;
}

interface AuthContextValue {
  user: FirebaseUser | null;
  backendUser: BackendUser | null;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  fetchWithAuth: (
    input: RequestInfo | URL,
    init?: RequestInit & { retry?: boolean },
  ) => Promise<Response>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [accessToken, setTokenState] = useState<string | null>(
    getStoredAccessToken(),
  );

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    return onAuthStateChanged(auth, (current) => {
      setUser(current);
    });
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const userData = await loginWithGoogle(idToken);
      setBackendUser(userData);
      setTokenState(getStoredAccessToken());
    } catch (err) {
      await logout();
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setBackendUser(null);
    setTokenState(null);
    setAccessToken(null);
  };

  const fetchWithAuth: AuthContextValue['fetchWithAuth'] = async (
    input,
    init = {},
  ) => {
    const headers = new Headers(init.headers);
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    init.headers = headers;
    init.credentials = 'include';
    const resp = await fetch(input, init);
    if (resp.status === 401 && init.retry !== false) {
      await refreshAccessToken();
      setTokenState(getStoredAccessToken());
      return fetchWithAuth(input, { ...init, retry: false });
    }
    return resp;
  };

  const value: AuthContextValue = {
    user,
    backendUser,
    accessToken,
    login,
    logout,
    fetchWithAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
