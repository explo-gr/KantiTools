import { createStackNavigator } from '@react-navigation/stack';

import { useTranslations } from '../../context/LanguageContext';
import useScreenOptions from '../../hooks/useScreenOptions';
import ReminderMain from './components/MainScreen';

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