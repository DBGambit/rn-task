/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { GlobalProvider } from 'src/contexts/global';
import { CommentsProvider } from 'src/contexts/comments';

import { CreateComment } from 'src/components/modals/create-comment';

import AppStack from 'src/navigation/stacks/app-stack';
import { Toast } from 'src/components/toast';

export default function App() {
  return (
    <GestureHandlerRootView>
      <GlobalProvider>
        <NavigationContainer>
          <CommentsProvider>
            <AppStack />
            <Toast />
            <CreateComment />
          </CommentsProvider>
        </NavigationContainer>
      </GlobalProvider>
    </GestureHandlerRootView>
  );
}
