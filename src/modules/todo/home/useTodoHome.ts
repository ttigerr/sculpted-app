import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION } from 'src/consts/constants';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';

const useTodoHome = (props: NavigationPropsType) => {

  const { navigation } = props

  const goBack = () => navigation.goBack();
  const onTaskProgressPress = () => navigation.navigate(navigationScreenNames.todoTaskList)
  return {
    goBack,
    onTaskProgressPress
  }
}

export default useTodoHome