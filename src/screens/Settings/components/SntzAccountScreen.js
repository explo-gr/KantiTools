import { Text, View, Button, TextInput } from 'react-native';
import ContainerView from '../../../components/common/ContainerView';
import Feather from '@expo/vector-icons/Feather';
import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';
import { useEffect, useState } from 'react';
import TranslatedText from '../../../components/translations/TranslatedText';
import api from '../../../lib/sntz/api'
import { useAuth } from '../../../context/AuthenticationContext';

// TODO: fix imports probably, wrap auth context
const SntzAccountManagement = ({ navigation }) => {
    const { colors } = useThemes();
    const { t } = useTranslations();
    const { user, login, logout, loading } = useAuth();

    const [ inputtedPassword, setInputtedPassword ] = useState('');
    const [ inputtedEmail, setInputtedEmail ] = useState('');
    const [ inputEnabled, setInputEnabled ] = useState(false);

    const validateLogin = async () => {
        const response = await api.authenticateAndFetch({
            url: api.HOST.START,
            username: inputtedEmail,
            password: inputtedPassword
        })

        if (response) {
            login(inputtedEmail, inputtedPassword);
        } else {
            // TODO: Login Reject Login
        }
    };

    useEffect(() => {
        const finishedLoading = !loading;
        const formNotEmpty = inputtedEmail.length + inputtedPassword.length !== 0;
        const loggedOut = user ? false : true;

        setInputEnabled(finishedLoading && formNotEmpty && loggedOut);
    }, [loading, inputtedEmail, inputtedPassword, user]);

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
                onChange={setInputtedPassword}
                readOnly={inputEnabled}
            />
            <View style={{
                flexDirection: 'row'
            }}>
                <Button
                    title={t("st_sntz_login_cm")}
                    onPress={validateLogin}
                />
                <Button
                    title={t("st_sntz_remove_ac")}
                    onPress={logout}
                />
            </View>
        </ContainerView>
    );
}

export default SntzAccountManagement;