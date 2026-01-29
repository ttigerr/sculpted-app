import { userMockData, jwtMockData} from "src/consts/mock-data";

export const loginMockApiCall = async (): Promise<object> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: jwtMockData,
        user: userMockData
      });
    }, 2000);
  });
};

export const resendOtpMockApiCall = async (): Promise<object> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: jwtMockData,
        user: {
          ...userMockData,
        },
      });
    }, 2000);
  });
};
