import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useRef} from 'react';
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

const TodoTaskList = (props: NavigationPropsType) => {
  const {
    goBack,
    handleSearch,
    toggleTaskCompletion,
    taskList,
    handleAddTask,
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
  } = useTaskList(props);
  return (
    <MainWrapper colorArray={secondaryGradientColorList}>
      {(isAdding || isSelectedAll) && (
        <Appbar.Header style={styles.appBar}>
          <Button
            textColor={theme.colors.h1}
            mode="text"
            onPress={isAdding ? handleCancelEdit : handleCancelSelecting}>
            {'Cancel'}
          </Button>
          {isSelectedAll && (
            <Appbar.Content
              title="Select items"
              titleStyle={styles.titleStyle}
            />
          )}
          {isAdding && (
            <Button
              textColor={theme.colors.todoScreenTextColor}
              mode="text"
              onPress={handleSaveTask}>
              {'Done'}
            </Button>
          )}
        </Appbar.Header>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={[
            styles.container,
            {paddingTop: RFValue(isSelectedAll ? 22 : 82)},
          ]}
          ref={scrollViewRef}>
          <View style={styles.navigationBarContainer}>
            <BackButton style={styles.backButton} onPress={goBack} />
            <Text variant="paragraph">{'Today’s Task'}</Text>
          </View>
          <Separator height={RFValue(24)} />
          <SearchBar
            placeholder="Find your tasks"
            onChangeText={handleSearch}
          />
          <Separator height={RFValue(16)} />
          <TaskList
            isShowingCompleted={isShowingCompleted}
            onShowCompletedPressed={handleShowCompleted}
            isSelectedAll={isSelectedAll}
            onSelectAllPressed={onSelectAllPressed}
            taskList={taskList}
            onTaskPress={task => console.log(task)}
            handleToggleComplete={toggleTaskCompletion}
            newTask={newTask}
            setNewTask={setNewTask}
            onTaskDelete={handleDeleteTask}
            handleToggleSelectItem={handleToggleSelectItem}
          />
          <Separator height={RFValue(220)} />
        </ScrollView>
      </KeyboardAvoidingView>
      {!isAdding && !isSelectedAll && (
        <FloatingButton onPress={handleAddTask} iconName="plusRound" />
      )}
      {isSelectedAll && (
        <FloatingButton
          onPress={onDeleteSelectedTaskPressed}
          iconName="trash"
        />
      )}
      <ConfirmationModal
        visible={isConfirmationModalVisible}
        title="Are you sure you want to delete your tasks?"
        onClose={onConfirmationModalClose}
        onPrimaryAction={removeSelectedTasks}
        onSecondaryAction={onConfirmationModalClose}
        primaryButtonText="Delete Task"
        secondaryButtonText="Cancel"
      />
    </MainWrapper>
  );
};

export default TodoTaskList;

const styles = StyleSheet.create({
  container: {
    // paddingTop: RFValue(82),
    paddingHorizontal: RFValue(16),
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
  appBar: {
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
  },
  titleStyle: {
    color: '#FFFFFF',
    fontSize: RFValue(12),
  },
});
