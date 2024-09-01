import React from 'react';
import {
  DefaultNavigatorOptions,
  ParamListBase,
  RouteConfig,
  StackNavigationState,
} from '@react-navigation/native';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

// unauthorized screens
import Auth from 'src/screens/auth';

// authorized screens
import Main from 'src/screens/main';
import Settings from 'src/screens/settings';

import { useGlobalContext } from 'src/contexts/global';
import { defaultScreenOptions } from '../utils';

type StackNavigatorOptions<ParamList extends ParamListBase> =
  DefaultNavigatorOptions<
    ParamList,
    StackNavigationState<ParamList>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap
  >;

export type StackRoutesType<ParamList extends ParamListBase> = Array<
  RouteConfig<
    ParamList,
    keyof ParamList,
    StackNavigationState<ParamList>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap
  >
>;

export type AppStackParamList = {
  Auth: undefined;
  Main: undefined;
  Settings: undefined;
} & ParamListBase;

export type AppStackRoutesType = StackRoutesType<AppStackParamList>;

export const appStackNavigatorProps: Omit<
  StackNavigatorOptions<AppStackParamList>,
  'children'
> = {
  initialRouteName: 'Main' as keyof AppStackParamList,
  screenOptions: defaultScreenOptions,
};

const commonScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
};

const unauthorizedRoutes: AppStackRoutesType = [
  {
    name: 'Auth',
    component: Auth,
    options: commonScreenOptions,
  },
];

const authorizedRoutes: AppStackRoutesType = [
  {
    name: 'Main',
    component: Main,
    options: commonScreenOptions,
  },
  {
    name: 'Settings',
    component: Settings,
    options: commonScreenOptions,
  },
];

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  const { user } = useGlobalContext();

  const isAuth = Boolean(user);

  return (
    <Stack.Navigator {...appStackNavigatorProps}>
      {(isAuth ? authorizedRoutes : unauthorizedRoutes).map(config => (
        <Stack.Screen key={config.name} {...config} />
      ))}
    </Stack.Navigator>
  );
}
