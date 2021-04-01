import { useState, useEffect, Fragment, useCallback } from 'react';

import Friend from './Friend';
import Message from './Message';

import { useId } from '../../context/IdContext';
import { useUser } from '../../context/UserContext';
import { useSocket } from '../../context/Socket';

import { getFriends, getMessages } from '../../actions/userActions';

const Friends = ({ history, location }) => {
    const [friends, setFriends] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isNewConversation, setIsNewConversation] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false)

    const [lastClicked, setLastClicked] = useState(null);

    const { user } = useUser();
    const { id } = useId();
    const socket = useSocket();

    const pathname = location.pathname;

    useEffect(() => {
        (async () => {
            if (user) {
                try {
                    const data = await getFriends();
                    const allFriends = data.friends;
                    const firstFriend = allFriends[0]?._id;

                    if (allFriends.length > 0) {
                        setFriends(allFriends);
                        setLastClicked(firstFriend);
                        history.push(`/messages/${firstFriend}`);
                    } else {
                        setFriends(null);
                    }

                } catch (error) {
                    console.log(error);
                }
                setIsLoaded(true);
            }
        })()
    }, [user, history]);

    useEffect(() => {
        if (id && lastClicked) {
            history.push(`/messages/${lastClicked}`);
            // to deal with clicking already fetched friend
            getMessages(id, lastClicked).then(data => {
                if (data) {
                    setIsNewConversation(false);
                    setMessages(data);
                } else {
                    setIsNewConversation(true);
                    setMessages([]);
                }
            });
            setMessage('');
        }
    }, [lastClicked, pathname, history, id])

    const receiveMsg = useCallback((messages) => {
        isNewConversation && setIsNewConversation(false);
        setMessages(messages);
    }, [isNewConversation]);
    
    useEffect(() => {
        if (socket === undefined) return;
        socket.on('receive-message', receiveMsg);
        
        return () => {
            return socket.off('receive-message')
        };
    }, [socket, lastClicked, receiveMsg])
    
    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.length === 0) return //handle message
        socket.emit('send-message', { lastClicked, message })
        setMessage('');
    }

    return (
        user
            ? friends
                ?
                <div>
                    {friends?.map(x => <Friend key={x._id} name={x.name} userId={x._id} onClick={setLastClicked} lastClicked={lastClicked} />)}
                    <div className="chat-container">
                        {isNewConversation ? <div>Start new conversation</div> : null}
                        {messages.map(x => <Message key={x._id} sender={x.sender} message={x.message} id={id} />)}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <textarea className="text-container" onChange={handleChange} value={message} placeholder="Aa"></textarea>
                            <input type="submit" value="Send" />
                        </form>
                    </div>
                </div>
                : <h3>There is no friends yet...</h3>
            : <Fragment>{isLoaded ? <h1>You are not logged in! Add link to go to auth route!</h1> : <h1>Loading...</h1>}</Fragment>
    )
}

export default Friends;