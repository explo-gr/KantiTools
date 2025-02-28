// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropdownSelect from '../components/DropdownSelect';
import { LanguageContext, SupportedLanguages } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import SettingsItem from '../components/SettingsItem';
import Divider from '../components/Divider';
import SettingsCategoryHeader from '../components/SettingsCategoryHeader';

const SettingsScreen = () => {
    const { defaultThemedStyles } = useContext(ThemeContext);

    // Language Settings
    const { language, setLanguage, t } = useContext(LanguageContext);
    const [ selectedLanguage, setSelectedLanguage ] = useState(language);

    // Theme Settings
    const [ themeBehaviour, setThemeBehaviour ] = useState('system');
    const themeStates = ['dark', 'white', 'system'];

    return (
        <View style={[styles.container, defaultThemedStyles.view]}>
            <SettingsCategoryHeader>
                st_hd_app
            </SettingsCategoryHeader>
            <Divider/>
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
                    selectedItem={themeBehaviour}
                    onSelect={(theme) => setThemeBehaviour(theme)}
                />
            </SettingsItem>
            <Divider/>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 25
    },
});

export default SettingsScreen;