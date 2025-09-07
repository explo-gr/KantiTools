// Imports
import { createStackNavigator } from '@react-navigation/stack';

import { useTranslations } from '../../context/LanguageContext';
import useScreenOptions from '../../hooks/useScreenOptions';
import HomeMain from './components/MainScreen';

// Stack Navigator
const Stack = createStackNavigator();

// Home Screen
const HomeScreen = () => {
    const screenOptions = useScreenOptions();
    const { t } = useTranslations();

    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeMain' component={HomeMain} options={{
                title: t('Home'),
                ...screenOptions }} />
        </Stack.Navigator>
    );
};

export default HomeScreen;