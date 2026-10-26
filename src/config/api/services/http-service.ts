import { BACKEND_BASE_URL } from '@env';
import { refresh } from 'react-native-app-auth';
import { authConfig } from 'src/config/auth-config';
import { store } from 'src/store/store';
import { logout, setSessionExpired, setToken } from 'src/store/slices/auth/authSlice';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from 'src/config/storage/token-storage';

export const API_CONFIG = {
  BASE_URL: BACKEND_BASE_URL,
};

const DEFAULT_TIMEOUT_MS = 15_000;

export class HttpError extends Error {
  readonly status: number;
  readonly body: unknown;
  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
};

async function parseErrorBody(response: Response): Promise<{ message: string; body: unknown }> {
  const text = await response.text().catch(() => '');
  if (!text) return { message: `HTTP ${response.status}`, body: null };
  try {
    const parsed = JSON.parse(text);
    return { message: parsed?.message || `HTTP ${response.status}`, body: parsed };
  } catch {
    return { message: text || `HTTP ${response.status}`, body: text };
  }
}

// Chained promise so concurrent requests share a single refresh attempt
// rather than racing to swap the access token.
let refreshInFlight: Promise<string | null> | null = null;

async function tryRefreshToken(): Promise<string | null> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) return null;
      try {
        const result = await refresh(authConfig, { refreshToken });
        await setTokens(result.accessToken, result.refreshToken ?? refreshToken);
        store.dispatch(setToken(result.accessToken));
        return result.accessToken;
      } catch {
        return null;
      }
    })();
  }
  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

async function handleUnauthorized(): Promise<void> {
  await clearTokens();
  store.dispatch(setSessionExpired(true));
  store.dispatch(logout());
}

async function request<T>(url: string, options: RequestOptions): Promise<T> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  if (options.signal) {
    options.signal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  const send = async (): Promise<Response> => {
    const token = await getAccessToken();
    return fetch(`${API_CONFIG.BASE_URL}/${url}`, {
      method: options.method,
      headers: {
        accept: 'application/json',
        ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });
  };

  try {
    let response = await send();

    if (response.status === 401) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        response = await send();
      } else {
        await handleUnauthorized();
        const { message, body } = await parseErrorBody(response);
        throw new HttpError(401, message, body);
      }
    }

    if (!response.ok) {
      const { message, body } = await parseErrorBody(response);
      throw new HttpError(response.status, message, body);
    }

    if (response.status === 204) return undefined as T;
    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function get<T>(url: string, options: { signal?: AbortSignal; timeoutMs?: number } = {}): Promise<T> {
  return request<T>(url, { method: 'GET', ...options });
}

export function post<T>(url: string, body: unknown, options: { signal?: AbortSignal; timeoutMs?: number } = {}): Promise<T> {
  return request<T>(url, { method: 'POST', body, ...options });
}
