import React, { createContext, useState, useEffect, useContext } from 'react';
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
        await CredentialsStorage.saveCredentials(username, password);
        setUser({ username, password });
    };

    const logout = async () => {
        await CredentialsStorage.clearCredentials();
        setUser(null);
    };

    //const getLoginStatus = () => !isReady && user;

    return (
        <AuthContext.Provider value={{ user, isReady, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);