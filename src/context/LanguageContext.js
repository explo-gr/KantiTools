import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

import getSystemLanguage from '../lib/localeHelper';

import de from '../config/translations/de';
import en from '../config/translations/en';
import es from '../config/translations/es';
import fr from '../config/translations/fr';
import rm from '../config/translations/rm';
import it from '../config/translations/it';

const translations = Object.freeze({ de, en, es, fr, rm, it });
const translationsFullySupported = Object.freeze({de, en})

const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
    const [ language, setLang ] = useState('en');
    
    const setLanguage = async (newLanguage) => {
        if (translations[newLanguage]) {
            setLang(newLanguage);
            try {
                await AsyncStorage.setItem('language', newLanguage);
            } catch {
                console.error("Failed to set language!\nKeeping current language");
                setLang(language);
            }
        } else {
            console.warn(`Language "${newLanguage}" doesn't exist, keeping "${language}"`)
        }
    }

    const resetLanguage = async () => {
        // does not reload language
        await AsyncStorage.removeItem('language');
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
                    const deviceLocale = getSystemLanguage();
                    if (translations[deviceLocale]) {
                        selectedLanguage = deviceLocale;
                    } else {
                        console.warn("Device language unsupported!\n Using Fallback language");
                    }
                } else {
                    console.warn("Saved language unsupported!\nUsing Fallback language");
                }

                setLang(selectedLanguage);
            } catch (e) {
                console.error(`Failed to load language!\n${e}`);
            }
        }

        loadLanguage();
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, resetLanguage }}>
            {children}
        </LanguageContext.Provider>
    );

}

export const SupportedLanguages = Object.keys(translations);
export const useTranslations = () => React.useContext(LanguageContext);

//https://react-native-async-storage.github.io/async-storage/docs/api
//https://react.dev/learn/passing-data-deeply-with-context
//https://www.w3schools.com/react/react_usecontext.asp