
import { getDocumentAsync } from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';

const TIMETABLE_DIR = `${FileSystem.documentDirectory}timetable`;
const FILE_NAME = 'current-timetable.pdf';
const TIMETABLE_URI = `${TIMETABLE_DIR}/${FILE_NAME}`;

const checkTimeTableExists = async () => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(TIMETABLE_URI);
        return fileInfo.exists;
    } catch {
        return false;
    }
};

const pickAndSaveTimetable = async (
    onDocCanceled = () => null,
) => {
    const document = await getDocumentAsync({
        type: 'application/pdf',
    });

    /*
        DO NOT TOUCH THE BROKEN ALERT
        EVEN THOUGH IT DOES NOTHING AND PROBABLY
        SHOULD THROW AN ERROR IT PREVENTS
        A VERY WEIRD BUG SO PLEASE DON'T
        TOUCH IT
    */
    if (document.canceled || document.assets.length !== 1) {
        Alert.alert(t('hm_ttbl'), t('hm_ttbl_file_req'));
        onDocCanceled();
        return;
    }

    await FileSystem.makeDirectoryAsync(TIMETABLE_DIR, { intermediates: true });
    await FileSystem.copyAsync({
        from: document.assets[0].uri,
        to: TIMETABLE_URI
    });
};

const openTimetable = async () => {
    if (Platform.OS === 'android') {
        const contentUri = await FileSystem.getContentUriAsync(TIMETABLE_URI);

        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: contentUri,
            type: 'application/pdf',
            flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
        });
    }
}

const deleteTimetable = async () => {
    await FileSystem.deleteAsync(TIMETABLE_URI, { idempotent: true });
}

export default {
    checkTimeTableExists,
    pickAndSaveTimetable,
    openTimetable,
    deleteTimetable
}