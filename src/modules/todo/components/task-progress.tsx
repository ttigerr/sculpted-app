import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {Chip} from 'react-native-paper';
import {Separator} from 'src/modules/core/ui-library';
import {CARD_BORDER_RADIUS} from 'src/consts/constants';
import {theme} from 'src/config/theme';
interface TaskProgressProps {
  date: Date; // Fecha
  completedTasks: number; // Número de tareas completadas
  totalTasks: number; // Número total de tareas
}

const TaskProgress: React.FC<TaskProgressProps> = ({
  date,
  completedTasks,
  totalTasks,
}) => {
  const progress = completedTasks / totalTasks; // Porcentaje de progreso

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{moment(date).format('MMM DD')}</Text>
        </View>
        <Text style={styles.taskProgressText}>Task Progress</Text>
        <View style={styles.doneTextContainer}>
          <Text style={styles.taskProportionText}>
            {completedTasks}/{totalTasks}
          </Text>
          <Text style={styles.taskDoneText}>Done</Text>
        </View>
      </View>

      <View style={styles.rigthContainer}>
        <ProgressCircle
          style={styles.progressCircle}
          progress={progress}
          progressColor={'#FFD700'}
          backgroundColor={'#333'}
          strokeWidth={14}
        />
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.dashboardCardBackground,
    borderRadius: CARD_BORDER_RADIUS,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    justifyContent: 'space-between',
  },
  dateContainer: {
    backgroundColor: '#444',
    borderRadius: 100,
    height: 24,
    width: RFValue(62),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(15),
  },
  dateText: {
    color: theme.colors.primaryTextColor,
    fontSize: 14,
  },
  taskProgressText: {
    color: theme.colors.primaryTextColor,
    fontSize: RFValue(16),
    fontWeight: '600',
    maxWidth: RFValue(100),
    marginBottom: RFValue(22),
  },
  doneTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  taskDoneText: {
    color: theme.colors.primaryTextColor,
    fontSize: 14,
    marginLeft: 8,
  },
  progressCircle: {
    height: 100,
    width: 100,
  },
  rigthContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: RFValue(16),
    color: theme.colors.primaryTextColor,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    textAlignVertical: 'center',
  },
  taskProportionText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default TaskProgress;
