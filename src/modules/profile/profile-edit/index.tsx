import * as React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {
  Text,
  TextInput,
  Separator,
  Button,
} from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';
import {NavigationPropsType} from 'src/utils/types';
import useSignUp from 'src/modules/auth/sign-up/useSignUp';
import GenderSelector from '../components/gender-selector';
import DateButton from '../components/date-button';
import {RFValue} from 'react-native-responsive-fontsize';
import {theme} from 'src/config/theme';
import styles from './style';
import CalendarPicker from 'src/modules/core/components/date-picker';
import useEditProfile from './useEditProfile';
import BackButton from 'src/modules/core/components/back-button';
import useProfileMain from '../profile-main/useProfileMain';
import DateTimePicker from '@react-native-community/datetimepicker';
import ConfirmationModal from 'src/modules/core/components/confirmation-modal';
import DatePicker from 'react-native-date-picker';
import DateSelector from 'src/modules/core/components/date-selector';
import moment from 'moment';

const ProfileEdit = (props: NavigationPropsType) => {
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
    isConfirmationModalVisible,
    onConfirmationModalClose,
    onGoBack,
    bdDate,
    setBdDate,
    onConfirmDateSelector
  } = useEditProfile(props);

  const {userData} = useProfileMain(props);

  const momentObject = moment(date);
  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Separator height={RFValue(20)} />
          <View style={styles.headerContainer}>
            <BackButton onPress={onGoBack} style={styles.backButton}/>
            <Text variant="h4">{'General Details'}</Text>
          </View>
          <Separator height={RFValue(33)} />
          <TextInput
            control={control}
            name="Name"
            label="Name"
            rules={{required: 'Required field'}}
            placeholder={'Enter a name'}
            value={userData.name}
            borderRoundness={17}
            height={50}
          />
          <Separator height={RFValue(20)} />
          <TextInput
            control={control}
            name="email"
            label="Email"
            rules={{required: 'Required field'}}
            placeholder={'Enter email/Phone number'}
            borderRoundness={17}
            height={50}
            value={userData.email}
          />
          <Separator height={RFValue(20)} />
          <GenderSelector
            options={['Male', 'Female', 'Other']}
            selectedGender="Male"
            onGenderChange={gender => console.log('Gender: ', gender)}
          />
          <Separator height={RFValue(20)} />
          <DateButton
            onPress={() => setOpen(true)}
            label="Birthday"
            innerText={moment(bdDate).format('DD/MM/YYYY') || 'Select date'}
          />
          <Separator height={RFValue(20)}/>
          {/* Submit button */}
          <Button 
            label="Save"
            onPress={()=> {}}
            height={62}
          />
        </ScrollView>
        {/* <CalendarPicker
          selectedDate={date}
          onDateSelect={onConfirmDate}
          isVisible={open}
        /> */}
        <DateSelector 
          visible={open}
          onDateChange={setBdDate} 
          date={bdDate} 
          onClose={onConfirmDateSelector}       
        />
      </SafeAreaView>
      <ConfirmationModal
        visible={isConfirmationModalVisible}
        title="Discard changes?"
        description='If you go back now, you will lose your changes.'
        onClose={onConfirmationModalClose}
        children={
          <>
            <Pressable style={styles.buttonContainer} onPress={onCancelButtonPressed}>
              <Text variant="paragraph" style={styles.primaryButtonText}>
                  {"Discard changes"}
              </Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={onConfirmationModalClose}>
              <Text variant="paragraph" style={styles.cancelButtonText}>
                  {"Continue editing"}
              </Text>
            </Pressable>
          </>
        }
      />
    </MainWrapper>
  );
};

export default ProfileEdit;
