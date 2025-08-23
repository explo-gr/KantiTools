import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform, Linking, Alert } from 'react-native';
import * as cheerio from 'cheerio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openBrowserAsync } from 'expo-web-browser';

const MENUPLAN_DIR = `${FileSystem.documentDirectory}menuplan`;
const FILE_NAME = 'current-menuplan.pdf';
const ID_STORAGE_KEY = 'menuplan-id';

const INDEX_URL = 'https://www.gr.ch/DE/institutionen/verwaltung/ekud/ahb/wvb/Menueplaene/Seiten/default.aspx';
const BASE_URL = 'https://www.gr.ch/DE/institutionen/verwaltung/ekud/ahb/wvb/Menueplaene/Documents/'

const getMondayDate = () => {
    const date = new Date();
    const day = date.getDay();

    let delta;

    switch (day) {
        case 0:
            delta = 1;
            break;
        case 6:
                delta = 2;
            break;
        default:
            delta = 1 - day;
    }

    date.setDate(date.getDate() + delta);
    return date;
}

const reconstructDates = () => {
    const months = [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];

    const start = getMondayDate();
    const end = new Date(start);

    end.setDate(start.getDate() + 4);

    const format = (d) => `${d.getDate()}. ${months[d.getMonth()]}`;

    return {
        from: format(start),
        to: format(end),
        year: end.getFullYear()
    };
};

const reconstructURL = () => {
    const { from, to, year } = reconstructDates();

    return {
        url: `${BASE_URL}Menüplan Mensa Münzmühle Woche vom ${from} bis ${to}.pdf`,
        id: `${year}-${from}-${to}`
    };
};

const getSavedID = async () => {
    try {
        return await AsyncStorage.getItem(ID_STORAGE_KEY);
    } catch {
        return null;
    }
};

const saveID = async (id) => {
    try {
        await AsyncStorage.setItem(ID_STORAGE_KEY, id);
    } catch (err) {
        console.error('[MENUPLAN] Failed to save ID to AsyncStorage:', err);
    }
};

const getCachedMenuplan = async () => {
    const filePath = `${MENUPLAN_DIR}/${FILE_NAME}`;
    const info = await FileSystem.getInfoAsync(filePath);
    
    return info.exists ? filePath : null;
};

const downloadPDF = async (url) => {
    const path = `${MENUPLAN_DIR}/${FILE_NAME}`;
    await FileSystem.makeDirectoryAsync(MENUPLAN_DIR, { intermediates: true });

    try {
        const result = await FileSystem.downloadAsync(url, path);
        return result.status === 200 || result.status === undefined ? result.uri : null;
    } catch {
        return null;
    }
};

const findFallbackURL = async () => {
    try {
        const response = await fetch(INDEX_URL);
        const html = await response.text();

        const $ = cheerio.load(html);
        const links = $('a[href]').map((_, el) => $(el).attr('href')).get();
        const pdfLink = links.findLast(href => href.includes('Woche') && href.includes('Münzmühle') && href.endsWith('.pdf'));

        console.log('fdjksalö')

        return pdfLink ? `${pdfLink}` : null;
    } catch (err) {
        console.error('[MENUPLAN] Error finding fallback PDF URL:', err);
        return null;
    }
};

export const openMenuplanPDF = async () => {
    /*
        Since it's impossible to open a downloaded
        PDF on iOS without embedding a PDF engine,
        the fallback URL will be opened with a
        regular webbrowser instead

    */
    if (Platform.OS === 'ios') {
        const url = await findFallbackURL();

        try {
            await openBrowserAsync(url);
            return true;
        } catch {
            return false;
        }
    }

    console.log('[MENUPLAN] Attempting to open menuplan...')

    const { url, id } = reconstructURL();
    const savedID = await getSavedID();

    console.log(`[MENUPLAN] Current url: ${url}`);
    console.log(`[MENUPLAN] Current id: ${id}`);
    console.log(`[MENUPLAN] Current savedId: ${savedID}`);

    let fileUri = null;

    if (savedID === id) {
        console.log('[MENUPLAN] Attempting to open the cached menuplan');
        fileUri = await getCachedMenuplan();
        console.log('[MENUPLAN] savedId and id match');
    }

    if (!fileUri) {
        console.log('[MENUPLAN] No cached Menuplan was found.\nAttempting to download the PDF');

        fileUri = await downloadPDF(url);

        if (!fileUri) {
            console.log('[MENUPLAN] Standard method failed, trying fallback');
            const fallbackURL = await findFallbackURL();
            console.log(`[MENUPLAN] Fallback URL found: ${fallbackURL}`);
            if (fallbackURL) fileUri = await downloadPDF(fallbackURL);
        }

        if (fileUri) await saveID(id);
    }

    if (!fileUri) {
        console.error('[MENUPLAN] Failed to load PDF.');
        return false;
    }

    try {
        const contentUri = await FileSystem.getContentUriAsync(fileUri);

        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: contentUri,
            type: 'application/pdf',
            flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
        });

        return true;
    } catch (err) {
        console.error('[MENUPLAN] Failed to open PDF with intent:', err);
        return false;
    }
};

export const clearMenuplanData = async () => {
    try {
        await AsyncStorage.removeItem(ID_STORAGE_KEY);

        const filePath = `${MENUPLAN_DIR}/${FILE_NAME}`;
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
            await FileSystem.deleteAsync(filePath, { idempotent: true });
        }

        console.log('[MENUPLAN] Cleared cached menuplan and saved ID.');
        return true;
    } catch (err) {
        console.error('[MENUPLAN] Failed to clear cached menuplan data:', err);
        return false;
    }
};
