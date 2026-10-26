import * as Keychain from 'react-native-keychain';

// Keychain service names: separate entries let us delete just the access token
// without clobbering the refresh token (and vice versa).
const ACCESS_SERVICE = 'sculpted.auth.accessToken';
const REFRESH_SERVICE = 'sculpted.auth.refreshToken';

export async function setAccessToken(token: string): Promise<void> {
  await Keychain.setGenericPassword('access', token, { service: ACCESS_SERVICE });
}

export async function getAccessToken(): Promise<string | null> {
  const result = await Keychain.getGenericPassword({ service: ACCESS_SERVICE });
  return result ? result.password : null;
}

export async function setRefreshToken(token: string): Promise<void> {
  await Keychain.setGenericPassword('refresh', token, { service: REFRESH_SERVICE });
}

export async function getRefreshToken(): Promise<string | null> {
  const result = await Keychain.getGenericPassword({ service: REFRESH_SERVICE });
  return result ? result.password : null;
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    Keychain.resetGenericPassword({ service: ACCESS_SERVICE }),
    Keychain.resetGenericPassword({ service: REFRESH_SERVICE }),
  ]);
}

export async function setTokens(accessToken: string, refreshToken?: string | null): Promise<void> {
  await setAccessToken(accessToken);
  if (refreshToken) await setRefreshToken(refreshToken);
}
