import { useState, useEffect } from 'react'
import { ListGroup, Table } from 'react-bootstrap';
import { getAllUsers, getFriends } from '../../actions/userActions';
import { useUser } from '../../context/UserContext';
import User from './User';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);

    const { user } = useUser();

    useEffect(() => {
        (async () => {
            try {
                const users = await getAllUsers()
                const friends = await getFriends();
                setUsers(users);
                setFriends(friends.friends);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [user])

    return (
        users
            ?
            <Table responsive="sm">
                {users.map(x => <User key={x._id} name={x.name} email={x.email} friends={friends} userId={x._id} />)}
            </Table>
            : <div>There is no users...</div>
    )
}

export default Users;