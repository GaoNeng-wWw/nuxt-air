export const useLock = () => useState<boolean | null>('lock', () => null);
