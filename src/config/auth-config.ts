import { AZURE_TENANT_NAME, AZURE_CLIENT_ID, AZURE_USER_FLOW } from '@env';

const baseUrl = `https://${AZURE_TENANT_NAME}.b2clogin.com/${AZURE_TENANT_NAME}.onmicrosoft.com`;
const userFlow = `/${AZURE_USER_FLOW}`;

// Define your API scope - this should match what's configured in Azure B2C
const apiScope = `https://${AZURE_TENANT_NAME}.onmicrosoft.com/api`; // Adjust this URL to match your API's scope

export const authConfig = {
  issuer: `${baseUrl}${userFlow}/v2.0`,
  clientId: AZURE_CLIENT_ID,
  redirectUrl: 'com.sculptedapp.test://oauth/auth',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  serviceConfiguration: {
    authorizationEndpoint: `${baseUrl}${userFlow}/oauth2/v2.0/authorize`,
    tokenEndpoint: `${baseUrl}${userFlow}/oauth2/v2.0/token`,
    revocationEndpoint: `${baseUrl}${userFlow}/oauth2/v2.0/logout`,
  },
  useNonce: false,
  usePKCE: true,
  additionalParameters: {
    prompt: 'login',
    response_mode: 'query'
  },
  dangerouslyAllowInsecureHttpRequests: true,
}; 