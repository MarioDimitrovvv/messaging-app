import { useState, useEffect, useContext } from 'react'
import { getAllUsers } from '../../actions/userActions';
import UserContext from '../../context/UserContext';
import User from './User';

const Users = () => {
    const [users, setUsers] = useState([]);

    const {user} = useContext(UserContext);
    
    useEffect(() => {
        getAllUsers()
            .then(data => setUsers(data));
        console.log('at users component');
    }, [user])

    return (
        users
            ? users?.map(x => <User key={x._id} name={x.name} email={x.email} />)
            : <div>There is no users...</div>
    )
}

export default Users;