import React, { createContext, useEffect, useMemo } from "react";
import getColorPalette from "../utils/getColorPalette";
import { StyleSheet, useColorScheme } from "react-native";
import { useSettings } from "./SettingsContext";
import { useTheme } from '../hooks/useTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { settings } = useSettings();
    
    const theme = useTheme();
    const colors = getColorPalette(theme);
    

    const defaultThemedStyles = useMemo(() => {
        const defaultThemedStyle = StyleSheet.create({
            card: {
                backgroundColor: colors.generic,
                borderColor: colors.blue,
                borderRadius: 10,
                borderWidth: 2.5
            },
            text: {
                color: colors.hardContrast,
            },
            textContrast: {
                color: colors.generic,
            },
            cardHighlight: {
                backgroundColor: colors.blue,
                borderColor: colors.blue,
                borderRadius: 10,
                borderWidth: 4
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

    return (
        <ThemeContext.Provider value={{ colors, defaultThemedStyles }}>
            { children }
        </ThemeContext.Provider>
    )
};

export const useThemes = () => React.useContext(ThemeContext);