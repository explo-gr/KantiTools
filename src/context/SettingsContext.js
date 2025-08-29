import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultSettings from '../config/settings/settings';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({ ...defaultSettings });
    const [ settingsReady, setSettingsReady ] = useState(false);

    const changeSetting = useCallback((key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const resetSettings = useCallback(() => {
        setSettings({ ...defaultSettings });
    }, []);

    // Load on startup
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSettings = await AsyncStorage.getItem('settings');
                if (savedSettings === null) {
                    await AsyncStorage.setItem('settings', JSON.stringify(defaultSettings));
                    setSettings(defaultSettings);
                } else {
                    setSettings(JSON.parse(savedSettings));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setSettingsReady(true);
            }
        }

        loadSettings();
    }, []);

    useEffect(() => {
        const saveSettings = async () => {
            try {
                await AsyncStorage.setItem('settings', JSON.stringify(settings));
            } catch (e) {
                console.error(e);
            }
        }

        saveSettings();
    }, [settings]);

    return (
        <SettingsContext.Provider value={{ settings, changeSetting, resetSettings }}>
            { children }
        </SettingsContext.Provider>
    );
}

export const useSettings = () => React.useContext(SettingsContext);