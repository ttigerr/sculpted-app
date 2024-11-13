import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {CARD_BORDER_RADIUS} from 'src/consts/constants';
import Icon from 'src/modules/core/components/icon';
import {Text} from 'src/modules/core/ui-library';
import {theme} from 'src/config/theme';
import {TouchableRipple} from 'react-native-paper';

interface TodayTaskProps {
  taskCount: number;
  onPress?: () => void;
}

const TodayTask: React.FC<TodayTaskProps> = ({taskCount, onPress}) => {
  return (
    <TouchableRipple onPress={onPress} style={styles.touchable}>
      <View style={styles.container}>
        <View style={styles.upperSection}>
          <Text style={styles.title}>Today's task</Text>
          <View style={styles.iconContainer}>
            <Icon name="to-do" size="small" />
          </View>
        </View>
        <Text variant="h1" style={styles.taskCount}>
          {taskCount}
        </Text>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    // maxHeight: 220,
    borderRadius: CARD_BORDER_RADIUS,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.dashboardCardBackground,
    borderRadius: CARD_BORDER_RADIUS,
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(16),
    justifyContent: 'space-between',
  },
  upperSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 28,
    height: undefined,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
  },
  title: {
    color: theme.colors.primaryTextColor,
    fontSize: 18,
    fontWeight: '600',
    maxWidth: 90,
  },
  taskCount: {
    color: theme.colors.primaryTextColor,
    fontSize: 84,
    textAlign: 'right',
    textAlignVertical: 'bottom',
    lineHeight: 86,
  },
});

export default TodayTask;
