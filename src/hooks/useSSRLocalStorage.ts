export const useSSRLocalStorage = () => {
  const serverStorage: Storage = {
    getItem(key: string): string | null {
      return null;
    },
    setItem(key: string, value: string) {
      return;
    },
    clear() {
      return;
    },
    key(index: number): string | null {
      return null;
    },
    removeItem(key: string) {
      return;
    },
    length: 1,
  };
  return typeof window !== "undefined" ? localStorage : serverStorage;
};
