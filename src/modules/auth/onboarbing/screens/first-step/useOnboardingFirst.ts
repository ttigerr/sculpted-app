import React, { useEffect, useRef, useState } from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION, TOAST_BASE_CONFIG, TOAST_SAVE_ERROR_CONFIG } from 'src/consts/constants';
import Toast from 'react-native-toast-message';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import moment from 'moment';
import { Compass } from 'src/models/compass/compass';
import { compassService } from 'src/config/api/services/compass-service';

const useOnboardingFirstStep = (props: NavigationPropsType) => {

  const {navigation} = props;
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const submittingRef = useRef(false);
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

    // The server assigns the id and computes overallScore.
    const newVirtueGroup: Compass = {
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

    // Ignore extra taps while the request is in flight.
    if (submittingRef.current) return;
    submittingRef.current = true;
    try {
      // POST overwrites an existing entry for the same day, so check first
      // to avoid wiping today's scores and notes.
      const todayEntries = await compassService.getUserCompass(today, today);
      if (todayEntries.length > 0) {
        Toast.show({ text1: 'You have already selected 3 virtues for today.' });
        return;
      }

      await compassService.postCompass(newVirtueGroup);

      navigation.navigate({
        name: navigationScreenNames.onboardingSecondStep,
        params: { source },
      });
    } catch (error) {
      console.error('Error saving compass data:', error);
      Toast.show(TOAST_SAVE_ERROR_CONFIG);
    } finally {
      submittingRef.current = false;
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
