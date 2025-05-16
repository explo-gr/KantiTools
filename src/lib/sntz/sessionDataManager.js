const HOST = Object.freeze({
    LOGIN: "https://schulnetz.bks-campus.ch/loginto.php?pageid=2131",
    GRADES: "https://schulnetz.bks-campus.ch/index.php?pageid=21311",
    ATTENDANCE: "https://schulnetz.bks-campus.ch/index.php?pageid=21111",
    TIMETABLE: "https://schulnetz.bks-campus.ch/index.php?pageid=22202"
});

const getLoginHash = async (uri) => {
    try {
        const response = await fetch(uri, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const raw_html = await response.text();
        const hash_index = raw_html.indexOf('<input type="hidden" value="') + 28;

        return raw_html.substring(hash_index, hash_index + 32);
    } catch {
        return null;
    }
};

const scrapePageData = async (uri) => {
    const USERNAME = "";
    const PASSWORD = "";
    const LOGINHASH = await getLoginHash(uri);

    if (LOGINHASH == null) return null;

    const DATA = {
        'login': USERNAME,
        'passwort': PASSWORD,
        'loginhash': LOGINHASH
    };

    try {
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html'
            },
            redirect: 'follow',
            body: new URLSearchParams(DATA).toString()
        });

        // TODO: uf HTTPS Response Code prüafa
        // false login if status code is 302
        return response.text();
    }

    catch {
        return null;
    }
}

export default {
    scrapePageData
}