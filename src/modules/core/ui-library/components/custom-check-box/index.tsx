import React, { useState, useContext } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View, ViewProps, TextInputProps } from "react-native";
import Icon from 'src/modules/core/components/icon';
import { ToDoListContext } from "src/utils/context";

type IconProps = 'tick' | 'cross';
type AnswerProps = "Yes" | "No";

type CheckBoxProps = ViewProps & {
    icons: IconProps[];
    selectedBox?: IconProps;
    status: 'checked' | 'unchecked' | 'indeterminate';
    onChange: (answer: AnswerProps) => void;
    
}

const CustomCheckBox: React.FC<CheckBoxProps>  = ({
    icons,
    selectedBox = icons[0],
    status,
    onChange,

}) => {
    const [selected, setSelected] = useState<IconProps>(selectedBox);
    
    const handleSelection = (item: IconProps) => {
        switch (item) {
            case "cross":
                setSelected(item)
                onChange("No")
                break;
            case "tick":
                setSelected(item)
                onChange("Yes")
                break;
            default:
                break;
        }
        
    }

    return (
        <View style={styles.container}>
            {icons.map(icon=> (
                <TouchableOpacity style={styles.container} key={icon} onPress={() => handleSelection(icon)}>
                    <View style={selected === icon? (styles.selected) : (styles.unSelected)}>
                        {selected === icon? (<Icon name={icon} size="small" fill="#42DBF0"/>) : (<Icon name={icon} size="small" fill="#F4F4F4"/>)}
                    </View>
                </TouchableOpacity>
            ))}
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
    selected: {
        width: 26.5,
        height: 26.5,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unSelected: {
        width: 26.5,
        height: 26.5,
        backgroundColor: '#232627',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

})