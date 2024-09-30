/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View} from 'react-native';
import Email from 'assets/icons/ic-email.tsx';
import Lock from 'assets/icons/ic-lock.tsx';
import EyeHide from 'assets/icons/ic-eye-hide.tsx';
import Thick from 'assets/icons/ic-eye-hide.tsx';
import LockOutlined from 'assets/icons/ic-lock-outlined.tsx';
import BackButton from 'assets/icons/ic-back-button.tsx';
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
    case 'back-button':
      return <BackButton {...localProps} />;
    default:
      return <View />;
  }
};

export default Icon;
