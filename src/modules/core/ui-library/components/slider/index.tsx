import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Slider } from '@rneui/themed';
import { Text } from 'src/modules/core/ui-library';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScaleContext } from 'src/utils/context';

const Sliders = () => {
    const [value, setValue] = useState(0);
    // To adjust the width dynamically and get the screen width
    const screenWidth = Dimensions.get('window').width;
    return (

            <View style={styles.container}>
                <Slider 
                    minimumValue={0}
                    maximumValue={10}
                    value={value}
                    // step={1} <--- make it move by one step
                    onValueChange={setValue}
                    minimumTrackTintColor={'#FFFFFF'}
                    maximumTrackTintColor={'#2F3031'}
                    allowTouchTrack
                    trackStyle={{ height: 3, width: screenWidth * 0.85 }} // 85% of screen width
                    thumbStyle={{ height: 16, width: 29, backgroundColor: '#42DBF0', borderWidth: 3, borderColor: '#FFFFFF' }}
                />
                <Text variant="body1">{Math.floor(value)}</Text>
            </View>

        
    )
}

export default Sliders;

const styles = StyleSheet.create ({
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 20,
        flex: 1
    }
})