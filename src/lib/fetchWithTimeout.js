// https://medium.com/to-err-is-aaron/detect-network-failures-when-using-fetch-40a53d56e36
const fetchWithTimeout = async (url, options) => {
    const maxRetries = 4;
    let retries = 0;

    const completeRequest = async () => {
        try {
            return await Promise.race([
                fetch(url, { ...options }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout'), 20 * 1000))
                ),
            ]);
        } catch (e) {
            if (e.message === 'Timeout' && retries < maxRetries) {
                retries++;
                console.warn(`Retrying request... Attempt ${retries}`);
                return completeRequest();
            } else {
                throw e;
            }
        }
    };

    return completeRequest();
};

export default fetchWithTimeout;