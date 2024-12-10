import React, {useState, createContext, useContext} from "react";
import MainWrapper from "src/modules/core/components/wrapper/MainWrapper";
import { View, SafeAreaView, ScrollView, TouchableOpacity, Keyboard, KeyboardAvoidingView} from 'react-native';
import {Text, Button, CustomCheckBox, Sliders, TextInput, } from 'src/modules/core/ui-library';
import styles from './styles';
import Icon from 'src/modules/core/components/icon';
import {NavigationPropsType} from 'src/utils/types';
import { Divider } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";
import useSignUp from "src/modules/auth/sign-up/useSignUp";
import AddNotesButton from "src/modules/compass/components/add-notes-button";
import TaskList from "src/modules/todo/components/task-list";


const Journal = (props:NavigationPropsType) => {

    // State declarations
    const [task, setTask] = useState([]);
    const Tasks = task;
    const [nextId, setNextId] = useState(0)

    // Handle click functions
    const { navigation } = props;
    const goToHomeScreen = () => {
        navigation.goBack()
    }

    const setUpdate = () => {
        navigation.goBack();
    }

    // Data lists
    const VIRTUE_DATA = [
        {
            id: 1,
            label: 'How integal was I today',
        },
        {
            id: 2,
            label: 'How professional was I today?',
        },
        {
            id: 3,
            label: 'How professional was I yesterday?',
        },
    ];

    const TO_DO_LIST = [
        {
            id: 1,
            label: 'Did I learn something new today?',

        },
        {
            id: 2,
            label: 'Did I get out of comfort zone today?',

        },
        {
            id: 3,
            label: 'Did I do my nighty routine tonight?',

        },
    ];

    // Compass items
    const CompassItems = () => {
        return (
            <>
                {VIRTUE_DATA.map((virtue, index) => (
                    index === 0? 
                    (
                        <View>
                            <View style={{flexDirection: "row"}}>
                                <Text variant="body2">{virtue.label}</Text>
                                <Text variant="delete">*</Text>
                            </View>
                            <Sliders/>
                            {/* Add note's button */}
                            <AddNotesButton color={"#42DBF0"}/>
                        </View>
                    ) : (
                        <View style={{marginTop: 30}}>
                            <View style={{flexDirection: "row"}}>
                                <Text variant="body2">{virtue.label}</Text>
                                <Text variant="delete">*</Text>
                            </View>
                            <Sliders/>
                            {/* Add note's button */}
                            <AddNotesButton color={"#42DBF0"}/>
                        </View>
                    )
                ))}
            </>
        )
    }
    
    // Add task button's component
    const {control} = useSignUp(props);
    const AddTask = () => {

        const [text, setText] = useState('');
        const [show, setShow] = useState(false);

        const handleClick = () => {
            setShow(!show)
        }

        const onSubmitTask = () => {
            if (text !== "") {
                setNextId(nextId + 1)
                setTask([
                    ...task,{id: nextId, name: text}
                ])
                setText("")
            } else {
                console.log("You need to submit")
            }
        }


        return (
            <KeyboardAvoidingView style={{flex: 1}}>
               <View style={styles.defaultContainer}>
                    <Text variant="body2">{"Add tasks for tomorrow's To Do List"}</Text>
                    <View style={styles.defaultContainer}>
                        <TouchableOpacity style={{marginRight: RFValue(10)}} onPress={handleClick}>
                        <View style={styles.addButton}>
                            <Icon name='addTask' size='small'/>
                        </View>
                        </TouchableOpacity>
                        <Text variant="body2">{"Add tasks"}</Text>
                    </View>
                </View>
                {show? (
                    <View style={{marginTop: 0}}>
                        <TextInput 
                            control={control}
                            name="Task"
                            value={text}
                            placeholder={'Enter a new task'}
                            onChangeText={setText}
                            keyboardType="default"
                            returnKeyType="done"
                            onSubmitEditing={onSubmitTask}
                        />
                    </View>
                ) : null }
            </KeyboardAvoidingView>
        )
    }

    // Render all new task's items
    const TaskList = () => {
        // const tasks = useTasks();
        
        const Task = ({task}) => {
            return (
                <View style={styles.defaultContainer} key={task.id}>
                    <Text variant="body2">{task.name}</Text>
                    <CustomCheckBox 
                        icons={['cross', 'tick']}
                        selectedBox=""
                        onChange={result => console.log(task.name + " " + result)}
                    />
                </View>
            )
        }
        return (
            <>
                {Tasks.map((task, index) => (
                    index === 0? 
                    (
                        <View key={task.id}>
                            <View style={styles.dividerContainer}>
                                <Text variant="h4" style={styles.text}>{"SCHEDULED"}</Text>
                                <Divider style={styles.divider}/>
                            </View>
                            <Task task={task}/>
                        </View>
                    ) : (
                        <View key={task.id}>
                            <Divider style={styles.divider1}/>
                            <Task task={task}/>
                        </View>
                    )
                ))}
            </>
        )
    }

    // To do list content's component
    const ToDoListItems = () => {
        return (
            <>
                {TO_DO_LIST.map((item, index)=> (
                    index === 0? 
                    (
                        <View style={styles.defaultContainer}>
                            <View style={{flexDirection: 'row'}}>
                                <Text variant="body2">{item.label}</Text>
                                <Text variant="delete">*</Text>
                            </View>
                            {/* Checkbox */}
                            <View style={{flexDirection: 'row'}}>
                                <CustomCheckBox 
                                    icons={['cross', 'tick']}
                                    selectedBox=""
                                    onChange={result => console.log(item.label + " " + result)}
                                />
                            </View>
                        </View>
                    ) : (
                        <>
                            <Divider style={styles.divider1}/>
                            <View style={styles.defaultContainer}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text variant="body2">{item.label}</Text>
                                    <Text variant="delete">*</Text>
                                </View>
                                {/* Checkbox */}
                                <View style={{flexDirection: 'row'}}>
                                    <CustomCheckBox 
                                        icons={['cross', 'tick']}
                                        selectedBox=""
                                        onChange={result => console.log(item.label + " " + result)}
                                    />
                                </View>
                            </View>
                        </>
                    )
                ))}
            </>
        )
    }

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
                    <ToDoListItems/>

                    {/* Compass's content */}
                    <View style={styles.dividerContainer}>
                        <Text variant="h4" style={styles.text}>{"COMPASS"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    <CompassItems/>

                    {/* Reflection's content */}
                    <View style={styles.dividerContainer}>
                        <Text variant="h4" style={styles.text}>{"REFLECTIONS"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    <AddNotesButton color={"#42DBF0"}/>

                    {/* To-Do list's add task content */}
                    <View style={styles.dividerContainer}>
                        <Text variant="h4" style={styles.text1}>{"TO DO LIST"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    {/* Add task's component */}
                    <AddTask/>

                    {/* Scheduled's content */}
                    <TaskList/>

                    {/* Submit button */}
                    <View style={{marginVertical: 30}}>
                        <Button 
                            label="Save"
                            onPress={setUpdate} children={undefined}                       
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </MainWrapper>
    )
}

export default Journal;

