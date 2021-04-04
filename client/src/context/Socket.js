import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(); 

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({id, children}) {
    const [socket , setSocket] = useState();

    useEffect(() => {
        const newSocket = io('http://192.168.0.20:8000', {transports: ['websocket'], query: { id } })

        setSocket(newSocket);
        
        return () => {
            'closing the socket'
            newSocket.close();
        }
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}; 