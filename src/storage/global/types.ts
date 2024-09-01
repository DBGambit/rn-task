import { UserData } from 'src/contexts/global';

export interface GlobalStorageData {
  user: UserData | null;
  showNewUserGreet?: boolean;
}
