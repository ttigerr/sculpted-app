import React, {useState} from "react";
import MainWrapper from "src/modules/core/components/wrapper/MainWrapper";
import { View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Button, CustomCheckBox, Sliders } from 'src/modules/core/ui-library';
import styles from './styles';
import Icon from 'src/modules/core/components/icon';
import {NavigationPropsType} from 'src/utils/types';
import { Divider } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";

const Journal = (navigationProps:NavigationPropsType) => {

    const { navigation } = navigationProps;
    const goToHomeScreen = () => {
        navigation.goBack()
    }
    const [text, setText] = useState(null)
    return (
       <MainWrapper>
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={goToHomeScreen}>
                            <Icon name="return" size="normal"/>
                        </TouchableOpacity>
                        <Text variant="body">{"Journal"}</Text>
                        <View/>
                    </View>
                    {/* To-Do list's header */}
                    <View style={styles.dividerContainer}>
                        <Text variant="h4" style={styles.text}>{"TO-DO LIST"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    {/* To-Do list's content */}
                    {/* Question 1 */}
                    <View style={styles.defaultContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Text variant="body2">{"Did I learn something new today?"}</Text>
                            <Text variant="delete">*</Text>
                        </View>
                        {/* Checkbox */}
                        <CustomCheckBox/>
                    </View>
                    <Divider style={styles.divider1}/>
                    {/* Question 2 */}
                    <View style={styles.defaultContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Text variant="body2">{"Did I do my nighty routine tonight?"}</Text>
                            <Text variant="delete">*</Text>
                        </View>
                        {/* Checkbox */}
                        <CustomCheckBox/>
                    </View>
                    <Divider style={styles.divider1}/>
                    {/* Question 3 */}
                    <View style={styles.defaultContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Text variant="body2">{"Did I get out of comfort zone today?"}</Text>
                            <Text variant="delete">*</Text>
                        </View>
                        {/* Checkbox */}
                        <CustomCheckBox/>
                    </View>
                    {/* Compass's header */}
                    <View style={styles.dividerContainer}>
                        <Text variant="h4" style={styles.text}>{"COMPASS"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    {/* Compass's content */}
                    <View style={{marginBottom: 30}}>
                        <Text variant="body2">{"How intergal was I today?"}</Text>
                        <Sliders />
                        {/* Add note's button */}
                        <TouchableOpacity style={styles.noteContainer}>
                            <Icon name="add" size="small"/>
                            <Text variant="body" style={{fontSize: RFValue(9)}}>{'Notes...'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom: 30}}>
                        <Text variant="body2">{"How Professional was I today?"}</Text>
                        <Sliders />
                        {/* Add note's button */}
                        <TouchableOpacity style={styles.noteContainer}>
                            <Icon name="add" size="small"/>
                            <Text variant="body" style={{fontSize: RFValue(9)}}>{'Notes...'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text variant="body2">{"How Professional was I today?"}</Text>
                        <Sliders />
                        {/* Add note's button */}
                        <TouchableOpacity style={styles.noteContainer}>
                            <Icon name="add" size="small"/>
                            <Text variant="body" style={{fontSize: RFValue(9)}}>{'Notes...'}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Reflection's content */}
                    <View style={styles.dividerContainer}>
                        <Text variant="h4" style={styles.text}>{"REFLECTIONS"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    <TouchableOpacity style={styles.noteContainer}>
                        <Icon name="add" size="small"/>
                        <Text variant="body" style={{fontSize: RFValue(9)}}>{'Notes...'}</Text>
                    </TouchableOpacity>
                    {/* To-Do list's add task content */}
                    <View style={styles.dividerContainer}>
                        <Text variant="h4" style={styles.text1}>{"TO DO LIST"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    <View style={styles.defaultContainer}>
                        <Text variant="body2">{"Add tasks for tomorrow's To Do List"}</Text>
                        <View style={styles.defaultContainer}>
                            <TouchableOpacity style={{marginRight: 10}}>
                                <Icon name="add" size="normal"/>
                            </TouchableOpacity>
                            <Text variant="body2">{"Add tasks"}</Text>
                        </View>
                    </View>
                    {/* Scheduled's content */}
                    <View style={styles.dividerContainer}>
                        <Text variant="h4" style={styles.text}>{"SCHEDULED"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    <View style={styles.defaultContainer}>
                        <Text variant="body2">{"Send Sally follow up Email"}</Text>
                        <CustomCheckBox/>
                    </View>
                    <Divider style={styles.divider1}/>
                    <View style={styles.defaultContainer}>
                        <Text variant="body2">{"Meal Prep for next week"}</Text>
                        <CustomCheckBox/>
                    </View>
                    <View style={{marginVertical: 30}}>
                        <Button label="Save" />
                    </View>
                </ScrollView>
            </SafeAreaView>
       </MainWrapper>
    )
}

export default Journal;