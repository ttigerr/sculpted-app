import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {ProgressCircle} from 'react-native-svg-charts';
import moment from 'moment';

interface TaskProgressProps {
  date: string; // Fecha
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
      {/* Fecha */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{moment(date).format('MMM DD')}</Text>
      </View>

      {/* Información de progreso */}
      <View style={styles.taskInfoContainer}>
        <Text style={styles.taskProgressText}>Task Progress</Text>
        <Text style={styles.taskDoneText}>
          {completedTasks}/{totalTasks} Done
        </Text>
      </View>

      {/* Barra circular de progreso */}
      {/* <ProgressCircle
        style={styles.progressCircle}
        progress={progress}
        progressColor={'#FFD700'} // Color del progreso (gradiente simulado con amarillo)
        backgroundColor={'#333'}
        strokeWidth={12}>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </ProgressCircle> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    backgroundColor: '#444',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dateText: {
    color: '#aaa',
    fontSize: 14,
  },
  taskInfoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  taskProgressText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  taskDoneText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressCircle: {
    height: 100,
    width: 100,
  },
  progressText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
  },
});

export default TaskProgress;
