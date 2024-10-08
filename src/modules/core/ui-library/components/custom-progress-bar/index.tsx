import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar as ProgressBars, ProgressBarProps } from 'react-native-paper';
import {Text} from 'src/modules/core/ui-library';

const CustomProgressBar: React.FC<ProgressBarProps> = ({
    color,
    progress,
    style,
}) => (
    <View style={styles.progressBarContainer}>
        <View style={styles.container}>
            <ProgressBars progress={progress} color={color} style={[styles.progressBar, style]} />
        </View>
        <Text variant="body">{"50%"}</Text>
    </View>
  
);

export default CustomProgressBar;

const styles = StyleSheet.create ({
    container: {
        height: 5,
        width: 100,
        backgroundColor:"#666A6F",
        borderRadius: 20,
        position:'relative'
    },
    progressBar: {
        borderRadius: 20,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})