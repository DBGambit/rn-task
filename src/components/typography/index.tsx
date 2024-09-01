import React, { PropsWithChildren } from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';

import { theme, TypographyVariants } from '../../theme';

interface TypographyProps extends PropsWithChildren, TextProps {
  variant?: TypographyVariants;
  customStyles?: TextStyle;
  color?: string;
}

export const Typography = ({
  customStyles,
  color,
  variant = 'regular',
  style = {},
  ...props
}: TypographyProps) => {
  return (
    <Text
      {...props}
      style={[
        styles.root,
        theme.typography[variant] as TextStyle,
        !!color && { color },
        customStyles && customStyles,
        style,
      ]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    color: theme.colors.text.main,
  },
});
