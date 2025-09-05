import { Alert } from 'react-native';
import { useTranslations } from '../context/LanguageContext';
import { useThemes } from '../context/ThemeContext';

// default entrys
export const ENTRY = {
    OK: (t, onPress) => [
        { text: t('ok'), onPress, style: 'default' }
    ],

    CANCEL_DELETE: (t, onDelete) => [
        { text: t('cancel'), style: 'cancel' },
        { text: t('delete'), onPress: onDelete, style: 'destructive' }
    ],

    YES_CANCEL: (t, onYes) => [
        { text: t('cancel'), style: 'cancel' },
        { text: t('yes'), onPress: onYes }
    ]
};

const defaultConfig = {
    title: '',
    message: '',
    buttons: null,
    cancelable: true,
};

export const useShowAlert = () => {
    const { t } = useTranslations();
    const { theme } = useThemes();

    const showAlert = (config = {}) => {
        const {
            title,
            message,
            buttons,
            cancelable
        } = { ...defaultConfig, ...config };

        // resolve buttons
        let resolvedButtons = [];
        if (typeof buttons === 'function') {
            resolvedButtons = buttons(t);
        } else if (Array.isArray(buttons)) {
            resolvedButtons = buttons;
        } else {
            resolvedButtons = ENTRY.OK(t);
        }

        Alert.alert(
            title || '',
            message || '',
            resolvedButtons,
            {
                cancelable,
                userInterfaceStyle: theme ?? 'light'
            }
        );
    };

    return showAlert;
};