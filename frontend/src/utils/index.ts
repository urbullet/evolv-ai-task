export const getLocalStorageValue = <T, >(key: string, defaultValue: T): T => {
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            return JSON.parse(stored) as T;
        } catch {
            return defaultValue;
        }
    }
    return defaultValue;
};
