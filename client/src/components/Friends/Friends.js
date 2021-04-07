import { useState, useEffect, Fragment, useCallback } from 'react';

import { Alert, Col, ListGroup, Row } from 'react-bootstrap';

import Friend from './Friend';
import Chat from './Chat';

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
            })
                .catch(err => console.log(err));
            setMessage('');
        }
    }, [lastClicked, pathname, history, id])

    const receiveMsg = useCallback(messages => {
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
                <Fragment>
                    <Alert variant="danger" dismissible onClose={() => console.log('closing alert')}>Some alert</Alert>
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                {friends?.map(x => <Friend key={x._id} name={x.name} userId={x._id} onClick={setLastClicked} lastClicked={lastClicked} />)}
                            </ListGroup>
                        </Col>
                        <Col sm={8} xl="8">
                                <Chat
                                    isNewConversation={isNewConversation}
                                    messages={messages}
                                    message={message}
                                    id={id}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                        </Col>
                    </Row>
                </Fragment>
                : <h3>There is no friends yet...</h3>
            : <Fragment>{isLoaded ? <h1>You are not logged in! Add link to go to auth route!</h1> : <h1>Loading...</h1>}</Fragment>
    )
}

export default Friends;