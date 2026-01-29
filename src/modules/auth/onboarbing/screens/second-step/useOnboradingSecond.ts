import React, { useEffect, useState } from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginMockApiCall } from 'src/utils/api/mock-api-call';
import { setToken, setUserData } from 'src/store/slices/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { JournalReminder } from 'src/utils/types';

const useOnboardingSecond = (props : NavigationPropsType) => {
    const {handleSubmit } = useForm<FieldValues>();
    const [date, setDate] = useState(new Date());
  
    const goBack = () => props.navigation.goBack();
  
    const [loading, setIsLoading] = useState<boolean>(false);
    const [source, setSource] = useState(''); // default fallback
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (props.route.params?.source) {
        setSource(props.route.params.source);
      }
    }, [props.route.params?.source]);
  
    const onSubmit = async () => {
        setIsLoading(true);
        const journal : JournalReminder[] = [{
            time: moment(date).local().format('DD/MM/YYYY hh:mm A'), // Based on users location
        }];
        
        try {
            // Save to AsyncStorage
            await AsyncStorage.setItem('journalReminder', JSON.stringify(journal));
            // Optionally, log to check
            console.log("Journal reminder: ", journal);

            const response = await loginMockApiCall();
            dispatch(setUserData(response.user))
            dispatch(setToken(response.token))
            props.navigation.navigate({
                name: navigationScreenNames.bottomNavigation,
                params: { source: source },
            })
        } catch (error) {
            console.log('Error ', error)
        } finally {
            setIsLoading(false)
        }
    }

    // To display saved data for compass items
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('compass');
                console.log("Your saved data: " + storedData)
            } catch (error) {
                console.error('Error fetching compass data:', error);
            }
        };
        fetchData();
    }, []);

    return {
        date,
        loading,
        setDate,
        goBack,
        onSubmit
    }
}

export default useOnboardingSecond