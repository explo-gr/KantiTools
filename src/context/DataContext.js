// contexts/DataContext.js
import React, { createContext, useEffect, useState, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext, { useAuth } from './AuthenticationContext';
import api from '../lib/sntz/api';
import gradeTableParser from '../lib/sntz/parsers/gradeTableParser';

const DataContext = createContext(null);

const DATA_KEYS = {
    grades: 'cached_grades',
    // ATTENDANCE: 'cached_attendance',
    // TIMETABLE: 'cached_timetable'
};

const DataProvider = ({ children }) => {
    const { user, loadingAuth } = useAuth();
    const [isReady, setIsReady] = useState(false);
    const [grades, setGrades] = useState({ data: null, cached: false });

    // key, urls, parser, setState, type = null
    const fetchAndStore = useCallback(async (queryItems = [{ url: null, key: null, parser: (_) => null, setState: () => null }]) => {
        if (!user || !loadingAuth) return;

        const rawData = await api.fetchSntzPages(
            queryItems.map({ url, key }),
            user.username,
            user.password
        );

        for (const { key, setState, parser } of queryItems) {
            if (rawData[key]) {
                const parsedData = parser(rawData[key]);
                
                if (parsedData) {
                    setState({ data: parsedData, cached: false });
                    AsyncStorage.setItem(DATA_KEYS[key], JSON.stringify(parsedData));
                } else {
                    setState({ data: null, cached: false });
                    console.log(`Parser for key "${key}" has failed`);
                }
            } else {
                const cached = await AsyncStorage.getItem(DATA_KEYS[key]);
                if (cached) {
                    setState({ data: JSON.parse(cached), cached: true });
                } else {
                    setState({ data: null, cached: false });
                }
            }
        }

    }, [user, loadingAuth]);

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

    }, [fetchAndStore]);

    useEffect(() => {
        if (!loadingAuth || !user) return;
        refreshAll();
    }, [refreshAll]); // will fire when refreshAll changes, which changes if fetchAndStore change, which changes when user and loadingAuth change

    return (
        <DataContext.Provider value={{
            grades,
            refreshAll,
            isReady,
            // attendance,
            // timetable,
            // refreshAttendance: () => fetchAndStore(DATA_KEYS.ATTENDANCE, api.HOST.ATTENDANCE, attendanceParser, setAttendance, true, 'attendance'),
            // refreshTimetable: () => fetchAndStore(DATA_KEYS.TIMETABLE, api.HOST.TIMETABLE, timetableParser, setTimetable, true, 'timetable'),
            // loadingStates
        }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataProvider };
export const useData = () => React.useContext(DataContext);