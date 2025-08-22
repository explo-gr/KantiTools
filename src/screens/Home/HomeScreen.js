// Imports
import { createStackNavigator } from '@react-navigation/stack';
import HomeMain from './components/MainScreen'
import useScreenOptions from '../../hooks/useScreenOptions';
import { useTranslations } from '../../context/LanguageContext';

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