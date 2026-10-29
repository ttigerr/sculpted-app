export const userMockData = {
  name: 'Nicholas Kratochvil',
  email: 'Nick@sculpted.site',
  gender: null,
  birthday: null,
  profilePictureUrl: '',
}

// Accepted by the local API as a fixed test user when DEV_AUTH_BYPASS=true
// (see sculpted-api src/lib/require-user.ts). Rejected by the deployed API.
export const devAccessToken = 'dev-token';

export const jwtMockData ='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczODIwMTAzMiwiaWF0IjoxNzM4MjAxMDMyfQ.9U-nM4hGS81WtufkxjeORZieZX6vHT2i51EdOuq_oh8' 