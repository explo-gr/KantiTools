const HOST = Object.freeze({
    LOGIN: "https://schulnetz.bks-campus.ch/loginto.php?pageid=2131",
    GRADES: "https://schulnetz.bks-campus.ch/index.php?pageid=21311",
    ATTENDANCE: "https://schulnetz.bks-campus.ch/index.php?pageid=21111",
    TIMETABLE: "https://schulnetz.bks-campus.ch/index.php?pageid=22202",
    START: "https://schulnetz.bks-campus.ch/index.php?pageid=1"
});

// TODO
// - allow different hosts
// - make host logic dynamic --> stundenplan

const fetchLoginHash = async (loginUrl) => {
    try {
        const response = await fetch(loginUrl, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        
        const html = await response.text();
        const hash_index = html.indexOf('<input type="hidden" value="');

        return hash_index === -1 ? null : html.substring(hash_index + 28, hash_index + 60);
    } catch (error) {
        console.error("Failed to fetch login hash:", error);
        return null;
    }
};

// generated debug logs with mr. gpt
const authenticate = async (username, password) => {
    console.log("[AUTH] Starting authentication...");
    console.log(`[AUTH] Username: ${username}`);

    const loginHash = await fetchLoginHash(HOST.LOGIN);
    if (!loginHash) {
        console.warn("[AUTH] Failed to retrieve login hash.");
        return false;
    }

    console.log(`[AUTH] Retrieved login hash: ${loginHash}`);

    const payload = new URLSearchParams({
        login: username,
        passwort: password,
        loginhash: loginHash
    });

    console.log("[AUTH] Payload to be sent:", payload.toString());

    try {
        const response = await fetch(HOST.LOGIN, {
            method: 'POST',
            keepalive: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html'
            },
            redirect: 'follow',
            body: payload.toString()
        });

        console.log(`[AUTH] Response status: ${response.status}`);

        if (response.status === 302) {
            console.warn("[AUTH] Login failed — received redirect (302).");
            return false;
        }

        const result = response.ok;
        console.log(`[AUTH] Authentication ${result ? "succeeded" : "failed"}.`);
        return result;
    } catch (error) {
        console.error("[AUTH] Error during authentication:", error);
        return false;
    }
};

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

const fetchSntzPages = async ({ queryItems = [{}], username, password }) => {
    if (!username || !password || !urls) return null;

    const loginSuccesful = await authenticate(username, password);
    if (!loginSuccesful) return null; 

    console.log("Logged in succesfully");

    const responses = {};

    for (const { url, key } of queryItems) {
        let responseText = null;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const text = await response.text();
                responseText = text;
            } else {
                console.warn(`Reqeust failure while scraping data: ${key}`);
            }
        } catch (error) {
            console.warn(`Request failure while scraping data: ${key}`);
        }

        responses[key] = responseText;
    }

    if (isEmpty(responses)) console.warn("Response Object is empty");

    return responses;
};

export default {
    HOST,
    fetchSntzPages,
    authenticate
};