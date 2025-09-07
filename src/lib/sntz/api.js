import isEmpty from '../../lib/isEmpty';
import { SNTZ } from '../../config/links/links'

// remap this object to the config links to avoid introducing regression
const HOST = Object.freeze({
    LOGIN: SNTZ.LOGIN,
    GRADES: SNTZ.GRADES,
    ATTENDANCE: SNTZ.ATTENDANCE,
    TIMETABLE: SNTZ.TIMETABLE,
    START: SNTZ.START,
    HOST: SNTZ.HOST,
});

const fetchLoginHash = async (loginUrl) => {
    try {
        const response = await fetch(loginUrl, {
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html'
            }
        });
        
        const html = await response.text();
        const hash_index = html.indexOf('<input type="hidden" value="');

        return hash_index === -1 ? null : html.substring(hash_index + 28, hash_index + 60);
    } catch (error) {
        console.error('[AUTH] Failed to fetch login hash:', error);
        return null;
    }
};

const authenticate = async (username, password) => {

    console.log('[AUTH] Starting authentication...');
    console.log(`[AUTH] Username: ${username}`);

    const loginHash = await fetchLoginHash(HOST.LOGIN);

    let sessionId = null;
    let loginSuccessful = false;

    const browserID = {
        transid: null,
        id: null
    }

    if (!loginHash) {
        console.warn('[AUTH] Failed to retrieve login hash.');
        return { loginSuccessful, sessionId, browserID };
    }

    console.log(`[AUTH] Retrieved login hash: ${loginHash}`);

    const payload = new URLSearchParams({
        login: username,
        passwort: password,
        loginhash: loginHash
    });

    console.log('[AUTH] Payload will be sent');

    try {
        const response = await fetch(HOST.START, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html'
            },
            redirect: 'follow',
            body: payload.toString()
        });

        console.log(`[AUTH] Response status: ${response.status}`);
        console.log('[AUTH] Trying to capture session ID...');

        const setCookie = response.headers.get('Set-Cookie');

        if (setCookie) {
            const match = setCookie.match(/PHPSESSID=([^;]+);/); // I should start using regex more

            if (match) {
                sessionId = match[1];
                console.log(`[AUTH] Captured session ID: ${sessionId}`);
            } else {
                console.warn('[AUTH] Could not parse PHPSESSID from cookie.');
            }
        } else {
            console.warn('[AUTH] No Set-Cookie header found. Something is going very wrong...');
        }

        if (response.url.includes('loginto')) {
            console.log(`[AUTH] Response URL: ${response.url}`)
            console.warn('[AUTH] Login failed - back to login prompt');
            return { loginSuccessful, sessionId, browserID };
        }

        const text = await response.text();

        const loginSuccessful = response.ok;
        console.log(`[AUTH] Request ${loginSuccessful ? 'succeeded' : 'failed'}.`);

        const match = text.match(/id=([^&]+)&transid=([^&]+)/);

        if (match) {
            browserID.id = match[1]; // remains constant per session
            browserID.transid = match[2]; // changes every new request
        }

        return { loginSuccessful, sessionId, browserID };
    } catch (error) {
        console.error('[AUTH] Error during authentication:', error);
        return false;
    }
};

const fetchSntzPages = async ({ queryItems = [], username, password }) => {
    if (!username || !password ) return null;
    console.log(`[FETCH] Attempting to log in with the following credentials: ${username}`);

    const { loginSuccessful, sessionId, browserID } = await authenticate(username, password);
    console.log(`[FETCH] browserID passed by authenticate: ${browserID.id}, ${browserID.transid}`);

    if (!loginSuccessful) {
        console.log('[FETCH] Login failed');
        return {};
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
            const fullUrl = `${url}&id=${browserID.id}&transid=${browserID.transid}`;
            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/html',
                    'Cookie': `PHPSESSID=${sessionId}`
                },
                redirect: 'follow'
            });

            console.log(`[FETCH] Fetching URL for '${key}': ${url}`);
            console.log(`[FETCH] Following response url for '${key}': ${response.url}`);

            if (response.ok && !response.url.includes('loginto')) {
                responseText = await response.text();

                const match = responseText.match(/transid=([^&]+)/);

                if (match) {
                    browserID.transid = match[1];
                    console.log(`[FETCH] New transid found for next request ${browserID.transid}`);
                }
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