import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Separator, Text} from 'src/modules/core/ui-library';
import {RFValue} from 'react-native-responsive-fontsize';
import CounterButton from './counter-button';
import AddNotesButton from './add-notes-button';

type CompassItemProps = {
  name: string;
  value: any;
  setValue: (value: number) => void;
  submitCompass: () => void;
  note: string;
  setNote: (value: string) => void;
};

const CompassItem: React.FC<CompassItemProps> = ({name, value, setValue, submitCompass}) => {
const CompassItem: React.FC<CompassItemProps> = ({name, value, setValue, note, setNote}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text variant="h4" style={styles.title}>
            {name}
          </Text>
          <CounterButton value={value} setValue={setValue} minValue={0} maxValue={10} submitCompass={submitCompass}/>
        </View>
        <Separator height={RFValue(13)} />
        <AddNotesButton note={note} setNote={setNote}/>
      </View>
      <Separator height={RFValue(8)} />
    </>
  );
};

export default CompassItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161718',
    borderRadius: RFValue(30),
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(13),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(15),
  },
  text: {
    marginHorizontal: 10,
  },
});
