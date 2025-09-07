import { useMemo } from 'react';
import { useThemes } from '../context/ThemeContext';

const useHeaderOptions = () => {
    const { colors, theme } = useThemes();

    const headerOptions = useMemo(() => ({
        headerStyle: {
            backgroundColor: colors.generic,
        },
        headerTintColor: colors.hardContrast,
    }), [theme, colors]);

    return headerOptions;
};

export default useHeaderOptions;