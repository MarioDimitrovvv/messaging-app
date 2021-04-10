import { createContext, useContext, useMemo, useState } from 'react';

const LoadedContext = createContext(null); 

export function useLoading() {
    return useContext(LoadedContext);
}

export function LoadedProvider({children}) {
    const [loaded, setLoaded] = useState(false);
    const providerLoaded = useMemo(() => ({ loaded, setLoaded }), [loaded, setLoaded]);
    
    return (
        <LoadedContext.Provider value={providerLoaded}>
            {children}
        </LoadedContext.Provider>
    )
}; 