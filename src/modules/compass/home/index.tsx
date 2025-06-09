import React, {useRef, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {RFValue} from 'react-native-responsive-fontsize';
import {Separator, Text} from 'src/modules/core/ui-library';
import BackButton from 'src/modules/core/components/back-button';
import {DayListItem, NavigationPropsType} from 'src/utils/types';
import {
  tertiaryGradientColorList,
} from 'src/consts/arrays';
import DayPicker from 'src/modules/todo/components/day-picker';
import CompassScore from '../components/compass-info-card';
import CompassItem from '../components/compass-item-card';
import { compassStyles as styles } from './index.styles';
import moment from 'moment';
import { Compass } from 'src/models/compass/compass';
import useFetch from 'src/config/api/hooks/useFetch';
import { compassService } from 'src/config/api/services/compass-service';
import usePost from 'src/config/api/hooks/usePost';

const CompassHome = (props: NavigationPropsType) => {
    const scrollViewRef = useRef(null);
    const fromDate = moment().subtract(7, 'days').format('YYYY-MM-DD'); //one week ago
    const toDate = moment().format('YYYY-MM-DD') //set to today's date
    const [selectedDate, setSelectedDate] = useState<DayListItem>({
        title: 'All',
        date: moment.utc(toDate),
    });
    const DEFAULT_COMPASS = {
        date: selectedDate.date?.toISOString()!,
        virtue1: 'Professionalism',
        virtue2: 'Dedication',
        virtue3: 'Effort',
        virtue1Score: 0,
        virtue2Score: 0,
        virtue3Score: 0,
        overallScore: 0
    };
    const [currentCompass, setCurrentCompass] = useState<Compass>(DEFAULT_COMPASS);
    const {
        data: compassData,
        refetch
    } = useFetch(() => compassService.getUserCompass(fromDate, toDate), true);
    const {navigation} = props;

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            scrollViewRef.current?.scrollTo({y: 260, animated: true});
        },
        );

        return () => {
        keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        refetch();        
    }, [selectedDate]);

    useEffect(() => {
        const formattedDate = selectedDate.date?.format('YYYY-MM-DD');

        if(compassData && compassData.length > 0){
            const currentCompass = compassData.find(data => formattedDate === data.date);

            if(!currentCompass){
                setCurrentCompass(DEFAULT_COMPASS);
                return;
            }

            setCurrentCompass(currentCompass);
        }
    }, [compassData]);

  return (
    <MainWrapper colorArray={tertiaryGradientColorList}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            >
            <ScrollView style={styles.container} ref={scrollViewRef}>
                <View style={styles.navigationBarContainer}>
                    <BackButton
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    />
                    <Text variant="paragraph">{'Compass'}</Text>
                </View>
                <Separator height={RFValue(24)} />
                <DayPicker onItemPressed={() => {}} behindDays selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                <Separator height={RFValue(24)} />
                <CompassScore segments={[currentCompass.virtue1Score, currentCompass.virtue2Score, currentCompass.virtue3Score]} currentCompass={currentCompass}/>
                <Separator height={RFValue(24)} />
                <Text variant="body1" style={styles.virtueText}>{'Virtues'}</Text>
                <Separator height={RFValue(8)} />
                    <CompassItem name={currentCompass.virtue1} value={currentCompass.virtue1Score} setValue={(value) => setCurrentCompass({...currentCompass, virtue1Score: value})} submitCompass={postData}/>
                    <CompassItem name={currentCompass.virtue2} value={currentCompass.virtue2Score} setValue={(value) => setCurrentCompass({...currentCompass, virtue2Score: value})} submitCompass={postData}/>
                    <CompassItem name={currentCompass.virtue3} value={currentCompass.virtue3Score} setValue={(value) => setCurrentCompass({...currentCompass, virtue3Score: value})} submitCompass={postData}/>
                <Separator height={RFValue(220)} />
            </ScrollView>
        </KeyboardAvoidingView>
    </MainWrapper>
  );
};

export default CompassHome;