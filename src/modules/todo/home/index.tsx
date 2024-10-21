import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {RFValue} from 'react-native-responsive-fontsize';
import {Separator, Text} from 'src/modules/core/ui-library';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import useTodoHome from './useTodoHome';
import {secondaryGradientColorList} from 'src/consts/arrays';
import SearchBar from '../components/search-bar';
import DayPicker from '../components/day-picker';

const TodoHome = (props: NavigationPropsType) => {
  const {goBack} = useTodoHome(props);
  return (
    <MainWrapper colorArray={secondaryGradientColorList}>
      <ScrollView style={styles.container}>
        <View style={styles.navigationBarContainer}>
          <BackButton style={styles.backButton} onPress={goBack} />
          <Text variant="paragraph" style={styles.navigationTitle}>
            {'To-do List'}
          </Text>
        </View>
        <Separator height={RFValue(24)} />
        <SearchBar />
        <Separator height={RFValue(16)} />
        <DayPicker />
      </ScrollView>
    </MainWrapper>
  );
};

export default TodoHome;

const styles = StyleSheet.create({
  container: {
    paddingTop: RFValue(82),
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
  navigationTitle: {},
});
