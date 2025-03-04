import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultSettings } from '../config/settings';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({ ...defaultSettings });

    const changeSetting = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Load on startup
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSettings = await AsyncStorage.getItem('settings-generic');
                if (savedSettings === null) await AsyncStorage.setItem('settings-generic', JSON.stringify(defaultSettings));

                setSettings(JSON.parse(savedSettings));
            } catch (e) {
                console.error(e);
            }
        }

        loadSettings();
    }, []);

    useEffect(() => {
        const saveSettings = async () => {
            try {
                await AsyncStorage.setItem('settings-generic', JSON.stringify(defaultSettings));
            } catch (e) {
                console.error(e);
            }
        }

        saveSettings();
    }, [settings]);

    return (
        <SettingsContext.Provider value={{ settings, changeSetting }}>
            { children }
        </SettingsContext.Provider>
    );
}

export const useSettings = () => React.useContext(SettingsContext);