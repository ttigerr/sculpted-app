import React, {useEffect, useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { useSelector, useDispatch} from 'react-redux';
import { setUserData, setToken } from 'src/store/slices/auth/authSlice';
import { useRoute, useNavigation} from '@react-navigation/native';
import { FieldValues, useForm } from 'react-hook-form';
import { signOut } from 'src/config/auth/sign-out';
import { userService } from 'src/config/api/services/user-service';
import Toast from 'react-native-toast-message';
import { TOAST_DELETE_ERROR_CONFIG } from 'src/consts/constants';

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

    // Go back to the login screen with no way to swipe back into the app.
    // This screen sits inside nested navigators; reset the outermost one.
    const goToLogin = () => {
        let rootNavigation = navigation;
        for (let parent = navigation.getParent?.(); parent; parent = parent.getParent?.()) {
            rootNavigation = parent;
        }
        rootNavigation.reset({
            index: 0,
            routes: [{ name: navigationScreenNames.authNavigation }],
        });
    }

    // Confirmed in the sign-out modal: clear this phone's data.
    const handleSignOut = async () => {
        setIsConfirmationModalVisible(false)
        setIsLoading(true)
        try {
            await signOut()
        } finally {
            setIsLoading(false)
        }
        goToLogin()
    }

    const deleteAccount = () => {
        setIsDeleteMordalVisible(true)
    }

    // Confirmed in the delete modal: delete the account on the server first,
    // and only sign out once that succeeded, so a failed delete never looks
    // like a successful one.
    const handleDeleteAccount = async () => {
        setIsDeleteMordalVisible(false)
        setIsLoading(true)
        try {
            await userService.deleteAccount()
        } catch (error) {
            setIsLoading(false)
            Toast.show(TOAST_DELETE_ERROR_CONFIG)
            return
        }
        try {
            await signOut()
        } finally {
            setIsLoading(false)
        }
        goToLogin()
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
        handleSignOut,
        handleDeleteAccount,
        onConfirmationModalClose,
        deleteAccount,
        goToSignup,
        loading,
    }
}

export default useProfileMain;