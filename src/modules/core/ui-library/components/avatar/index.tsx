import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import  { Avatar, AvatarImageProps }  from 'react-native-paper';
import {theme} from 'src/config/theme';

const AvatarProfile: React.FC<AvatarImageProps> = ({
  source,
}) => {
  return (
    <View style={styles.container}>
        <Avatar.Image size={76} source={source}/>
        {/* Fake icon */}
        <View style={styles.icon}/>
    </View>
  );
};
export default AvatarProfile;

const styles = StyleSheet.create ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'flex-end',
    borderWidth: 8,
    borderColor: theme.colors.avartarBorderColor,
    borderRadius: 50,
  },
  icon: {
    borderRadius: 50,
    height:28,
    width: 28,
    backgroundColor: theme.colors.avartarBadgeDefaultColor,
    marginLeft: -28,
    marginBottom: -10,
  }
})