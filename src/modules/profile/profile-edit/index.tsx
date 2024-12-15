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
import {RFValue} from 'react-native-responsive-fontsize';
import { theme } from 'src/config/theme';
import styles from './style';
import useProfileEdit from './useProfileEdit';

const ProfileEdit = (props: NavigationPropsType) => {
  const {navigation} = props;
  const {control} = useSignUp(props);

  // Control the navigation for each screens
  const {
    onBackButtonPressed
  } = useProfileEdit(props);

  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Separator height={RFValue(48)} />
          <View style={styles.headerContainer}>
            <Text variant="h3">{'General Details'}</Text>
            <Pressable onPress={onBackButtonPressed}>
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
          <EditTextInput
            control={control}
            name="Birthday"
            label="Birthday"
            placeholder={''}
            right={<Icon name="calendar" size="small" />}
          />
          <Text variant='caption' style={styles.reminderText}>{"Reminders"}</Text>
          <View style={styles.reminderContainer}>
            <Text variant='body' style={{marginLeft: 8}}>{"Journal"}</Text>
            <Pressable style={styles.reminderTime}>
                <Text variant='body1' style={styles.time}>{'09:00 am'}</Text>
            </Pressable>
          </View>
          <Separator height={RFValue(100)} />

          <Button label="Save Changes" />
          <Separator height={RFValue(100)} />
        </ScrollView>
      </SafeAreaView>
    </MainWrapper>
  );
};

export default ProfileEdit;

