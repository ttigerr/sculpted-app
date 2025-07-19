import React, { useState, useRef } from 'react';
import { View, Pressable, StyleSheet, KeyboardAvoidingView, TextInput as AddNoteTextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Text } from 'src/modules/core/ui-library';
import { theme } from 'src/config/theme';

interface AddNotesButtonProps {
    note: string;
    setNote: (value: string) => void;
};

const AddNotesButton = ({note, setNote} : AddNotesButtonProps) => {
    const [showTextInput, setShowTextInput] = useState(true);
    const inputRef = useRef(null); // Reference for TextInput

    const handleSave = () => {
        if (note.trim()) {
            setShowTextInput(false);
        }
    };

    const handleEdit = () => {
        setShowTextInput(true);
        // Delay to ensure UI updates before focusing
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            {showTextInput ? (
                <View style={styles.inputContainer}>
                    <AddNoteTextInput
                        ref={inputRef} // Attach reference
                        multiline={true}
                        maxLength={250}
                        value={note}
                        onChangeText={setNote}
                        style={styles.input}
                        onBlur={handleSave}
                        placeholder='Write your note here'
                        placeholderTextColor={theme.colors.textInputBorderColor}
                        selectionColor="white"
                        keyboardType="default"
                        returnKeyType="done"
                        onSubmitEditing={handleSave} // Save the note when "Done" is pressed
                        blurOnSubmit={true}
                    />
                </View>
            ) : (
                <Pressable onPress={handleEdit}>
                    <View style={styles.savedNoteContainer}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.noteText}>
                            {note}
                        </Text>
                    </View>
                </Pressable>
            )}
        </KeyboardAvoidingView>
    );
};

export default AddNotesButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#1F2021',
        borderRadius: RFValue(16),
        padding: RFValue(12),
        justifyContent: 'center',
    },
    input: {
        justifyContent: 'center',
        color: '#757576',
        fontSize: RFValue(12),
        paddingTop: 0,
    },
    savedNoteContainer: {
        flex: 1,
        backgroundColor: '#1F2021',
        borderRadius: 25,
        padding: RFValue(12),
        justifyContent: 'center',
    },
    noteText: {
        color: '#757576',
        fontSize: RFValue(12),
    },
});
