import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION, TOAST_BASE_CONFIG } from 'src/consts/constants';
import Toast from 'react-native-toast-message';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';

const useOnboardingFirstStep = (props: NavigationPropsType) => {
  const [selectedChips, setSelectedChips] = useState<String[]>([]);

  const goBack = () => props.navigation.goBack();

  const toggleChip = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter(item => item !== chip));
    } else {
      // Si no está seleccionado, verificamos si ya alcanzó el límite
      if (selectedChips.length < VIRTUES_MAX_SELECTION) {
        setSelectedChips([...selectedChips, chip]);
      } else {
        Toast.show(TOAST_BASE_CONFIG);
      }
    }
    console.log("Selected chips: ", selectedChips); // Logging las selecciones
  };

  const onSubmit = () => {
    if(selectedChips.length == VIRTUES_MAX_SELECTION) {
      props.navigation.navigate(navigationScreenNames.onboardingSecondStep);
    } else {
      Toast.show(TOAST_BASE_CONFIG);
    }
  };

  return {
    goBack,
    toggleChip,
    selectedChips,
    onSubmit
  }
}

export default useOnboardingFirstStep