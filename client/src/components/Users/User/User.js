import { useEffect, useState } from 'react';

import { Button } from 'react-bootstrap';

import { addFriend } from '../../../actions/userActions';
import { useId } from '../../../context/IdContext';
import { useUser } from '../../../context/UserContext';
import { useAlert } from '../../../context/AlertContext';

const User = ({
    name,
    email,
    friends,
    userId,
}) => {

    const [isFriend, setIsFriend] = useState(false);

    const { user } = useUser();
    const { id } = useId();
    const { setAlert } = useAlert();

    useEffect(() => {
        friends?.some(x => x.name === name) ? setIsFriend(true) : setIsFriend(false);
    }, [friends, user, name]);

    const handleFriendButton = () => {
        if (!isFriend) {
            addFriend(id, userId)
            .then(data => {
                if(data.message) setAlert({text: data.message, type: 'danger'})
            })
            .catch(err => {
                setAlert({text: err, type: 'danger'})
        });
        }
        setIsFriend((prevIsFriend) => !prevIsFriend);
    }

    return (
        <tbody>
            <tr>
                <td >{name}</td>
                <td >{email}</td>
                {user && <td ><Button onClick={() => handleFriendButton()} disabled={isFriend} >{isFriend ? 'Friend' : 'Add friend'}</Button></td>}
            </tr>
        </tbody>
    )
}

export default User;