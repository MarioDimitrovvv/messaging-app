import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AlertContext = createContext(null); 

export function useAlert() {
    return useContext(AlertContext);
}

export function AlertProvider({children}) {
    const [alert, setAlert] = useState(null);

    const providerAlert = useMemo(() => ({ alert, setAlert }), [alert, setAlert]);

    useEffect(() => {
        console.log('Alert is changed');
    }, [alert, setAlert])
    return (
        <AlertContext.Provider value={providerAlert}>
            {children}
        </AlertContext.Provider>
    )
}; 