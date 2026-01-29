import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import moment from 'moment';
import useProfileMain from '../profile-main/useProfileMain';

type EditProfileFormData = {
  email: string;
  password: string;
  confirmPassword: string;
}

const useEditProfile = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const [date, setDate] = React.useState(moment());
  const [open, setOpen] = React.useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [bdDate, setBdDate] = useState(new Date());

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

  const onConfirmationModalClose = () => {
    setIsConfirmationModalVisible(false)
  }

  const onConfirmDateSelector = () => {
    setOpen(false)
  }

  const onGoBack = () => {
    setIsConfirmationModalVisible(true)
  }

  return {
    date,
    open,
    setDate,
    setOpen,
    onCancelButtonPressed,
    onDismissSingle,
    onConfirmDate,
    onRemindersPress,
    isConfirmationModalVisible,
    onConfirmationModalClose,
    onGoBack,
    bdDate,
    setBdDate,
    onConfirmDateSelector,
  }
}

export default useEditProfile;