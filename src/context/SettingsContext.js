import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import defaultSettings from '../config/settings/settings';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({ ...defaultSettings });
    const [ settingsLoaded, setSettingsLoaded ] = useState(false);

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
                    setSettings({
                        ...defaultSettings, // account for possibly new/missing keys 
                        ...JSON.parse(savedSettings)
                    });
                }
            } catch (e) {
                console.error(`[SETTINGS] Failed to save settings: ${e}`);
            } finally {
                setSettingsLoaded(true);
            }
        }

        loadSettings();
    }, []);

    useEffect(() => {
        const saveSettings = async () => {
            try {
                console.log(`[SETTINGS] Detected setting change — saving`);
                await AsyncStorage.setItem('settings', JSON.stringify(settings));
            } catch (e) {
                console.error(`[SETTINGS] Failed to save settings: ${e}`);
            }
        }

        saveSettings();
    }, [settings]);

    return (
        <SettingsContext.Provider value={{ settings, changeSetting, resetSettings, settingsLoaded }}>
            { children }
        </SettingsContext.Provider>
    );
}

export const useSettings = () => React.useContext(SettingsContext);