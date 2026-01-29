import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'src/modules/core/ui-library';
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';

type GenderProps = 'Male' | 'Female' | 'Other';

type GenderSelectorProps = {
  options: GenderProps[];
  selectedGender?: GenderProps;
  onGenderChange: (gender: GenderProps) => void;
};

const GenderSelector: React.FC<GenderSelectorProps> = ({
  options,
  selectedGender = options[0],
  onGenderChange,
}) => {
  const [selected, setSelected] = useState<GenderProps>(selectedGender);

  const handleSelection = (gender: GenderProps) => {
    setSelected(gender);
    onGenderChange(gender);
  };

  return (
    <View style={styles.container}>
      <Text variant="body2" style={styles.label}>
        Gender
      </Text>
      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={selected === option ? styles.selectedOption : styles.option}
            onPress={() => handleSelection(option)}>
            {selected === option ? (
              <LinearGradient
                colors={theme.gradientColors.button}
                style={[styles.option, styles.gradientBackground, { justifyContent: 'center', alignItems: 'center' }]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text variant="paragraph1" style={styles.optionText}>
                  {option}
                </Text>
              </LinearGradient>
            ) : (
              <Text variant="paragraph1" style={styles.optionText}>
                {option}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: theme.colors.textInputColor,
    marginBottom: RFValue(5),
    fontWeight: '500',
  },
  optionsContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00000000',
    borderRadius: 17,
    paddingHorizontal: RFValue(4),
    borderWidth: 1,
    borderColor: theme.colors.textInputBorderColor,
    
  },
  option: {
    height: 38,
    paddingHorizontal: 32,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#00000000',
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  gradientBackground: {
    width: '100%',
  },
});

export default GenderSelector;
