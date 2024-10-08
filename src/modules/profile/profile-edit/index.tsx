import * as React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import MainWrapper from "src/modules/core/components/wrapper/MainWrapper";
import {Text, TextInput, Button, EditTextInput} from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';
import {NavigationPropsType} from 'src/utils/types';
import useSignUp from 'src/modules/auth/sign-up/useSignUp';

const ProfileEdit = (props: NavigationPropsType) => {
    const { navigation } = props;
    const {control} = useSignUp(props);

    const goToProfileScreen = ( )=> {
        navigation.goBack()
    }

    return (
        <MainWrapper>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {/* Header   */}
                    <View style={styles.headerContainer}>
                        <Text variant="h3">{'General Details'}</Text>
                        <TouchableOpacity onPress={goToProfileScreen}>
                            <Icon name='cancel' size="small"/>
                        </TouchableOpacity>
                    </View>
                    <EditTextInput
                    control={control}
                    name="Name"
                    label="Name"
                    rules={{required: 'Required field'}}
                    placeholder={'Enter a name'}
                    />
                    <EditTextInput
                    control={control}
                    name="email"
                    label="Email"
                    rules={{required: 'Required field'}}
                    placeholder={'Enter email/Phone number'}
                    />
                    <EditTextInput
                    control={control}
                    name="Gender"
                    label="Gender"
                    placeholder={''}
                    />
                    <EditTextInput
                    control={control}
                    name="Birthday"
                    label="Birthday"
                    placeholder={''}
                    right={<Icon name="calendar" size="small" />}
                    />
                    <Button label='Save Changes'/>
                </ScrollView>
            </SafeAreaView>
        </MainWrapper>
    );
}

export default ProfileEdit;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        marginTop: 50,
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom: 25,
    },
});