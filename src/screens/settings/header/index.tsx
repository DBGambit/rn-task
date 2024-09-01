import React from 'react';
import { View, StyleSheet } from 'react-native';

import { HeaderBackButton } from 'src/components/header-back-button';
import { Typography } from 'src/components/typography';

export const Header = () => {
  return (
    <View style={styles.root}>
      <HeaderBackButton />
      <View style={styles.titleWrapper}>
        <Typography variant="h6">Settings</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 52,
    gap: 8,
  },

  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 48,
  },
});
