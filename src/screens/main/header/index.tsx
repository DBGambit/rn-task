import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useGlobalContext } from 'src/contexts/global';
import { useCommentsContext } from 'src/contexts/comments';

import { Typography } from 'src/components/typography';
import { Avatar } from 'src/components/avatar';

import { theme } from 'src/theme';
import ChevronRightIcon from 'src/assets/icons/chevron-right.svg';
import ExitIcon from 'src/assets/icons/exit.svg';
import SettingsIcon from 'src/assets/icons/settings.svg';

import { AppStackParamList } from 'src/navigation/stacks/app-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ScreenNavProps = NativeStackNavigationProp<AppStackParamList, 'Main'>;

export const Header = () => {
  const { user, logout } = useGlobalContext();
  const { currentPage, setPage, isNextPageAvailable } = useCommentsContext();

  const isPrevPageAvailable = currentPage === 1;

  const navigation = useNavigation<ScreenNavProps>();

  const handleNext = () => {
    setPage(currentPage + 1);
  };

  const handlePrev = () => {
    setPage(currentPage - 1);
  };

  const handlePressSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.root}>
      <Avatar username={user?.username || ''} />

      <View style={[styles.availableSize, styles.paginationActions]}>
        <TouchableOpacity
          style={styles.rotate180}
          onPress={handlePrev}
          disabled={currentPage === 1}>
          <ChevronRightIcon
            width={32}
            height={32}
            color={
              isPrevPageAvailable
                ? theme.colors.actionActive
                : theme.colors.primaryMain
            }
          />
        </TouchableOpacity>

        <Typography variant="h6" style={styles.textCenter}>
          Page - {currentPage}
        </Typography>

        <TouchableOpacity onPress={handleNext} disabled={!isNextPageAvailable}>
          <ChevronRightIcon
            width={32}
            height={32}
            color={
              isNextPageAvailable
                ? theme.colors.primaryMain
                : theme.colors.actionActive
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.right}>
        <TouchableOpacity onPress={handlePressSettings}>
          <SettingsIcon width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <ExitIcon width={32} height={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: theme.colors.common.white,
    height: 52,
    gap: 8,
  },

  textCenter: {
    textAlign: 'center',
  },

  paginationActions: {
    paddingLeft: 40,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rotate180: {
    transform: [{ rotate: '180deg' }],
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  availableSize: {
    flex: 1,
  },
});
