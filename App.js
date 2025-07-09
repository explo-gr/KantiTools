// Contexts
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { AuthProvider } from './src/context/AuthenticationContext';

// Components
import TabNavigator from './src/navigation/navigators/BottomTabNavigator';
import AppTabNavigator from './src/navigation/navigators/AppTabNavigator';

export default function App() {
    return (
        <AuthProvider>
            <SettingsProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        <AppTabNavigator />
                    </LanguageProvider>
                </ThemeProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}