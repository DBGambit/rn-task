export interface AppStorage<T> {
  get: () => T | null;
  set: (data: T) => void;
  addValue: (propertyName: keyof T, data: any) => void;
  removeValue: (propertyName: keyof T) => void;
  delete: () => void;
  exists: () => boolean;
}
