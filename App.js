/*
 * Copyright (c) 2025 Gian-Marco Coray
 *
 * Licensed under the MIT License. See LICENSE file for details.
 */

// Contexts
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { AuthProvider } from './src/context/AuthenticationContext';
import { DataProvider } from './src/context/DataContext';

// Components
import AppTabNavigator from './src/navigation/navigators/AppTabNavigator';

export default function App() {
    return (
        <AuthProvider>
            <SettingsProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        <DataProvider>
                            <AppTabNavigator />
                        </DataProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}