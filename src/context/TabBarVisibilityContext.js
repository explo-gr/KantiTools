import React, { createContext, useCallback, useState } from 'react';

const TabBarVisibilityContext = createContext(null);

export const TabBarVisibilityProvider = ({ children }) => {
    const [ hidden, setHidden ] = useState(false);

    const showBar = useCallback(() => setHidden(false));
    const hideBar = useCallback(() => setHidden(true));

    return (
        <TabBarVisibilityContext.Provider value={{ hidden, showBar, hideBar }}>
            {children}
        </TabBarVisibilityContext.Provider>
    );
};

export const useTabBarVisibility = () => React.useContext(TabBarVisibilityContext);