import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';

import { addUser } from 'src/database/sq-lite-service';
import { useGlobalContext } from 'src/contexts/global';
import { EMAIL_PATTERN } from 'src/constants';

import { Layout } from 'src/components/layout';
import { Button } from 'src/components/button';
import { Typography } from 'src/components/typography';
import { TextField } from 'src/components/text-field';
import { Loading } from 'src/components/loading';

import { theme } from 'src/theme';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useGlobalContext();

  const handleChangeEmail = (value: string) => {
    if (emailError) {
      setEmailError('');
    }
    setEmail(value);
  };
  const handleChangeUserName = (value: string) => {
    setUserName(value);
  };

  const handleContinue = async () => {
    if (!EMAIL_PATTERN.test(email)) {
      setEmailError('Invalid email');
      return;
    }

    try {
      setLoading(true);
      const user = await addUser(email, userName);
      login(user);
    } catch (e) {
      console.log('ADD USER ERROR', e);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !email || !userName || Boolean(emailError);

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.availableSize}>
        <View style={styles.root}>
          {loading && <Loading size="large" coverView />}

          <Typography variant="h3">Log In</Typography>

          <View style={styles.form}>
            <TextField
              label="Email"
              value={email}
              error={emailError}
              onChangeText={handleChangeEmail}
            />
            <TextField
              label="User Name"
              value={userName}
              onChangeText={handleChangeUserName}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            size="large"
            title="Continue"
            disabled={isButtonDisabled}
            onPress={handleContinue}
          />
        </View>
      </KeyboardAvoidingView>
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

  form: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 48,
  },

  buttonWrapper: {
    width: '100%',
    paddingBottom: 16,
    paddingHorizontal: 24,
    gap: 16,
  },
  availableSize: {
    flex: 1,
  },
});
