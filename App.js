/*
 * Copyright (C) 2025 Gian-Marco Coray
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 only.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
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