import { del } from "./http-service";

/* permanently delete the signed-in user's account and all their data on the server */
async function deleteAccount(): Promise<void> {
    await del('me');
};

export const userService = {
    deleteAccount
};
