import React, {useState} from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
// import { CheckBox } from '@rneui/themed';
import {Text} from '@ui-library';
import Icon from 'src/modules/core/components/icon';

type CheckBoxProps = ViewProps & {
    name: string;
    status?: boolean ;
    onPress?: (e: GestureResponderEvent) => void;
}

const CustomCheckBox  = () => {

    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container} onPress={() => setChecked(!checked)}>
                <View style={[{
                    width: 26.5,
                    height: 26.5,
                    backgroundColor: checked? 'white' : '#232627',
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}>
                    {checked? (<Icon name="cross" size="small" fill="#42DBF0"/>) : (<Icon name="cross" size="small" fill="#F4F4F4"/>)}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={() => setChecked1(!checked1)}>
                <View style={[{
                    width: 26.5,
                    height: 26.5,
                    backgroundColor: checked1? 'white' : '#232627',
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}>
                    {checked1? (<Icon name="tick" size="small" fill="#42DBF0"/>) : (<Icon name="tick" size="small" fill="#F4F4F4"/>)}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CustomCheckBox;

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
})