import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { useSelector } from 'react-redux';

const userDataSelector = (state: any) => state.auth.user;

const useDashboard = (props: NavigationPropsType) => {
    const { navigation } = props
    const userData = useSelector(userDataSelector);

    return {
        userData
    }
}

export default useDashboard;