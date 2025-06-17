import { createContext, useState, useEffect, useContext } from 'react';
import CredentialsStorage from '../lib/sntz/credentialStorageManager';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadCredentials = async () => {
            const credentials = await CredentialsStorage.getCredentials();
            if (credentials) {
                setUser(credentials);
            }
            setIsReady(true);
        };
        loadCredentials();
    }, []);

    const login = async (username, password) => {
        setUser({ username, password });
        await CredentialsStorage.saveCredentials(username, password);
    };

    const logout = async () => {
        setUser(null);
        await CredentialsStorage.clearCredentials();
    };

    //const getLoginStatus = () => !isReady && user;

    return (
        <AuthContext.Provider value={{ user, isReady, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);