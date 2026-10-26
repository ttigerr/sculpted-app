import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { Compass } from 'src/models/compass/compass';
import { compassService } from 'src/config/api/services/compass-service';
import useFetch from 'src/config/api/hooks/useFetch';

type VirtueKey = 'virtue1' | 'virtue2' | 'virtue3';

const computeOverallScore = (entry: Compass): number => {
    const total = entry.virtue1Score + entry.virtue2Score + entry.virtue3Score;
    return Math.floor((total / 30) * 100);
};

const findVirtueKey = (entry: Compass, virtue: string): VirtueKey | null => {
    if (entry.virtue1 === virtue) return 'virtue1';
    if (entry.virtue2 === virtue) return 'virtue2';
    if (entry.virtue3 === virtue) return 'virtue3';
    return null;
};

const useCompass = (props: NavigationPropsType) => {
    const { navigation } = props;
    const route = useRoute();
    const scrollViewRef = useRef<ScrollView>(null);

    const [allEntries, setAllEntries] = useState<Compass[]>([]);
    const [compassData, setCompassData] = useState<Compass[]>([]);
    const [filteredCompassData, setFilteredCompassData] = useState<Compass[]>([]);
    const [isDisable, setIsDisable] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const fromDate = useMemo(
        () => moment().subtract(30, 'days').format('YYYY-MM-DD'),
        [],
    );

    const { data: fetched, refetch } = useFetch<Compass[]>(
        () => compassService.getUserCompass(fromDate),
        { autoFetch: true, deps: [fromDate] },
    );

    useEffect(() => {
        if (fetched) setAllEntries(fetched);
    }, [fetched]);

    const goBack = () => navigation.goBack();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                scrollViewRef.current?.scrollTo({ y: 260, animated: true });
            },
        );
        return () => keyboardDidShowListener.remove();
    }, []);

    const applyDateFilter = useCallback(
        (entries: Compass[], dayString: string) => {
            const selected = moment(dayString, 'YYYY-MM-DD').startOf('day');
            const today = moment().startOf('day');
            const useToday = route.name === navigationScreenNames.journal;
            const target = useToday ? today : selected;

            const filtered = entries.filter(item => {
                if (!item.creationDate) return false;
                return moment(item.creationDate, 'YYYY-MM-DD').startOf('day').isSame(target, 'day');
            });
            setCompassData(filtered);
            setIsDisable(!selected.isSame(today, 'day'));
            setSelectedDate(selected.format('YYYY-MM-DD'));
        },
        [route.name],
    );

    const handledateFilter = useCallback(
        (day: { dateString: string }) => applyDateFilter(allEntries, day.dateString),
        [allEntries, applyDateFilter],
    );

    useEffect(() => {
        applyDateFilter(allEntries, selectedDate ?? moment().format('YYYY-MM-DD'));
    }, [allEntries, applyDateFilter, selectedDate]);

    const persistEntry = async (updated: Compass) => {
        setAllEntries(prev => prev.map(e => (e.creationDate === updated.creationDate ? updated : e)));
        try {
            await compassService.postCompass(updated);
        } catch (error) {
            // Server rejected the update — refetch to resync local state.
            refetch();
        }
    };

    const updateVirtue = async (creationDate: string, virtue: string, newValue: number) => {
        const entry = allEntries.find(e => e.creationDate === creationDate);
        if (!entry) return;
        const key = findVirtueKey(entry, virtue);
        if (!key) return;
        const updated: Compass = {
            ...entry,
            [`${key}Score`]: newValue,
        } as Compass;
        updated.overallScore = computeOverallScore(updated);
        await persistEntry(updated);
    };

    const updateVirtueNotes = async (creationDate: string, virtue: string, newValue: string) => {
        const entry = allEntries.find(e => e.creationDate === creationDate);
        if (!entry) return;
        const key = findVirtueKey(entry, virtue);
        if (!key) return;
        const updated: Compass = {
            ...entry,
            [`${key}Note`]: newValue,
        } as Compass;
        await persistEntry(updated);
    };

    return {
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
    };
};

export default useCompass;
