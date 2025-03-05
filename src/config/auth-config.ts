import {
  AZURE_TENANT_NAME,
  AZURE_CLIENT_ID,
  AZURE_USER_SIGNIN_FLOW,
  AZURE_USER_SIGNUP_FLOW,
} from '@env';

const baseUrl = `https://${AZURE_TENANT_NAME}.b2clogin.com/${AZURE_TENANT_NAME}.onmicrosoft.com`;

export const authConfig = {
  issuer: `${baseUrl}/${AZURE_USER_SIGNIN_FLOW}/v2.0`,
  clientId: AZURE_CLIENT_ID,
  redirectUrl: 'com.sculptedapp.test://oauth/auth',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  serviceConfiguration: {
    authorizationEndpoint: `${baseUrl}/${AZURE_USER_SIGNIN_FLOW}/oauth2/v2.0/authorize`,
    tokenEndpoint: `${baseUrl}/${AZURE_USER_SIGNIN_FLOW}/oauth2/v2.0/token`,
    revocationEndpoint: `${baseUrl}/${AZURE_USER_SIGNIN_FLOW}/oauth2/v2.0/logout`,
  },
  useNonce: false,
  usePKCE: true,
  additionalParameters: {
    prompt: 'login',
    response_mode: 'query',
  },
  dangerouslyAllowInsecureHttpRequests: true,
};

export const signUpConfig = {
  issuer: `${baseUrl}/${AZURE_USER_SIGNUP_FLOW}/v2.0`,
  clientId: AZURE_CLIENT_ID,
  redirectUrl: 'com.sculptedapp.test://oauth/auth',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  serviceConfiguration: {
    authorizationEndpoint: `${baseUrl}/${AZURE_USER_SIGNUP_FLOW}/oauth2/v2.0/authorize`,
    tokenEndpoint: `${baseUrl}/${AZURE_USER_SIGNUP_FLOW}/oauth2/v2.0/token`,
    revocationEndpoint: `${baseUrl}/${AZURE_USER_SIGNUP_FLOW}/oauth2/v2.0/logout`,
  },
  useNonce: false,
  usePKCE: true,
  additionalParameters: {
    prompt: 'login',
    response_mode: 'query',
  },
  dangerouslyAllowInsecureHttpRequests: true,
};
