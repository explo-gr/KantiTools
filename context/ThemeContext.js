import { createContext, useMemo } from "react";
import getColorPalette from "../utils/getColorPalette";
import { StyleSheet, useColorScheme } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const theme = useColorScheme();
    const colors = getColorPalette(theme);

    const defaultThemedStyle = useMemo(() => {
        const defaultThemedStyles = StyleSheet.create({
            background: {
                backgroundColor: colors.generic
            },
            card: {
                backgroundColor: colors.generic
            },
            text: {
                color: colors.hardContrast
            }
        });

        return defaultThemedStyle;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ colors, defaultThemedStyle }}>
            { children }
        </ThemeContext.Provider>
    )
}