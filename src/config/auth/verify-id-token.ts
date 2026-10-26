import { AZURE_TENANT_NAME, AZURE_CLIENT_ID } from '@env';
import { jwtDecode } from 'jwt-decode';

export type IdTokenClaims = {
  sub: string;
  iss: string;
  aud: string | string[];
  exp: number;
  iat?: number;
  nonce?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  emails?: string[];
};

// Signature verification is delegated to react-native-app-auth (which validates
// the token response against the configured endpoint). This helper adds the
// claim checks that a mobile client is still responsible for: expiry, issuer,
// and audience. If any check fails we reject the token before trusting its
// payload to populate Redux.
export function verifyIdToken(idToken: string): IdTokenClaims {
  let claims: IdTokenClaims;
  try {
    claims = jwtDecode<IdTokenClaims>(idToken);
  } catch {
    throw new Error('ID token is malformed');
  }

  const now = Math.floor(Date.now() / 1000);
  if (!claims.exp || claims.exp < now) {
    throw new Error('ID token is expired');
  }

  const expectedIssuerPrefix = `https://${AZURE_TENANT_NAME}.b2clogin.com/`;
  if (!claims.iss?.startsWith(expectedIssuerPrefix)) {
    throw new Error('ID token issuer is not trusted');
  }

  const aud = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!aud.includes(AZURE_CLIENT_ID)) {
    throw new Error('ID token audience does not match client');
  }

  return claims;
}
