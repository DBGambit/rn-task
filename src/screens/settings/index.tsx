import React from 'react';
import { StyleSheet, View, Linking, Platform } from 'react-native';

import { useGlobalContext } from 'src/contexts/global';

import { Layout } from 'src/components/layout';
import { Header } from './header';
import { Button } from 'src/components/button';

import { theme } from 'src/theme';

import {
  REACT_APP_WHATSAPP_NUMBER,
  REACT_APP_WHATSAPP_IOS_LINK,
  REACT_APP_WHATSAPP_ANDROID_LINK,
} from '@env';

const isIos = Platform.OS === 'ios';

export default function Settings() {
  const { clearData } = useGlobalContext();

  const handleWhatsAppPress = async () => {
    try {
      await Linking.openURL(
        `whatsapp://send?phone=${REACT_APP_WHATSAPP_NUMBER}`,
      );
    } catch (e) {
      await Linking.openURL(
        isIos ? REACT_APP_WHATSAPP_IOS_LINK : REACT_APP_WHATSAPP_ANDROID_LINK,
      );
    }
  };

  return (
    <Layout>
      <View style={styles.root}>
        <Header />

        <Button title="Clear Data" color="errorDark" onPress={clearData} />
        <Button
          title="WhatsApp"
          color="successDark"
          onPress={handleWhatsAppPress}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.common.white,
    alignItems: 'center',
    paddingTop: 24,
    flex: 1,
    gap: 32,
  },
});
