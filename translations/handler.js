import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

import { getLocale } from '../utils/locale';

import de from './de';
import en from './en';

const translations = { de, en };

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [ language, setLang ] = useState('en');
    
    const setLanguage = async (newLanguage) => {
        if (translations[newLanguage]) {
            setLang(newLanguage);
            try {
                await AsyncStorage.setItem('language', newLanguage);
            } catch {
                console.error("Failed to set language!\nUsing Fallback language");
            }
        }
    }

    //https://stackoverflow.com/questions/61847231/question-mark-before-dot-in-javascript-react
    const t = (key) => translations[language]?.[key] || key;

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('language');
                let selectedLanguage = 'en';

                if (translations[storedLanguage]) {
                    selectedLanguage = storedLanguage;
                } else if (storedLanguage === null) {
                    // first launch
                    const deviceLocale = getLocale();
                    if (translations[deviceLocale]) {
                        selectedLanguage = deviceLocale;
                    } else {
                        console.warn("Device language unsupported!\n Using Fallback language");
                    }
                } else {
                    console.warn("Saved language unsupported!\nUsing Fallback language");
                }

                setLang(selectedLanguage);
            } catch {
                console.error("Failed to load language!");
            }
        }

        loadLanguage();
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );

}

//https://react-native-async-storage.github.io/async-storage/docs/api
//https://react.dev/learn/passing-data-deeply-with-context
//https://www.w3schools.com/react/react_usecontext.asp