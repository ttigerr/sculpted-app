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
import {Task} from 'src/utils/types';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {SCREEN_WIDTH} from 'src/consts/constants';
import {RFValue} from 'react-native-responsive-fontsize';
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const MAX_SWIPE_DISTANCE = -SCREEN_WIDTH * 0.5;

const TaskItem: React.FC<
  Task & {
    toggleTaskCompletion?: () => void;
    onPress?: () => void;
    onTaskDelete: () => void;
    setNewTask?: any;
  }
> = ({
  task,
  toggleTaskCompletion,
  onPress,
  isTemporary,
  setNewTask,
  onTaskDelete,
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
      setTimeout(() => onTaskDelete(task.id), 300); // Delay to complete the swipe-out animation before deletion
    } else {
      translateX.value = withTiming(0);
    }
  };

  return (
    <>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onEnded={handleGestureEnd}>
        <Animated.View
          style={[styles.taskCardContainer, animatedTranslateStyle]}>
          <View key={task.id} style={[styles.listItemContainer]}>
            <TouchableWithoutFeedback
              onPress={event => {
                event.stopPropagation();
                toggleTaskCompletion && toggleTaskCompletion(task.id);
              }}>
              <View style={styles.itemOuterCircle}>
                <View
                  style={[
                    styles.itemInnerCircle,
                    task.isCompleted && {
                      backgroundColor: theme.colors.todoScreenTextColor,
                    },
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.itemTextContainer}>
              <Text variant="paragraph" style={styles.itemTitle}>
                {task.title}
              </Text>
              <Text variant="caption" style={styles.itemDescription}>
                {task.description}
              </Text>
            </View>
          </View>
          <Animated.View
            style={[styles.deleteBackground, animatedBackgroundTranslateStyle]}>
            <Text style={styles.deleteText}>Delete</Text>
          </Animated.View>
          {/* </TouchableRipple> */}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default TaskItem;

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
    flexDirection: 'row',
  },
  addTaskCard: {
    backgroundColor: theme.colors.dashboardCardFilledBackground,
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  deleteBackground: {
    width: SCREEN_WIDTH / 2,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  deleteText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemOuterCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#888',
    padding: 2,
  },
  itemInnerCircle: {
    flex: 1,
    borderRadius: 10,
  },
  listItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: theme.colors.listItemBorderColor,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: RFValue(16),
  },
  itemTextContainer: {
    marginLeft: 10,
  },
  itemTitle: {
    marginBottom: 6,
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 14,
  },
});
