import { MMKV } from 'react-native-mmkv';
import { AppStorage } from 'src/storage/types';

export const storage = new MMKV();

export const createStorage = <T>(key: string): AppStorage<T> => {
  return {
    set: (data: T): void => {
      storage.set(key, JSON.stringify(data));
    },
    get: (): T | null => {
      const string = storage.getString(key);
      return string ? JSON.parse(string) : null;
    },
    addValue: (propertyName: keyof T, data: any): void => {
      const savedChunkString = storage.getString(key);
      const savedChunkData = savedChunkString
        ? JSON.parse(savedChunkString)
        : {};
      savedChunkData[propertyName] = data;
      storage.set(key, JSON.stringify(savedChunkData));
    },
    removeValue: (propertyName: keyof T): void => {
      const savedChunkString = storage.getString(key);
      const savedChunkData = savedChunkString
        ? JSON.parse(savedChunkString)
        : {};
      delete savedChunkData[propertyName];
      storage.set(key, JSON.stringify(savedChunkData));
    },
    delete: (): void => {
      storage.delete(key);
    },
    exists: () => {
      return storage.contains(key);
    },
  };
};
