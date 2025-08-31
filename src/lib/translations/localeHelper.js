import { getLocales } from 'expo-localization';

// return language without regional formatting
const getSystemLanguages = () => getLocales().map(e => e.languageCode);
export default getSystemLanguages;