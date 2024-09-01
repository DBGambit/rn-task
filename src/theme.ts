import { hexToRGBA } from 'src/utils/hexToRGBA';

const fontVariants = {
  thin: 'Mardoto-Light',
  extralight: 'Mardoto-Light',
  light: 'Mardoto-Light',
  regular: 'Mardoto-Regular',
  medium: 'Mardoto-Medium',
  semibold: 'Mardoto-Medium',
  bold: 'Mardoto-Bold',
  extrabold: 'Mardoto-Black',
  black: 'Mardoto-Black',
} as const;

const baseTypographyVariants = {
  h3: {
    fontFamily: fontVariants.medium,
    fontSize: 36,
    lineHeight: 43,
  },
  h6: {
    fontFamily: fontVariants.semibold,
    fontSize: 18,
    lineHeight: 22,
  },
  subtitle1: {
    fontFamily: fontVariants.medium,
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: -0.2,
  },
  subtitle2: {
    fontFamily: fontVariants.medium,
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: -0.1,
  },
  body1: {
    fontFamily: fontVariants.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.05,
  },
  body2: {
    fontFamily: fontVariants.regular,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.04,
  },
  button: {
    fontFamily: fontVariants.regular,
    fontSize: 12,
    letterSpacing: 1,
  },
  buttonMedium: {
    fontFamily: fontVariants.semibold,
    fontSize: 14,
    lineHeight: 24,
  },
  buttonLarge: {
    fontFamily: fontVariants.semibold,
    fontSize: 15,
    lineHeight: 23,
  },
  buttonSmall: {
    fontFamily: fontVariants.medium,
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.2,
  },

  helperText: {
    fontFamily: fontVariants.regular,
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.4,
  },
  inputText: {
    fontFamily: fontVariants.medium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  inputLabel: {
    fontFamily: fontVariants.medium,
    fontSize: 11,
    lineHeight: 12,
    letterSpacing: 0.15,
  },

  title: {
    fontFamily: fontVariants.medium,
    fontSize: 18,
    lineHeight: 21,
  },
  toastMessage: {
    fontFamily: fontVariants.regular,
    fontSize: 14,
    lineHeight: 21,
  },
};

const typographyVariants = {
  h3: baseTypographyVariants.h3,
  'h3-bold': {
    ...baseTypographyVariants.h3,
    fontFamily: fontVariants.bold,
  },
  'h3-light': {
    ...baseTypographyVariants.h3,
    fontFamily: fontVariants.light,
  },
  h6: baseTypographyVariants.h6,
  'h6-bold': {
    ...baseTypographyVariants.h6,
    fontFamily: fontVariants.semibold,
  },
  subtitle1: baseTypographyVariants.subtitle1,
  'subtitle1-bold': {
    ...baseTypographyVariants.subtitle1,
    fontFamily: fontVariants.semibold,
  },
  subtitle2: baseTypographyVariants.subtitle2,
  'subtitle2-bold': {
    ...baseTypographyVariants.subtitle2,
    fontFamily: fontVariants.semibold,
  },
  body1: baseTypographyVariants.body1,
  'body1-bold': {
    ...baseTypographyVariants.body1,
    fontFamily: fontVariants.semibold,
  },
  body2: baseTypographyVariants.body2,
  'body2-bold': {
    ...baseTypographyVariants.body2,
    fontFamily: fontVariants.semibold,
  },

  helperText: baseTypographyVariants.helperText,
  'helperText-bold': {
    ...baseTypographyVariants.helperText,
    fontFamily: fontVariants.semibold,
  },
  inputText: baseTypographyVariants.inputText,
  'inputText-bold': {
    ...baseTypographyVariants.inputText,
    fontFamily: fontVariants.semibold,
  },
  inputLabel: {
    ...baseTypographyVariants.inputLabel,
  },

  button: baseTypographyVariants.button,
  'button-bold': {
    ...baseTypographyVariants.button,
    fontFamily: fontVariants.semibold,
  },
  buttonLarge: baseTypographyVariants.buttonLarge,
  buttonMedium: baseTypographyVariants.buttonMedium,
  buttonSmall: baseTypographyVariants.buttonSmall,
  toastMessage: baseTypographyVariants.toastMessage,

  // bare font variants
  black: {
    fontFamily: fontVariants.black,
  },
  extraBold: {
    fontFamily: fontVariants.extrabold,
  },
  bold: {
    fontFamily: fontVariants.bold,
  },
  semibold: {
    fontFamily: fontVariants.semibold,
  },
  medium: {
    fontFamily: fontVariants.medium,
  },
  regular: {
    fontFamily: fontVariants.regular,
  },
  light: {
    fontFamily: fontVariants.light,
  },
  extraLight: {
    fontFamily: fontVariants.extralight,
  },
  thin: {
    fontFamily: fontVariants.thin,
  },
};

// Colors
const colors = {
  common: {
    black: '#111927',
    white: '#FFFFFF',
    separator: hexToRGBA('#181C29', 0.08),
    fullBlack: '#000000',
  },
  cursorColor: '#445CFC',

  neutral: '#D2D6DB',
  primaryMain: '#355FE8',
  primaryDark: '#1640CA',
  secondaryMain: '#6C737F',

  errorText: '#D10000',

  successMain: '#13AE5C',
  successDark: '#03772A',

  errorMain: '#EF4135',
  errorDark: '#C4190D',

  actionActive: '#6C737F',

  carrotMain: '#FF7F50',

  text: {
    main: '#111927',
    secondary: '#6C737F',
    negative: '#FF5757',
  },

  button: {
    primary: '#355FE8',
    primaryDark: '#006666',
    secondary: '#384250',
    secondaryDark: '#1C2536',
    secondaryMain: '#343434',

    warning: '#F79009',
    warningDark: '#B54708',
    info: '#06AED4',
    infoDark: '#0E7090',
    success: '#13AE5C',
    successLight: '#E6F7EC',
    successDark: '#03772A',
    dimmed: '#F5F5F5',
    dimmedDark: '#E0E0E0',
    disabled: hexToRGBA('#111927', 0.12),
    appointmentOnline: '#36CBC8',

    turquoiseMain: '#2EC8C5',
    turquoiseDark: '#089B98',
    turquoiseLight: '#EBFAF9',

    carrotMain: '#FF7F50',
    carrotDark: '#D04B1A',
    carrotLight: '#FFF2ED',

    error: '#EF4135',
    errorDark: '#C4190D',
    errorLight: '#FDECEB',
  },

  input: {
    inactive: {
      border: hexToRGBA('#181C29', 0.08),
    },
    active: {
      border: '#445CFC',
    },
    error: {
      border: '#F51845',
    },
  },
};

export const theme = {
  colors,
  buttonColor: {
    standard: {
      primary: '#6366F1',
      secondary: '#384250',
      error: '#F04438',
      warning: '#F79009',
      info: '#06AED4',
      success: '#15B79E',
      dimmed: '#F5F5F5',
    },
    dark: {
      primary: '#4338CA',
      secondary: '#1C2536',
      error: '#B42318',
      warning: '#B54708',
      info: '#0E7090',
      success: '#107569',
      dimmed: '#E0E0E0',
    },
  },

  boxShadow: {
    shadowColor: hexToRGBA('#000000', 0.4),
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },

  typography: typographyVariants,
  screen: {
    paddingX: 16,
    paddingY: 16,
  },
};

export type TypographyVariants = keyof typeof theme.typography;
