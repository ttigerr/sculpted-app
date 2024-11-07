import React, {useCallback, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import {
  Text,
  Avartar,
  Card,
  CustomProgressBar,
  Separator,
} from 'src/modules/core/ui-library';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {NavigationPropsType} from 'src/utils/types';
import {theme} from 'src/config/theme';
import Icon from 'src/modules/core/components/icon';
import styles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import {SCREEN_WIDTH} from 'src/consts/constants';

// Data for compass's content
const COMPPASS_DATA = [
  {
    id: '1a',
    title: 'Honesty',
    status: true,
    score: '10/10',
  },
  {
    id: '2a',
    title: 'Responsible',
    status: true,
    score: '10/10',
  },
  {
    id: '3a',
    title: 'Generous',
    status: false,
    score: '8.5/10',
  },
];

type compassProps = {title: string; score: string; status: boolean};
const CompassItem = ({title, score, status}: compassProps) => (
  <View style={styles.cardTitleContainer}>
    <View style={styles.innerCardTitleContainer}>
      {status ? (
        <View style={styles.compassDot} />
      ) : (
        <View style={styles.defaultDot} />
      )}
      <Text variant="body2">{title}</Text>
    </View>
    <Text variant="body2">{score}</Text>
  </View>
);

// Data for To-do list's content
const TODO_DATA = [
  {
    id: '1b',
    title: 'Meal Prep',
    status: true,
  },
  {
    id: '2b',
    title: 'Cooking Dinner',
    status: true,
  },
  {
    id: '3b',
    title: 'Dishwashing',
    status: false,
  },
];

type toDoProps = {title: string; status: boolean};
const ToDoProps = ({title, status}: toDoProps) => (
  <View style={styles.cardTitleContainer}>
    {status ? (
      <View style={styles.toDoDot} />
    ) : (
      <View style={styles.defaultDot} />
    )}
    <Text variant="body2">{title}</Text>
  </View>
);
const colorList = [
  {offset: '0%', color: '#FFFFFF', opacity: '0.16'},
  {offset: '100%', color: '#14191F', opacity: '0'},
];

const CARD_WIDTH = SCREEN_WIDTH / 2 - 20;

const Dashboard = (navigationProps: NavigationPropsType) => {
  const [focused, setFocused] = useState(false);

  // Navigate to Journal Screen
  const {navigation} = navigationProps;
  const goToJournalScreen = () => {
    setFocused(prev => !prev);
    navigation.navigate('Journal');
  };
  const onProfileInfoPressed = () => {
    navigation.navigate(navigationScreenNames.profileNavigation);
  };

  return (
    <MainWrapper>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={styles.scrollView}>
          {/* Header parts contained avartar, greeting message and user's name */}
          <Pressable
            style={styles.headerContainer}
            onPress={onProfileInfoPressed}>
            <View style={styles.avartarBorder}>
              <Avartar size={46} source={require('assets/img/profile.jpeg')} />
            </View>
            <View style={styles.innerHeaderContainer}>
              <Text variant="caption" style={{paddingBottom: 10, fontSize: 14}}>
                {"Let's start SCULPTING 👋"}
              </Text>
              <Text variant="h3">{'User Name'}</Text>
            </View>
          </Pressable>
          {/* Gretting message */}
          <Text variant="greeting">
            {'Every day, let’s get closer to the best version of you!'}
          </Text>
          {/* To-do list content */}
          <View style={styles.toDoListContainer}>
            <Text variant="caption">{"Today's task"}</Text>
            <View style={styles.cardContent}>
              {/* compass's content */}
              <View style={styles.cardInner}>
                <Card 
                    style={styles.cardContainer} 
                    width={CARD_WIDTH}
                    onPress={() =>
                        navigation.navigate(navigationScreenNames.compassHome)
                    }
                >
                  {/* Header's part */}
                  <View style={styles.cardTitleContainer}>
                    <View style={styles.innerCardTitleContainer}>
                      <View style={styles.compassBorder} />
                      <Text variant="body1">{'Compass'}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Icon name="compass" size="normal" />
                    </View>
                  </View>
                  <FlatList
                    data={COMPPASS_DATA}
                    renderItem={({item}) => (
                      <CompassItem
                        title={item.title}
                        score={item.score}
                        status={item.status}
                      />
                    )}
                  />
                  <View style={styles.progressBar}></View>
                  <CustomProgressBar color="#EE7933" progress={0.5} />
                </Card>
              </View>
              {/* To-do List's content */}
              <View style={styles.cardInner}>
                <Card
                  style={styles.cardContainer}
                  width={CARD_WIDTH}
                  onPress={() =>
                    navigation.navigate(navigationScreenNames.todoHome)
                  }>
                  <View style={styles.cardTitleContainer}>
                    <View style={styles.innerCardTitleContainer}>
                      <View style={styles.toDoBorder} />
                      <Text variant="body1">{'To-Do'}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Icon name="to-do" size="normal" />
                    </View>
                  </View>
                  <FlatList
                    data={TODO_DATA}
                    renderItem={({item}) => (
                      <ToDoProps title={item.title} status={item.status} />
                    )}
                  />
                  <CustomProgressBar color="#FDDF38" progress={0.5} />
                </Card>
              </View>
            </View>
          </View>
          {/* Journal's content */}
          <View>
            <Card style={styles.journalCard} onPress={goToJournalScreen}>
              <View style={styles.journalContainer}>
                <View style={styles.cardInner}>
                  <Text variant="h4" style={{marginBottom: 10}}>
                    {'Fill out your journal'}
                  </Text>
                  <Text variant="caption" style={{fontSize: RFValue(10)}}>
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
