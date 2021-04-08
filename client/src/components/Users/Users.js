import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';

import { getAllUsers, getFriends } from '../../actions/userActions';

import { useUser } from '../../context/UserContext';
import { useAlert } from '../../context/AlertContext';

import User from './User';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);

    const { user } = useUser();
    const { setAlert } = useAlert();

    useEffect(() => {
        (async () => {
            try {
                const users = await getAllUsers();
                const friends = await getFriends();
                friends ? setFriends(friends.friends) : setFriends(null);
                setUsers(users);
            } catch (error) {
                setAlert({ text: error.message, type: 'danger' })
            }
        })()
    }, [user, setAlert])

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