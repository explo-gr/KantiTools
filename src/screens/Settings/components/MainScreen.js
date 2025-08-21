// imports regarding general objects
import { useEffect, useState } from 'react';
import { Alert, View, ScrollView, StyleSheet } from 'react-native';
import Button from '../../../components/common/Button'
import DropdownSelect from '../../../components/common/DropdownSelect';
import { SupportedLanguages, useTranslations } from '../../../context/LanguageContext';
import { useThemes } from '../../../context/ThemeContext';
import SettingsItem from './SettingsItem';
import SettingsCategoryHeader from './SettingsCategoryHeader';
import { useSettings } from '../../../context/SettingsContext';
import ContainerView from '../../../components/common/ContainerView';
import Credit from './Credit';
import Header from '../../../components/common/Header';
import { useAuth } from '../../../context/AuthenticationContext';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import TranslatedText from '../../../components/translations/TranslatedText';
import Feather from '@expo/vector-icons/Feather';
import { useData } from '../../../context/DataContext';
import { clearMenuplanData } from '../../../lib/menuplanHelper';

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
    // Language Settings
    const { language, setLanguage, t, resetLanguage } = useTranslations();
    const [ selectedLanguage, setSelectedLanguage ] = useState();

    useEffect(() => {
        // force selectedLanguage to update when resetting
        if (selectedLanguage !== language) {
            setSelectedLanguage(language);
        }
    }, [language])

    // Theme Settings
    const [ selectedThemeBehaviour, setThemeBehaviour ] = useState('system');
    const themeStates = ['dark', 'white', 'system'];

    // Data
    const { clearDataCache } = useData();
    const { logout } = useAuth();

    const handleReset = () => {
        Alert.alert(
            t('reset'),
            t('st_rst_msg'),
            [
                { text: t('cancel'), style: 'cancel' },
                {
                    text: t('yes'),
                    onPress: async () => {
                        // revert settings
                        resetSettings();
                        await resetLanguage();
                        await clearDataCache();
                        await clearMenuplanData();
                        await logout();
                        Alert.alert(t('reset'), t('st_rst_succ_msg'));
                    },
                    style: 'destructive'
                },
            ],
            { cancelable: true }
        );
    }

    // Settings
    const { changeSetting, resetSettings } = useSettings();

    return (
        <ContainerView>
            <Header title={'Settings'}/>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 150
                }}
            >
                <SettingsCategoryHeader icon='layout'>
                    st_hd_app
                </SettingsCategoryHeader>
                <SettingsItem title={t('st_sld_lang')}>
                    <DropdownSelect
                        entries={[ ...SupportedLanguages ]}
                        selectedItem={selectedLanguage}
                        onSelect={(lang) => {
                            if (lang !== selectedLanguage) {
                                setSelectedLanguage(lang);
                                setLanguage(lang);
                            }
                        }}
                    />
                </SettingsItem>
                <SettingsItem title={t('st_prf_thm')}>
                    <DropdownSelect
                        entries={[ ...themeStates ]}
                        selectedItem={selectedThemeBehaviour}
                        onSelect={(theme) => {
                            if (selectedThemeBehaviour !== theme) {
                                setThemeBehaviour(theme);
                                changeSetting('theme', theme);
                            }
                        }}
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

// idee
// dä login bildschrim kamma no innagoh
// wemma nit iigloggt isch
// dä login sälber remova tuat ma grad bir hauptsitta