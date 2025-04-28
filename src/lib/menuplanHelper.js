import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchWithTimeout from "./fetchWithTimeout";
import * as cheerio from 'cheerio';

const getMondayDate = () => {
    let date = new Date();
    const day = date.getDay();

    let delta;

    switch (day) {
        case 0:
            delta = 1;
            break;
        case 6:
            delta = 2;
        default:
            delta = -(date - 1);
    }

    date.setDate(date.getDate() + delta);

    return date;
}

const reconstructDates = () => {
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let date = getMondayDate();

    const constructDate = () => `${date.getDate()}. ${months[date.getMonth()]}`;
    const from = constructDate();
    date.setDate(date.getDate() + 4);
    const to = constructDate();

    return {
        from: from,
        to: to,
        year: date.getFullYear(),
    }
}

const reconstructURL = () => {
    const { from, to, year } = reconstructDates();
    const base = "https://www.gr.ch/DE/institutionen/verwaltung/ekud/ahb/wvb/Menueplaene/Documents/";

    return {
        url: `${base} Menüplan Mensa Münzmühle Woche vom ${from} bis ${to}.pdf`,
        id: `${year}-${from}-${to}`,
    }
}

const getMenuplanData = async () => {
    const { url, id } = reconstructURL();

    const getSavedID = async () => {
        try {
            return await AsyncStorage.getItem('menuplan-id');
        } catch (e) {
            console.error(e);
            return id; // Default to current ID if retrieval fails
        }
    };

    const scrapeMenuplan = async () => {
        try {
            //fetchTimeout ersetza
            const response = await fetchWithTimeout(url, {
                'Accept': 'application/pdf',
                'Content-Type': 'application/pdf'
            });

            if (!response.ok) {
                // Fallback
                const $ = cheerio.load(response.text());
                const links = $('a[href]]').map((_, e) => $(e).attr('href')).get();

                let fbUrl = null;

                links.forEach((e) => {
                    if (e.indexOf('Woche') !== -1) {
                        fbUrl = e;
                    }
                });

                return await fetchWithTimeout(fbUrl);
            }

            const data = await responsefob();

            try {
                await AsyncStorage.setItem('menuplan-raw', data);
                await AsyncStorage.setItem('menuplan-id', id);
            } finally {
                return data;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    try {
        const savedID = await getSavedID();

        if (savedID === id) {
            const cachedData = await AsyncStorage.getItem('menuplan-raw');
            if (cachedData !== null) return cachedData;
        } else {
            return await scrapeMenuplan();
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};

export default getMenuplanData;