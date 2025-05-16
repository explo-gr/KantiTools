import React, { createContext, useState, useEffect, useContext } from 'react';
import CredentialsStorage from '../lib/sntz/credentialStorageManager';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCredentials = async () => {
            const credentials = await CredentialsStorage.getCredentials();
            if (credentials) {
                setUser(credentials);
            }
            setLoading(false);
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

    //const getLoginStatus = () => !loading && user;

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// i muas was schriiba was dä menüplan als datei cached und dia ganza data fum schualnetz
// machi das seperat
// gits context #800 ??
// i kriag a krisa
// i muas dia ganzi fetch logik fum notatest abkuppla und modularer macha
// i muas no a iistellig für dä schualnetz provider macha

//use effect bi loading und usetates