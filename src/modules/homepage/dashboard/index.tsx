import React, { useMemo } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  Text,
  Avartar,
  Card,
  CustomProgressBar,
  Separator,
} from 'src/modules/core/ui-library';
import useDashboard from './useDashboard';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import { NavigationPropsType } from 'src/utils/types';
import { theme } from 'src/config/theme';
import Icon from 'src/modules/core/components/icon';
import styles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import useTaskList from 'src/modules/todo/task-list/useTaskList';
import { FULL_VIRTUE_SCORE } from 'src/consts/constants';
import useTodoHome from 'src/modules/todo/home/useTodoHome';

type compassProps = {
  virtue: string;
  score: string | null;
};

type toDoProps = {
  title: string;
  status: boolean;
};

const CompassItem = ({ virtue, score }: compassProps) => (
  <View style={styles.cardTitleContainer}>
    <View style={styles.innerCardTitleContainer}>
      {virtue !== 'Add' ? (
        <Text variant="body1" style={{ fontSize: 14 }}>{virtue}</Text>
      ) : (
        <Text variant="body1" style={{ fontSize: 14, color: '#6F6F70' }}>{virtue}</Text>
      )}
    </View>
    {score !== null && (
      <Text variant="body1" style={{ fontSize: 14 }}>
        {score}/{FULL_VIRTUE_SCORE}
      </Text>
    )}
  </View>
);

const ToDoProps = ({ title, status }: toDoProps) => {
  const isAdd = title.toLowerCase() === 'add';

  return (
    <View style={styles.cardTitleContainer}>
      {isAdd ? (
        <View style={[styles.defaultDot, { backgroundColor: "#161718" }]} />
      ) : status ? (
        <View style={styles.toDoDot} />
      ) : (
        <View style={styles.defaultDot} />
      )}
      <Text
        variant="body1"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontSize: 14,
          flex: 1,
          color: isAdd ? '#7C7C7C' : '#FFFFFF',
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const Dashboard = (navigationProps: NavigationPropsType) => {
  const {
    userData,
    navigation,
    goToJournalScreen,
    onProfileInfoPressed,
    progress,
    focused,
    finalCompassData,
    compassItems
  } = useDashboard(navigationProps);

  const { completedTaskScore } = useTodoHome(navigationProps);
  const { todayTaskList } = useTaskList(navigationProps);

  return (
    <MainWrapper>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={styles.scrollView}>
          <Separator height={RFValue(20)} />

          {/* Header */}
          <Pressable
            style={styles.headerContainer}
            onPress={onProfileInfoPressed}>
            <View style={styles.avartarBorder}>
              <Avartar size={61} source={require('assets/img/profile.jpeg')} />
            </View>

            {/* Greeting message */}
            <View style={styles.innerHeaderContainer}>
              <Text variant="caption2">
                {"Let's start SCULPTING "}
                <Text>{"👋"}</Text>
              </Text>
              {userData && <Text variant="h3">{userData.name}</Text>}
            </View>
          </Pressable>

          {/* To-do and Compass Cards */}
          <View style={styles.toDoListContainer}>
            <Text variant="caption2">{"Trackers"}</Text>
            <Separator height={RFValue(8)} />
            <View style={styles.cardContent}>
              {/* To-do Card */}
              <View style={styles.cardInner}>
                <Card
                  style={styles.cardContainer}
                  onPress={() =>
                    navigation.navigate(navigationScreenNames.todoHome)
                  }>
                  <View style={styles.cardTitleContainer}>
                    <View style={styles.innerCardTitleContainer}>
                      <View style={styles.toDoBorder} />
                      <Text variant="h6">{'To Do List'}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Icon name="to-do" size="normal" />
                    </View>
                  </View>
                  {[0, 1, 2].map(index => {
                    const item = todayTaskList[index];
                    return (
                      <ToDoProps
                        key={item?.id ?? index}
                        title={item?.title ?? 'Add'}
                        status={item?.isCompleted ?? false}
                      />
                    );
                  })}
                  <CustomProgressBar color="#FDDF38" progress={completedTaskScore / 100} />
                </Card>
              </View>

              {/* Compass Card */}
              <View style={styles.compassInnerCard}>
                <Card
                  style={styles.cardContainer}
                  onPress={() =>
                    navigation.navigate(navigationScreenNames.compassHome)
                  }>
                  <View style={styles.cardTitleContainer}>
                    <View style={styles.innerCardTitleContainer}>
                      <View style={styles.compassBorder} />
                      <Text variant="h6">{'Compass'}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Icon name="compass" size="normal" />
                    </View>
                  </View>

                  {/* comnpass's widget */}
                  {compassItems.map((item, index) => (
                    <CompassItem
                      key={index}
                      virtue={item.virtue}
                      score={item.score}
                    />
                  ))}
                  <CustomProgressBar color="#EE7933" progress={progress / 100} />
                </Card>
              </View>
            </View>
          </View>

          {/* Journal Card */}
          <Separator height={RFValue(20)} />
          <View>
            <Text variant="caption2">{"Daily Journal"}</Text>
            <Separator height={RFValue(8)} />
            <Card style={styles.journalCard} onPress={goToJournalScreen}>
              <View style={styles.journalContainer}>
                <View style={styles.cardInner}>
                  <Text variant="h5" style={styles.journalTitleText}>
                    {'Fill out your journal'}
                  </Text>
                  <Text variant="caption3">
                    {
                      'Daily discipline, starts from doing the basics. Let’s make sure, we fill out our Journals & build from here'
                    }
                  </Text>
                </View>
                <View style={styles.bookmark}>
                  {focused ? (
                    <Icon
                      name="bookmark"
                      size="xlarge"
                      strokeColor="#747272"
                      fill="#514F4E"
                    />
                  ) : (
                    <Icon
                      name="bookmark"
                      size="xlarge"
                      strokeColor="#FFFFFF"
                      fill="#888786"
                    />
                  )}
                </View>
              </View>
            </Card>
          </View>
          <Separator height={100} />
        </ScrollView>
      </SafeAreaView>
    </MainWrapper>
  );
};

export default Dashboard;

