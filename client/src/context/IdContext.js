import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUser } from '../actions/userActions';

const IdContext = createContext(null); 

export function useId() {
    return useContext(IdContext);
}

export function IdProvider({children}) {
    const [id, setId] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const providerId = useMemo(() => ({ id, setId }), [id, setId]);
    console.log('from id conterxt');
    useEffect(() => {
        getUser()
            .then(data => {
                setId(data._id);
                setIsReady(true);
            })
            .catch(err => console.log(err));
    }, [id]);
    
    return (
        isReady &&
        <IdContext.Provider value={providerId}>
            {children}
        </IdContext.Provider>
    )
}; 