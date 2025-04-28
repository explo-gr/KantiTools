import { Text, View, Button, TextInput } from 'react-native';
import ContainerView from '../../../components/common/ContainerView';
import Feather from '@expo/vector-icons/Feather';
import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';
import { useEffect, useState } from 'react';
import TranslatedText from '../../../components/translations/TranslatedText';

const SntzAccountManagement = ({ navigation }) => {
    const { colors } = useThemes();
    const { t } = useTranslations();

    const [ inputtedPassword, setInputtedPassword ] = useState('');
    const [ inputtedEmail, setInputtedEmail ] = useState('');
    const [ inputEnabled, setInputEnabled ] = useState(false);

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
                />
                <Button
                    title={t("st_sntz_remove_ac")}
                />
            </View>
        </ContainerView>
    );
}

export default SntzAccountManagement;