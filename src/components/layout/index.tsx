import React, { FC, PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewProps,
  StyleProp,
  Dimensions,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from 'src/theme';

interface SafeAreaWrapperProps {
  style?: StyleProp<ViewProps>;
  fullBottomSize?: boolean;
}

const SafeAreaWrapper = ({
  children,
  style = {},
  fullBottomSize = false,
}: PropsWithChildren<SafeAreaWrapperProps>) => {
  const { bottom } = useSafeAreaInsets();

  const { height } = Dimensions.get('window');

  return (
    <SafeAreaView
      style={[
        styles.root,
        styles.extraPadding,
        style,
        fullBottomSize && { height: height + bottom },
      ]}>
      {children}
    </SafeAreaView>
  );
};

const BaseWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <View style={[styles.root]}>{children}</View>;
};

export const Layout = ({
  children,
  noSafeArea,
  customStyles = {},
  fullBottomSize = false,
}: PropsWithChildren & {
  noSafeArea?: boolean;
  customStyles?: StyleProp<ViewProps>;
  fullBottomSize?: boolean;
}) => {
  const Wrapper = noSafeArea ? BaseWrapper : SafeAreaWrapper;

  return (
    <Wrapper style={customStyles} fullBottomSize={fullBottomSize}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.common.white,
    width: '100%',
    height: '100%',
    paddingBottom: 0,
  },
  extraPadding: {
    paddingTop: StatusBar.currentHeight,
  },
});
