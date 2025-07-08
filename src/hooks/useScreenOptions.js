import { useMemo } from 'react';
import { useThemes } from '../context/ThemeContext';

const useScreenOptions = () => {
    const { colors, theme } = useThemes();

    const screenOptions = useMemo(() => ({
        cardStyle: {
            backgroundColor: colors.generic
        }
    }), [theme]);

    return screenOptions;
};

export default useScreenOptions;