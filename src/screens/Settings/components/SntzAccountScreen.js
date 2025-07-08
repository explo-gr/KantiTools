import { View, TextInput, Alert, StyleSheet, Pressable } from 'react-native';
import ContainerView from '../../../components/common/ContainerView';
import Feather from '@expo/vector-icons/Feather';
import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import TranslatedText from '../../../components/translations/TranslatedText';
import api from '../../../lib/sntz/api';
import { AuthProvider, useAuth } from '../../../context/AuthenticationContext';
import Button from '../../../components/common/Button';
import Divider from '../../../components/common/Divider';
import * as Haptics from 'expo-haptics';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

// Hey, Space Cadet (Beast Monster Thing in Space) by Car Seat Headrest
const Screen = ({ navigation }) => {
    const { colors, defaultThemedStyles } = useThemes();
    const { t } = useTranslations();
    const { user, login, logout, loadingAuth } = useAuth();

    const [ inputtedPassword, setInputtedPassword ] = useState('');
    const [ inputtedEmail, setInputtedEmail ] = useState('');

    const [ inputEnabled, setInputEnabled ] = useState(false);
    const [ loginBtnEnabled, setLoginBtnEnabled ] = useState(false);
    const [ logoutBtnEnabled, setLogoutBtnEnabled ] = useState(false);

    const [ validating, setIsValidating ] = useState(false);

    const [ iconName, setIconName ] = useState('link');
    const [ showEye, setShowEye ] = useState(false);

    const secretCounter = useRef(0);

    const handleSecretPress = () => {
        secretCounter.current += 1;
        if (secretCounter.current > 4) {
            setShowEye(true);
        }
    }

    const handleLogout = async () => {
        await logout();
        setInputtedEmail('');
        setInputtedPassword('');
    }

    const validateLogin = async () => {
        setIsValidating(true);

        const { loginSuccessful } = await api.authenticate(inputtedEmail.trim(), inputtedPassword.trim()); // -> bool

        let alertMsg;

        if (loginSuccessful) {
            await login(inputtedEmail, inputtedPassword);
            alertMsg = t('st_sntz_login_y');
        } else {
            alertMsg = t('st_sntz_login_n');
        }

        Alert.alert(alertMsg); // später mit eigener alertbox ersetzen?
        setIsValidating(false);
    };

    useEffect(() => {
        if (user) {
            setInputtedEmail(user.username);
            setInputtedPassword(user.password);
        }
    }, [loadingAuth]);

    useEffect(() => {
        const finishedLoading = !loadingAuth;
        const formsFilled = inputtedEmail.trim().length && inputtedPassword.trim().length;
        const isLoggedIn = user ? true : false;

        setInputEnabled(finishedLoading && !isLoggedIn && !validating);
        setLoginBtnEnabled(finishedLoading && !isLoggedIn && formsFilled && !validating);
        setLogoutBtnEnabled(finishedLoading && isLoggedIn && !validating);
    }, [loadingAuth, inputtedEmail, inputtedPassword, user, validating]);

    useEffect(() => {
        if (secretCounter.current > 4) {
            setIconName('eye');
        }
    }, [secretCounter]);

    useEffect(() => {
        if (showEye) setIconName('eye');
    }, [showEye]);

    useEffect(() => {
        if (iconName === 'eye') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

            Alert.alert('The 👁️ is watching', 'Li4gLS4uLiAuLiAtLiAuLi4gLS4tLiAuLi4uIC4tLSAuLi0gLi0uLg==', [{ text: 'I ACCEPT', onPress: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) }]);

            setStatusBarBackgroundColor('red', true);
            setTimeout(() => setStatusBarBackgroundColor('#00000000', true), 1000);
        }
    }, [iconName]);

    return (
        <ContainerView style={{
            alignItems: 'center',
            gap: 20
        }}>
            <Divider/>
            <Pressable onPress={handleSecretPress} style={[{
                backgroundColor: colors.blue
            }, styles.circle]}>
                <Feather name={iconName} size={75} color={colors.white}/>
            </Pressable>
            <View style={[{
                borderColor: colors.hardContrast
            }, styles.textContainer]}>
                <TranslatedText style={[{
                    textAlign: 'left',
                    fontSize: 14.5
                }, defaultThemedStyles.text]}>st_sntz_info</TranslatedText>
            </View>
            <TextInput
                placeholder={t('st_sntz_login')}
                textContentType='username'
                autoComplete='email'
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrect={false}
                value={inputtedEmail}
                onChangeText={setInputtedEmail}
                editable={inputEnabled}
                style={[{
                    color: colors.hardContrast,
                    borderColor: colors.hardContrast
                }, styles.input]}
            />
            <TextInput
                placeholder={t('st_sntz_password')}
                textContentType='password'
                autoComplete='password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                value={inputtedPassword}
                onChangeText={setInputtedPassword}
                editable={inputEnabled}
                style={[{
                    color: colors.hardContrast,
                    borderColor: colors.hardContrast
                }, styles.input]}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title={t('st_sntz_login_cm')}
                    onPress={validateLogin}
                    disabled={!loginBtnEnabled}
                />
                <Button
                    title={t('st_sntz_remove_ac')}
                    onPress={handleLogout}
                    color={colors.red}
                    disabled={!logoutBtnEnabled}
                />
            </View>
        </ContainerView>
    );
}

const SntzAccountManagement = ({ navigation }) => {
    return (
        <AuthProvider>
            <Screen navigation={navigation}/>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 12,
        width: '80%'
    },
    textContainer: {
        width: '90%',
        paddingLeft: 10,
        paddingVertical: 5,
        marginVertical: 12,
        borderLeftWidth: 1.6,
        borderRadius: 1.25,

        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: 15,
        width: '80%',
        justifyContent: 'space-between'
    }
});

export default SntzAccountManagement;