import { useContext, useState } from 'react';
import { addFriend } from '../../../actions/userActions';
import IdContext from '../../../context/IdContext';
import UserContext from '../../../context/UserContext';
import './User.scss';

const User = ({
    name,
    email
}) => {

    const [isFriend, setIsFriend] = useState(false);

    const { user } = useContext(UserContext);
    const { id } = useContext(IdContext);

    const handleFriendButton = () => {
        if (!isFriend) {
            console.log(user);
            console.log(id);
            // addFriend(user.id, )
        }
        setIsFriend((prevIsFriend) => !prevIsFriend);
    }

    return (
        <div className="user-container">
            <div>Name: {name}</div>
            <div>Email: {email}</div>
            {user && <button onClick={() => handleFriendButton()}>{isFriend ? 'Unfriend' : 'Add friend'}</button>}
        </div>
    )
}

export default User;