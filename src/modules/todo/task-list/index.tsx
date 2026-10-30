import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {RFValue} from 'react-native-responsive-fontsize';
import {Separator, Text} from 'src/modules/core/ui-library';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import {secondaryGradientColorList} from 'src/consts/arrays';
import SearchBar from '../components/search-bar';
import TaskList from '../components/task-list';
import useTaskList from './useTaskList';
import FloatingButton from 'src/modules/core/components/float-button';
import {Appbar, Button} from 'react-native-paper';
import {theme} from 'src/config/theme';
import ConfirmationModal from 'src/modules/core/components/confirmation-modal';
import DayPicker from 'src/modules/todo/components/day-picker';

const TodoTaskList = (props: NavigationPropsType) => {
  const {
    goBack,
    handleSearch,
    toggleTaskCompletion,
    taskList,
    handleAddTask,
    handleEditTask,
    newTask,
    setNewTask,
    scrollViewRef,
    isAdding,
    handleSaveTask,
    handleCancelEdit,
    handleDeleteTask,
    isShowingCompleted,
    handleShowCompleted,
    isSelectedAll,
    onSelectAllPressed,
    handleCancelSelecting,
    handleToggleSelectItem,
    isConfirmationModalVisible,
    onDeleteSelectedTaskPressed,
    onConfirmationModalClose,
    removeSelectedTasks,
    handleDateFilter,
    filteredTasks,
    hasTodayTask,
  } = useTaskList(props);

  const keyboardOffset = Platform.OS === 'ios' ? 60 : 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardOffset}
    >
      <MainWrapper colorArray={secondaryGradientColorList}>
        {/* Reserve Appbar Space to Avoid Layout Jump */}
          {(isAdding || isSelectedAll) && (
            <Appbar.Header style={styles.appBar}>
              <View style={styles.sideButton}>
                <Pressable
                  onPress={isSelectedAll ? handleCancelSelecting : handleCancelEdit}
                  style={({ pressed }) => ({
                    padding: 12,
                    opacity: pressed ? 0.6 : 1,
                  })}
                >
                  <Text style={styles.appBarTitleText}>{"Cancel"}</Text>
                </Pressable>
              </View>
              <View style={styles.appBarTitleContainer}>
                {isSelectedAll && (
                  <Text style={styles.appBarTitleText}>{"Select items"}</Text>
                )}
              </View>
              <View style={styles.sideButton}>
                {isAdding && (
                  <Pressable
                    onPress={handleSaveTask}
                    style={({ pressed }) => ({
                      padding: 12,
                      opacity: pressed ? 0.6 : 1,
                    })}
                  >
                    <Text style={styles.doneTitleText}>{"Done"}</Text>
                  </Pressable>
                )}
              </View>
            </Appbar.Header>
          )}

        {/* Main Scrollable Content */}
        <SafeAreaView style={styles.container}>
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            style={styles.scrollView}
          >
            <Separator height={RFValue(20)} />
            <View style={styles.navigationBarContainer}>
              <BackButton style={styles.backButton} onPress={goBack} />
              <Text variant="h6">
                {"Today’s Task"}
              </Text>
            </View>

            <Separator height={RFValue(20)} />
            <SearchBar
              placeholder="Find your tasks"
              onChangeText={handleSearch}
            />
            <Separator height={RFValue(20)} />
            <DayPicker
              onItemPressed={handleDateFilter}
              behindDays
              isAllButtonVisible
            />
            <Separator height={RFValue(20)} />
            {
              filteredTasks.length !== 0 ? (
                <TaskList
                  isShowingCompleted={isShowingCompleted}
                  onShowCompletedPressed={handleShowCompleted}
                  isSelectedAll={isSelectedAll}
                  onSelectAllPressed={onSelectAllPressed}
                  taskList={filteredTasks}
                  onTaskPress={handleEditTask}
                  handleToggleComplete={toggleTaskCompletion}
                  newTask={newTask}
                  setNewTask={setNewTask}
                  onTaskDelete={handleDeleteTask}
                  handleToggleSelectItem={handleToggleSelectItem}
                />
              ) : (
                <View style={styles.dataCheckContainer}>
                  <Text variant="paragraph" style={styles.dataCheckText}>
                    {"No Tasks found"}
                  </Text>
                </View>
              )
            }
          </ScrollView>
        </SafeAreaView>

        {/* Floating Action Buttons */}
        { filteredTasks.length !== 0 && hasTodayTask ? 
          (
            <View style={styles.floatingButtonContainer}>
              {!isAdding && !isSelectedAll && (
                <FloatingButton
                  onPress={handleAddTask}
                  iconName="plusRound"
                  width={32}
                  height={32}
                  style={styles.floatingButton}
                />
              )}

              {isSelectedAll && (
                <FloatingButton
                  onPress={onDeleteSelectedTaskPressed}
                  iconName="trash"
                  width={32}
                  height={32}
                  style={styles.floatingButton}
                />
              )}
            </View>
          ) : ( null )
        }
        {/* Confirmation Modal */}
        <ConfirmationModal
          visible={isConfirmationModalVisible}
          title="Are you sure you want to delete your tasks?"
          onClose={onConfirmationModalClose}
        >
          <>
            <Pressable style={styles.buttonContainer} onPress={removeSelectedTasks}>
              <Text variant="paragraph" style={styles.primaryButtonText}>
                {"Delete Task"}
              </Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={onConfirmationModalClose}>
              <Text variant="paragraph" style={styles.secondButtonText}>
                {"Cancel"}
              </Text>
            </Pressable>
          </>
        </ConfirmationModal>
      </MainWrapper>
    </KeyboardAvoidingView>
  );
};


export default TodoTaskList;

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: RFValue(15),
  },
  scrollView: {
    paddingHorizontal: RFValue(16)
  },
  navigationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: RFValue(0),
  },
  cardsContainer: {
    flexDirection: 'row',
    height: RFValue(200),
  },
  infoCardsContainer: {
    flex: 1,
  },
  titleStyle: {
    color: '#FFFFFF',
    fontSize: RFValue(12),
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500'
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: RFValue(30), 
    left: 0,
    right: 0,
    zIndex: 100,
  },
  floatingButton: {
    height: 70,
    width: 70,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  buttonContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF14',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: theme.colors.todoScreenTextColor
  },
  secondButtonText: {
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#595959'
  },
  appBar: {
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appBarTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  doneTitleText: {
    color: theme.colors.todoScreenTextColor,
    fontSize: 16,
    fontWeight: '500',
  },
  sideButton: {
    minWidth: 80, // or same width for both sides to keep title centered
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataCheckContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: RFValue(100)
  },
  dataCheckText: {
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
    opacity: 0.4
  }
});
