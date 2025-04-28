import * as SecureStore from 'expo-secure-store';

// burökratie🙂‍↔️
const CREDENTIAL_ID = {
    username: 'sntz-username',
    password: 'sntz-password',
};

const getCredentials = async () => {
    const username = await SecureStore.getItemAsync(CREDENTIAL_ID.username);
    const password = await SecureStore.getItemAsync(CREDENTIAL_ID.password);

    if (username && password) return { username, password };

    return null;
};

const clearCredentials = async () => {
    try {
        await SecureStore.deleteItemAsync(CREDENTIAL_ID.username);
        await SecureStore.deleteItemAsync(CREDENTIAL_ID.password);
        return true;
    } catch {
        return false;
    }
};

const getloginStatus = async () => {
    const credentials = await getCredentials();
    return credentials == null ? false : true;
};

const saveCredentials = async (username, password) => {
    await SecureStore.setItemAsync(CREDENTIAL_ID.username, username);
    await SecureStore.setItemAsync(CREDENTIAL_ID.password, password);
};

export default {
    getCredentials,
    saveCredentials,
    clearCredentials,
    getloginStatus
}