/*
 * Copyright (c) 2025 Gian-Marco Coray
 *
 * Licensed under the MIT License. See LICENSE file for details.
 */

import { useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Contexts
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { AuthProvider } from './src/context/AuthenticationContext';
import { DataProvider } from './src/context/DataContext';

// Components
import AppTabNavigator from './src/navigation/navigators/AppTabNavigator';
import Feather from '@expo/vector-icons/Feather';
import Placeholder from './src/components/utils/Placeholder';
import { TabBarVisibilityProvider } from './src/context/TabBarVisibilityContext';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        'InterDisplay-Bold': require('./src/assets/fonts/InterDisplay-Bold.ttf'),
        'Inter-Medium': require('./src/assets/fonts/Inter-Medium.ttf'),
        'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
        'JetBrainsMono-Medium': require('./src/assets/fonts/JetBrainsMono-Medium.ttf'),
        'JetBrainsMono-Bold': require('./src/assets/fonts/JetBrainsMono-Bold.ttf')
    });

    useEffect(() => {
        const prepare = async () => {
            if (!fontsLoaded) return; // wait font

            try {
                await Promise.race([
                    Feather.loadFont(),
                    new Promise(resolve => setTimeout(resolve, 2000)) // cap the max loading time
                ]);
            } catch {
                console.log('[SPLASH] Promise rejection');
            } finally {
                setAppIsReady(true);
                await SplashScreen.hideAsync();
                console.log('[SPLASH] Loading finished');
            }
        };

        prepare();
    }, [fontsLoaded]);

    return (
        <AuthProvider>
            <SettingsProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        <DataProvider>
                            <TabBarVisibilityProvider>
                                {appIsReady ? (<AppTabNavigator />) : (<Placeholder/>) /* Allow providers to start while loading the app */}
                            </TabBarVisibilityProvider>
                        </DataProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}