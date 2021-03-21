import Cookies from 'universal-cookie';

import config from '../config';

const cookies = new Cookies();
const BASE_URL = 'http://localhost:4000/api/';

const login = async (formData) => {
    const { email, password } = formData
    
    try {
        await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => cookies.set(config.COOKIE, data))
            //validate and call notification msg
            .catch(err => console.log(err))
        
    } catch (error) {
        console.log(error);
    }
}

const register = async (formData) => {
    const { firstName, secondName, email, password, repeatPassword } = formData;
    
    if (password !== repeatPassword) {
        console.log('Password Missmatch!');
        //validate and call notification msg
        return;
    }

    fetch(BASE_URL + 'auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            secondName,
            email,
            password,repeatPassword
        })
    })
        .then(res => res.json())
        .then(data => cookies.set(config.COOKIE, data))
        //validate and call notification msg
        .catch(err => console.log(err))
}

export {
    login,
    register
}