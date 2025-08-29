import { View, Alert, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ContainerView from '../../../components/common/ContainerView';
import Feather from '@expo/vector-icons/Feather';
import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import TranslatedText from '../../../components/translations/TranslatedText';
import api from '../../../lib/sntz/api';
import { useAuth } from '../../../context/AuthenticationContext';
import Button from '../../../components/common/Button';
import Divider from '../../../components/common/Divider';
import * as Haptics from 'expo-haptics';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


const SntzAccountManagement = () => {
    const { colors, defaultThemedStyles } = useThemes();
    const { t } = useTranslations();
    const { user, login, logout, loadingAuth } = useAuth();

    const [inputtedPassword, setInputtedPassword] = useState('');
    const [inputtedEmail, setInputtedEmail] = useState('');

    const [validating, setIsValidating] = useState(false);

    const [iconName, setIconName] = useState('link');
    const secretCounter = useRef(0);

    const handleSecretPress = useCallback(() => {
        secretCounter.current += 1;
        if (secretCounter.current > 4) {
            setIconName('eye');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            setStatusBarBackgroundColor('red', true);
            setTimeout(() => setStatusBarBackgroundColor('#00000000', true), 1000);
        }
    }, []);

    const handleLogout = () => {
        Alert.alert(
            t('st_sntz_logout'),
            t('st_sntz_logout_msg'),
            [
                { text: t('cancel'), style: 'cancel' },
                {
                    text: t('yes'),
                    onPress: async () => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                        await logout();
                        setInputtedEmail('');
                        setInputtedPassword('');
                    },
                    style: 'destructive'
                },
            ],
            { cancelable: true }
        );
    }

    const validateLogin = useCallback(async () => {
        setIsValidating(true);

        const { loginSuccessful } = await api.authenticate(
            inputtedEmail,
            inputtedPassword
        ); // -> bool

        let alertMsg;

        if (loginSuccessful) {
            await login(inputtedEmail, inputtedPassword);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            alertMsg = t('st_sntz_login_y');
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            alertMsg = t('st_sntz_login_n');
        }

        Alert.alert(t('st_ac_mgt'), alertMsg);
        setIsValidating(false);
    }, [inputtedEmail, inputtedPassword]);

    const isLoggedIn = !!user;
    const finishedLoading = !loadingAuth;
    const formsFilled = inputtedEmail.trim().length && inputtedPassword.trim().length;
    
    const inputEnabled = finishedLoading && !isLoggedIn && !validating;
    const loginBtnEnabled = finishedLoading && !isLoggedIn && formsFilled && !validating;
    const logoutBtnEnabled = finishedLoading && isLoggedIn && !validating;

    useEffect(() => {
        if (user) {
            setInputtedEmail(user.username);
            setInputtedPassword(user.password);
        }
    }, [loadingAuth]);
    
    useEffect(() => {
        if (secretCounter.current > 4) {
            setIconName('eye');
        }
    }, [secretCounter]);

    return (
        <ContainerView style={styles.containerView}>
            <Divider />
            <Pressable onPress={handleSecretPress} style={[{
                backgroundColor: colors.blue
            }, styles.circle, defaultThemedStyles.boxshadow]}>
                <Feather name={iconName} size={70} color={colors.white} />
            </Pressable>
            <View style={[{
                borderColor: colors.hardContrast
            }, styles.textContainer]}>
                <TranslatedText style={[styles.text, defaultThemedStyles.text]}>st_sntz_info</TranslatedText>
            </View>
            <TextInput
                placeholder={t('st_sntz_login')}
                placeholderTextColor={`${colors.hardContrast}b3`}
                autoComplete={'email'}
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrect={false}
                value={inputtedEmail}
                onChangeText={setInputtedEmail}
                editable={inputEnabled}
                importantForAutofill='yes'

                style={[{
                    color: `${colors.hardContrast}${inputEnabled
                            ? ''
                            : 'b3'
                        }`,
                    borderColor: colors.hardContrast
                }, styles.input]}
            />
            <TextInput
                placeholder={t('st_sntz_password')}
                placeholderTextColor={`${colors.hardContrast}b3`}
                autoComplete={'password'}
                autoCapitalize='none'
                autoCorrect={false}
                value={inputtedPassword}
                onChangeText={setInputtedPassword}
                editable={inputEnabled}
                importantForAutofill='yes'
                secureTextEntry

                style={[{
                    color: `${colors.hardContrast}${inputEnabled
                            ? ''
                            : 'b3'
                        }`,
                    borderColor: colors.hardContrast
                }, styles.input]}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title={t('st_sntz_login_cm')}
                    onPress={validateLogin}
                    color={colors.lightblue}
                    disabled={!loginBtnEnabled}
                    icon={'user-plus'}
                />
                <Button
                    title={t('st_sntz_remove_ac')}
                    onPress={handleLogout}
                    color={colors.red}
                    disabled={!logoutBtnEnabled}
                    icon={'log-out'}
                />
            </View>
        </ContainerView>
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
        width: '80%',
        minHeight: 45
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
        width: '95%',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 20,
    },
    containerView: {
        alignItems: 'center',
        gap: 20
    },
    text: {
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 14.5
    }
});

export default SntzAccountManagement;