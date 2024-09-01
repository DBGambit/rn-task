import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from 'react-native';

import { theme } from 'src/theme';

interface LoadingProps extends ActivityIndicatorProps {
  coverView?: boolean;
}

export const Loading = ({ coverView = true, ...props }: LoadingProps) => {
  return (
    <ActivityIndicator
      {...props}
      style={coverView && styles.root}
      color={theme.colors.primaryMain}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
