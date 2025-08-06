import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useMemo, useState } from 'react';

import getSystemLanguages from '../lib/localeHelper';

import de from '../config/translations/de';
import en from '../config/translations/en';
import es from '../config/translations/es';
import fr from '../config/translations/fr';
import rm from '../config/translations/rm';
import it from '../config/translations/it';

const translations = Object.freeze({ de, en, es, fr, rm, it });

const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
    const [ language, setLang ] = useState('en');
    
    const setLanguage = async (newLanguage) => {
        if (!translations[newLanguage]) {
            console.warn(`[LANG] Language "${newLanguage}" doesn't exist, keeping "${language}"`);
            return;
        }
        
        try {
            await AsyncStorage.setItem('language', newLanguage);
            setLang(newLanguage);
        } catch {
            console.error("[LANG] Failed to set language!\nKeeping current language");
        }
    }

    const loadLanguage = async (skipStorage = false) => {
        try {
            const storedLanguage = skipStorage ? null : await AsyncStorage.getItem('language');
            let selectedLanguage = 'en';

            if (translations[storedLanguage]) {
                selectedLanguage = storedLanguage;
            } else if (storedLanguage === null) {
                // first launch
                const deviceLocales = getSystemLanguages();

                const langFound = deviceLocales.some((lang) => {
                    if (translations[lang]) {
                        selectedLanguage = lang;
                        return true;
                    }
                })

                if (!langFound) console.warn("[LANG] Device language unsupported!\n Using Fallback language");
            } else {
                console.warn("[LANG] Saved language unsupported!\nUsing Fallback language");
            }

            setLang(selectedLanguage);
        } catch (e) {
            console.error(`[LANG] Failed to load language!\n${e}`);
        }
    }

    const resetLanguage = async () => {
        await AsyncStorage.removeItem('language');
        await loadLanguage(true);
    } 

    const t = (key) => translations[language]?.[key] || key;

    useEffect(() => {
        loadLanguage();
    }, []);

    const contextValue = useMemo(() => ({
        language,
        setLanguage,
        t,
        resetLanguage
    }), [language]);
 
    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );

}

export const SupportedLanguages = Object.keys(translations);
export const useTranslations = () => React.useContext(LanguageContext);