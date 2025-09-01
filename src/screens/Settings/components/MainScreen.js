import Feather from '@expo/vector-icons/Feather';
import { useCallback, useMemo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Button from '../../../components/common/Button';
import ContainerView from '../../../components/common/ContainerView';
import DropdownSelect from '../../../components/common/DropdownSelect';
import Header from '../../../components/common/Header';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import TranslatedText from '../../../components/translations/TranslatedText';
import { useAuth } from '../../../context/AuthenticationContext';
import { useData } from '../../../context/DataContext';
import { SupportedLanguages, useTranslations } from '../../../context/LanguageContext';
import { useSettings } from '../../../context/SettingsContext';
import { useThemes } from '../../../context/ThemeContext';
import { clearMenuplanData } from '../../../lib/menuplanHelper';
import Credit from './Credit';
import SettingsCategoryHeader from './SettingsCategoryHeader';
import SettingsItem from './SettingsItem';
import { ScrollView } from 'react-native-gesture-handler';

const AccountStatusIndicator = () => {
    const { user, loadingAuth } = useAuth();
    const { colors, defaultThemedStyles } = useThemes();

    if (loadingAuth) return <LoadingIndicator/>;

    const isLoggedIn = !!user;
    const textKey = isLoggedIn ? 'st_ln_y' : 'st_ln_n';
    const iconName = isLoggedIn ? 'check' : 'x';
    const iconColor = isLoggedIn ? colors.green : colors.red; 
          
    return (
        <View style={styles.statusContainer}>
            <TranslatedText style={defaultThemedStyles.text}>
                {textKey}
            </TranslatedText>
            <Feather name={iconName} size={24} color={iconColor} />
        </View>
    );
}

const SettingsMain = ({ navigation }) => {
    // Settings
    const { changeSetting, resetSettings, settings } = useSettings();

    // Language Settings
    const { language, setLanguage, t, resetLanguage } = useTranslations();

    // Theme Settings
    const themeStates = useMemo(() => (['dark', 'white', 'system']), []);
    const accentColors = useMemo(() => (['red', 'green', 'blue', 'purple']), []);

    // Data
    const { clearDataCache } = useData();
    const { logout } = useAuth();

    const handleReset = useCallback(() => {
        Alert.alert(
            t('reset'),
            t('st_rst_msg'),
            [
                { text: t('cancel'), style: 'cancel' },
                {
                    text: t('yes'),
                    onPress: async () => {
                        /*
                            reverts all settings to default settings
                            and resets the data of other components
                            !! doesn't clear todo and timetable !!
                        */
                        try {
                            resetSettings();
                            await resetLanguage();
                            await clearDataCache();
                            await clearMenuplanData();
                            await logout();
                            Alert.alert(t('reset'), t('st_rst_succ_msg'));
                        } catch {
                            Alert.alert(t('reset'), t('error'));
                        }
                    },
                    style: 'destructive'
                },
            ],
            { cancelable: true }
        );
    }, []);

    return (
        <ContainerView>
            <Header title={'Settings'}/>

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 150
                }}
                showsVerticalScrollIndicator={false}
            >
                <SettingsCategoryHeader icon='layout'>
                    st_hd_app
                </SettingsCategoryHeader>
                <SettingsItem title={t('st_sld_lang')}>
                    <DropdownSelect
                        entries={[ ...SupportedLanguages ]}
                        selectedItem={language}
                        onSelect={setLanguage}
                    />
                </SettingsItem>
                <SettingsItem title={t('st_prf_thm')}>
                    <DropdownSelect
                        entries={[ ...themeStates ]}
                        selectedItem={settings.theme}
                        onSelect={(theme) => changeSetting('theme', theme)}
                    />
                </SettingsItem>
                <SettingsItem title={t('st_prf_acc_clrs')}>
                    <DropdownSelect
                        entries={[ ...accentColors ]}
                        selectedItem={settings.accent_color}
                        onSelect={(color) => changeSetting('accent_color', color)}
                    />
                </SettingsItem>
                <SettingsCategoryHeader icon='user'>
                    st_ac_mgt
                </SettingsCategoryHeader>
                <SettingsItem title={t('st_st_ln')}>
                    <AccountStatusIndicator/>
                </SettingsItem>
                <SettingsItem title={t('st_op_ln')}>
                    <Button
                        title={t('open')}
                        onPress={() => navigation.navigate('SntzAccountManagement')}
                        icon={'arrow-right'}
                    />
                </SettingsItem>
                <SettingsCategoryHeader icon='hard-drive'>
                    st_dt_mgt
                </SettingsCategoryHeader>
                <SettingsItem title={t('st_rst_sts')}>
                    <Button
                        title={t('reset')}
                        icon={'x-circle'}
                        onPress={handleReset}
                    />
                </SettingsItem>
                <SettingsItem title={t('st_oss_l')}>
                    <Button
                        title={t('open')}
                        onPress={() => navigation.navigate('SettingsAttribution')}
                        icon={'arrow-right'}
                    />
                </SettingsItem>
                <Credit/>
            </ScrollView>
        </ContainerView>
    );
};

const styles = StyleSheet.create({
    statusContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 4,
        margin: 3
    }
});

export default SettingsMain;