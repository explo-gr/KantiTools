import { getLocales } from 'expo-localization';

// return language without regional formatting
const getSystemLanguage = () => getLocales()[0].languageCode;
export default getSystemLanguage;