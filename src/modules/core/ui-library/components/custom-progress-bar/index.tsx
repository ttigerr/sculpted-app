import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar as ProgressBars, ProgressBarProps } from 'react-native-paper';
import {theme} from 'src/config/theme';
import { RFValue } from 'react-native-responsive-fontsize';
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
        <Text variant="body2" style={[styles.progressBarText,{color: progress <= 0? "#6F6F70" : "#FFFFFF"}]}>{ progress * 100 }{"%"}</Text>
    </View>
  
);

export default CustomProgressBar;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    progressBar: {
        borderRadius: 20,
        height: RFValue(4),
        backgroundColor: theme.colors.progressBarBackgroundColor,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBarText: {
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '500',
    }
})