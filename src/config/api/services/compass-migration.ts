import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Compass } from 'src/models/compass/compass';
import { compassService } from './compass-service';

// Before the API existed, compass entries were stored only on the phone
// under this key. This moves them to the API once, then removes them.
const LOCAL_KEY = 'compass';

let inFlight: Promise<void> | null = null;

const clampScore = (value: unknown): number => {
    const n = Math.round(Number(value));
    return Number.isFinite(n) ? Math.min(10, Math.max(0, n)) : 0;
};

const optionalNote = (value: unknown): string | undefined =>
    typeof value === 'string' && value.length > 0 ? value : undefined;

// Old builds wrote either an array or { compass: [...] }. Entries the API
// would reject (no date, missing virtue names) are dropped.
function parseLocalEntries(raw: string): Compass[] {
    let json: unknown;
    try {
        json = JSON.parse(raw);
    } catch {
        return [];
    }
    const list: any[] = Array.isArray(json) ? json : (json as any)?.compass ?? [];
    if (!Array.isArray(list)) return [];

    return list.flatMap(item => {
        const date = moment(item?.creationDate, ['YYYY-MM-DD', moment.ISO_8601], true);
        if (!date.isValid() || !item.virtue1 || !item.virtue2 || !item.virtue3) return [];
        return [{
            creationDate: date.format('YYYY-MM-DD'),
            virtue1: String(item.virtue1),
            virtue1Score: clampScore(item.virtue1Score),
            virtue1Note: optionalNote(item.virtue1Note),
            virtue2: String(item.virtue2),
            virtue2Score: clampScore(item.virtue2Score),
            virtue2Note: optionalNote(item.virtue2Note),
            virtue3: String(item.virtue3),
            virtue3Score: clampScore(item.virtue3Score),
            virtue3Note: optionalNote(item.virtue3Note),
            overallScore: 0, // computed by the server
        }];
    });
}

async function migrate(): Promise<void> {
    const raw = await AsyncStorage.getItem(LOCAL_KEY);
    if (!raw) return;

    const local = parseLocalEntries(raw);
    if (local.length === 0) {
        await AsyncStorage.removeItem(LOCAL_KEY);
        return;
    }

    // One entry per day; if the phone has duplicates, keep the last one.
    const byDate = new Map(local.map(e => [e.creationDate, e]));
    const earliest = [...byDate.keys()].sort()[0];

    // POST overwrites, so skip days the server already has.
    const existing = await compassService.getUserCompass(earliest);
    const serverDates = new Set(existing.map(e => e.creationDate));
    const toUpload = [...byDate.values()].filter(e => !serverDates.has(e.creationDate));

    const results = await Promise.allSettled(toUpload.map(e => compassService.postCompass(e)));

    // Keep the phone copy until everything is on the server, so a failed
    // upload is retried next time instead of lost.
    if (results.every(r => r.status === 'fulfilled')) {
        await AsyncStorage.removeItem(LOCAL_KEY);
    }
}

// Safe to call often: does nothing once the phone copy is gone, and
// concurrent calls share one run.
export function uploadLocalCompassOnce(): Promise<void> {
    if (!inFlight) {
        inFlight = migrate()
            .catch(error => console.log('Compass migration will retry later:', error))
            .finally(() => { inFlight = null; });
    }
    return inFlight;
}
