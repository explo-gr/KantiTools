// imports regarding general objects
import { StyleSheet, View } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthenticationContext';
import LoadingIndicator from './LoadingIndicator';
import TranslatedText from '../translations/TranslatedText';
import Feather from '@expo/vector-icons/Feather';

const LoginReqView = ({ children, infoStyle, ...props }) => {
    const { user, loadingAuth } = useAuth();
    const { colors, defaultThemedStyles } = useThemes();

    if (loadingAuth) return <LoadingIndicator/>;

    if (!user) {
        return (
            <View style={[styles.statusContainer, infoStyle]}>
                <View style={styles.msgContainer}>
                    <Feather name={'user-x'} size={24} color={colors.gray} />
                    <TranslatedText adjustsFontSizeToFit numberOfLines={1} style={[defaultThemedStyles.text, {
                        color: colors.gray
                    }]}>
                        lgin_nt
                    </TranslatedText>
                </View>
            </View>
        );
    }

    return (
        <View {...props}>
            { children }
        </View>
    );
}

const styles = StyleSheet.create({
    statusContainer: {
        flex: 1,
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    msgContainer: {
        flexDirection: 'row',
        gap: 12
    }
});

export default LoginReqView;