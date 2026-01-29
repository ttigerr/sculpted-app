import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {TouchableRipple} from 'react-native-paper';
import {Separator, Text} from 'src/modules/core/ui-library';
import {CARD_BORDER_RADIUS} from 'src/consts/constants';
import {theme} from 'src/config/theme';
import Icon from 'src/modules/core/components/icon';
interface TaskProgressProps {
  date: Date;
  completedTasks: number;
  totalTasks: number;
  completedPercent : number;
  onPress?: () => void;
}

const PROGRESS_CIRCLE_SIZE = 114;

const TaskProgress: React.FC<TaskProgressProps> = ({
  date,
  completedTasks,
  totalTasks,
  completedPercent,
  onPress,
}) => {
  const progress = completedPercent / 100;

  return (
    <TouchableRipple onPress={onPress} style={styles.touchable}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.dateContainer}>
            <Text variant="body4">{moment(date).format('MMM DD')}</Text>
          </View>
          <Text variant="h6" style={styles.taskProgressText}>Task Progress</Text>
          <View style={styles.doneTextContainer}>
            <Text variant="h1" style={styles.taskProportionText}>
              {completedTasks+ "/" + totalTasks}
            </Text>
            <Text style={styles.plusSign}>{totalTasks >= 99? "+" : null}</Text>
            <Text variant="body2">{" Done"}</Text>
          </View>
        </View>

        <View style={styles.rigthContainer}>
          { completedTasks == 100? (
            <Icon name="toDoWidget" size="normal"/>
          ) : (
            <>
              <ProgressCircle
                style={styles.progressCircle}
                progress={progress}
                progressColor={'#FFD700'}
                backgroundColor={'#333'}
                strokeWidth={16}
              />
              <Text variant="body" style={styles.progressText}>{Math.round(progress * 100)}%</Text>
            </>
          )}
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  touchable: {
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.dashboardCardBackground,
    borderRadius: 25,
    padding: RFValue(16),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    justifyContent: 'space-between',
  },
  dateContainer: {
    backgroundColor: '#3d3e3f',
    borderRadius: 100,
    height: 18,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: theme.colors.primaryTextColor,
    fontSize: 12,
  },
  taskProgressText: {
    color: theme.colors.primaryTextColor,
    maxWidth: 100,
    paddingVertical: 15
  },
  doneTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  taskDoneText: {
    color: theme.colors.primaryTextColor,
    fontSize: 16,
  },
  progressCircle: {
    width: PROGRESS_CIRCLE_SIZE + 7,
    height: PROGRESS_CIRCLE_SIZE + 7,
    overflow: 'visible', // To prevent clipping
  },
  rigthContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  progressText: {
    color: theme.colors.primaryTextColor,
    fontWeight: '700',
    textAlign: 'center',
    position: 'absolute',
    textAlignVertical: 'center',
  },
  taskProportionText: {
    top: 5,
    lineHeight: 33,
    fontWeight: '700',
  },
  plusSign: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default TaskProgress;
