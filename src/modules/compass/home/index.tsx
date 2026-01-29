import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {RFValue} from 'react-native-responsive-fontsize';
import {Separator, Text} from 'src/modules/core/ui-library';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import {
  secondaryGradientColorList,
  tertiaryGradientColorList,
} from 'src/consts/arrays';
import DayPicker from 'src/modules/todo/components/day-picker';
import CompassScore from '../components/compass-progress-bar';
import CompassItem from '../components/compass-item-card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCompass from './useCompass';

const CompassHome = (props: NavigationPropsType) => {
    const {
        goBack,
        compassData,
        updateVirtue,
        scrollViewRef,
        handledateFilter,
        isDisable,
        updateVirtueNotes,
    } = useCompass(props)

    return (
      <MainWrapper colorArray={tertiaryGradientColorList}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
        >
            <SafeAreaView style={styles.compassHeader}>
                <Separator height={RFValue(20)} />
                <View style={styles.container}>
                <View style={styles.navigationBarContainer}>
                    <BackButton
                    style={styles.backButton}
                    onPress={goBack}
                    />
                    <Text variant="body1" style={{fontSize: 16, fontWeight: '500'}}>
                    {'Compass'}
                    </Text>
                </View>
                <Separator height={RFValue(24)} />
                <DayPicker onItemPressed={(day) => {handledateFilter(day)}} behindDays />
                <Separator height={RFValue(24)} />
                </View>

                {/* Render the compass items */}
                {compassData.length !== 0? (
                    <ScrollView style={styles.container} ref={scrollViewRef}>
                        {/* CompassScore with updated scores */}
                        <CompassScore 
                            segments={[
                                compassData[0]?.virtue1Score || 0,
                                compassData[0]?.virtue2Score || 0,
                                compassData[0]?.virtue3Score || 0,
                            ]} 
                            virtue={[
                                compassData[0]?.virtue1 || '',
                                compassData[0]?.virtue2 || '',
                                compassData[0]?.virtue3 || '',
                            ]}
                        />
                        <Separator height={RFValue(24)} />
            
                        {/* Compass items component */}
                        <Text variant="body1" style={styles.virtueText}>{'Virtues'}</Text>
                        <Separator height={RFValue(8)} />
            
                        {compassData.map((item) => (
                            <View key={`${item.creationDate}`}>
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
                        <Separator height={RFValue(220)} />
                    </ScrollView>
                ) : (
                    <View style={styles.dataCheckContainer}>
                        <Text variant="paragraph" style={styles.dataCheckText}>
                            {"No Virtues found"}
                        </Text>
                    </View>
                )}
            </SafeAreaView>
        </KeyboardAvoidingView>
      </MainWrapper>
    );
  };
  
  export default CompassHome;
  

const styles = StyleSheet.create({
    compassHeader: {
        marginTop: RFValue(15),
    },
    container: {
        marginHorizontal: RFValue(16),
    },
    scrollView: {
        marginHorizontal: RFValue(16),
      },
    navigationBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        left: RFValue(0),
    },
    infoCardsContainer: {
        flex: 1,
    },
    virtueText: {
        color: "#FFFFFF",
        opacity: 0.4
    },
    dataCheckContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
        marginVertical: RFValue(100)
    },
    dataCheckText: {
        fontSize: 18,
        fontWeight: '500',
        textTransform: 'capitalize',
        opacity: 0.4
    },
});