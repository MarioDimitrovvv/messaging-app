import config from '../config';

const BASE_URL = config.BASE_URL;

const getUser = async () => {
    const response = await fetch('http://192.168.0.20:8000/api/user', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
            'sec-fetch-site': 'none'
        },
    });
    const user = await response.json();
    console.log(user);
    return user;
}

const getAllUsers = async () => {
    const response = await fetch('http://192.168.0.20:8000/api/users/all', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
    });
    const users = await response.json();
    return users.length === 0 ? null : users
}

const addFriend = async (id, userId) => {
    await fetch(BASE_URL + 'user/add', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            currentUser: id,
            addingUser: userId,
        })
    });
}

const getFriends = async () => {
    const response = await fetch('http://192.168.0.20:8000/api/user/friends', {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
    });

    return await response.json();
}

const getMessages =  (userId, friendId) => 
    fetch(`'http://192.168.0.20:8000/api/user/${userId}/friend/${friendId}`)
        .then(res => res.status === 200 ? res.json() : null)
        .catch(err => console.log(err));

export {
    getUser,
    getAllUsers,
    addFriend,
    getFriends,
    getMessages
}