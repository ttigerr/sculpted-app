import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard } from "react-native";
import { NavigationPropsType } from "src/utils/types";
import moment, { Moment } from "moment";
import { useRoute } from "@react-navigation/native";
import { navigationScreenNames } from "src/utils/navigation-screen-names";

const useCompass = (props : NavigationPropsType) => {
    const {navigation} = props;
    const scrollViewRef = useRef(null);
    const [compassData, setCompassData] = useState([]);
    const [filteredCompassData, setFilteredCompassData] = useState([]);
    const [isDisable, setIsDisable] = useState(false);
    const [selectedDate, setSelectedDate] = useState<String | null>(null);
    const route = useRoute();

    const goBack = () => {
        navigation.goBack();
    }

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
    
    // Load compass data from AsyncStorage
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('compass');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    if (Array.isArray(parsedData)) {
                        setCompassData(parsedData);
                    } else if (parsedData?.compass) {
                        setCompassData(parsedData.compass);
                    } else {
                        setCompassData([]);
                    }
                } else {
                    setCompassData([]);
                }
            } catch (error) {
                console.error('Error fetching compass data:', error);
                setCompassData([]);
        }};
        fetchData();
        
    }, []);
    
    // Update overall score from 3 virtues score
    const updateOverallScore = (item: any) => {
        const score1 = item.virtue1Score;
        const score2 = item.virtue2Score;
        const score3 = item.virtue3Score;
        const total = score1 + score2 + score3;
        return Math.floor((total / 30) * 100); // max 30
    };

    const updateVirtue = async (creationDate: string, virtue: string, newValue: number) => {
        try {
            const stored = await AsyncStorage.getItem('compass');
            const parsedData = stored ? JSON.parse(stored) : [];
        
            const updated = parsedData.map((item: any) => {
                if (item.creationDate === creationDate) {
                    if (item.virtue1 === virtue) {
                        item.virtue1Score = newValue;
                    } else if (item.virtue2 === virtue) {
                        item.virtue2Score = newValue;
                    } else if (item.virtue3 === virtue) {
                        item.virtue3Score = newValue;
                    }
            
                    item.overallScore = updateOverallScore(item);
                    return item;
                }
                    return item;
            });
      
            await AsyncStorage.setItem('compass', JSON.stringify(updated));

            // To filtered only selected data on daypicker component
            const filtered = updated.filter((item: any) => item.creationDate === creationDate);
            setCompassData(filtered);
        } catch (error) {
          console.error('Failed to update virtue score:', error);
        }
    };

    // Handler to update note
    const updateVirtueNotes = async (creationDate: string, virtue: string, newValue: string) => {
        try {
            const stored = await AsyncStorage.getItem('compass');
            const parsedData = stored ? JSON.parse(stored) : [];
            const updated = parsedData.map((item: any) => {
                if (item.creationDate === creationDate) {
                    if (item.virtue1 === virtue) {
                    return { ...item, virtue1Note: newValue };
                    } else if (item.virtue2 === virtue) {
                    return { ...item, virtue2Note: newValue };
                    } else if (item.virtue3 === virtue) {
                    return { ...item, virtue3Note: newValue };
                    }
                }
                return item;
            });
    
            // Set the new update into compass
            await AsyncStorage.setItem('compass', JSON.stringify(updated));

            // To filtered only selected data on daypicker component
            const filtered = updated.filter((item: any) => item.creationDate === creationDate);
            setCompassData(filtered);
        } catch (error) {
            console.log('Failed to update virtue note: ', error)
        }
    };

    const handledateFilter = async (day: {dateString: string}) => {
        try {
            const storedData = await AsyncStorage.getItem('compass');
            let compassArray: any[] = [];
        
            if (storedData) {
                const json = JSON.parse(storedData);
                compassArray = Array.isArray(json) ? json : (Array.isArray(json.compass) ? json.compass : []);
            }
            
        
            const selected = moment(day.dateString, 'YYYY-MM-DD').startOf('day');
            const todayDate = moment().startOf('day');
            const getDayName = selected.isValid() ? selected.format('dddd') : null;
        
            const filteredData = compassArray.filter((item) => {
                if (!item.creationDate) return false;
        
                const itemDate = moment(item.creationDate, 'YYYY-MM-DD').startOf('day');
                return route.name === navigationScreenNames.journal
                ? itemDate.isSame(todayDate, 'day')
                : itemDate.isSame(selected, 'day');
            });
        
            setCompassData(filteredData);

            const isTodaySelected = selected.isSame(todayDate, 'day');
            setIsDisable(!isTodaySelected);
            setSelectedDate(selected.format('YYYY-MM-DD'));

            console.log('Today date is:', getDayName);
            console.log('Selected:', selected.format('YYYY-MM-DD'));
            console.log('Filtered Compass:', filteredData);
      
        } catch (error) {
            console.error('Error in handledateFilter:', error);
            setCompassData([]);
        }
    };
      
    useEffect(() => {
        const today = {
            dateString: moment().format('YYYY-MM-DD'),
        };
        handledateFilter(today);
    }, []);
      
      
    return  {
        goBack,
        compassData,
        updateVirtue,
        scrollViewRef,
        handledateFilter,
        filteredCompassData,
        isDisable,
        setFilteredCompassData,
        selectedDate,
        updateVirtueNotes,
    }
}

export default useCompass;