import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Typography } from '../typography';

import { theme } from 'src/theme';

interface AvatarProps {
  username: string;
  size?: number;
}

export const Avatar = ({ username, size = 32 }: AvatarProps) => {
  return (
    <View
      style={[
        styles.root,
        { width: size, height: size, borderRadius: size / 2 },
      ]}>
      <Typography style={[styles.textUpperCase]} variant="body2">
        {username.slice(0, 2)}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.common.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  textUpperCase: {
    textTransform: 'uppercase',
  },
});
