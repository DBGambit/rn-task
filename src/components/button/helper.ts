import { theme } from 'src/theme';

import { ButtonColor, ButtonColorType, ButtonVariant } from '.';

export const getButtonColorConfig = (
  variant: ButtonVariant,
  color: ButtonColor,
  colorType: ButtonColorType,
) => {
  const isDimmed = color === 'dimmed';
  const isDark = colorType === 'dark';

  switch (variant) {
    case 'outlined':
      return {
        buttonStyle: {
          backgroundColor: theme.colors.common.white,
          borderColor: theme.colors.button[color],
          borderWidth: 1,
        },
        textStyle: {
          color: isDimmed
            ? theme.colors.common.black
            : theme.colors.button[color],
        },
      };
    case 'contained':
      return {
        buttonStyle: {
          backgroundColor: theme.colors.button[color],
          borderWidth: 0,
        },
        textStyle: {
          color: isDimmed
            ? theme.colors.common.black
            : theme.colors.common.white,
        },
      };
    case 'minimal':
      return {
        buttonStyle: {
          backgroundColor:
            isDark && isDimmed
              ? theme.buttonColor[colorType][color]
              : isDark
              ? theme.colors.button[color]
              : 'transparent',
          borderWidth: 0,
        },
        textStyle: {
          color:
            color === 'primaryDark'
              ? theme.colors.primaryMain
              : isDimmed
              ? theme.colors.common.black
              : theme.colors.button[color],
        },
      };
  }
};
