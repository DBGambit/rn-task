import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from 'react-native';

import { Loading } from '../loading';

import { getButtonColorConfig } from './helper';

import { theme } from 'src/theme';

export type ButtonVariant = 'outlined' | 'contained' | 'minimal';
export type ButtonColor =
  | 'primary'
  | 'primaryDark'
  | 'secondary'
  | 'secondaryDark'
  | 'secondaryMain'
  | 'error'
  | 'errorDark'
  | 'warning'
  | 'warningDark'
  | 'info'
  | 'infoDark'
  | 'success'
  | 'successDark'
  | 'dimmed'
  | 'dimmedDark'
  | 'appointmentOnline';

export type ButtonColorType = 'dark' | 'standard';

interface ButtonProps extends TouchableOpacityProps {
  size?: 'small' | 'medium' | 'large';
  variant?: ButtonVariant;
  color?: ButtonColor;
  title: ReactNode;
  colorType?: ButtonColorType;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
  withShadow?: boolean;
}

export const Button = ({
  title,
  size = 'medium',
  color = 'primary',
  variant = 'contained',
  colorType = 'standard' as ButtonColorType,
  iconLeft,
  iconRight,
  withShadow = false,
  ...props
}: ButtonProps) => {
  const buttonColorConfig = getButtonColorConfig(variant, color, colorType);

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.root,
        buttonColorConfig.buttonStyle,
        styles[size],
        props.disabled && styles.disabled,
        props.style,
      ]}>
      {iconLeft && iconLeft}

      {props.isLoading && <Loading size="small" />}

      <Text
        style={[
          styles[`${size}Text`],
          buttonColorConfig.textStyle,
          props.disabled && styles.disabledText,
        ]}>
        {title}
      </Text>

      {iconRight && iconRight}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  fullWidth: {
    width: '100%',
  },
  large: {
    paddingHorizontal: 22,
    height: 48,
  },
  medium: {
    paddingHorizontal: 16,
    height: 44,
  },
  small: {
    paddingHorizontal: 10,
    height: 32,
  },

  largeText: {
    fontSize: 15,
    lineHeight: 26,
    fontFamily: 'Mardoto-Bold',
  },
  mediumText: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Mardoto-Bold',
  },
  smallText: {
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.2,
    fontFamily: 'Mardoto-Bold',
  },
  disabledText: {
    color: theme.colors.common.white,
  },
  disabled: {
    backgroundColor: theme.colors.neutral,
  },
  spinner: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
