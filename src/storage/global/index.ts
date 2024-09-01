import { GlobalStorageData } from './types';
import { createStorage } from '..';

const v = 1;
const KEY = `global@${v}`;

export const globalStorage = createStorage<GlobalStorageData>(KEY);
