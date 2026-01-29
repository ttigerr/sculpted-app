import React, {useState, createContext, useContext, useEffect} from "react";
import MainWrapper from "src/modules/core/components/wrapper/MainWrapper";
import { View, SafeAreaView, ScrollView, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, Pressable} from 'react-native';
import {Text, Button, CustomCheckBox, Sliders, TextInput, Separator, } from 'src/modules/core/ui-library';
import styles from './styles';
import Icon from 'src/modules/core/components/icon';
import {NavigationPropsType} from 'src/utils/types';
import { Appbar, Divider, Button as PaperButton } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";
import useSignUp from "src/modules/auth/sign-up/useSignUp";
import AddNotesButton from "src/modules/compass/components/notes-text-input";
import useTaskList from "src/modules/todo/task-list/useTaskList";
import BackButton from "src/modules/core/components/back-button";
import FloatingButton from "src/modules/core/components/float-button";
import CompassItem from "src/modules/compass/components/compass-item-card";
import { theme } from "src/config/theme";
import TaskList from "src/modules/todo/components/task-list";
import useScheduledTaskList from "src/modules/todo/schedule/useTodoSchedule";
import useCompass from "src/modules/compass/home/useCompass";


const Journal = (props : NavigationPropsType) => {

    const [source, setSource] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        if (props.route.params?.source) {
          setSource(props.route.params.source);
        }
        filteredCompassData
        compassData
    }, [props.route.params?.source]);

    const {
        toggleTaskCompletion,
        handleAddTask,
        newTask,
        setNewTask,
        scrollViewRef,
        isAdding,
        handleSaveTask,
        handleCancelEdit,
        handleDeleteTask,
        isShowingCompleted,
        handleShowCompleted,
        isSelectedAll,
        handleToggleSelectItem,
        filteredTasks,
      } = useTaskList(props);

    const {
        newScheduledTask,
        setNewScheduledTask,
        handleAddScheduledTask,
        handleSaveScheduledTask,
        isScheduleAdding,
        isShowingScheduleCompleted,
        handleShowScheduleCompleted,
        toggleScheduleTaskCompletion,
        scheduledTaskList,
    } = useScheduledTaskList(props)

    const {
        compassData,
        filteredCompassData,
        updateVirtue,
        isDisable,
        updateVirtueNotes,
    } = useCompass(props)

    // Handle click functions
    const { navigation } = props;
    const goToHomeScreen = () => {
        navigation.goBack()
    }

    const setUpdate = () => {
        navigation.goBack();
    }

    return (
        <MainWrapper>
            <SafeAreaView style={styles.mainContainer}>

                {/* Handle add tasks for today's to do list */}
                {isAdding &&(
                    <View style={styles.appBar}>
                        <PaperButton
                            textColor={theme.colors.h1}
                            mode="text"
                            onPress={handleCancelEdit}>
                            {'Cancel'}
                        </PaperButton>
                        <PaperButton
                            textColor={theme.colors.todoScreenTextColor}
                            mode="text"
                            onPress={handleSaveTask}>
                            {'Done'}
                        </PaperButton>
                    </View>
                )}
                {/* Handle add tasks for tomorrow's to do list */}
                {isScheduleAdding &&(
                    <View style={styles.appBar}>
                        <PaperButton
                            textColor={theme.colors.h1}
                            mode="text"
                            onPress={handleCancelEdit}>
                            {'Cancel'}
                        </PaperButton>
                        <PaperButton
                            textColor={theme.colors.todoScreenTextColor}
                            mode="text"
                            onPress={handleSaveScheduledTask}>
                            {'Done'}
                        </PaperButton>
                    </View>
                )}
                {/* Journal's main content */}
                <ScrollView style={[styles.scrollView,]} ref={scrollViewRef}>
                    <View style={styles.headerContainer}>
                        { source === 'dashboard' && (
                            <BackButton onPress={goToHomeScreen} style={styles.backButton}/>)
                        }
                        
                        <Text variant="body" style={{fontSize: 16, fontWeight: '500'}}>{"Journal"}</Text>
                        <View/>
                    </View>
                    <Separator height={RFValue(10)}/>

                    {/* To-Do list's header */}
                    <View style={styles.contentcontainer}>
                        <Text variant="h4" style={styles.text}>{"To Do List"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    <Separator height={RFValue(15)}/>

                    {/* Today's to-do list */}
                    <TaskList
                        isShowingCompleted={isShowingCompleted}
                        onShowCompletedPressed={handleShowCompleted}
                        taskList={filteredTasks}
                        onTaskPress={task => console.log(task)}
                        handleToggleComplete={toggleTaskCompletion}
                        newTask={newTask}
                        setNewTask={setNewTask}
                        onTaskDelete={handleDeleteTask}
                        handleToggleSelectItem={handleToggleSelectItem}
                        children={
                            <>
                                {!isSelectedAll && (
                                    <FloatingButton 
                                        onPress={handleAddTask} 
                                        iconName="plusRound"
                                        width={25}
                                        height={25}
                                        style={styles.floatingButton}
                                    />
                                )}
                                <Separator height={RFValue(15)}/>
                            </>
                        }
                    />
                    {/* To-Do list's content
                    <ToDoListItems/> */}

                    {/* Compass's content */}
                    <View style={styles.contentcontainer}>
                        <Text variant="h4" style={styles.text}>{"Compass"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    <Separator height={RFValue(15)}/>

                    {/* <CompassItems/> */}
                    {compassData.map((item) => (
                        <View key={item.id}>
                            <CompassItem
                                name={item.virtue1}
                                value={item.virtue1Score}
                                setValue={(val) => updateVirtue(item.creationDate, item.virtue1, val)}
                                isDisable={isDisable}
                                note={item.virtue1Note}
                                setNote={(val) => updateVirtueNotes(item.creationDate, item.virtue1, val)}                               
                            />
                            <CompassItem
                                name={item.virtue2}
                                value={item.virtue2Score}
                                setValue={(val) => updateVirtue(item.creationDate, item.virtue2, val)}
                                isDisable={isDisable}
                                note={item.virtue2Note}
                                setNote={(val) => updateVirtueNotes(item.creationDate, item.virtue2, val)}                                
                            />
                            <CompassItem
                                name={item.virtue3}
                                value={item.virtue3Score}
                                setValue={(val) => updateVirtue(item.creationDate, item.virtue3, val)}
                                isDisable={isDisable}
                                note={item.virtue3Note}
                                setNote={(val) => updateVirtueNotes(item.creationDate, item.virtue3, val)}                              
                            />
                        </View>
                    ))}
                    {/* Written Reflection's content */}
                    <View style={styles.contentcontainer}>
                        <Text variant="h4" style={styles.text}>{"Written Reflections"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    <Separator height={RFValue(15)}/>
                    <AddNotesButton color={"#42DBF0"} note={note} setNote={setNote}/>
                    <Separator height={RFValue(15)}/>

                    {/* To-Do list's add task content */}
                    <View style={styles.contentcontainer}>
                        <Text variant="h4" style={styles.text}>{"Tomorrow's To Do List"}</Text>
                        <Divider style={styles.divider}/>
                    </View>
                    <Separator height={RFValue(15)}/>

                    {/* tomorrow's to-do list */}
                    <TaskList
                        isShowingCompleted={isShowingScheduleCompleted}
                        onShowCompletedPressed={handleShowScheduleCompleted}
                        taskList={scheduledTaskList}
                        onTaskPress={task => console.log(task)}
                        handleToggleComplete={toggleScheduleTaskCompletion}
                        newTask={newScheduledTask}
                        setNewTask={setNewScheduledTask}
                        onTaskDelete={handleDeleteTask}
                        handleToggleSelectItem={handleToggleSelectItem}
                        children={
                            <>
                                <FloatingButton 
                                    onPress={handleAddScheduledTask} 
                                    iconName="plusRound"
                                    width={25}
                                    height={25}
                                    style={styles.floatingButton}
                                />
                                <Separator height={RFValue(15)}/>
                            </>
                        }
                    />
                    <Separator height={RFValue(15)}/>

                    {/* Submit button */}
                    <Button 
                        label="Save your Journal"
                        onPress={setUpdate}
                        height={62}
                        buttonFontSize={24}
                        disabled
                        />
                    <Separator height={RFValue(100)}/>
                </ScrollView>
            </SafeAreaView>
        </MainWrapper>
    )
}

export default Journal;

