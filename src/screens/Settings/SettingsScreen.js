// imports regarding general objects
import { createStackNavigator } from '@react-navigation/stack';
import SettingsMain from './components/MainScreen';
import SntzAccountManagement from './components/SntzAccountScreen';
import useHeaderOptions from '../../hooks/useHeaderOptions';
import useScreenOptions from '../../hooks/useScreenOptions';
import { useTranslations } from '../../context/LanguageContext';

const Stack = createStackNavigator();

const SettingsScreen = () => {
    const { t } = useTranslations();

    const headerOptions = useHeaderOptions();
    const screenOptions = useScreenOptions();

    return (
        <Stack.Navigator>
            <Stack.Screen name='SettingsMain' component={SettingsMain} options={{ headerShown: false, ...screenOptions }} />
            <Stack.Screen name='SntzAccountManagement' component={SntzAccountManagement} options={{
                title: t('st_sntz_acc_f'),
                ...headerOptions
            }} />
        </Stack.Navigator>
    );
}

export default SettingsScreen;