import { useState, useEffect, useContext } from 'react'
import { getFriends } from '../../actions/userActions';
import UserContext from '../../context/UserContext';
import Friend from './Friend';

const Friends = () => {
    const [friends, setFriends] = useState([]);

    // const {user} = useContext(UserContext);
    
    useEffect(() => {
        getFriends()
            .then(data => setFriends(data.friends))
            .catch(err => console.log(err));
    }, [])

    return (
        friends
            ? friends?.map(x => <Friend key={x._id} name={x.name} userId={x._id} />)
            : <div>There is no friends...</div>
    )
}

export default Friends;