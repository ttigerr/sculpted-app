import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Pressable,
} from 'react-native';
import {theme} from 'src/config/theme';
import {Separator, Text} from 'src/modules/core/ui-library';
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
import { useRoute } from '@react-navigation/native';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';

const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const MAX_SWIPE_DISTANCE = -SCREEN_WIDTH * 0.5;

interface TaskListProps {
  taskList: Task[];
  onTaskPress: (task: Task) => void;
  handleToggleComplete: (id: string) => void;
  newTask?: Task | null;
  setNewTask?: any;
  onTaskDelete: (id: string) => void;
  isShowingCompleted?: boolean;
  onShowCompletedPressed?: (isShowingCompleted: boolean) => void;
  isSelectedAll?: boolean;
  onSelectAllPressed?: (isSelectedAll: boolean) => void;
  handleToggleSelectItem: (id: string, isSelected?: boolean) => void;
  children?: React.ReactNode;
}

const TaskItem: React.FC<
  Task & {
    onToggleComplete?: () => void;
    handleToggleSelectItem?: () => void;
    onPress?: () => void;
    onTaskDelete?: () => void;
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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(0);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  // To handle with the animations
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
      setTimeout(() => onTaskDelete?.(), 300); // Delay to complete the swipe-out animation before deletion
    } else {
      translateX.value = withTiming(0);
    }
  };

  // to handle number of lines in text's scescription
  const onTextLayout = useCallback(event => {
    setNumberOfLines(event.nativeEvent.lines.length);
  }, []);

  return (
    <>
      {isTemporary ? (
        <View style={styles.addTaskCard}>
          <TextInput
            style={styles.taskTitle}
            placeholder="Add a title"
            placeholderTextColor={"#7C7C7C"}
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
            placeholder="Description"
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
            
            autoFocus
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
              
            <Animated.View style={[styles.taskContainer, animatedTranslateStyle]}>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                {/* Dot component on the right */}
                <TouchableWithoutFeedback
                  onPress={event => {
                    event.stopPropagation();
                    if (isSelectedAll) {
                      handleToggleSelectItem && handleToggleSelectItem();
                    } else onToggleComplete && onToggleComplete();
                  }}>
                  <View style={styles.itemOuterCircle}>
                    <View
                      style={[
                        styles.itemInnerCircle,
                        (isCompleted || isSelectedAll) && {
                          backgroundColor: theme.colors.todoScreenTextColor,
                        },
                      ]}>
                      {isSelected && (
                        <Icon
                          name="tick"
                          fill={theme.colors.background}
                          width={RFValue(9)}
                          height={RFValue(9)}
                        />
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                {/* Text content on the left; tap to edit */}
                <View style={{ flex: 1 }}>
                  <Pressable onPress={onPress} disabled={isSelectedAll}>
                    <Text style={styles.taskTitle}>{title}</Text>
                    {description ? (
                      <Text
                        style={styles.descriptionInput}
                        numberOfLines={isDescriptionExpanded ? undefined : 2}
                        ellipsizeMode="tail"
                        onTextLayout={onTextLayout}
                      >
                        {description}
                      </Text>
                    ) : null}
                  </Pressable>
                  {/* Wrap a description when hit more than 2 lines  */}
                  {description && numberOfLines >= 2 ? (
                    <Pressable onPress={() => setIsDescriptionExpanded(prev => !prev)}>
                      <Text style={[styles.descriptionInput, {opacity: 0.6}]}>
                        {isDescriptionExpanded ? '...Show less' : '... more'}
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>
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
  isShowingCompleted = false,
  onShowCompletedPressed = () => {},
  isSelectedAll = false,
  onSelectAllPressed = () => {},
  handleToggleSelectItem,
  children,
}) => {
  const route = useRoute();
  // The draft is either an existing task being edited (shown in its place)
  // or a new task (shown at the end).
  const isEditingExisting = !!newTask && taskList.some(task => task.id === newTask.id);

  const renderDraft = (draft: Task) => (
    <TaskItem
      id={draft.id}
      key={draft.id}
      creationDate={draft.creationDate}
      title={draft.title}
      description={draft.description}
      isCompleted={draft.isCompleted}
      setNewTask={setNewTask}
      isTemporary
    />
  );

  return (
    <View style={styles.container}>
      {/* Do not show only Journal screen */}
      {route.name !== navigationScreenNames.journal && (
        <View style={styles.headerContainer}>
          <Text variant="paragraph" style={styles.header}>
            {route.name == navigationScreenNames.todoIncomplete ? "Tasks" : "Lists"}
          </Text>
          {!isSelectedAll && route.name !== navigationScreenNames.todoIncomplete &&(
            <DropdownMenu
              isSelectedAll={isSelectedAll}
              isShowingCompleted={isShowingCompleted}
              onShowCompletedPressed={onShowCompletedPressed}
              onSelectAllPressed={onSelectAllPressed}
            />
          )}
        </View>
      )}
      <ScrollView>
        {taskList.map(task => isEditingExisting && task.id === newTask!.id ? (
          <View key={task.id} style={styles.taskCardContainer}>
            {renderDraft(newTask!)}
          </View>
        ) : (
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
        {children}
        {newTask && !isEditingExisting && (
          <>
            {renderDraft(newTask)}
            <Separator height={RFValue(15)}/>
          </>
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
    opacity: 0.4
  },
  taskContainer: {
    backgroundColor: theme.colors.dashboardCardBackground,
    borderRadius: 24,
    paddingLeft: 20,
    paddingTop: RFValue(12),
    paddingRight: 16,
    paddingBottom: RFValue(16),
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
    flexShrink: 1, 
    flexWrap: 'wrap', 
  },
  taskDescription: {
    color: '#888',
    fontSize: 14,
    flexShrink: 1,  
    flexWrap: 'wrap', 
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
    marginBottom: RFValue(15)
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
    marginBottom: RFValue(15),
  },
  addTaskCard: {
    backgroundColor: theme.colors.dashboardCardBackground,
    borderRadius: 24,
    paddingLeft: 20,
    paddingTop: RFValue(12),
    paddingRight: 16,
    paddingBottom: RFValue(16),
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
    borderRadius: 25,
    paddingRight: 20,
  },
  deleteText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  itemOuterCircle: {
    width: 26,
    height: 26,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#888',
    padding: 2,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInnerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },
});

export default TaskList;
