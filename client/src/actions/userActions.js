import config from '../config';

const BASE_URL = config.BASE_URL;

const getUser = async () => {
    const response = await fetch(BASE_URL + 'users/user', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
    });

    return await response.json();
}

const getAllUsers = async () => {
    const response = await fetch(BASE_URL + 'users/all', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
    });

    return await response.json();
}

const addFriend = async (id, userId) => {
    await fetch(BASE_URL + 'users/add', {
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
    const response = await fetch(BASE_URL + 'users/friends', {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
    });

    return await response.json();
}

export {
    getUser,
    getAllUsers,
    addFriend,
    getFriends
}