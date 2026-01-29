import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomStatusBar from '../status-bar/statusBar';
import {RadialGradient} from 'react-native-gradients';
import {theme} from '../../../../config/theme';
import styles from './styles';
import {Color} from 'src/utils/types';
interface MainWrapperPropsType {
  children?: React.ReactNode;
  colorArray?: Color[];
}

const defaultColorList = [
  {
    offset: '0%',
    color: theme.colors.gradientBackgroundTop,
    opacity: '1',
  },
  {offset: '87%', color: theme.colors.background, opacity: '1'},
  {offset: '100%', color: theme.colors.background, opacity: '1'},
];
const MainWrapper: React.FC<MainWrapperPropsType> = ({
  children,
  colorArray = defaultColorList,
}) => (
  <>
    <CustomStatusBar theme="light" />
    <View style={[styles.container, StyleSheet.absoluteFill]}></View>
    {/* <View style={styles.topGradient}>
      <RadialGradient x="0%" y="0%" rx="50%" ry="50%" colorList={colorArray} />
    </View> */}
    {children}
  </>
);

MainWrapper.defaultProps = {
  children: undefined,
};

export default MainWrapper;
