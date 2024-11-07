import React, { useState } from 'react';
import { View, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput, TextInputProps } from "react-native-paper";
import {Separator, Text} from 'src/modules/core/ui-library';
import {theme} from 'src/config/theme';
import Icon from 'src/modules/core/components/icon';

type AddNoteProps = {
    color: string,
}
const AddNotesButton: React.FC<AddNoteProps> = ({ color }) => {
    const [note, setNote] = useState('');
    const [savedNote, setSavedNote] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputHeight, setInputHeight] = useState(RFValue(40));

const handleNoteButtonPress = () => {
    // Show the text input when "Note" button is pressed
    setShowTextInput(true);
    setNote(savedNote); // Populate input with saved note for editing
    setIsEditing(false);
};

const handleSave = () => {
    // Save the text if not empty and hide the Note button
    if (note.trim()) {
        // Store the current text in `savedText`
        setSavedNote(note)
        setShowTextInput(false)
        setIsEditing(false);
        console.log('Note saved:', note);
    }
};

const handleEdit = () => {
    setIsEditing(true); // Switch to editing mode
    setShowTextInput(true); // Show input field
};

const handleCancel = () => {
    setNote(savedNote)
    setShowTextInput(false)
    setIsEditing(false); // Reset editing state
}

// Handle with height's change in Text input
const handleInputSizeChange = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;

    if (contentHeight > inputHeight) {
        setInputHeight(contentHeight + RFValue(20));
    } else if (contentHeight <= inputHeight) {
        setInputHeight(RFValue(70)); // Reset to the original height if content is small
    }
};

  return (
    <View style={styles.container}>
       { showTextInput? 
        (
            <>
                <TextInput
                    mode="outlined"
                    outlineColor={theme.colors.textInputBorderColor}
                    activeOutlineColor={theme.colors.textInputFocusBorderColor}
                    textColor={theme.colors.textInputColor}
                    placeholderTextColor={theme.colors.textInputBorderColor}
                    style={[styles.input, {minHeight: inputHeight}]}
                    theme={{roundness: 16}}
                    multiline={true}
                    value={note}
                    placeholder="Write your note here"
                    onChangeText={setNote}
                    onContentSizeChange={handleInputSizeChange}
                />
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.saveButton, { opacity: note.trim() ? 1 : 0.5 }]} onPress={handleSave}>
                        {!isEditing?
                            (<Text variant='body3'>{'Save'}</Text>) 
                            : (
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text variant='body3'>{'Edit'}</Text>
                                    <Icon name='edit' size='small'/>
                                </View>
                            )
                        }
                    </Pressable>
                    <Pressable style={styles.cancel} onPress={handleCancel}>
                        <Text variant='body3' style={{color: color}}>Cancel</Text>
                    </Pressable>
                </View>
            </>
        // Display if there's saved note, otherwise display Add notes button
        ) : savedNote? (
                <Pressable onPress={handleEdit}>
                    <Text 
                        variant='body3'
                        numberOfLines={1} // Set a text only display 1 line
                        ellipsizeMode="tail" // Display ...
                        style={{color: '#B1B2B2'}}
                    >
                        {"Note: " + note}
                    </Text>
                </Pressable>
        ) : (
                <TouchableOpacity style={styles.noteContainer} onPress={handleNoteButtonPress}>
                    <Icon name="add" size="small"/>
                    <Text variant="body" style={{fontSize: RFValue(9)}}>{'Notes...'}</Text>
                </TouchableOpacity>
        )}
    </View>
  );
};

export default AddNotesButton;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: RFValue(10),
        textAlignVertical: 'top',
        paddingBottom: RFValue(40),
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        
    },
    saveButton: {
        position: 'absolute',
        bottom: RFValue(10), // Position at the bottom
        right: RFValue(10), // Position to the right
        backgroundColor: '#2B2C2C',
        paddingVertical: RFValue(3),
        borderRadius: 30,
        width: RFValue(45),
        alignItems: 'center',
    },
    cancel: {
        position: 'absolute',
        bottom: RFValue(10), // Position at the bottom
        right: RFValue(60), // Position to the right
        backgroundColor: '#202122',
        paddingVertical: RFValue(3),
        width: RFValue(45),
        borderRadius: 30,
        alignItems: 'center',
    },
    noteContainer: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#808181',
        width: 80,
        height: 23,
    },
});




