import React, { createContext, useMemo } from 'react';
import getColorPalette from '../lib/themes/getColorPalette';
import { StyleSheet, useColorScheme } from 'react-native';
import { useSettings } from './SettingsContext';
import getAccentColor from '../lib/themes/getAccentColor';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { settings } = useSettings();
    const systemTheme = useColorScheme();

    const theme = useMemo(() =>
        settings.theme === 'system' ? systemTheme : settings.theme
    , [systemTheme, settings.theme]);

    const { accent, generic } = useMemo(() => {
        return getAccentColor(theme, settings.accent_color);
    }, [theme, settings.accent_color]);

    const colors = useMemo(() => {
        const defaultPalette = getColorPalette(theme);

        return {
            ...defaultPalette,
            accent,
            generic
        }
    }, [theme, accent, generic]);

    const defaultThemedStyles = useMemo(() => {
        const defaultThemedStyle = StyleSheet.create({
            card: {
                backgroundColor: colors.generic,
                borderColor: colors.accent,
                borderRadius: 20,
                borderWidth: 2.5
            },
            text: {
                color: colors.hardContrast,
                textAlignVertical: 'center',
                fontFamily: 'Inter-Medium'
            },
            textContrast: {
                color: colors.generic,
                textAlignVertical: 'center'
            },
            cardHighlight: {
                backgroundColor: colors.accent,
                borderRadius: 16,
            },
            boxshadow: {
                shadowColor: 'black',
                elevation: 15
            },
            view: {
                backgroundColor: colors.generic
            }
        });

        return defaultThemedStyle;
    }, [theme, colors]);

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