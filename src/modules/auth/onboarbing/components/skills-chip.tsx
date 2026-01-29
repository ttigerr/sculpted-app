import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Chip, Text} from 'src/modules/core/ui-library';
import {ChipProps} from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

type ItemProps = ChipProps & {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const SkillsChip: React.FC<ItemProps> = ({
  label,
  selected,
  onPress,
  ...props
}) => {
  return (
    <Chip selected={selected} style={styles.chip} onPress={onPress} {...props}>
      {
        <Text variant="paragraph1">{label}</Text>
      }
    </Chip>
  );
};

export default SkillsChip;

const styles = StyleSheet.create({
  chip: {
    height: 34,
    marginRight: 7,
  },
});
