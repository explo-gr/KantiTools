import React, { createContext, useMemo } from 'react';
import getColorPalette from '../lib/getColorPalette';
import { StyleSheet, useColorScheme } from 'react-native';
import { useSettings } from './SettingsContext';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { settings } = useSettings();
    const systemTheme = useColorScheme();

    const theme = settings.theme === 'system' ? systemTheme : settings.theme;
    const colors = useMemo(() => ({
        ...getColorPalette(theme),
        blue: settings.accent
    }), [theme, settings.accent]);

    const defaultThemedStyles = useMemo(() => {
        const defaultThemedStyle = StyleSheet.create({
            card: {
                backgroundColor: colors.generic,
                borderColor: colors.blue,
                borderRadius: 20,
                borderWidth: 2.5
            },
            text: {
                color: colors.hardContrast,
                textAlignVertical: 'center'
            },
            textContrast: {
                color: colors.generic,
                textAlignVertical: 'center'
            },
            cardHighlight: {
                backgroundColor: colors.blue,
                borderRadius: 16,
            },
            boxshadow: {
                shadowColor: 'black',
                elevation: 10
            },
            view: {
                backgroundColor: colors.generic
            }
        });

        return defaultThemedStyle;
    }, [theme]);

    const contextValue = useMemo(() => ({
        colors,
        defaultThemedStyles,
        theme,
    }), [colors, defaultThemedStyles, theme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            { children }
        </ThemeContext.Provider>
    )
};

export const useThemes = () => React.useContext(ThemeContext);