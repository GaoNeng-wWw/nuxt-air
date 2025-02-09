export class ExpierError extends Error {
  constructor(key: string) {
    super(`Expire Error: ${key} expired`);
  }
}

export interface ExpirableItem<T> {
  __value: T;
  __expireAt: number;
}

export function useExpireLocalStorage<T>() {
  const setItem = (key: string, value: T, ttl: number = -1) => {
    localStorage.setItem(key, JSON.stringify({
      __value: value,
      __expireAt: Date.now() + ttl,
    }));
  };
  const hasItem = (key: string) => {
    return localStorage.getItem(key) !== null;
  };
  const itemExpire = (key: string) => {
    if (!hasItem(key)) {
      return true;
    }
    const val: T & ExpirableItem<T> = JSON.parse(localStorage.getItem(key) ?? '');
    if (!val || typeof val !== 'object' || Array.isArray(val)) {
      return true;
    }
    return val.__expireAt && val.__expireAt < Date.now();
  };
  const removeItem = (key: string) => {
    return localStorage.removeItem(key);
  };
  const getItem = (key: string, throwErrorIfExpired = false) => {
    if (!hasItem(key)) {
      return null;
    }
    const value: ExpirableItem<T> = JSON.parse(localStorage.getItem(key) ?? '');
    if (!value) {
      return null;
    }
    if (value.__expireAt < Date.now()) {
      removeItem(key);
      if (throwErrorIfExpired) {
        throw new ExpierError(key);
      }
    }
    return value.__value;
  };
  return { setItem, removeItem, getItem, hasItem, itemExpire };
}
