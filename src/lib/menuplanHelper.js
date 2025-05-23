import RNFS from 'react-native-fs';
import * as cheerio from 'cheerio';

const MENUPLAN_DIR = `${RNFS.DocumentDirectoryPath}/menuplan`;
const FILE_NAME = 'current-menuplan.pdf';
const ID_FILE = 'menuplan-id.txt';

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
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
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
    const base = "https://www.gr.ch/DE/institutionen/verwaltung/ekud/ahb/wvb/Menueplaene/Documents/";

    return {
        url: `${base} Menüplan Mensa Münzmühle Woche vom ${from} bis ${to}.pdf`,
        id: `${year}-${from}-${to}`
    };
};

const getSavedID = async () => {
    try {
        const path = `${MENUPLAN_DIR}/${ID_FILE}`;
        const exists = await RNFS.exists(path);

        return exists ? await RNFS.readFile(path, 'utf8') : null;
    } catch (err) {
        console.error('Error reading saved ID:', err);
        return null;
    }
};

const saveID = async (id) => {
    try {
        await RNFS.mkdir(MENUPLAN_DIR);
        await RNFS.writeFile(`${MENUPLAN_DIR}/${ID_FILE}`, id, 'utf8');
    } catch (err) {
        console.error('Error saving ID:', err);
    }
};

const getCachedMenuplan = async () => {
    const filePath = `${MENUPLAN_DIR}/${FILE_NAME}`;
    try {
        const exists = await RNFS.exists(filePath);
        return exists ? filePath : null;
    } catch (err) {
        console.error('Error checking cache:', err);
        return null;
    }
};

const downloadPDF = async (url) => {
    const path = `${MENUPLAN_DIR}/${FILE_NAME}`;
    try {
        await RNFS.mkdir(MENUPLAN_DIR);

        const result = await RNFS.downloadFile({
            fromUrl: url,
            toFile: path,
        }).promise;

        if (result.statusCode === 200) {
            return path;
        } else {
            console.warn(`Download failed with status: ${result.statusCode}`);
            return null;
        }
    } catch (err) {
        console.error('Download failed:', err);
        return null;
    }
};

const findFallbackURL = async () => {
    const indexUrl = "https://www.gr.ch/DE/institutionen/verwaltung/ekud/ahb/wvb/Menueplaene/Seiten/default.aspx";
    
    try {
        const response = await fetch(indexUrl);
        const html = await response.text();

        const $ = cheerio.load(html);
        const links = $('a[href]').map((_, el) => $(el).attr('href')).get();
        const pdfLink = links.findLast(href => href.includes('Woche') && href.endsWith('.pdf'));

        return pdfLink ? `https://www.gr.ch${pdfLink}` : null;
    } catch (err) {
        console.error('Error finding fallback PDF URL:', err);
        return null;
    }
};

const getMenuplanData = async () => {
    const { url, id } = reconstructURL();
    const savedID = await getSavedID();

    if (savedID === id) {
        const cachedPath = await getCachedMenuplan();
        if (cachedPath) return cachedPath;
    }

    let filePath = await downloadPDF(url);

    if (!filePath) {
        console.warn('Primary download failed. Trying fallback...');
        const fallbackURL = await findFallbackURL();
        
        if (fallbackURL) {
            filePath = await downloadPDF(fallbackURL);
        }
    }

    if (filePath) {
        await saveID(id);
        return filePath;
    }

    console.error('Failed to retrieve menuplan from all sources.');
    return null;
};

export default getMenuplanData;