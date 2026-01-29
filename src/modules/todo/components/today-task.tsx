import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
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
        <View style={{
            flexDirection: 'row',
            justifyContent: taskCount >= 99 ? 'space-between' : 'flex-end',
            alignItems: 'center'
          }}
        >
          <Text style={styles.taskCount}>
            {taskCount == 100 ? taskCount - 1: taskCount}
          </Text>
          <Text variant="body2"style={styles.plusText}>
            {taskCount >= 99 ? "+" : null}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  touchable: {
    overflow: 'hidden',
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.dashboardCardBackground,
    borderRadius: 25,
    padding: 16,
    justifyContent: 'space-between',
  },
  upperSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f2021',
    borderRadius: 10,
  },
  title: {
    color: theme.colors.primaryTextColor,
    fontSize: 20,
    fontWeight: '500',
    maxWidth: 90,
  },
  taskCount: {
    color: theme.colors.primaryTextColor,
    fontSize: 90,
    fontWeight: '500',
  },
  plusText: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: RFValue(0)
  },
  taskCountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export default TodayTask;
