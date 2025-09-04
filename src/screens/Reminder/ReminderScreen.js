import { createStackNavigator } from '@react-navigation/stack';
import ReminderMain from './components/MainScreen';
import useScreenOptions from '../../hooks/useScreenOptions';
import { useTranslations } from '../../context/LanguageContext';

const Stack = createStackNavigator();

const ReminderScreen = () => {
    const { t } = useTranslations();
    const screenOptions = useScreenOptions();

    return (
        <Stack.Navigator>
            <Stack.Screen name='ReminderMain' component={ReminderMain} options={{
                title: t('Reminder'),
                ...screenOptions
                }} />
        </Stack.Navigator>
    );
}

export default ReminderScreen;