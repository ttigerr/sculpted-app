import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Chip} from 'src/modules/core/ui-library';
import {ChipProps} from 'react-native-paper';

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
      {label}
    </Chip>
  );
};

export default SkillsChip;

const styles = StyleSheet.create({
  chip: {
    marginRight: 12,
  },
});
