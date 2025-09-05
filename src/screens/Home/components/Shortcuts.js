// Imports
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import ActionBox from '../../../components/common/ActionBox';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import Divider from '../../../components/common/Divider';
import { useTranslations } from '../../../context/LanguageContext';
import { openMenuplanPDF } from '../../../lib/menuplanHelper';
import { HOME_SHORTCUTS } from '../../../config/links/links';
import timetableHelper from '../../../lib/timetableHelper';
import { useShowAlert } from '../../../hooks/useShowAlert';

// expo modules
import * as Haptics from 'expo-haptics';
import { openBrowserAsync } from 'expo-web-browser';

// Main Home Screen
const Shortcuts = ({ navigation }) => {
    const showAlert = useShowAlert();
    const { t } = useTranslations();

    const [ menDisabled, setMenDisabled ] = useState(false);
    const [ ttblAvailable, setTtblAvailable ] = useState(false);

    const ttblIcon = ttblAvailable ? 'calendar' : 'file-plus';

    const handleMenuplan = async () => {
        setMenDisabled(true);
        const opened = await openMenuplanPDF();
        if (!opened) {
            showAlert({
                title: t('hm_men_err'),
                message: t('hm_men_err_msg'),
                buttons: [
                    { text: t('retry'), onPress: handleMenuplan },
                    { text: t('ok'), style: 'cancel' }
                ]
            });
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
                    showAlert({
                        title: t('hm_ttbl'),
                        message: t('hm_ttbl_file_req')
                    })
                );
                
                setTtblAvailable(true);
            } catch {
                // error
                showAlert({
                    title: t('hm_ttbl'),
                    message: t('hm_ttbl_file_f')
                });
                return;
            }
        }

        // open the file
        try {
            await timetableHelper.openTimetable();
        } catch {
            // error
            showAlert({
                title: t('hm_ttbl'),
                message: t('hm_ttbl_file_o_f')
            });
        }
    };

    const handleResetTimetable = async () => {
        try {
            setTtblAvailable(false);
            await timetableHelper.deleteTimetable();
            console.log('[TIMETABLE] Reset successful.');
        } catch {
            showAlert({
                title: t('error'),
                message: t('hm_ttbl_rst_f_msg')
            });
        }
    };

    const handleResetTimetableDialogue = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        showAlert({
            title: t('hm_ttbl_rst'),
            message: t('hm_ttbl_rst_msg'),
            buttons: [
                { text: t('cancel'), style: 'cancel' },
                { text: t('reset'), style: 'destructive', onPress: handleResetTimetable }
            ]
        });
    };

    return (
        <>
            <ActionBoxContainer>
                <ActionBox
                    icon={ttblIcon}
                    label={t('hm_ttbl')}
                    onPress={handleTimetable}
                    onLongPress={handleResetTimetableDialogue}
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
                    onPress={async () => await openBrowserAsync(HOME_SHORTCUTS.MAIL)}
                />
                <ActionBox
                    icon='folder'
                    label={t('hm_files')}
                    onPress={async () => await openBrowserAsync(HOME_SHORTCUTS.SHAREPOINT)}
                />
                <ActionBox
                    icon='globe'
                    label={t('hm_hpg')}
                    onPress={async () => await openBrowserAsync(HOME_SHORTCUTS.BKS_HOME)}
                />
            </ActionBoxContainer>
        </>
    );
};

export default Shortcuts;