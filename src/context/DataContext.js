// contexts/DataContext.js
import React, { createContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthenticationContext';
import api from '../lib/sntz/api';
import parseGradeTable from '../lib/sntz/parsers/gradeTableParser';
import isEmpty from '../lib/isEmpty';

const DataContext = createContext(null);

const DATA_KEYS = {
    grades: 'cached_grades',
    // ATTENDANCE: 'cached_attendance',
    // TIMETABLE: 'cached_timetable'
};

export const DataProvider = ({ children }) => {
    const { user, loadingAuth } = useAuth();
    const [isReady, setIsReady] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const [grades, setGrades] = useState({ data: null, cached: false });

    const clearDataCache = async () => {
        console.log('[DATA] Clearing cached data...');
        for (const key in DATA_KEYS) {
            try {
                await AsyncStorage.removeItem(DATA_KEYS[key]);
                console.log(`[DATA] Cleared: ${key}`);
            } catch (err) {
                console.log(`[DATA] Failed to clear: ${key}`, err);
            }
        }
    };

    const fetchAndStore = useCallback(async (queryItems = []) => {
        if (!user || loadingAuth) {
            console.log('[DATA] Skipping fetch — User missing or authentication still loading.');
            return;
        }

        console.log('[DATA] Starting fetchAndStore...');
        const fetchTargets = queryItems.map(({ url, key }) => ({ url, key }));

        let rawData = {};
        try {
            rawData = await api.fetchSntzPages({
                queryItems: fetchTargets,
                username: user.username,
                password: user.password
            });

            console.log('[DATA] Raw data fetched successfully.');
        } catch (err) {
            console.error('[DATA] Error while fetching raw data:', err);
        }

        if (isEmpty(rawData)) {
            console.log('[DATA] No data retrieved');
            return;
        }

        for (const { key, setState, parser } of queryItems) {
            console.log(`[FETCH] Trying to parse key: ${key}`);
            if (rawData[key]) {
                try {
                    const parsedData = parser(rawData[key]);
                    if (parsedData) {
                        setState({ data: parsedData, cached: false });
                        await AsyncStorage.setItem(DATA_KEYS[key], JSON.stringify(parsedData));
                    } else {
                        setState({ data: null, cached: false });
                        console.log('[DATA] Parser failed..');
                    }
                } catch (e) {
                    setState({ data: null, cached: false });
                }
            } else {
                try {
                    const cached = await AsyncStorage.getItem(DATA_KEYS[key]);
                    if (cached) {
                        setState({ data: JSON.parse(cached), cached: true });
                    } else {
                        setState({ data: null, cached: false });
                    }
                } catch (e) {
                    setState({ data: null, cached: false });
                }
            }
        }

        console.log('[DATA] fetchAndStore completed.');
    }, [user, loadingAuth]);

    const refreshAll = useCallback(async () => {
        if (!user || loadingAuth || isFetching) {
            console.log('[DATA] Skipping refreshAll — unmet preconditions.', !!user, !!loadingAuth, !!isFetching);
            return;
        }

        console.log('[DATA] Starting refreshAll...');
        setIsReady(false);
        setIsFetching(true);

        await fetchAndStore([
            {
                url: api.HOST.GRADES,
                key: 'grades',
                parser: parseGradeTable,
                setState: setGrades,
            }
        ]);

        setIsFetching(false);
        setIsReady(true);
        console.log('[DATA] Data refreshed. Set isReady to true.');
    }, [user, loadingAuth, isFetching, fetchAndStore]);

    useEffect(() => {
        console.log('[DATA] useEffect fired');
        console.log(`[DATA] Current username: ${user?.username || 'unavailable...'} `);
        if (!loadingAuth && user) {
            console.log('[DATA] Auth complete and user exists — triggering refreshAll.');
            refreshAll();
        }
    }, [user, loadingAuth]);

    return (
        <DataContext.Provider value={{
            grades,
            refreshAll,
            isReady,
            clearDataCache
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => React.useContext(DataContext);