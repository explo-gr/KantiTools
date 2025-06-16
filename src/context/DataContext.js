// contexts/DataContext.js
import React, { createContext, useEffect, useState, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';
import api from '../lib/sntz/api';
import {
    gradeTableParser,
    // attendanceParser,
    // timetableParser
} from '../lib/sntz/parsers';

const DataContext = createContext(null);

const DATA_KEYS = {
    grades: 'cached_grades',
    // ATTENDANCE: 'cached_attendance',
    // TIMETABLE: 'cached_timetable'
};

const DataProvider = ({ children }) => {
    const { user, authIsReady } = useContext(AuthContext);
    const [isReady, setIsReady] = useState(false); // unified readiness flag
    const [grades, setGrades] = useState({ data: null, cached: false });

    // key, urls, parser, setState, type = null
    const fetchAndStore = useCallback(async (queryItems = [{ url: null, key: null, parser: (_) => null, setState: () => null }]) => {
        if (!user || !isReady) return;

        const rawData = await api.fetchSntzPages(
            queryItems.map({ url, key }),
            user.username,
            user.password
        );

        for (const { key, setState, parser } of queryItems) {
            if (rawData[key]) {
                const parsedData = parser(rawData[key]);
                setState({ data: parsedData, cached: false });

                AsyncStorage.setItem(DATA_KEYS[key], parsedData);
            } else {
                const cached = await AsyncStorage.getItem(DATA_KEYS[key]);
                if (cached) {
                    setState({ data: cached, cached: true });
                } else {
                    setState({ data: null, cached: false })
                }
            }
        }

    }, [user, isReady]);

    const refreshAll = useCallback(async () => {
        if (!isReady || !user) return;

        setIsReady(false);
        await fetchAndStore([
            {
                url: api.HOST.GRADES, // url wia data_key direkt fum key abhängig macha? 
                key: 'grades',
                parser: gradeTableParser,
                setState: setGrades
            }
        ]);
        setIsReady(true);
    }, [fetchAndStore, user, authIsReady]);

    useEffect(() => {
        if (authIsReady || !user) return;
        refreshAll();
    }, [user, loading, refreshAll]);

    return (
        <DataContext.Provider value={{
            grades,
            // attendance,
            // timetable,
            refreshAll,
            // refreshAttendance: () => fetchAndStore(DATA_KEYS.ATTENDANCE, api.HOST.ATTENDANCE, attendanceParser, setAttendance, true, 'attendance'),
            // refreshTimetable: () => fetchAndStore(DATA_KEYS.TIMETABLE, api.HOST.TIMETABLE, timetableParser, setTimetable, true, 'timetable'),
            isReady,
            // loadingStates
        }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataProvider };
export const useData = () => React.useContext(DataContext);