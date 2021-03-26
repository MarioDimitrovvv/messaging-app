import { useState, useEffect, useContext } from 'react'
import { getAllUsers, getFriends } from '../../actions/userActions';
import UserContext from '../../context/UserContext';
import User from './User';

const Users = () => {
    const [users, setUsers] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const getUsers = (async () => {
            try {
                const users = await getAllUsers()
                const firends = await getFriends();
                setUsers(users)
            } catch (error) {
                console.log(error);                
            }
        })()
    }, [user])

    return (
        users
            ? users?.map(x => <User key={x._id} name={x.name} email={x.email} userId={x._id} />)
            : <div>There is no users...</div>
    )
}

export default Users;