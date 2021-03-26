import { useState, useEffect, useContext } from 'react'
import { getFriends } from '../../actions/userActions';
import UserContext from '../../context/UserContext';
import Friend from './Friend';

const Friends = ({ history }) => {
    const [friends, setFriends] = useState(null);
    const [message, setMessage] = useState('');
    const [lastClicked, setLastClicked] = useState(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        user
            ? getFriends()
                //todo for no friends
                // .then(data => data.lenght > 0 ? setFriends(data.friends) : setFriends(null))
                .then(data => setFriends(data.friends))
                .catch(err => console.log(err))
            : setFriends(null);
        // history.push('/auth')
    }, [user])

    const handleChange = (e) => {
        setMessage(e.target.value);
        console.log(message);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        user
            ? friends
                ?
                <div>
                    {friends?.map(x => <Friend key={x._id} name={x.name} userId={x._id} onClick={setLastClicked} lastClicked={lastClicked} />)}
                    <div className="chat-container">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <textarea className="text-container" onChange={handleChange} placeholder="Aa"></textarea>
                            <input type="submit" value="Send"/>
                        </form>
                    </div>
                </div>
                : <h3>There is no friends yet...</h3>
            : <h1>You are not logged in! Add link to go to auth route!</h1>
    )
}

export default Friends;