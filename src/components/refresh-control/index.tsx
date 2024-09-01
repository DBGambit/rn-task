import React from 'react';
import { RefreshControlProps } from 'react-native';

import { RefreshControl as OriginalRefreshControlGesture } from 'react-native-gesture-handler';

import { theme } from 'src/theme';

export const RefreshControl = (props: RefreshControlProps) => {
  return (
    <OriginalRefreshControlGesture
      tintColor={theme.colors.primaryMain}
      colors={[theme.colors.primaryMain]}
      {...props}
    />
  );
};
