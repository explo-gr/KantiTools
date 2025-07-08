// Contexts
import { LanguageProvider } from './src/context/LanguageContext.js';
import { ThemeProvider } from './src/context/ThemeContext.js';
import { SettingsProvider } from './src/context/SettingsContext.js';

// Components
import TabNavigator from './src/navigation/navigators/BottomTabNavigator';
import AppTabNavigator from './src/navigation/navigators/AppTabNavigator';

export default function App() {
    return (
        <SettingsProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <AppTabNavigator />
                </LanguageProvider>
            </ThemeProvider>
        </SettingsProvider>
    );
}