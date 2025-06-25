import isEmpty from '../../lib/isEmpty';

//api.js
const HOST = Object.freeze({
    LOGIN: 'https://schulnetz.bks-campus.ch/loginto.php?pageid=2131',
    GRADES: 'https://schulnetz.bks-campus.ch/index.php?pageid=21311',
    ATTENDANCE: 'https://schulnetz.bks-campus.ch/index.php?pageid=21111',
    TIMETABLE: 'https://schulnetz.bks-campus.ch/index.php?pageid=22202',
    START: 'https://schulnetz.bks-campus.ch/index.php?pageid=1',
    HOST: 'https://schulnetz.bks-campus.ch/',
    LOGIN2: 'https://schulnetz.bks-campus.ch/index.php?'
});

// TODO
// - allow different hosts
// - make host logic dynamic --> stundenplan

const fetchLoginHash = async (loginUrl) => {
    try {
        const response = await fetch(loginUrl, {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            }
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
    console.log('[AUTH] Starting authentication...');
    console.log(`[AUTH] Username: ${username}`);

    const loginHash = await fetchLoginHash(HOST.LOGIN);

    if (!loginHash) {
        console.warn('[AUTH] Failed to retrieve login hash.');
        return false;
    }

    console.log(`[AUTH] Retrieved login hash: ${loginHash}`);

    const payload = new URLSearchParams({
        login: username,
        passwort: password,
        loginhash: loginHash
    });

    console.log('[AUTH] Payload to be sent:', payload.toString());

    try {
        const response = await fetch(HOST.START, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html'
            },
            redirect: 'follow',
            body: payload.toString()
        });

        console.log(`[AUTH] Response status: ${response.status}`);

        if (response.url.indexOf('loginto') !== -1) {
            console.log(`[AUTH] Response URL: ${response.url}`)
            console.warn('[AUTH] Login failed — back to login prompt');
            return false;
        }

        const result = response.ok;
        console.log(`[AUTH] Authentication ${result ? 'succeeded' : 'failed'}.`);
        return result;
    } catch (error) {
        console.error('[AUTH] Error during authentication:', error);
        return false;
    }
};

const fetchSntzPages = async ({ queryItems = [], username, password }) => {
    if (!username || !password ) return null;
    console.log(`[FETCH] Attempting to log in with the following credentials: ${username}, ${password}`);

    const loginSuccesful = await authenticate(username, password);

    if (!loginSuccesful) {
        console.log('[FETCH] Login failed');
        return null;
    }; 

    console.log('[FETCH] Logged in successfully');

    const responses = {};

    for (const { url, key } of queryItems) {
        if (!url || !key) {
            console.warn('[FETCH] Skipping query item with missing url/key:', { url, key });
            continue;
        }

        let responseText = null;

        try {
            // id und transitid innatua
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/html'
                },
                redirect: 'follow',
                credentials: 'include'
            });

            console.log(`[FETCH] Fetching URL for '${key}': ${url}`);
            console.log(`[FETCH] Following response url for '${key}': ${response.url}`);

            if (response.ok && response.url.indexOf('loginto') !== -1) {
                responseText = await response.text();
            } else {
                console.warn(`[FETCH] Request failed with status ${response.status} for '${key}'`);
            }
        } catch (error) {
            console.warn(`[FETCH] Error fetching '${key}':`, error.message);
        }

        responses[key] = responseText;
    }

    if (isEmpty(responses)) console.warn('[FETCH] Response object is empty');

    return responses;
};

export default {
    HOST,
    fetchSntzPages,
    authenticate
};