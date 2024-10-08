import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider } from '@rneui/themed';
import { Text } from 'src/modules/core/ui-library';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const Sliders = () => {
    const [value, setValue] = useState(0);

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
                trackStyle={{ height: 3, width: 369 }}
                thumbStyle={{ height: 16, width: 29, backgroundColor: '#42DBF0', borderWidth: 3, borderColor: '#FFFFFF' }}
            />
            <Text variant="body2">{Math.floor(value)}</Text>
        </View>
    )
}

export default Sliders;

const styles = StyleSheet.create ({
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 20
    }
})