import { useColorScheme } from "react-native";

const useTheme = (settings) => settings.theme === 'system' ? useColorScheme() : settings.theme;
export default useTheme;