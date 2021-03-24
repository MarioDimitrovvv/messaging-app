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
    const response = await fetch(BASE_URL + 'users');

    return await response.json();
}

export {
    getUser,
    getAllUsers,
}