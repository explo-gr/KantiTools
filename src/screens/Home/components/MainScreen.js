// Imports
import { Text, View, StyleSheet, Alert, Platform, Linking } from 'react-native';
import { useEffect, useState } from 'react';
import { useThemes } from '../../../context/ThemeContext';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';
import { openMenuplanPDF } from '../../../lib/menuplanHelper';
import { useTranslations } from '../../../context/LanguageContext';
import Greeting from './Greeting';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import ActionBox from '../../../components/common/ActionBox';
import Weekdays from './Weekdays';
import Divider from '../../../components/common/Divider';

// expo modules
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Haptics from 'expo-haptics';
import { openBrowserAsync } from 'expo-web-browser';

const TIMETABLE_DIR = `${FileSystem.documentDirectory}timetable`;
const FILE_NAME = 'current-timetable.pdf';
const TIMETABLE_URI = `${TIMETABLE_DIR}/${FILE_NAME}`;

const MAIL_URL = 'https://outlook.office.com';
const BKS_HOMEPAGE_URL = 'https://www.gr.ch/DE/institutionen/verwaltung/ekud/ahb/bks/uberuns/Seiten/default.aspx';
const SHAREPOINT_URL = 'https://bkscampusch-my.sharepoint.com/';

// Main Home Screen
const HomeMain = ({ navigation }) => {
    const { t } = useTranslations();
    const { colors } = useThemes();

    const [ menDisabled, setMenDisabled ] = useState(false);
    const [ ttblAvailable, setTtblAvailable ] = useState(false);

    const handleMenuplan = async () => {
        setMenDisabled(true);
        const opened = await openMenuplanPDF();
        if (!opened) {
            Alert.alert(
                t('hm_men_err'),
                t('hm_men_err_msg'),
                [
                    { text: t('retry'), onPress: handleMenuplan },
                    { text: t('ok'), style: 'cancel' },
                ],
                { cancelable: true }
            );
        }
        setMenDisabled(false);
    };
    
    useEffect(() => {
        const checkTimetableExists = async () => {
            const fileInfo = await FileSystem.getInfoAsync(TIMETABLE_URI);
            setTtblAvailable(fileInfo.exists);
        };

        checkTimetableExists();
    }, []);

    const handleTimetable = async () => {

        // prompt user to pick pdf if no file was found
        if (!ttblAvailable) {
            try {
                const document = await DocumentPicker.getDocumentAsync({
                    type: 'application/pdf',
                });
                
                if (document.canceled || document.assets.length !== 1) {
                    // error
                    Alert.alert('Please specify a file');
                    return;
                }
            
                await FileSystem.makeDirectoryAsync(TIMETABLE_DIR, { intermediates: true });
                await FileSystem.copyAsync({
                    from: document.assets[0].uri,
                    to: TIMETABLE_URI
                });
                
                setTtblAvailable(true);
            } catch {
                // error
                Alert.alert('Failed to process PDF');
                return;
            }
        }

        // open the file
        try {
            if (Platform.OS === 'android') {
                const contentUri = await FileSystem.getContentUriAsync(TIMETABLE_URI);
    
                await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                    data: contentUri,
                    type: 'application/pdf',
                    flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
                });
            } else {
                Linking.openURL(TIMETABLE_URI);
            }
        } catch {
            // error
            Alert.alert('File could not be opened');
        }
    };

    const handleResetTimetable = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert(
            'Reset Timetable?',
            'This will remove the saved timetable. You will be prompted to select a new one.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await FileSystem.deleteAsync(TIMETABLE_URI, { idempotent: true });
                            setTtblAvailable(false);
                            console.log('Timetable reset successfully.');
                        } catch (error) {
                            Alert.alert('Error', 'Could not reset the timetable.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <ContainerView>
            <Header title={'Home'}/>
            <View style={styles.greetSeperator}/>
            <Greeting/>
            <View style={[{
                borderColor: colors.blue,
            }, styles.abxRootContainer]}>
                <ActionBoxContainer>
                    <ActionBox
                        icon='calendar'
                        label={t('hm_ttbl')}
                        onPress={handleTimetable}
                        onLongPress={handleResetTimetable}
                    />
                    <ActionBox
                        icon='shopping-cart'
                        label={t('hm_men')}
                        disabled={menDisabled}
                        onPress={handleMenuplan}
                    />
                </ActionBoxContainer>
                <Divider/>
                <ActionBoxContainer>
                    <ActionBox
                        icon='mail'
                        label={t('hm_mail')}
                        onPress={async () => await openBrowserAsync(MAIL_URL)}
                    />
                    <ActionBox
                        icon='folder'
                        label={t('hm_files')}
                        onPress={async () => await openBrowserAsync(SHAREPOINT_URL)}
                    />
                    <ActionBox
                        icon='globe'
                        label={t('hm_hpg')}
                        onPress={async () => await openBrowserAsync(BKS_HOMEPAGE_URL)}
                    />
                </ActionBoxContainer>
            </View>
            <View style={styles.greetSeperator}/>
            <View style={styles.greetSeperator}/>
            <Weekdays/>
        </ContainerView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greetSeperator: {
        marginTop: '15%'
    },
    abxRootContainer: {
        padding: 10,
        margin: 10,
        height: 250,
        borderWidth: 3,
        borderRadius: 25
    }
});

export default HomeMain;