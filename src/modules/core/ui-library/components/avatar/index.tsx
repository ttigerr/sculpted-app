import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import  { Avatar, AvatarImageProps }  from 'react-native-paper';
import {theme} from 'src/config/theme';

const AvatarProfile: React.FC<AvatarImageProps> = ({
  style,
  source,
  size,
}) => {
  return (
    <Avatar.Image size={size} source={source} style={style}/>
  );
};
export default AvatarProfile;
