import { Platform, NativeModules } from 'react-native'

//https://stackoverflow.com/questions/33468746/whats-the-best-way-to-get-device-locale-in-react-native-ios
const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

// return language without regional formatting
const getLocale = () => deviceLanguage.slice(0,3);
export default getLocale;