import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {
  // IconButton,
  Text,
  TextInput,
  Button,
  EditTextInput,
  Separator,
} from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';
import {NavigationPropsType} from 'src/utils/types';
import useSignUp from 'src/modules/auth/sign-up/useSignUp';
import GenderSelector from '../components/gender-selector';
import DateButton from '../components/date-button';
import {RFValue} from 'react-native-responsive-fontsize';
import CalendarPicker from 'src/modules/core/components/date-picker';
import moment from 'moment';

const ProfileEdit = (props: NavigationPropsType) => {
  const {navigation} = props;
  const {control} = useSignUp(props);
  const [date, setDate] = React.useState(moment());
  const [open, setOpen] = React.useState(false);

  const onCancelButtonPressed = () => {
    navigation.goBack();
  };

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmDate = React.useCallback(
    date => {
      setOpen(false);
      setDate(date);
    },
    [setOpen, setDate],
  );

  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Separator height={RFValue(48)} />
          <View style={styles.headerContainer}>
            <Text variant="h3">{'General Details'}</Text>
            <Pressable onPress={onCancelButtonPressed}>
              <Icon name="cancel" size="small" style={styles.iconButton} />
            </Pressable>
          </View>
          <TextInput
            control={control}
            name="Name"
            label="Name"
            rules={{required: 'Required field'}}
            placeholder={'Enter a name'}
          />
          <Separator height={RFValue(18)} />
          <TextInput
            control={control}
            name="email"
            label="Email"
            rules={{required: 'Required field'}}
            placeholder={'Enter email/Phone number'}
          />
          <Separator height={RFValue(18)} />
          <GenderSelector
            options={['Male', 'Female', 'Other']}
            selectedGender="Male"
            onGenderChange={gender => console.log('Gender: ', gender)}
          />
          <Separator height={RFValue(18)} />
          <DateButton
            onPress={() => setOpen(true)}
            label="Birthday"
            innerText={date.format('MM/DD/YYYY')}
          />
          <Separator height={RFValue(18)} />
          <Button onPress={onCancelButtonPressed} label="Save Changes" />
        </ScrollView>
        <CalendarPicker
          selectedDate={date}
          onDateSelect={onConfirmDate}
          isVisible={open}
        />
      </SafeAreaView>
    </MainWrapper>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  iconButton: {
    margin: -10,
  },
});
