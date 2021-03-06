import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';

import { getAllUsers, getFriends } from '../../actions/userActions';

import { useUser } from '../../context/UserContext';
import { useAlert } from '../../context/AlertContext';

import User from './User';
import { useLoading } from '../../context/LoadedProvider';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);

    const { user } = useUser();
    const { setAlert } = useAlert();
    const {setLoaded} = useLoading();
    useEffect(() => {
        (async () => {
            try {
                const users = await getAllUsers();
                const friends = await getFriends();
                if (users?.message) setAlert({ text: users.message, type: 'danger' })
                if (friends?.message) setAlert({ text: friends.message, type: 'danger' })
                setUsers(users);
                friends ? setFriends(friends.friends) : setFriends(null);
                setLoaded(true);
            } catch (error) {
                setAlert({ text: error.message, type: 'danger' })
            }
        })()
    }, [user, setAlert, setLoaded])

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