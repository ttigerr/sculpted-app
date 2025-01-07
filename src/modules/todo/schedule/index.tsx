import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {secondaryGradientColorList} from 'src/consts/arrays';
import {RFValue} from 'react-native-responsive-fontsize';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import useTodoSchedule from './useTodoSchedule';
import {Text, Separator} from 'src/modules/core/ui-library';
import SearchBar from '../components/search-bar';
import {List} from 'react-native-paper';
import {theme} from 'src/config/theme';
import DayPicker from '../components/day-picker';
import ScheduledTaskItem from './components/schedule-task-item';

const TodoSchedule = (props: NavigationPropsType) => {
  const {
    goBack,
    handleSearch,
    groupTasksByDate,
    taskList,
    toggleTaskCompletion,
    handleDayPress,
    removeTaskById,
  } = useTodoSchedule(props);
  const groupedTasks = groupTasksByDate(taskList);

  return (
    <MainWrapper colorArray={secondaryGradientColorList}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <View style={styles.navigationBarContainer}>
            <BackButton style={styles.backButton} onPress={goBack} />
            <Text variant="paragraph">{'Scheduled'}</Text>
          </View>
          <Separator height={RFValue(24)} />
          <View style={styles.searchBarContainer}>
            <SearchBar
              placeholder="Find your tasks"
              onChangeText={handleSearch}
            />
            <Separator height={RFValue(32)} />
            <DayPicker onItemPressed={handleDayPress} isAllButtonVisible />
          </View>
          <Separator height={RFValue(32)} />

          {Object.keys(groupedTasks).length === 0 ? (
            <View style={styles.emptyComponentContainer}>
              <Text variant="h4">{'No task scheduled'}</Text>
            </View>
          ) : (
            Object.keys(groupedTasks).map(date => (
              <List.Section key={date}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    marginBottom: 5,
                    paddingHorizontal: RFValue(16),
                  }}>
                  {date}
                </Text>
                {groupedTasks[date].map(task => (
                  <ScheduledTaskItem
                    task={task}
                    toggleTaskCompletion={toggleTaskCompletion}
                    onTaskDelete={removeTaskById}
                  />
                ))}
              </List.Section>
            ))
          )}
          <Separator height={RFValue(220)} />
        </ScrollView>
      </KeyboardAvoidingView>
    </MainWrapper>
  );
};

export default TodoSchedule;

const styles = StyleSheet.create({
  container: {
    paddingTop: RFValue(52),
    // paddingHorizontal: RFValue(16),
  },
  navigationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: RFValue(16),
  },
  searchBarContainer: {
    paddingHorizontal: RFValue(16),
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
  listItem: {
    marginBottom: 10,
    borderBottomColor: theme.colors.listItemBorderColor,
    borderBottomWidth: 0.5,
  },
  emptyComponentContainer: {
    flex: 1,
    height: RFValue(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
