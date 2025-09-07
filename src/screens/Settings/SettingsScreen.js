// imports regarding general objects
import { createStackNavigator } from '@react-navigation/stack';

import { useTranslations } from '../../context/LanguageContext';
import useHeaderOptions from '../../hooks/useHeaderOptions';
import useScreenOptions from '../../hooks/useScreenOptions';
import SettingsMain from './components/MainScreen';
import SettingsAttributions from './components/SettingsAttributionScreen';
import SntzAccountManagement from './components/SntzAccountScreen';

const Stack = createStackNavigator();

const SettingsScreen = () => {
    const { t } = useTranslations();

    const headerOptions = useHeaderOptions();
    const screenOptions = useScreenOptions();

    return (
        <Stack.Navigator>
            <Stack.Screen name='SettingsMain' component={SettingsMain} options={{
                title: t('Settings'),
                ...screenOptions }} />
            <Stack.Screen name='SntzAccountManagement' component={SntzAccountManagement} options={{
                title: t('st_sntz_acc_f'),
                hideTabBar: true,
                ...headerOptions
            }} />
            <Stack.Screen name='SettingsAttribution' component={SettingsAttributions} options={{
                title: t('st_oss_l'),
                freezeOnBlur: true,
                ...headerOptions
            }} />
        </Stack.Navigator>
    );
}

export default SettingsScreen;