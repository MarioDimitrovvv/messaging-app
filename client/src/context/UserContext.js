import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUser } from '../actions/userActions';

const UserContext = createContext(null);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
    
    useEffect(() => {
        getUser()
            .then(data => {
                setUser(data.name);
                setIsReady(true);
            })
            .catch(err => console.log(err));
    }, [user, setUser]);

    return (
        isReady &&
        <UserContext.Provider value={providerUser}>
            {children}
        </UserContext.Provider>
    )
};