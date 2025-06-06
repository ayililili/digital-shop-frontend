import type { BackendUser } from './AuthContext';

const requiredEnvVars = ['VITE_API_BASE_URL'] as const;
for (const key of requiredEnvVars) {
  if (!import.meta.env[key]) {
    throw new Error(`Missing API environment variable: ${key}`);
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { auth?: boolean; retry?: boolean } = {},
): Promise<T> {
  const { auth, retry = true, ...init } = options;
  const headers = new Headers(init.headers);
  if (auth && accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  init.headers = headers;
  init.credentials = 'include';

  const resp = await fetch(`${API_BASE_URL}${path}`, init);

  if (resp.status === 401 && retry && auth) {
    await refreshAccessToken();
    return apiFetch(path, { ...options, retry: false });
  }

  if (!resp.ok) {
    throw new Error(`Request failed with status ${resp.status}`);
  }

  return resp.json();
}

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem('access_token', token);
  } else {
    localStorage.removeItem('access_token');
  }
}

export function getStoredAccessToken() {
  return localStorage.getItem('access_token');
}

export async function loginWithGoogle(idToken: string): Promise<BackendUser> {
  const data = await apiFetch<{ data: { access_token: string; user: BackendUser } }>(
    '/auth/google-login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_token: idToken }),
    },
  );
  setAccessToken(data.data.access_token);
  return data.data.user;
}

export async function refreshAccessToken(): Promise<BackendUser> {
  const data = await apiFetch<{ data: { access_token: string; user: BackendUser } }>(
    '/auth/refresh-token',
    { method: 'POST' },
  );
  setAccessToken(data.data.access_token);
  return data.data.user;
}
