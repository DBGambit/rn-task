import React, { memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Animated from 'react-native-reanimated';
import { RefreshControl } from '../refresh-control';
import { Loading } from '../loading';
import { CommentItem } from './list-item';

import { theme } from 'src/theme';
import { CommentData } from 'src/database/sq-lite-service';

interface CommentsListProps {
  data: CommentData[];
  isLoading: boolean;
  isRefreshing: boolean;
  refresh: () => void;
}

export const CommentsList = memo(
  ({ data, isLoading, isRefreshing, refresh }: CommentsListProps) => {
    return (
      <ScrollView
        style={styles.root}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        alwaysBounceHorizontal={false}>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderItem={({ item: commentData }) => {
            return <CommentItem data={commentData} />;
          }}
          keyExtractor={item => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
          }
          refreshing={isRefreshing}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        {isLoading && !isRefreshing && <Loading coverView size="large" />}
      </ScrollView>
    );
  },
);

CommentsList.displayName = 'CommentsList';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  contentContainer: {
    paddingBottom: 32,
    paddingTop: 16,
    paddingHorizontal: 8,
    gap: 32,
  },

  separator: {
    height: 1,
    marginTop: 32,
    backgroundColor: theme.colors.actionActive,
  },
});
