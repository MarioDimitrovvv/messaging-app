import { useState, useEffect } from 'react'
import { getAllUsers } from '../../actions/userActions';
import User from './User';

const Users = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getAllUsers()
            .then(data =>setUsers(data));
    }, [])

    console.log(users);
    
    return (
        users 
            ? users?.map(x => <User key={x._id} name={x.name} email={x.email}/>)
            : <div>There is no users...</div>
    )
}

export default Users;