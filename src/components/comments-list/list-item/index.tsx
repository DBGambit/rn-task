import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { CommentData } from 'src/database/sq-lite-service';
import { useCommentsContext } from 'src/contexts/comments';
import { formatDate } from 'src/utils/format-date';

import Animated from 'react-native-reanimated';
import { Typography } from 'src/components/typography';
import { Button } from 'src/components/button';
import { Avatar } from 'src/components/avatar';

import { theme } from 'src/theme';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface CommentItemProps {
  data: CommentData;
  parentItemText?: string;
}

export const CommentItem = memo(
  ({ data, parentItemText }: CommentItemProps) => {
    const [repliesIsOpen, setRepliesIsOpen] = useState(false);
    const [replies, setReplies] = useState<CommentData[]>([]);

    const { getCommentReplies, setCreateModalData } = useCommentsContext();

    const handlePressShowReplies = async () => {
      setRepliesIsOpen(!repliesIsOpen);
    };

    const getReplies = async (data: CommentData) => {
      const replies = await getCommentReplies(data.id);

      setReplies(replies);
    };

    const handleReply = useCallback((commentData: CommentData) => {
      setCreateModalData({
        isOpen: true,
        data: commentData,
      });
    }, []);

    useEffect(() => {
      getReplies(data);
    }, [data]);

    return (
      <>
        <Animated.View style={[styles.root, theme.boxShadow]}>
          <View style={styles.top}>
            <Avatar username={data.author.username || ''} />
            <Typography variant="helperText">
              {formatDate(data.timestamp)} at
              {formatDate(data.timestamp, ' HH:mm')}
            </Typography>
            <View style={styles.actionsWrapper}>
              {data.repliesCount ? (
                <Button
                  size="small"
                  title={repliesIsOpen ? 'Hide' : `Show (${data.repliesCount})`}
                  onPress={handlePressShowReplies}
                />
              ) : (
                <Typography
                  variant="helperText"
                  color={theme.colors.text.secondary}>
                  No Replies
                </Typography>
              )}
              <Button
                size="small"
                title="Reply"
                color="success"
                onPress={() => handleReply(data)}
              />
            </View>
          </View>

          <View>
            {parentItemText ? (
              <View style={styles.parentItemTextWrapper}>
                <Typography variant="body2" numberOfLines={1}>
                  {parentItemText}
                </Typography>
              </View>
            ) : null}
            <Typography variant="body2" color={theme.colors.text.secondary}>
              {data.content}
            </Typography>
          </View>
        </Animated.View>
        {repliesIsOpen && replies?.length ? (
          <View style={styles.repliesWrapper}>
            {replies.map(reply => (
              <CommentItem
                key={reply.id}
                data={reply}
                parentItemText={data.content}
              />
            ))}
          </View>
        ) : null}
      </>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH - 16,
    gap: 8,
    minHeight: 80,
    backgroundColor: theme.colors.common.white,
    padding: 8,
    borderRadius: 4,
  },

  top: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 38,
    gap: 8,
  },

  actionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
    justifyContent: 'flex-end',
  },

  repliesWrapper: {
    paddingLeft: 16,
    paddingTop: 4,
    gap: 4,
  },

  parentItemTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.common.separator,
    borderRadius: 4,
    padding: 4,
  },
});
