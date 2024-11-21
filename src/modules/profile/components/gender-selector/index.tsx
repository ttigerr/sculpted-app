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
      <Text variant="caption" style={styles.label}>
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
                style={[styles.option, styles.gradientBackground]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text variant="paragraph" style={styles.selectedText}>
                  {option}
                </Text>
              </LinearGradient>
            ) : (
              <Text variant="paragraph" style={styles.optionText}>
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
    marginBottom: 10,
    marginLeft: 8,
    fontSize: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#00000000',
    borderRadius: 36,
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.textInputBorderColor,
  },
  option: {
    paddingVertical: RFValue(10),
    paddingHorizontal: 32,
    borderRadius: RFValue(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#00000000',
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    color: theme.colors.buttonText,
  },
  gradientBackground: {
    width: '100%',
  },
});

export default GenderSelector;
