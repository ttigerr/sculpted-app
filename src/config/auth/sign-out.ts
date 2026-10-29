import AsyncStorage from '@react-native-async-storage/async-storage';
import { store, persistor } from 'src/store/store';
import { logout } from 'src/store/slices/auth/authSlice';
import { clearTokens } from 'src/config/storage/token-storage';

// Phone-stored data that belongs to the signed-in user. Cleared on sign-out
// so the next person to sign in on this phone doesn't inherit it.
// Add new keys here whenever a feature starts saving per-user data locally.
const USER_DATA_KEYS = [
    'compass', // pre-API compass entries (see compass-migration.ts)
    'journalReminder',
];

// Signs out on this phone only. Everything saved to the API stays there and
// comes back on the next sign-in.
export async function signOut(): Promise<void> {
    // Run every step even if one fails, so a single error can't leave
    // tokens or data behind.
    const results = await Promise.allSettled([
        clearTokens(),
        AsyncStorage.multiRemove(USER_DATA_KEYS),
    ]);
    store.dispatch(logout());
    // Write the cleared profile to disk now, not on redux-persist's next tick.
    await persistor.flush();

    const failed = results.find(r => r.status === 'rejected');
    if (failed) console.log('Sign-out cleanup error:', (failed as PromiseRejectedResult).reason);
}
