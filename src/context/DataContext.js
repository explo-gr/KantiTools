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
    GRADES: 'cached_grades',
    // ATTENDANCE: 'cached_attendance',
    // TIMETABLE: 'cached_timetable'
};

const DataProvider = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const [isReady, setIsReady] = useState(false); // unified readiness flag
    const [loadingStates, setLoadingStates] = useState({
        grades: false,
        // attendance: false,
        // timetable: false
    });

    const [grades, setGrades] = useState({ data: null, cached: false });
    // const [attendance, setAttendance] = useState({ data: null, cached: false });
    // const [timetable, setTimetable] = useState({ data: null, cached: false });

    const fetchAndStore = useCallback(async (key, url, parser, setState, forceNetwork = false, type = null) => {
        if (!user || loading) return;

        if (type) {
            setLoadingStates(prev => ({ ...prev, [type]: true }));
        }

        try {
            let response = null;
            if (!forceNetwork) {
                response = await api.authenticateAndFetch({
                    url,
                    username: user.username,
                    password: user.password
                });
            }

            if (response) {
                const parsed = parser(response);
                setState({ data: parsed, cached: false });
                await AsyncStorage.setItem(key, JSON.stringify(parsed));
            } else {
                const cached = await AsyncStorage.getItem(key);
                if (cached) {
                    setState({ data: JSON.parse(cached), cached: true });
                } else {
                    setState({ data: null, cached: false });
                }
            }
        } catch (error) {
            console.error(`Error fetching/storing ${type}:`, error);
        } finally {
            if (type) {
                setLoadingStates(prev => ({ ...prev, [type]: false }));
            }
        }
    }, [user, loading]);

    const refreshAll = useCallback(async (forceNetwork = false) => {
        if (loading || !user) return;

        setIsReady(false);
        await Promise.all([
            fetchAndStore(DATA_KEYS.GRADES, api.HOST.GRADES, gradeTableParser, setGrades, forceNetwork, 'grades'),
            //fetchAndStore(DATA_KEYS.ATTENDANCE, api.HOST.ATTENDANCE, attendanceParser, setAttendance, forceNetwork, 'attendance'),
            //fetchAndStore(DATA_KEYS.TIMETABLE, api.HOST.TIMETABLE, timetableParser, setTimetable, forceNetwork, 'timetable')
        ]);
        setIsReady(true);
    }, [fetchAndStore, user, loading]);

    useEffect(() => {
        if (loading || !user) return;
        refreshAll();
    }, [user, loading, refreshAll]);

    return (
        <DataContext.Provider value={{
            grades,
            // attendance,
            // timetable,
            refreshAll,
            refreshGrades: () => fetchAndStore(DATA_KEYS.GRADES, api.HOST.GRADES, gradeTableParser, setGrades, true, 'grades'),
            // refreshAttendance: () => fetchAndStore(DATA_KEYS.ATTENDANCE, api.HOST.ATTENDANCE, attendanceParser, setAttendance, true, 'attendance'),
            // refreshTimetable: () => fetchAndStore(DATA_KEYS.TIMETABLE, api.HOST.TIMETABLE, timetableParser, setTimetable, true, 'timetable'),
            isReady,
            loadingStates
        }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataProvider };
export const useData = () => React.useContext(DataContext);