import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

import { Typography } from '../typography';

import { theme } from 'src/theme';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorPosition?: 'absolute' | 'relative';
}

export const TextField = ({
  label = 'Label',
  error = '',
  leftIcon,
  rightIcon,
  editable = true,
  errorPosition = 'absolute',
  ...props
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const rIsFocused = useSharedValue(false);

  const isStatic = !editable;

  const rLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(rIsFocused.value || props.value ? -44 : -10),
        },
      ],
      fontSize: withTiming(rIsFocused.value || props.value ? 13 : 16),
      lineHeight: withTiming(rIsFocused.value || props.value ? 16 : 24),
      letterSpacing: withTiming(rIsFocused.value || props.value ? -0.04 : 0.2),
      paddingHorizontal: withTiming(rIsFocused.value || props.value ? 6 : 0),
      bottom: 8,
    };
  });

  const onFocus = () => {
    rIsFocused.value = true;
    setIsFocused(true);
  };

  const onBlur = () => {
    rIsFocused.value = false;
    setIsFocused(false);
  };

  useEffect(() => {
    if (props.value) {
      rIsFocused.value = true;
      setIsFocused(true);
    }
  }, []);

  return (
    <>
      <Animated.View
        style={[
          styles.subContainer,
          !isFocused && {
            backgroundColor: theme.colors.common.white,
          },
          !!error && {
            borderColor: theme.colors.input.error.border,
          },
          !!leftIcon && {
            paddingLeft: 32,
          },
          !!rightIcon && {
            paddingRight: 32,
          },
        ]}>
        <Animated.Text
          style={[
            rLabelStyle,
            styles.labelTextStyle,
            isStatic && styles.labelStatic,
            (isFocused || props.value) && { backgroundColor: 'white' },
            { left: 12 },
          ]}>
          {label}
        </Animated.Text>
        {!!leftIcon && <View style={styles.leftIconWrapper}>{leftIcon}</View>}

        <TextInput
          style={[styles.inputTextStyle]}
          onBlur={onBlur}
          onFocus={onFocus}
          cursorColor={theme.colors.cursorColor}
          autoCorrect={false}
          spellCheck={false}
          editable={editable}
          {...props}></TextInput>

        {!!rightIcon && (
          <View style={styles.rightIconWrapper}>{rightIcon}</View>
        )}
        {!!error && errorPosition === 'absolute' && (
          <Typography
            variant="body2"
            style={[styles.errorTextStyle, !!leftIcon && { paddingLeft: 22 }]}>
            {error}
          </Typography>
        )}
      </Animated.View>
      {!!error && errorPosition === 'relative' && (
        <Typography
          variant="body2"
          style={[
            styles.errorTextDynamicStyle,
            !!leftIcon && { paddingLeft: 22 },
          ]}>
          {error}
        </Typography>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    position: 'relative',
    paddingTop: 18,
    paddingBottom: 16,
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: theme.colors.common.separator,
  },
  labelTextStyle: {
    position: 'absolute',
    fontFamily: 'Mardoto-Medium',
    color: theme.colors.text.secondary,
  },
  inputTextStyle: {
    fontFamily: 'Mardoto-Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
    paddingVertical: 0,
    color: theme.colors.text.main,
    paddingHorizontal: 0,
    minHeight: 24,
  },
  inputRtlMode: {
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  leftIconWrapper: {
    position: 'absolute',
    left: 4,
    bottom: 8,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconWrapper: {
    position: 'absolute',
    right: 4,
    bottom: 20,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTextStyle: {
    position: 'absolute',
    top: 64,
    left: 12,
    color: theme.colors.text.negative,
    height: 'auto',
  },
  errorTextDynamicStyle: {
    color: theme.colors.text.negative,
    height: 'auto',
    marginLeft: 12,
    marginTop: -12,
  },
  labelStatic: {
    position: 'absolute',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.04,
    transform: [{ translateY: -32 }],
  },
});
