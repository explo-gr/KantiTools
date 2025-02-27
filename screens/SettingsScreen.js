// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropdownSelect from '../components/DropdownSelect';
import { LanguageContext, SupportedLanguages } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';


export default function SettingsScreen() {
  const { defaultThemedStyles } = useContext(ThemeContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [ selectedLanguage, setSelectedLanguage ] = useState(language);

  return (
    <View style={[styles.container, defaultThemedStyles.view]}>
      <Text style={defaultThemedStyles.text}>{t("st_sld_lang") + t(selectedLanguage)}</Text>
      <DropdownSelect
        entries={[ ...SupportedLanguages, "dada", "dadada", "fdjaklfds", "12", "421", "wwww"]}
        selectedItem={selectedLanguage}
        onSelect={(lang) => {
          if (lang !== selectedLanguage) {
            setSelectedLanguage(lang);
            setLanguage(lang);
          }
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});