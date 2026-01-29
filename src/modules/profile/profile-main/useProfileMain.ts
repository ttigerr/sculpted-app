import React, {useEffect, useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { useSelector, useDispatch} from 'react-redux';
import { setUserData, setToken } from 'src/store/slices/auth/authSlice';
import { useRoute, useNavigation} from '@react-navigation/native';
import { loginMockApiCall, signoutMockApiCall } from 'src/utils/api/mock-api-call';
import { FieldValues, useForm } from 'react-hook-form';

const userDataSelector = (state: any) => state.auth.user;

const useProfileMain = (props: NavigationPropsType) => {
    const { navigation, route } = props;
    const userData = useSelector(userDataSelector);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteMordalVisible] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean>(false);

    // To check if a route is from "Dashboard" or not
    const fromDashboard = route?.params?.from === navigationScreenNames.dashboard;

    // To reverse back to previous screen
    const onBackButtonPressed = () => navigation.goBack();

    // To go to profile edit screen
    const goToEditScreen = () => {
        navigation.navigate(navigationScreenNames.edit, {from: navigationScreenNames.profile});
    };

    // To indicate that it navigates from Profile main screen
    const resetPassword = () => {
      navigation.navigate({
        name: navigationScreenNames.emailVerification,
        params: { source: 'profile' },
        key: `profile-${Date.now()}` // this forces a new screen instance
      });
    };
    
    // To go to journal reminder screen
    const journalReminder = () => {
        navigation.navigate(navigationScreenNames.reminderEdit, {from: navigationScreenNames.profile})
        console.log(fromDashboard)
    }

    // To handle sign out
    const goToSignup = async () => {
        setIsLoading(true); // Show loader
        setIsConfirmationModalVisible(false)
        setIsDeleteMordalVisible(false)

        try {
          // Optional delay to ensure the spinner is visible before navigating
          await new Promise(resolve => setTimeout(resolve, 2000));
      
          navigation.navigate(navigationScreenNames.signUp, {
            from: navigationScreenNames.profile,
          });
        } catch (error) {
          console.log('Error navigating to sign up:', error);
        } finally {
          setIsLoading(false); // Hide loader after navigation
        }
    };

    const signout = () => {
        setIsConfirmationModalVisible(true)
    }

    const deleteAccount = () => {
        setIsDeleteMordalVisible(true)
    }

    const onConfirmationModalClose = () => {
        setIsConfirmationModalVisible(false)
        setIsDeleteMordalVisible(false)
    }

    return {
        onBackButtonPressed,
        goToEditScreen,
        resetPassword,
        journalReminder,
        userData,
        fromDashboard,
        isConfirmationModalVisible,
        isDeleteModalVisible,
        signout,
        onConfirmationModalClose,
        deleteAccount,
        goToSignup,
        loading,
    }
}

export default useProfileMain;