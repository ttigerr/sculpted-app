import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { useSelector, UseSelector } from 'react-redux';

const userDataSelector = (state: any) => state.auth.user;

const useProfileMain = (props: NavigationPropsType) => {
    const { navigation } = props
    const userData = useSelector(userDataSelector);
    const onBackButtonPressed = () => navigation.goBack();
    const goToEditScreen = () => {
        navigation.navigate(navigationScreenNames.edit);
    };

    // To indicate that it navigates from Profile main screen
    const resetPassword = () => {
        navigation.navigate(navigationScreenNames.emailVerification, {from: navigationScreenNames.profileNavigation})
    };

    const journalReminder = () => {
        navigation.navigate(navigationScreenNames.reminderEdit, {from: navigationScreenNames.profileNavigation})
    }

    return {
        onBackButtonPressed,
        goToEditScreen,
        resetPassword,
        journalReminder,
        userData
    }
}

export default useProfileMain;