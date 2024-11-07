import {
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {secondaryGradientColorList} from 'src/consts/arrays';
import BackButton from 'src/modules/core/components/back-button';
import useTodoIncomplete from './useTodoIcomplete';
import {NavigationPropsType} from 'src/utils/types';
import {Text, Separator} from 'src/modules/core/ui-library';
import {RFValue} from 'react-native-responsive-fontsize';
import {List} from 'react-native-paper';
import {theme} from 'src/config/theme';

const TodoIncomplete = (props: NavigationPropsType) => {
  const {goBack, taskList, groupTasksByDate, toggleTaskCompletion} =
    useTodoIncomplete(props);
  const groupedTasks = groupTasksByDate(taskList);
  return (
    <MainWrapper colorArray={secondaryGradientColorList}>
      <ScrollView style={styles.container}>
        <View style={styles.navigationBarContainer}>
          <BackButton style={styles.backButton} onPress={goBack} />
          <Text variant="paragraph">{'Lists'}</Text>
        </View>
        <Separator height={RFValue(32)} />
        <Text variant="h2">{'Incomplete'}</Text>
        {Object.keys(groupedTasks).map(date => (
          <List.Section key={date}>
            <Text style={{fontWeight: 'bold', color: '#fff', marginBottom: 5}}>
              {date}
            </Text>
            {groupedTasks[date].map(task => (
              <List.Item
                key={task.id}
                title={task.title}
                description={task.description}
                left={() => (
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
                )}
                titleStyle={{color: '#fff'}}
                descriptionStyle={{color: '#bbb'}}
                style={styles.listItem}
              />
            ))}
          </List.Section>
        ))}
        <Separator height={RFValue(220)} />
      </ScrollView>
    </MainWrapper>
  );
};

export default TodoIncomplete;

const styles = StyleSheet.create({
  container: {
    paddingTop: RFValue(52),
    paddingHorizontal: RFValue(16),
  },
  backButton: {
    marginRight: 10,
  },
  navigationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listItem: {
    marginBottom: 10,
    borderBottomColor: theme.colors.listItemBorderColor,
    borderBottomWidth: 0.5,
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
});
