import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { useGlobalContext } from 'src/contexts/global';
import { useCommentsContext } from 'src/contexts/comments';
import { globalStorage } from 'src/storage/global';

import { Layout } from 'src/components/layout';
import { Header } from './header';
import { CommentsList } from 'src/components/comments-list';
import { Button } from 'src/components/button';
import Toast from 'react-native-toast-message';

import { theme } from 'src/theme';

export default function Main() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { user } = useGlobalContext();

  const { comments, isLoading, setCreateModalData, getComments } =
    useCommentsContext();

  // show greet toaster D
  useEffect(() => {
    const isShowNewUserGreet = globalStorage.get()?.showNewUserGreet;

    Toast.show({
      text1: 'Hey',
      text2: `Welcome ${!isShowNewUserGreet ? 'Back' : ''} ${user?.username}`,
      type: isShowNewUserGreet ? 'success' : 'info',
    });

    globalStorage.addValue('showNewUserGreet', false);
  }, [user]);

  const handleAddButtonPress = async () => {
    setCreateModalData({ isOpen: true, data: null });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getComments();
    setIsRefreshing(false);
  };

  if (!user) return null;

  return (
    <Layout>
      <View style={styles.root}>
        <Header />

        <CommentsList
          data={comments}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          refresh={handleRefresh}
        />

        <View style={styles.buttonWrapper}>
          <Button title="Add comment" onPress={handleAddButtonPress} />
        </View>
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
  },

  buttonWrapper: {
    paddingBottom: 8,
  },
});
