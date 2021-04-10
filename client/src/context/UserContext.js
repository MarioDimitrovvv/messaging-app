import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUser } from '../actions/userActions';

const UserContext = createContext(null);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [userInfo, setUserInfo] = useState();
    const [isReady, setIsReady] = useState(false);

    const providerUser = useMemo(() => ({ user, setUser, userInfo }), [user, setUser, userInfo]);
    
    useEffect(() => {
        getUser()
            .then(data => {
                setUserInfo(data);
                setUser(data.name);
                setIsReady(true);
            })
            .catch(err => console.log(err));
    }, [user]);

    return (
        isReady &&
        <UserContext.Provider value={providerUser}>
            {children}
        </UserContext.Provider>
    )
};