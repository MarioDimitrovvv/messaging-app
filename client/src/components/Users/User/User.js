import { useEffect, useState } from 'react';
import { addFriend } from '../../../actions/userActions';
import { useId } from '../../../context/IdContext';
import { useUser } from '../../../context/UserContext';
import './User.scss';

const User = ({
    name,
    email,
    friends,
    userId,
}) => {

    const [isFriend, setIsFriend] = useState(false);

    const { user } = useUser();
    const { id } = useId();

    useEffect(() => {
        friends.some(x => x.name === name) ? setIsFriend(true) : setIsFriend(false);
    }, [friends, user, name]);

    const handleFriendButton = () => {
        if (!isFriend) {
            addFriend(id, userId);
        }
        setIsFriend((prevIsFriend) => !prevIsFriend);
    }

    return (
        <div className="user-container">
            <div>Name: {name}</div>
            <div>Email: {email}</div>
            {user && <button onClick={() => handleFriendButton()} disabled={isFriend} >{isFriend ? 'Friend' : 'Add friend'}</button>}
        </div>
    )
}

export default User;