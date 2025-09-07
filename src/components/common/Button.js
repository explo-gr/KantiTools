import Feather from '@expo/vector-icons/Feather';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useThemes } from '../../context/ThemeContext';
import TranslatedText from '../translations/TranslatedText';

const Button = ({
    onPress,
    title,
    color,
    disabled=false,
    icon,
    style = {},
}) => {
    const { colors, theme } = useThemes();
    if (!color) color = colors.accent;

    const themedStyles = useMemo(() => {
        const styles = StyleSheet.create({
            buttonShell: {
                height: 47.5,
                borderRadius: 18,
                paddingHorizontal: 8,
                gap: 2,

                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: color ?? colors.accent,
            },
            text: {
                color: colors.generic,
                marginLeft: 2,
                fontSize: 15,
                fontFamily: 'Inter-Medium',
                textAlignVertical: 'center',
                textAlign: 'center'
            },
            container: {
                opacity: disabled ? 0.2 : 1.0,
                flexGrow: 1,
                flexShrink: 1,
                minWidth: title ? 100 : 47.5,
                maxWidth: 350,
                justifyContent: 'center',
                alignItems: 'stretch',
            }
        });

        return styles;
    }, [theme, color, title, disabled]);

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[themedStyles.container, style]}
        >
            <View style={themedStyles.buttonShell}>
                {icon && (
                    <View style={styles.iconContainer}>
                        <Feather name={icon} size={20} color={colors.generic}/>
                    </View>
                )}
                {title && (
                    <TranslatedText
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={themedStyles.text}
                    >
                        {title}
                    </TranslatedText>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Button;
