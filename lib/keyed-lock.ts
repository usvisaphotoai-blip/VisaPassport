/**
 * In-process mutex per key. Serializes work on the same entity inside this Node process
 * (e.g. browser verify + order.paid + payment.captured arriving at the same moment), so the
 * later callers see the first one's result instead of racing it.
 */
const tails = new Map<string, Promise<unknown>>();

export async function withKeyedLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const prev = tails.get(key) || Promise.resolve();
  const run = prev.catch(() => {}).then(fn);
  tails.set(key, run);
  try {
    return await run;
  } finally {
    if (tails.get(key) === run) tails.delete(key);
  }
}
