import React, { useEffect, useState } from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  Text,
  Avartar,
  ListItem,
  AlertDialog,
  Separator,
} from 'src/modules/core/ui-library';
import {NavigationPropsType} from 'src/utils/types';
import Icon from 'src/modules/core/components/icon';
import {theme} from 'src/config/theme';
import styles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import useProfileMain from './useProfileMain';
import ConfirmationModal from 'src/modules/core/components/confirmation-modal';
import { useRoute } from '@react-navigation/native';
import BackButton from 'src/modules/core/components/back-button';
import LoadingModal from 'src/modules/core/components/loading-modal';

const ProfileMain = (props : NavigationPropsType) => {
  const {userData, fromDashboard} = useProfileMain(props);

  const {
    onBackButtonPressed, 
    goToEditScreen, 
    resetPassword, 
    journalReminder,
    isConfirmationModalVisible,
    isDeleteModalVisible,
    signout,
    onConfirmationModalClose,
    deleteAccount,
    handleSignOut,
    loading
  } = useProfileMain(props);

  const route = useRoute();

  const [source, setSource] = useState('tab'); // default fallback

    useEffect(() => {
      if (props.route.params?.source) {
        setSource(props.route.params.source);
      }
    }, [props.route.params?.source]);
  
  return (

    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header container */}
          <View style={styles.headerContainer}>
            { source === 'dashboard' && (
                <BackButton onPress={onBackButtonPressed} style={styles.backButton}/>
              )
            }
            <View style={styles.profileIconWrapper}>
              <View style={styles.avatarIconWrapper}>
                <Avartar size={76} source={require('assets/img/profile.jpeg')} />
              </View>
              <Pressable style={styles.icon} onPress={goToEditScreen}>
                <Icon name="edit" size="small"/>
              </Pressable>
            </View>
            <Pressable onPress={goToEditScreen} style={{right: 0, position: 'absolute'}}>
              <View style={styles.editContainer}>
                <Text variant="body3">{'Edit'}</Text>
                <Icon name="edit" size="small" />
              </View>
            </Pressable>
          </View>

          {/* Username and email sections */}
          <View style={styles.userNameContainer}>
            {userData && <Text variant="h1" style={styles.title}>{userData.name}</Text>}
            {userData && <Text variant="body1">{userData.email}</Text>}
          </View>
          
          {/* Detail's section */}
          <View style={styles.detailContainer}>
            <View style={styles.detailInnerContainer}>
              <Text variant="body" style={styles.detailText}>
                {'Gender'}
              </Text>
              <Text variant="body" style={{fontSize: 20}}>{'Male'}</Text>
            </View>
            <View style={styles.horizontalDivider}/>
            <View style={styles.detailInnerContainer}>
              <Text variant="body" style={styles.detailText}>
                {'Birthday'}
              </Text>
              <Text variant="body" style={{fontSize: 20}}>{'15/09/2004'}</Text>
            </View>
          </View>
          <Separator height={RFValue(20)}/>
          {/* List items */}
          <ListItem
            title="Reset Password"
            variant="body1"
            left={<Icon name="lockFocused" size="normal" />}
            right={<Icon name="right-arrow" size="small" />}
            onPress={resetPassword}
          />
          <Separator height={RFValue(20)}/>
          <ListItem
            title="Journal Reminder"
            variant="body1"
            left={<Icon name="notification-outlined" size="normal" />}
            right={<Icon name="right-arrow" size="small" />}
            onPress={journalReminder}
          />
          <Separator height={RFValue(20)}/>
          <View style={styles.groupContainer}>
            <ListItem
              title="Help & Support"
              variant="body1"
              left={<Icon name="question-mark" size="normal" />}
              right={<Icon name="right-arrow" size="small" />}
              onPress={journalReminder}
            />
            <View style={styles.divider} />
            <ListItem
              title="Sign out"
              variant="body1"
              left={<Icon name="signout" size="normal" />}
              right={<Icon name="right-arrow" size="small" />}
              onPress={signout}
            />
            <View style={styles.divider} />
            <ListItem
              title="Delete account"
              variant="delete"
              left={<Icon name="delete" size="normal" />}
              right={<Text variant="body1" style={styles.userText}>{'@' + "Username"}</Text>}
              onPress={deleteAccount}
            />
          </View>
          <Separator height={RFValue(220)} />
        </ScrollView>
      </SafeAreaView>

      {/* Signout alert */}
      <ConfirmationModal
        visible={isConfirmationModalVisible}
        title="Are you sure you want to sign out of your account?"
        description='By signing out of your account, you will be taken to the log in page again & your data will still be saved'
        onClose={onConfirmationModalClose}
        children={
          <>
            <Pressable style={styles.buttonContainer} onPress={handleSignOut}>
              <Text variant="paragraph" style={styles.primaryButtonText}>
                  {"Sign out"}
              </Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={onConfirmationModalClose}>
              <Text variant="paragraph" style={styles.cancelButtonText}>
                  {"Cancel"}
              </Text>
            </Pressable>
          </>
        }
      />
      {/* Delete account alert */}
      <ConfirmationModal
        visible={isDeleteModalVisible}
        title="Are you sure you want to delete your  account? "
        description='By deleting your account you will lose your data. Alternatively you can deactivate your account.'
        onClose={onConfirmationModalClose}
        children={
          <>
            <Pressable style={styles.buttonContainer} onPress={handleSignOut}>
              <Text variant="delete" style={styles.primaryButtonText}>
                  {"Delete Account"}
              </Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} >
              <Text variant="body1" style={styles.primaryButtonText}>
                  {"Deactivate Account"}
              </Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={onConfirmationModalClose}>
              <Text variant="paragraph" style={styles.cancelButtonText}>
                  {"Cancel"}
              </Text>
            </Pressable>
          </>
        }
      />
      <LoadingModal visible={loading} />
    </MainWrapper>
  );
};

export default ProfileMain;
