import { Text, View, Button, TextInput, Alert } from 'react-native';
import ContainerView from '../../../components/common/ContainerView';
import Feather from '@expo/vector-icons/Feather';
import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';
import { useEffect, useState } from 'react';
import TranslatedText from '../../../components/translations/TranslatedText';
import { authenticate } from '../../../lib/sntz/api';
import { AuthProvider, useAuth } from '../../../context/AuthenticationContext';

// TODO: fix imports, wrap auth context
const Screen = ({ navigation }) => {
    const { colors } = useThemes();
    const { t } = useTranslations();
    const { user, login, logout, loadingAuth } = useAuth();

    const [ inputtedPassword, setInputtedPassword ] = useState('');
    const [ inputtedEmail, setInputtedEmail ] = useState('');

    const [ inputEnabled, setInputEnabled ] = useState(false);
    const [ loginBtnEnabled, setLoginBtnEnabled ] = useState(false);
    const [ logoutBtnEnabled, setLogoutBtnEnabled ] = useState(false);

    const [ validating, setIsValidating ] = useState(false);
    const [ authReady, setAuthReady ] = useState(false);

    const handleLogout = async () => {
        await logout();
        setInputtedEmail('');
        setInputtedPassword('');
    }

    const validateLogin = async () => {
        setIsValidating(true);

        const loggedIn = await authenticate(inputtedEmail, inputtedPassword); // -> bool
        let alertMsg;

        if (loggedIn) {
            await login(inputtedEmail, inputtedPassword);
            alertMsg = t("st_sntz_login_y");
        } else {
            alertMsg = t("st_sntz_login_n");
        }

        Alert.alert(alertMsg); // später mit eigener alertbox ersetzen?
        setIsValidating(false);
    };

    useEffect(() => {
        if (user) {
            setInputtedEmail(user.username);
            setInputtedPassword(user.password);
        }

        setAuthReady(true);
    }, [loadingAuth]);

    useEffect(() => {
        const finishedLoading = !loadingAuth;
        const formsFilled = inputtedEmail.trim().length && inputtedPassword.trim().length;
        const isLoggedIn = user ? true : false;

        setInputEnabled(finishedLoading && !isLoggedIn);
        setLoginBtnEnabled(finishedLoading && !isLoggedIn && formsFilled);
        setLogoutBtnEnabled(finishedLoading && isLoggedIn);
    }, [authReady, inputtedEmail, inputtedPassword, user, validating]);

    return (
        <ContainerView style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Feather name={'link'} size={80} color={colors.blue} />
            <TranslatedText>st_sntz_info</TranslatedText>
            <TextInput
                placeholder={t("st_sntz_login")}
                textContentType="username"
                autoComplete="email"
                autoCapitalize="none"
                keyboardType='email-address'
                autoCorrect={false}
                value={inputtedEmail}
                onChangeText={setInputtedEmail}
                readOnly={inputEnabled}
            />
            <TextInput
                placeholder={t("st_sntz_password")}
                textContentType='password'
                autoComplete='password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                value={inputtedPassword}
                onChangeText={setInputtedPassword}
                readOnly={inputEnabled}
            />
            <View style={{
                flexDirection: 'row'
            }}>
                <Button
                    title={t("st_sntz_login_cm")}
                    onPress={validateLogin}
                    disabled={loginBtnEnabled}
                />
                <Button
                    title={t("st_sntz_remove_ac")}
                    onPress={handleLogout}
                    disabled={logoutBtnEnabled}
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

export default SntzAccountManagement;