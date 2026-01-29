import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import mockCompass from 'src/consts/data.json'

const userDataSelector = (state: any) => state.auth.user;

const useDashboard = (props: NavigationPropsType) => {
    const { navigation } = props;
    const [focused, setFocused] = useState(false);
    const userData = useSelector(userDataSelector);
    const [compassData, setCompassData] = useState<any[]>([]);

    // Calculate total score and progress
    const totalScore = compassData.map(item => item.virtue1Score + item.virtue2Score + item.virtue3Score);
    const progress = totalScore.map(total => Math.floor((total / 30) * 100));

    // Placeholder if no data
    const placeholderData = Array.from({ length: 3 }, (_, index) => ({
        id: `placeholder-${index}`,
        virtue: 'Add',
        score: null,
    }));

    // Final data to render: today's data or placeholder
    const finalCompassData = compassData.length === 0 ? placeholderData : compassData;

    // Navigation handlers
    const goToJournalScreen = () => {
        setFocused(prev => !prev);
        navigation.navigate({
        name: navigationScreenNames.journal,
        params: { source: 'dashboard' },
        key: `journal-${Date.now()}`,
        });
    };

    const onProfileInfoPressed = () => {
        navigation.navigate({
        name: navigationScreenNames.profile,
        params: { source: 'dashboard' },
        key: `profile-${Date.now()}`,
        });
    };

    // Fetch and filter compass data for today
    const fetchData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('compass');
            const todayDate = moment().startOf('day');
            let compassArray: any[] = [];

            if (storedData) {
                const json = JSON.parse(storedData);
                if (Array.isArray(json)) {
                compassArray = json;
                } else if (json?.compass && Array.isArray(json.compass)) {
                compassArray = json.compass;
                }
            }

            const filteredData = compassArray.filter((item) => {
                if (!item.creationDate) {
                    return false;
                }
            const itemDate = moment(item.creationDate, 'YYYY-MM-DD').startOf('day');
            return itemDate.isSame(todayDate, 'day');
        });
        setCompassData(filteredData);

        } catch (error) {
        console.log('Error fetching compass data:', error);
        setCompassData([]);
        }
    };

    // Flatten and limit compass data to 3 items
    const compassItems = useMemo(() => {
        const flattened = finalCompassData.flatMap(item => [
            { virtue: item.virtue1 ?? 'Add', score: item.virtue1Score ?? null },
            { virtue: item.virtue2 ?? 'Add', score: item.virtue2Score ?? null },
            { virtue: item.virtue3 ?? 'Add', score: item.virtue3Score ?? null },
        ]);

        // Add filler items if less than 3
        while (flattened.length < 3) {
            flattened.push({ virtue: 'Add', score: null });
        }

        return flattened.slice(0, 3); // return only 3 items
    }, [finalCompassData]);

    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(
        useCallback(() => {
        fetchData();
        }, [])
    );

    return {
        userData,
        navigation,
        goToJournalScreen,
        onProfileInfoPressed,
        compassData,
        progress,
        focused,
        finalCompassData,
        compassItems,
    };
};

export default useDashboard;
