import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION } from 'src/consts/constants';

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
      }
    }
    console.log("Selected chips: ", selectedChips); // Logging las selecciones
  };

  return {
    goBack,
    toggleChip,
    selectedChips
  }
}

export default useOnboardingFirstStep