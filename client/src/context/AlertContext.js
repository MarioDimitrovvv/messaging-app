import { createContext, useContext, useMemo, useState } from "react";

const AlertContext = createContext(null);

export function useAlert() {
    return useContext(AlertContext);
}

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const providerAlert = useMemo(() => ({ alert, setAlert }), [alert, setAlert]);

    return (
        <AlertContext.Provider value={providerAlert}>
            {children}
        </AlertContext.Provider>
    )
};