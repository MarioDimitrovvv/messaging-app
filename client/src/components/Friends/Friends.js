import { useState, useEffect, useContext } from 'react'
import { getFriends } from '../../actions/userActions';
import UserContext from '../../context/UserContext';
import Friend from './Friend';

const Friends = ({ history }) => {
    const [friends, setFriends] = useState(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        user
            ? getFriends()
                // .then(data => data.lenght > 0 ? setFriends(data.friends) : setFriends(null))
                .then(data => setFriends(data.friends))
                .catch(err => console.log(err))
            : setFriends(null);
        // history.push('/auth')
    }, [user])

    return (
        user
            ? friends
                ? friends?.map(x => <Friend key={x._id} name={x.name} userId={x._id} />)
                : <h3>There is no friends yet...</h3>
            : <h1>You are not logged in! Add link to go to auth route!</h1>
    )
}

export default Friends;