import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';

const useProfileMain = (props: NavigationPropsType) => {
    const { navigation } = props

    const onBackButtonPressed = () => navigation.goBack();
    const goToEditScreen = () => {
        navigation.navigate(navigationScreenNames.edit);
    };

    // To indicate that it navigates from Profile main screen
    const resetPassword = () => {
        navigation.navigate(navigationScreenNames.emailVerification, {from: navigationScreenNames.profileNavigation})
    };

    const journalReminder = () => {
        navigation.navigate(navigationScreenNames.onboardingSecondStep, {from: navigationScreenNames.profileNavigation})
    }

    return {
        onBackButtonPressed,
        goToEditScreen,
        resetPassword,
        journalReminder,
    }
}

export default useProfileMain;