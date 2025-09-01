// Imports
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import ActionBox from '../../../components/common/ActionBox';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import Divider from '../../../components/common/Divider';
import { useTranslations } from '../../../context/LanguageContext';
import { openMenuplanPDF } from '../../../lib/menuplanHelper';

// expo modules
import * as Haptics from 'expo-haptics';
import { openBrowserAsync } from 'expo-web-browser';
import timetableHelper from '../../../lib/timetableHelper';

const MAIL_URL = 'https://outlook.office.com';
const BKS_HOMEPAGE_URL = 'https://www.gr.ch/DE/institutionen/verwaltung/ekud/ahb/bks/uberuns/Seiten/default.aspx';
const SHAREPOINT_URL = 'https://bkscampusch.sharepoint.com/sites/Schulhandbuch2/Freigegebene%20Dokumente/Forms/AllItems.aspx';

// Main Home Screen
const Shortcuts = ({ navigation }) => {
    const { t } = useTranslations();

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
    
    // Timetable logic
    useEffect(() => {
        const checkTimetableExists = async () => {
            const available = await timetableHelper.checkTimeTableExists();
            setTtblAvailable(available);
        };

        checkTimetableExists();
    }, []);

    const handleTimetable = async () => {
        // prompt user to pick pdf if no file was found
        if (!ttblAvailable) {
            try {
                await timetableHelper.pickAndSaveTimetable(() =>
                    Alert.alert(t('hm_ttbl'), t('hm_ttbl_file_req'))
                );
                
                setTtblAvailable(true);
            } catch {
                // error
                Alert.alert(t('hm_ttbl'), t('hm_ttbl_file_f'));
                return;
            }
        }

        // open the file
        try {
            await timetableHelper.openTimetable();
        } catch {
            // error
            Alert.alert(t('hm_ttbl'), t('hm_ttbl_file_o_f'));
        }
    };

    const handleResetTimetable = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert(
            t('hm_ttbl_rst'),
            t('hm_ttbl_rst_msg'),
            [
                { text: t('cancel'), style: 'cancel' },
                {
                    text: t('reset'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setTtblAvailable(false);
                            await timetableHelper.deleteTimetable();
                            console.log('[TIMETABLE] Reset successful.');
                        } catch {
                            Alert.alert(t('error'), t('hm_ttbl_rst_f_msg'));
                        }
                    },
                },
            ]
        );
    };

    return (
        <>
            <ActionBoxContainer>
                <ActionBox
                    icon='calendar'
                    label={t('hm_ttbl')}
                    onPress={handleTimetable}
                    onLongPress={handleResetTimetable}
                    disabled={Platform.OS === 'ios'}
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
        </>
    );
};

export default Shortcuts;