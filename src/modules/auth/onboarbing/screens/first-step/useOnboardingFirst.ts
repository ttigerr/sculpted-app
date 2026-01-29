import React, { useEffect, useState } from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION, TOAST_BASE_CONFIG } from 'src/consts/constants';
import Toast from 'react-native-toast-message';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const useOnboardingFirstStep = (props: NavigationPropsType) => {

  const {navigation} = props;
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [source, setSource] = useState(''); // default fallback

  useEffect(() => {
    if (props.route.params?.source) {
      setSource(props.route.params.source);
    }
  }, [props.route.params?.source]);

  // const goBack = async () => {
  //   try {
  //     const storedData = await AsyncStorage.getItem('compass');
  //     if (storedData) {
  //       const parsedData = JSON.parse(storedData);
  //       const existingData = Array.isArray(parsedData) ? parsedData : (parsedData?.compass || []);
  
  //       // Remove the last 3 entries
  //       const updatedData = existingData.slice(0, -3);
  
  //       // Save updated data back
  //       await AsyncStorage.setItem('compass', JSON.stringify(updatedData));
  //     }
  
  //     // Navigate back
  //     navigation.goBack();
  
  //   } catch (error) {
  //     console.error('Error removing last 3 compass entries:', error);
  //   }
  // };

  const goBack = () => navigation.goBack();
  

  const toggleChip = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter(item => item !== chip));
    } else {
      if (selectedChips.length < VIRTUES_MAX_SELECTION) {
        setSelectedChips([...selectedChips, chip]);
      } else {
        Toast.show(TOAST_BASE_CONFIG);
      }
    }
  };

  const onSubmit = async () => {
  if (selectedChips.length === VIRTUES_MAX_SELECTION) {
    const today = moment().format('YYYY-MM-DD');

    const newVirtueGroup = {
      id: Date.now(),
      creationDate: today,
      virtue1: selectedChips[0],
      virtue1Score: 0,
      virtue1Note: '',
      virtue2: selectedChips[1],
      virtue2Score: 0,
      virtue2Note: '',
      virtue3: selectedChips[2],
      virtue3Score: 0,
      virtue3Note: '',
      overallScore: 0,
    };

    try {
      const storedData = await AsyncStorage.getItem('compass');

      let updatedData: any[] = [];

      if (storedData) {
        const json = JSON.parse(storedData);
        updatedData = Array.isArray(json) ? json : (json?.compass || []);

        const isTodayExist = updatedData.some(
          (item) => moment(item.creationDate).isSame(today, 'day')
        );

        if (isTodayExist) {
          Toast.show({ text1: 'You have already selected 3 virtues for today.' });
          return;
        } else {
          updatedData.push(newVirtueGroup);
        }
      } else {
        updatedData = [newVirtueGroup];
      }

      await AsyncStorage.setItem('compass', JSON.stringify(updatedData));

      navigation.navigate({
        name: navigationScreenNames.onboardingSecondStep,
        params: { source },
      });
    } catch (error) {
      console.error('Error saving compass data:', error);
    }
  } else {
    Toast.show(TOAST_BASE_CONFIG);
  }
};
  
  return {
    goBack,
    toggleChip,
    selectedChips,
    onSubmit,
  };
};

export default useOnboardingFirstStep;
