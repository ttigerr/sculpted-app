import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import moment from 'moment';

type EditProfileFormData = {
  email: string;
  password: string;
  confirmPassword: string;
}

const useEditProfile = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const [date, setDate] = React.useState(moment());
  const [open, setOpen] = React.useState(false);

  const onCancelButtonPressed = () => {
    navigation.goBack();
  };

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmDate = React.useCallback(
    date => {
      setOpen(false);
      setDate(date);
    },
    [setOpen, setDate],
  );

  const onRemindersPress = () => {
    navigation.navigate(navigationScreenNames.reminderEdit, {from: navigationScreenNames.profileNavigation})
}

  return {
    date,
    open,
    setDate,
    setOpen,
    onCancelButtonPressed,
    onDismissSingle,
    onConfirmDate,
    onRemindersPress
  }
}

export default useEditProfile;