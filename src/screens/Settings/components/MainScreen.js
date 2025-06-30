// imports regarding general objects
import { useContext, useState } from 'react';
import { Alert, StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import Button from '../../../components/common/Button'
import DropdownSelect from '../../../components/common/DropdownSelect';
import { SupportedLanguages, useTranslations } from '../../../context/LanguageContext';
import { ThemeContext } from '../../../context/ThemeContext';
import SettingsItem from './SettingsItem';
import SettingsCategoryHeader from './SettingsCategoryHeader';
import { useSettings } from '../../../context/SettingsContext';
import ContainerView from '../../../components/common/ContainerView';
import Credit from './Credit';
import Header from '../../../components/common/Header';

// Account management de 
// https://docs.expo.dev/versions/latest/sdk/securestore/

const SettingsMain = ({ navigation }) => {
    // Language Settings
    const { language, setLanguage, t, resetLanguage } = useTranslations();
    const [ selectedLanguage, setSelectedLanguage ] = useState(language);

    // Theme Settings
    const [ selectedThemeBehaviour, setThemeBehaviour ] = useState('system');
    const themeStates = ['dark', 'white', 'system'];

    const { changeSetting, resetSettings } = useSettings();

    // eigenes header objekt?

    return (
        <ContainerView>
            <Header title={'Settings'}/>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 150
                }}
            >
                <SettingsCategoryHeader icon="layout">
                    st_hd_app
                </SettingsCategoryHeader>
                <SettingsItem title={t("st_sld_lang")}>
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
                <SettingsItem title={t("st_prf_thm")}>
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
                <SettingsCategoryHeader icon="user">
                    st_ac_mgt
                </SettingsCategoryHeader>
                <SettingsItem title={t("st_op_ln")}>
                    <Button
                        title={t("open")}
                        onPress={() => navigation.navigate('SntzAccountManagement')}
                    />
                </SettingsItem>
                <SettingsCategoryHeader icon="hard-drive">
                    st_dt_mgt
                </SettingsCategoryHeader>
                <SettingsItem title={t("st_rst_sts")}>
                    <Button
                        title='reset'
                        onPress={() => {
                            resetSettings();
                            resetLanguage();
                            Alert.alert('Settings have been reset');
                        }}
                    />
                </SettingsItem>
                                <SettingsCategoryHeader icon="layout">
                    st_hd_app
                </SettingsCategoryHeader>
                <SettingsItem title={t("st_sld_lang")}>
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
                <SettingsItem title={t("st_prf_thm")}>
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
                <SettingsCategoryHeader icon="user">
                    st_ac_mgt
                </SettingsCategoryHeader>
                <SettingsItem title={t("st_op_ln")}>
                    <Button
                        title={t("open")}
                        onPress={() => navigation.navigate('SntzAccountManagement')}
                    />
                </SettingsItem>
                <SettingsCategoryHeader icon="hard-drive">
                    st_dt_mgt
                </SettingsCategoryHeader>
                <SettingsItem title={t("st_rst_sts")}>
                    <Button
                        title='reset'
                        onPress={() => {
                            resetSettings();
                            resetLanguage();
                            Alert.alert('Settings have been reset');
                        }}
                    />
                </SettingsItem>
                <Credit/>
            </ScrollView>
        </ContainerView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 25,
        paddingVertical: 50
    }
});

export default SettingsMain;

// idee
// dä login bildschrim kamma no innagoh
// wemma nit iigloggt isch
// dä login sälber remova tuat ma grad bir hauptsitta