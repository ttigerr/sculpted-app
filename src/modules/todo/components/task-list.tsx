import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {theme} from 'src/config/theme';
import {Text} from 'src/modules/core/ui-library';
import DropdownMenu from './dropdown-menu';

interface TaskItemProps {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: TaskItemProps[];
  onTaskPress: (task: TaskItemProps) => void;
}

const TaskItem: React.FC<
  TaskItemProps & {onToggleComplete: () => void; onPress: () => void}
> = ({title, description, isCompleted, onToggleComplete, onPress}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, .32)"
      style={styles.taskContainer}>
      <View style={styles.taskContent}>
        <View>
          <Text style={styles.taskTitle}>{title}</Text>
          {description && (
            <Text style={styles.taskDescription}>{description}</Text>
          )}
        </View>
        <TouchableWithoutFeedback
          onPress={event => {
            event.stopPropagation();
            onToggleComplete();
          }}>
          <View
            style={[styles.statusCircle, isCompleted && styles.completed]}
          />
        </TouchableWithoutFeedback>
      </View>
    </TouchableRipple>
  );
};

const TaskList: React.FC<TaskListProps> = ({tasks, onTaskPress}) => {
  const [taskList, setTaskList] = useState(tasks);

  const handleToggleComplete = (id: string) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, isCompleted: !task.isCompleted} : task,
      ),
    );
  };

  const handleShowCompleted = () => {
    console.log('Show Completed selected');
  };

  const handleSelectAll = () => {
    console.log('Select All selected');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="paragraph" style={styles.header}>
          Lists
        </Text>
        {/* <DropdownMenu onSelectShowCompleted={() => {}} onSelectAll={() => {}} /> */}
      </View>
      <ScrollView>
        {taskList.map(task => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            onPress={() => onTaskPress(task)}
            onToggleComplete={() => handleToggleComplete(task.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  taskContainer: {
    backgroundColor: theme.colors.dashboardCardBackground,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  taskTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  taskDescription: {
    color: '#888',
    fontSize: 14,
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#888',
  },
  completed: {
    backgroundColor: '#FFD700',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default TaskList;
