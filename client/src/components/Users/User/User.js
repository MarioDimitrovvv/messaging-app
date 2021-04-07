import { useEffect, useState } from 'react';
import { Button, ListGroup, Table } from 'react-bootstrap';
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
        // <ListGroup.Item >
        //     <div class="d-flex bd-highlight mb-3">
        //         <div className="p-2 bd-highlight">{name}</div>
        //         <div className="p-2 bd-highlight">Email: {email}</div>
        //         {user && <Button className="ml-auto p-2 bd-highlight" onClick={() => handleFriendButton()} disabled={isFriend} >{isFriend ? 'Friend' : 'Add friend'}</Button>}
        //     </div>
        // </ListGroup.Item>
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