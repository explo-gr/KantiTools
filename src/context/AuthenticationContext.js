import { createContext, useState, useEffect, useContext } from 'react';
import CredentialsStorage from '../lib/sntz/credentialStorageManager';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoading] = useState(true);

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
        setUser({ username, password });
        await CredentialsStorage.saveCredentials(username, password);
        console.log("[AUTH] Login succesful");
    };

    const logout = async () => {
        setUser(null);
        await CredentialsStorage.clearCredentials();
        console.log("[AUTH] Logout succesful");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);