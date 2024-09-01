import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Modal from 'react-native-modal';
import { useGlobalContext } from 'src/contexts/global';
import { useCommentsContext } from 'src/contexts/comments';

import { Typography } from 'src/components/typography';
import { TextArea } from 'src/components/text-area';
import { Button } from 'src/components/button';

import { theme } from 'src/theme';
import CloseIcon from 'src/assets/icons/close.svg';

export const CreateComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');

  const { user } = useGlobalContext();
  const { createModal, addComment, setCreateModalData, reset, getComments } =
    useCommentsContext();

  const handleChangeNote = (text: string) => {
    setComment(text);
  };

  const handleClose = () => {
    setComment('');
    setCreateModalData({ isOpen: false, data: null });
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      addComment(user?.id, comment.trim(), createModal.data?.id || null);
      handleClose();

      if (!createModal.data?.id) {
        reset();
        return;
      }

      getComments();
    } catch (e) {
      console.log('SUBMIT COMMENT ERROR', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isVisible={createModal.isOpen}
      onBackdropPress={handleClose}
      backdropColor={theme.colors.common.fullBlack}
      backdropOpacity={0.25}
      style={styles.modal}
      statusBarTranslucent
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      deviceHeight={Dimensions.get('screen').height}
      animationIn="zoomIn"
      animationOut="zoomOut"
      avoidKeyboard>
      <KeyboardAvoidingView behavior="padding">
        <View style={[styles.root]}>
          <Typography variant="h6" style={styles.title}>
            {createModal.data ? 'Reply' : 'Create Comment'}
          </Typography>

          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <CloseIcon />
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={styles.content}>
              <View style={styles.row}>
                <Typography
                  variant="body2"
                  color={theme.colors.text.secondary}
                  numberOfLines={1}>
                  {createModal.data
                    ? createModal.data.content
                    : 'Create Top Level Comment'}
                </Typography>
              </View>

              <View style={styles.commentWrapper}>
                <Typography variant="subtitle2">
                  {createModal.data ? 'Reply' : 'Coment'}
                </Typography>
                <TextArea
                  placeholder={`Put your ${
                    createModal.data ? 'reply' : 'comment'
                  } here`}
                  multiline
                  numberOfLines={8}
                  value={comment}
                  maxLength={1000}
                  error={
                    comment.length > 1000 ? 'Max length is 1000 characters' : ''
                  }
                  errorPosition="absolute"
                  onChangeText={handleChangeNote}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.buttonsWrapper}>
            <View style={styles.availableSize}>
              <Button
                size="large"
                variant="minimal"
                title="Cancel"
                color="secondaryMain"
                disabled={isLoading}
                onPress={handleClose}
              />
            </View>

            <View style={styles.availableSize}>
              <Button
                size="large"
                title={createModal.data ? 'Reply' : 'Create'}
                disabled={isLoading}
                isLoading={isLoading}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    backgroundColor: theme.colors.common.white,
    width: 358,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    borderRadius: 20,
    minHeight: 540,
  },
  title: {
    width: '100%',
    paddingBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  content: {
    padding: 4,
    gap: 4,
    paddingBottom: 32,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 32,
  },

  buttonsWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  commentWrapper: {
    paddingTop: 24,
    gap: 8,
  },

  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  availableSize: {
    flex: 1,
  },
});
