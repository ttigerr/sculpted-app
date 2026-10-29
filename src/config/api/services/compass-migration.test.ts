import { uploadLocalCompassOnce } from './compass-migration';
import { compassService } from './compass-service';

const store: Record<string, string> = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async (key: string) => store[key] ?? null),
  removeItem: jest.fn(async (key: string) => { delete store[key]; }),
}));

jest.mock('./compass-service', () => ({
  compassService: { getUserCompass: jest.fn(), postCompass: jest.fn() },
}));

const getUserCompass = compassService.getUserCompass as jest.Mock;
const postCompass = compassService.postCompass as jest.Mock;

const entry = (creationDate: string, score = 5) => ({
  id: 123,
  creationDate,
  virtue1: 'Courage', virtue1Score: score, virtue1Note: '',
  virtue2: 'Wisdom', virtue2Score: score,
  virtue3: 'Justice', virtue3Score: score,
  overallScore: 50,
});

beforeEach(() => {
  for (const key of Object.keys(store)) delete store[key];
  jest.clearAllMocks();
  getUserCompass.mockResolvedValue([]);
  postCompass.mockResolvedValue({});
});

it('does nothing when the phone has no compass data', async () => {
  await uploadLocalCompassOnce();
  expect(getUserCompass).not.toHaveBeenCalled();
  expect(postCompass).not.toHaveBeenCalled();
});

it('uploads local entries and then removes the phone copy', async () => {
  store.compass = JSON.stringify([entry('2026-10-01'), entry('2026-10-02')]);

  await uploadLocalCompassOnce();

  expect(getUserCompass).toHaveBeenCalledWith('2026-10-01');
  expect(postCompass).toHaveBeenCalledTimes(2);
  expect(postCompass.mock.calls[0][0]).not.toHaveProperty('id', 123);
  expect(postCompass.mock.calls[0][0].virtue1Note).toBeUndefined();
  expect(store.compass).toBeUndefined();
});

it('reads the older { compass: [...] } format', async () => {
  store.compass = JSON.stringify({ compass: [entry('2026-10-01')] });
  await uploadLocalCompassOnce();
  expect(postCompass).toHaveBeenCalledTimes(1);
});

it('never overwrites a day the server already has', async () => {
  store.compass = JSON.stringify([entry('2026-10-01', 2), entry('2026-10-02', 3)]);
  getUserCompass.mockResolvedValue([entry('2026-10-01', 9)]);

  await uploadLocalCompassOnce();

  expect(postCompass).toHaveBeenCalledTimes(1);
  expect(postCompass.mock.calls[0][0].creationDate).toBe('2026-10-02');
  expect(store.compass).toBeUndefined();
});

it('keeps the phone copy when any upload fails, so it retries later', async () => {
  store.compass = JSON.stringify([entry('2026-10-01'), entry('2026-10-02')]);
  postCompass.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('offline'));

  await uploadLocalCompassOnce();

  expect(store.compass).toBeDefined();
});

it('keeps the phone copy when the server cannot be reached', async () => {
  store.compass = JSON.stringify([entry('2026-10-01')]);
  getUserCompass.mockRejectedValue(new Error('offline'));

  await uploadLocalCompassOnce();

  expect(postCompass).not.toHaveBeenCalled();
  expect(store.compass).toBeDefined();
});

it('clamps out-of-range scores and drops unusable entries', async () => {
  store.compass = JSON.stringify([
    { ...entry('2026-10-01'), virtue1Score: 14, virtue2Score: -3 },
    { ...entry('2026-10-02'), virtue3: '' },
    { ...entry('not-a-date') },
  ]);

  await uploadLocalCompassOnce();

  expect(postCompass).toHaveBeenCalledTimes(1);
  expect(postCompass.mock.calls[0][0]).toMatchObject({ virtue1Score: 10, virtue2Score: 0 });
});

it('runs only once when called at the same time', async () => {
  store.compass = JSON.stringify([entry('2026-10-01')]);
  await Promise.all([uploadLocalCompassOnce(), uploadLocalCompassOnce()]);
  expect(postCompass).toHaveBeenCalledTimes(1);
});
