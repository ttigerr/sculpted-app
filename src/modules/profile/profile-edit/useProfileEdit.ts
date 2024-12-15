import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';

const useProfileEdit = (props: NavigationPropsType) => {
    const { navigation } = props

    const onBackButtonPressed = () => navigation.goBack();

    return {
        onBackButtonPressed,

    }
}

export default useProfileEdit;