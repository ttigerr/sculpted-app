import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { Compass } from 'src/models/compass/compass';
import { compassService } from 'src/config/api/services/compass-service';
import useFetch from 'src/config/api/hooks/useFetch';
import Toast from 'react-native-toast-message';
import { TOAST_SAVE_ERROR_CONFIG } from 'src/consts/constants';

type VirtueKey = 'virtue1' | 'virtue2' | 'virtue3';

// How long to wait after the last edit before saving to the API.
const SAVE_DELAY_MS = 800;

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

    // Edits not yet sent to the API, keyed by creationDate. Tapping +/- quickly
    // keeps replacing the pending entry, so only the final value is sent.
    const pendingRef = useRef<Map<string, Compass>>(new Map());
    const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const flushPending = useCallback(async () => {
        if (saveTimerRef.current) {
            clearTimeout(saveTimerRef.current);
            saveTimerRef.current = null;
        }
        const entries = [...pendingRef.current.values()];
        pendingRef.current.clear();
        if (entries.length === 0) return;

        const results = await Promise.allSettled(entries.map(e => compassService.postCompass(e)));
        if (results.some(r => r.status === 'rejected')) {
            Toast.show(TOAST_SAVE_ERROR_CONFIG);
            // Resync with what the server actually has.
            refetch();
        }
    }, [refetch]);

    // Send any unsaved edits when leaving the screen.
    useEffect(() => () => { flushPending(); }, [flushPending]);

    const persistEntry = (updated: Compass) => {
        setAllEntries(prev => prev.map(e => (e.creationDate === updated.creationDate ? updated : e)));
        pendingRef.current.set(updated.creationDate, updated);
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(flushPending, SAVE_DELAY_MS);
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
        persistEntry(updated);
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
        persistEntry(updated);
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
