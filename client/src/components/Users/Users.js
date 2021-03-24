import { useState, useEffect } from 'react'
import config from '../../config'

const Users = () => {

    useEffect(() => {
        fetch(config.BASE_URL + 'users')
            .then(res => res.json())
            .then(data => console.log(data));
    }, [])

    return (
        <div>
            Users
        </div>
    )
}

export default Users;