import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { theme } from 'src/theme';
import BackIcon from 'src/assets/icons/arrow-left.svg';

export const HeaderBackButton = (props: TouchableOpacityProps) => {
  const navigation = useNavigation();

  const handlePress = (e: GestureResponderEvent) => {
    if (props.onPress) {
      props.onPress(e);
      return;
    }

    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <BackIcon style={styles.backIcon} />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  backIcon: {
    color: theme.colors.actionActive,
  },
});
