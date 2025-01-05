import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {theme} from 'src/config/theme';
import {Text} from 'src/modules/core/ui-library';
import DropdownMenu from './dropdown-menu';
import {Task} from 'src/utils/types';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {SCREEN_WIDTH} from 'src/consts/constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'src/modules/core/components/icon';
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const MAX_SWIPE_DISTANCE = -SCREEN_WIDTH * 0.5;

interface TaskListProps {
  taskList: Task[];
  onTaskPress: (task: Task) => void;
  handleToggleComplete: (id: string) => void;
  newTask: Task | null;
  setNewTask?: any;
  onTaskDelete: (id: string) => void;
  isShowingCompleted: boolean;
  onShowCompletedPressed: (isShowingCompleted: boolean) => void;
  isSelectedAll: boolean;
  onSelectAllPressed: (isSelectedAll: boolean) => void;
  handleToggleSelectItem: (id: string, isSelected: boolean) => void;
}

const TaskItem: React.FC<
  Task & {
    onToggleComplete?: () => void;
    handleToggleSelectItem?: () => void;
    onPress?: () => void;
    onTaskDelete: () => void;
    setNewTask?: any;
    isSelectedAll?: boolean;
  }
> = ({
  id,
  title,
  description,
  isCompleted,
  onToggleComplete,
  onPress,
  isTemporary,
  setNewTask,
  onTaskDelete,
  isSelected,
  handleToggleSelectItem,
  isSelectedAll,
}) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const translateX = useSharedValue(0);
  const backgroundTranslateX = useSharedValue(0);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const animatedTranslateStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const animatedBackgroundTranslateStyle = useAnimatedStyle(() => ({
    transform: [{translateX: backgroundTranslateX.value}],
  }));

  const handleGestureEvent = ({nativeEvent}) => {
    if (
      nativeEvent.translationX < 0 &&
      nativeEvent.translationX >= MAX_SWIPE_DISTANCE
    ) {
      translateX.value = nativeEvent.translationX;
    }
  };

  const handleGestureEnd = () => {
    if (translateX.value < -SWIPE_THRESHOLD) {
      translateX.value = withTiming(-SCREEN_WIDTH);
      backgroundTranslateX.value = withTiming(-SCREEN_WIDTH);
      setTimeout(onTaskDelete, 300); // Delay to complete the swipe-out animation before deletion
    } else {
      translateX.value = withTiming(0);
    }
  };

  return (
    <>
      {isTemporary ? (
        <View style={styles.addTaskCard}>
          <TextInput
            style={styles.taskTitle}
            placeholder="Add a title"
            cursorColor={'#FDDF38'}
            value={title}
            maxLength={40}
            onChangeText={text =>
              setNewTask((prev: Task) => (prev ? {...prev, title: text} : prev))
            }
            ref={input => (inputs.current[0] = input)}
            onSubmitEditing={() => {
              inputs.current[1] && inputs.current[1].focus();
            }}
          />
          <TextInput
            style={styles.descriptionInput}
            placeholder="Notes:"
            value={description}
            multiline
            maxLength={200}
            placeholderTextColor={theme.colors.caption}
            onChangeText={text =>
              setNewTask((prev: Task) =>
                prev ? {...prev, description: text} : prev,
              )
            }
            ref={input => (inputs.current[1] = input)}
          />
        </View>
      ) : (
        <View style={styles.taskCardContainer}>
          <Animated.View
            style={[styles.deleteBackground, animatedBackgroundTranslateStyle]}>
            <Text style={styles.deleteText}>Delete</Text>
          </Animated.View>
          <PanGestureHandler
            enabled={!isSelectedAll}
            onGestureEvent={handleGestureEvent}
            onEnded={handleGestureEnd}>
            {/* <TouchableRipple
              onPress={onPress}
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.touchable}> */}
            <Animated.View
              style={[styles.taskContainer, animatedTranslateStyle]}>
              <View>
                <Text style={styles.taskTitle}>{title}</Text>
                {description && (
                  <Text style={styles.taskDescription}>{description}</Text>
                )}
              </View>
              <TouchableWithoutFeedback
                onPress={event => {
                  event.stopPropagation();
                  if (isSelectedAll) {
                    handleToggleSelectItem && handleToggleSelectItem();
                  } else onToggleComplete && onToggleComplete();
                }}>
                <View
                  style={[
                    styles.itemOuterCircle,
                    isSelectedAll && {width: 24},
                  ]}>
                  <View
                    style={[
                      styles.itemInnerCircle,
                      isCompleted && {
                        backgroundColor: theme.colors.todoScreenTextColor,
                      },
                      isSelectedAll && {
                        backgroundColor: theme.colors.todoSelectingItemColor,
                      },
                    ]}>
                    {isSelected && (
                      <Icon
                        name="tick"
                        strokeColor={'#FFFFFF'}
                        width={RFValue(9)}
                        height={RFValue(9)}
                      />
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
            {/* </TouchableRipple> */}
          </PanGestureHandler>
        </View>
      )}
    </>
  );
};

const TaskList: React.FC<TaskListProps> = ({
  taskList,
  onTaskPress,
  handleToggleComplete,
  newTask,
  setNewTask,
  onTaskDelete,
  isShowingCompleted,
  onShowCompletedPressed,
  isSelectedAll,
  onSelectAllPressed,
  handleToggleSelectItem,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="paragraph" style={styles.header}>
          Lists
        </Text>
        {!isSelectedAll && (
          <DropdownMenu
            isSelectedAll={isSelectedAll}
            isShowingCompleted={isShowingCompleted}
            onShowCompletedPressed={onShowCompletedPressed}
            onSelectAllPressed={onSelectAllPressed}
          />
        )}
      </View>
      <ScrollView>
        {taskList.map(task => (
          <TaskItem
            creationDate={task.creationDate}
            id={task.id}
            key={task.id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            onPress={() => onTaskPress(task)}
            onToggleComplete={() => handleToggleComplete(task.id)}
            setNewTask={setNewTask}
            onTaskDelete={() => onTaskDelete(task.id)}
            isSelected={task.isSelected}
            isSelectedAll={isSelectedAll}
            handleToggleSelectItem={() =>
              handleToggleSelectItem(task.id, task.isSelected)
            }
          />
        ))}
        {newTask && (
          <TaskItem
            id={newTask.id}
            key={newTask.id}
            creationDate={newTask.creationDate}
            title={newTask.title}
            description={newTask.description}
            isCompleted={newTask.isCompleted}
            setNewTask={setNewTask}
            isTemporary={newTask.isTemporary}
          />
        )}
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
    backgroundColor: theme.colors.dashboardCardFilledBackground,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchable: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  taskTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    maxWidth: RFValue(280),
  },
  taskDescription: {
    color: '#888',
    fontSize: 14,
    maxWidth: RFValue(280),
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#888',
    padding: 2,
  },
  completed: {
    backgroundColor: '#FFD700',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleInput: {
    color: theme.colors.textInputColor,
    fontSize: 16,
  },
  descriptionInput: {
    color: theme.colors.caption,
    fontSize: 14,
  },
  taskCardContainer: {
    marginBottom: 10,
  },
  addTaskCard: {
    backgroundColor: theme.colors.dashboardCardFilledBackground,
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  deleteBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '90%',
    backgroundColor: '#FFD600', // Yellow background for delete
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: 22,
    paddingRight: 20,
  },
  deleteText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemOuterCircle: {
    width: 20,
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#888',
    padding: 2,
  },
  itemInnerCircle: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskList;
