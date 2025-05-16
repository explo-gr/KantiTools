const HOST = Object.freeze({
    // could be made modular to support different providers but I'm not even gonna bother
    LOGIN: "https://schulnetz.bks-campus.ch/loginto.php?pageid=2131",
    GRADES: "https://schulnetz.bks-campus.ch/index.php?pageid=21311",
    ATTENDANCE: "https://schulnetz.bks-campus.ch/index.php?pageid=21111",
    TIMETABLE: "https://schulnetz.bks-campus.ch/index.php?pageid=22202",
    START: "https://schulnetz.bks-campus.ch/index.php?pageid=1"
});

const fetchLoginHash = async (loginUrl) => {
    try {
        const response = await fetch(loginUrl, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        
        const html = await response.text();
        const hash_index = html.indexOf('<input type="hidden" value="');

        return hash_index == -1 ? none : raw_html.substring(hash_index + 28, hash_index + 60);
    } catch (error) {
        console.error("Failed to fetch login hash:", error);
        return null;
    }
};

const authenticateAndFetch = async ({ url, username, password }) => {
    const loginHash = await fetchLoginHash(HOST.LOGIN);
    if (!loginHash) return null;

    const payload = new URLSearchParams({
        login: username,
        passwort: password,
        loginhash: loginHash
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html'
            },
            redirect: 'follow',
            body: payload.toString()
        });

        if (response.status === 302) {
            console.warn("Login failed: Redirect detected");
            return null;
        }

        return await response.text();
    } catch (error) {
        console.error("Error fetching page data:", error);
        return null;
    }
};

export default {
    HOST,
    authenticateAndFetch
};