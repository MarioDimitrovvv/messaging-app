import { useState, useEffect, useContext, useCallback } from 'react';

import config from '../../config';

import Friend from './Friend';
import Message from './Message';

import IdContext from '../../context/IdContext';
import UserContext from '../../context/UserContext';

import { getFriends } from '../../actions/userActions';
import { useSocket } from '../../context/Socket';

const Friends = ({ history, location }) => {
    const [friends, setFriends] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isNewConversation, setIsNewConversation] = useState(false);

    const [lastClicked, setLastClicked] = useState(null);

    const { user } = useContext(UserContext);
    const { id } = useContext(IdContext);

    const socket = useSocket();

    const pathname = location.pathname;

    const sendMessages = useCallback((lastClicked, message) => {

        fetch(`${config.BASE_URL}user/${id}/friend/${lastClicked}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
            })
        })
            .then((res) => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }, [setIsNewConversation])

    useEffect(() => {
        (async () => {
            if (user) {
                //move the logic
                try {
                    const data = await getFriends();
                    const allFriends = data.friends;
                    const firstFriend = allFriends[0]._id;

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
            } else {
                //is not working yet
                // history.push('/auth');
            }
        })()

    }, [user]);

    useEffect(() => {
        // Fetch at first for all conversations and on clicking on friend render current messages
        // Find conversation by user ids and then move the logic in different file
        if (id && lastClicked) {
            history.push(`/messages/${lastClicked}`);
            getMessages(id, lastClicked)
        }


    }, [lastClicked, pathname])

    const receiveMsg = (messages) => {
        setMessages(messages)
    }
    useEffect(() => {
        if (socket === undefined) return;
        socket.on('receive-message', receiveMsg);

        // return () => {
        //     console.log('Disconnect socket');
        //     return socket.off('receive-message')
        // };
    }, [socket, lastClicked])


    const getMessages = (userId, friendId) => {
        // to deal with clicking already fetched friend
        fetch(`${config.BASE_URL}user/${userId}/friend/${friendId}`)
            .then(res => res.status === 200 ? res.json() : setMessages([]))
            .then(data => {
                if (data) {
                    setIsNewConversation(false);
                    setMessages(data);
                } else {
                    setIsNewConversation(true);
                }
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
            : <h1>You are not logged in! Add link to go to auth route!</h1>
    )
}

export default Friends;