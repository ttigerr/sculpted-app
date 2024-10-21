import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION } from 'src/consts/constants';

const useTodoHome = (props: NavigationPropsType) => {

  const goBack = () => props.navigation.goBack();
  return {
    goBack
  }
}

export default useTodoHome