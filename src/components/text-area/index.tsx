import React, { useState, useRef, useEffect } from 'react';
import { TextInput, StyleSheet, TextInputProps, Pressable } from 'react-native';

import { Typography } from '../typography';

import { theme } from 'src/theme';

interface TextAreaProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorPosition?: 'absolute' | 'relative';
}

export const TextArea = ({
  label = ' ',
  error = '',
  leftIcon,
  rightIcon,
  editable = true,
  errorPosition = 'absolute',
  ...props
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const onFocus = () => {
    setIsFocused(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <Pressable
      onPress={onFocus}
      style={[
        styles.root,

        isFocused && {
          borderColor: theme.colors.primaryMain,
        },

        !!error && {
          borderColor: theme.colors.input.error.border,
        },
      ]}>
      <TextInput
        style={[styles.inputTextStyle]}
        ref={inputRef}
        multiline
        onFocus={onFocus}
        onBlur={onBlur}
        cursorColor={theme.colors.cursorColor}
        autoCorrect={false}
        spellCheck={false}
        editable={editable}
        {...props}
      />

      {!!error && errorPosition === 'absolute' && (
        <Typography variant="helperText" style={[styles.errorTextStyle]}>
          {error}
        </Typography>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    paddingBottom: 8,
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: theme.colors.common.separator,
    height: 216,
    paddingTop: 2,
  },

  inputTextStyle: {
    fontFamily: 'Mardoto-Regular',
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

  errorTextStyle: {
    position: 'absolute',
    bottom: -24,
    color: theme.colors.text.negative,
    height: 'auto',
    fontSize: 10,
  },
});
