/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View} from 'react-native';
import Email from 'assets/icons/ic-email.tsx';
import Lock from 'assets/icons/ic-lock.tsx';
import EyeHide from 'assets/icons/ic-eye-hide.tsx';
import EyeShow from 'assets/icons/ic-eye-show.tsx';
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
import Stat from 'assets/icons/ic-stat.tsx';
import Profile from 'assets/icons/ic-profile.tsx';
import Home from 'assets/icons/ic-home.tsx';
import ToDo from 'assets/icons/ic-to-do.tsx';
import Compass from 'assets/icons/ic-compass.tsx';
import Bookmark from 'assets/icons/ic-bookmark.tsx';
import Add from 'assets/icons/ic-add.tsx';
import Tick from 'assets/icons/ic-tick.tsx';
import Cross from 'assets/icons/ic-cross.tsx';
import IconProps from './types/iconTypes';
import iconSize from './styles/size';
import BackButton from 'assets/icons/ic-back-button.tsx';
import FilledLock from 'assets/icons/ic-filled-lock.tsx';
import Key from 'assets/icons/ic-key.tsx';
import OpenLock from 'assets/icons/ic-open-lock.tsx';
import Search from 'assets/icons/ic-search.tsx';
import Schedule from 'assets/icons/ic-schedule.tsx';
import TickSquare from 'assets/icons/ic-tick-square.tsx';
import Plus from 'assets/icons/ic-plus.tsx';
import Minus from 'assets/icons/ic-minus.tsx';
import User from 'assets/icons/ic-user.tsx';
import HomeFocused from 'assets/icons/ic-home-focused.tsx';
import StatFocued from 'assets/icons/ic-stat-focused.tsx';
import ProfileFocused from 'assets/icons/ic-profile-focused.tsx';
import AddTask from 'assets/icons/ic-add-task.tsx';
import LockFocus from 'assets/icons/ic-lock-focused.tsx';

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
    case 'xxlarge':
      localSize = iconSize.xxlarge;
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
    case 'eye-show':
      return <EyeShow {...localProps} />;
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
    case 'stat':
      return <Stat {...localProps} />;
    case 'statFocused':
      return <StatFocued {...localProps} />;
    case 'home':
      return <Home {...localProps} />;
    case 'homeFocused':
      return <HomeFocused {...localProps} />;
    case 'profile':
      return <Profile {...localProps} />;
    case 'profileFocused':
      return <ProfileFocused {...localProps} />;
    case 'to-do':
      return <ToDo {...localProps} />;
    case 'compass':
      return <Compass {...localProps} />;
    case 'bookmark':
      return <Bookmark {...localProps} />;
    case 'add':
      return <Add {...localProps} />;
    case 'tick':
      return <Tick {...localProps} />;
    case 'cross':
      return <Cross {...localProps} />;
    case 'back-button':
      return <BackButton {...localProps} />;
    case 'filled-lock':
      return <FilledLock {...localProps} />;
    case 'key':
      return <Key {...localProps} />;
    case 'open-lock':
      return <OpenLock {...localProps} />;
    case 'search':
      return <Search {...localProps} />;
    case 'schedule':
      return <Schedule {...localProps} />;
    case 'tick-square':
      return <TickSquare {...localProps} />;
    case 'plus':
      return <Plus {...localProps} />;
    case 'minus':
      return <Minus {...localProps} />;
    case 'user':
      return <User {...localProps} />;
    case 'addTask':
      return <AddTask {...localProps} />;
    case 'lockFocused':
      return <LockFocus {...localProps} />;
    default:
      return <View />;
  }
};

export default Icon;
