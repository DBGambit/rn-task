import React from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import OriginalToast, { BaseToastProps } from 'react-native-toast-message';

import { hexToRGBA } from 'src/utils/hexToRGBA';
import { TOASTER_VISIBILITY_TIME } from 'src/constants';
import { Typography } from '../typography';

import { theme } from 'src/theme';
import CloseIcon from 'src/assets/icons/close.svg';

const { width } = Dimensions.get('window');

const toastConfig = {
  successToast: ({ ...props }: BaseToastProps) => {
    return (
      <View style={[styles.root, styles.success]}>
        <Typography variant="subtitle2">{props.text1}</Typography>
        <Typography
          numberOfLines={3}
          variant="toastMessage"
          color={theme.colors.text.secondary}>
          {props.text2}
        </Typography>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => OriginalToast.hide()}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
    );
  },

  errorToast: ({ ...props }: BaseToastProps) => {
    return (
      <View style={[styles.root, styles.error]}>
        <Typography variant="subtitle2">{props.text1}</Typography>
        <Typography
          numberOfLines={3}
          variant="toastMessage"
          color={theme.colors.text.secondary}>
          {props.text2}
        </Typography>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => OriginalToast.hide()}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
    );
  },

  infoToast: ({ ...props }: BaseToastProps) => {
    return (
      <View style={[styles.root, styles.info]}>
        <Typography variant="subtitle2">{props.text1}</Typography>
        <Typography
          numberOfLines={3}
          variant="toastMessage"
          color={theme.colors.text.secondary}>
          {props.text2}
        </Typography>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => OriginalToast.hide()}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
    );
  },

  warningToast: ({ ...props }: BaseToastProps) => {
    return (
      <View style={[styles.root, styles.warning]}>
        <Typography variant="subtitle2">{props.text1}</Typography>
        <Typography
          numberOfLines={3}
          variant="toastMessage"
          color={theme.colors.text.secondary}>
          {props.text2}
        </Typography>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => OriginalToast.hide()}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
    );
  },
};

export const Toast = ({ ...props }: BaseToastProps) => {
  return (
    <OriginalToast
      autoHide
      visibilityTime={TOASTER_VISIBILITY_TIME}
      topOffset={90}
      config={toastConfig}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 90,
    width: width - 32,
    backgroundColor: theme.colors.common.white,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 6,
    gap: 2,
    paddingVertical: 16,
    paddingHorizontal: 24,

    shadowColor: hexToRGBA('#000000', 0.4),
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 22,
    elevation: 10,
  },

  success: {
    borderLeftColor: theme.colors.successMain,
  },

  error: {
    borderLeftColor: theme.colors.errorMain,
  },

  info: {
    borderLeftColor: theme.colors.primaryMain,
  },

  warning: {
    borderLeftColor: theme.colors.carrotMain,
  },

  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
