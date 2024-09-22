/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View} from 'react-native';
import Email from 'assets/icons/ic-email.tsx';
import Lock from 'assets/icons/ic-lock.tsx';
import EyeHide from 'assets/icons/ic-eye-hide.tsx';
import Thick from 'assets/icons/ic-eye-hide.tsx';
import LockOutlined from 'assets/icons/ic-lock-outlined.tsx';
import NotificationOutlined from 'assets/icons/ic-notification-outlined.tsx';
import QuestionMark from 'assets/icons/ic-question-mark.tsx';
import SignOut from 'assets/icons/ic-signout.tsx';
import Delete from 'assets/icons/ic-delete.tsx';
import Edit from 'assets/icons/ic-edit.tsx';
import Return from 'assets/icons/ic-return.tsx';
import RightArrow from 'assets/icons/ic-right-arrow.tsx';
import Cancel from 'assets/icons/ic-cancel.tsx';
import Calendar from 'assets/icons/ic-calendar.tsx';
import IconProps from './types/iconTypes';
import iconSize from './styles/size';

const Icon = ({
  name,
  size,
  disabled = false,
  width,
  height,
  x,
  y,
  strokeColor,
  fill,
}: IconProps): JSX.Element => {
  let localSize;
  switch (size) {
    case 'xsmall':
      localSize = iconSize.xsmall;
      break;
    case 'small':
      localSize = iconSize.small;
      break;
    case 'normal':
      localSize = iconSize.normal;
      break;
    case 'medium':
      localSize = iconSize.medium;
      break;
    case 'large':
      localSize = iconSize.large;
      break;
    case 'xlarge':
      localSize = iconSize.xlarge;
      break;
    default:
      localSize = iconSize.normal;
      break;
  }

  const localProps: IconProps = {
    width: width || localSize,
    height: height || localSize,
    x,
    y,
    strokeColor,
    fill,
  };

  switch (name) {
    case 'email':
      return <Email {...localProps} />;
    case 'lock':
      return <Lock {...localProps} />;
    case 'eye-hide':
      return <EyeHide {...localProps} />;
    case 'thick':
      return <Thick {...localProps} />;
    case 'lock-outlined':
      return <LockOutlined {...localProps} />;
    case 'notification-outlined':
      return <NotificationOutlined {...localProps} />;
    case 'question-mark':
      return <QuestionMark {...localProps} />;
    case 'signout':
      return <SignOut {...localProps} />;
    case 'delete':
      return <Delete {...localProps} />;
    case 'edit':
      return <Edit {...localProps} />;
    case 'return':
      return <Return {...localProps} />;
    case 'right-arrow':
      return <RightArrow {...localProps} />;
    case 'cancel':
      return <Cancel {...localProps} />;
    case 'calendar':
      return <Calendar {...localProps} />;
    default:
      return <View />;
  }
};

export default Icon;
