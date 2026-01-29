import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Separator, Text} from 'src/modules/core/ui-library';
import {RFValue} from 'react-native-responsive-fontsize';
import CounterButton from './counter-button';
import AddNotesButton from './notes-text-input';
import { theme } from 'src/config/theme';
import useCompass from '../home/useCompass';

// Props declaration
type CompassItemProps = {
  name: string;
  value: any;
  setValue: (val: number) => void;
  isDisable: boolean;
  note: any;
  setNote: (val: String) => void;
};

const CompassItem: React.FC<CompassItemProps> = ({ 
  name, 
  value = 0, 
  setValue, 
  isDisable,
  note,
  setNote,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text variant="body" style={styles.title}>
            {name}
          </Text>
          <CounterButton value={value ?? 0} setValue={setValue} minValue={0} maxValue={10} disable={isDisable}/>
        </View>
        <Separator height={RFValue(13)} />
        <AddNotesButton note={note ?? ""} setNote={setNote}/>
      </View>
      <Separator height={RFValue(15)} />
    </>
  );
};

export default CompassItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.compassCardBackgroundColor,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 13,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});