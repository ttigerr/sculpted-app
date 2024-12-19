import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
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
import {theme} from 'src/config/theme';
import styles from './style';
import useProfileEdit from './useProfileEdit';
import CalendarPicker from 'src/modules/core/components/date-picker';
import useEditProfile from './useEditProfile';
import moment from 'moment';

const ProfileEdit = (props: NavigationPropsType) => {
  const {navigation} = props;
  const {control} = useSignUp(props);
  const {
    date,
    open,
    setDate,
    setOpen,
    onCancelButtonPressed,
    onDismissSingle,
    onConfirmDate,
    onRemindersPress,
  } = useEditProfile(props);

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
          <Text variant="caption" style={styles.reminderText}>
            {'Reminders'}
          </Text>
          <Pressable
            style={styles.reminderContainer}
            onPress={onRemindersPress}>
            <Text variant="body" style={{marginLeft: 8}}>
              {'Journal'}
            </Text>
            <View style={styles.reminderTime}>
              <Text variant="body1" style={styles.time}>
                {'09:00 am'}
              </Text>
            </View>
          </Pressable>
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
