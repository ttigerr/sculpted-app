import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput as AddNoteTextInput,
    Platform
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Text } from 'src/modules/core/ui-library';
import { theme } from 'src/config/theme';

type AddNotesProps = {
    note: string;
    setNote: (val: string) => void;
};

const AddNotesButton: React.FC<AddNotesProps> = ({ note, setNote }) => {
    const [showTextInput, setShowTextInput] = useState(() => {
        return (note ?? '').trim().length === 0;
    });

    const [localNote, setLocalNote] = useState(note);
    const inputRef = useRef<AddNoteTextInput>(null);

    // Keep in sync when parent updates it
    useEffect(() => {
        setLocalNote(note); 
    }, [note]);

    const handleEdit = () => {
        setShowTextInput(true);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleSave = () => {
        const trimmed = localNote.trim();
        if (trimmed) {
            setShowTextInput(false);
        }
        setNote(trimmed);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {showTextInput ? (
                <View style={styles.inputContainer}>
                    <AddNoteTextInput
                        ref={inputRef}
                        multiline
                        maxLength={250}
                        value={localNote}
                        onChangeText={setLocalNote}
                        style={styles.input}
                        onBlur={handleSave}
                        placeholder="Write your note here"
                        placeholderTextColor={theme.colors.textInputBorderColor}
                        selectionColor="white"
                        keyboardType="default"
                        returnKeyType="done"
                        onSubmitEditing={handleSave}
                        blurOnSubmit={true}
                        editable={true}
                        textAlignVertical='top'
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
        justifyContent: 'center',
    },
    inputContainer: {
        backgroundColor: '#1F2021',
        borderRadius: RFValue(16),
        lineHeight: RFValue(12),
        padding: RFValue(12),
        justifyContent: 'center',
    },
    input: {
        ...Platform.select({
          android: {
            includeFontPadding: false,
            textAlignVertical: 'top',
            paddingVertical: 0,
            paddingTop: 0,
            paddingBottom: 0,
          },
          ios: {
            paddingTop: 0,
            paddingBottom: 0,
          }
        }),
        color: '#757576',
        fontSize: RFValue(12),
        lineHeight: RFValue(12), // try adjusting this as needed
      },
    savedNoteContainer: {
        backgroundColor: '#1F2021',
        borderRadius: RFValue(16),
        padding: RFValue(12),
        justifyContent: 'center',
    },
    noteText: {
        color: '#757576',
        fontSize: RFValue(12),
        lineHeight: RFValue(12),
        flexWrap: 'wrap'
    },
});