import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { theme } from 'src/theme';

export const defaultScreenOptions = {
  headerShown: true,
  gestureEnabled: false,
  headerBackButtonMenuEnabled: true,
  screenOrientation: 'portrait',
  headerStyle: {
    backgroundColor: theme.colors.common.white,
  },

  headerShadowVisible: true,
  headerBackTitleVisible: true,
  headerTitleAlign: 'center',
} as NativeStackNavigationOptions;
