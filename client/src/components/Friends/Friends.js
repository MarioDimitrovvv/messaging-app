import { useState, useEffect, useContext } from 'react'

import { getFriends } from '../../actions/userActions';
import UserContext from '../../context/UserContext';
import Friend from './Friend';

const Friends = ({ history, location }) => {
    const [friends, setFriends] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [lastClicked, setLastClicked] = useState(null);

    const { user } = useContext(UserContext);
    const pathname = location.pathname;

    // Create conversation if there is no conversation in the db with exact same users

    useEffect(() => {
        (async() => {
            if(user) {
                try {
                    const data = await getFriends();
                    const allFriends = data.friends;
                    const firstFriend = allFriends[0]._id;

                    if(allFriends.length > 0) {
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
                //make better it is not working
                // history.push('/auth');
            }
        })()

    }, [user]);

    useEffect(() => {
        // Fetch at first for all conversations and on clicking on friend render current messages
        // Find conversation by user ids
        
        history.push(`/messages/${lastClicked}`);

    }, [lastClicked, pathname])

    const getMessages = (userId, friendId) => {

    }

    //move to another file
    // fetch('....', {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         users: [user, lastClicked],
    //     })
    // })



    const handleChange = (e) => {
        setMessage(e.target.value);
        console.log(message);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('....', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                users: [user, lastClicked],
                sendingMessage: message,
                sender: user,
            })
        })

        console.log('user id ' + lastClicked);
    }

    return (
        user
            ? friends
                ?
                <div>
                    {friends?.map(x => <Friend key={x._id} name={x.name} userId={x._id} onClick={setLastClicked} lastClicked={lastClicked} />)}
                    <div className="chat-container">
                        {/* Render every message with messages.map(x => <Message />) for current conversation */}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <textarea className="text-container" onChange={handleChange} placeholder="Aa"></textarea>
                            <input type="submit" value="Send" />
                        </form>
                    </div>
                </div>
                : <h3>There is no friends yet...</h3>
            : <h1>You are not logged in! Add link to go to auth route!</h1>
    )
}

export default Friends;