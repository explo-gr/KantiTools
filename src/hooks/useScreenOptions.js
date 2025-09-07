import { useMemo } from 'react';
import { useThemes } from '../context/ThemeContext';

const useScreenOptions = () => {
    const { colors, theme } = useThemes();

    const screenOptions = useMemo(() => ({
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: {
            backgroundColor: colors.generic
        },
    }), [theme, colors]);

    return screenOptions;
};

export default useScreenOptions;