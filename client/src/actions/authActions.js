import config from '../config';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const BASE_URL = config.BASE_URL;

const login = async (formData) => {
    const { email, password } = formData

    try {
        const result = await fetch(BASE_URL + 'auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const token = await result.json();
        if (!token.message) {
            cookies.set(config.COOKIE, token, { path: '/' });
        }

        return token;
    } catch (error) {
        // //validate and call notification msg
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

    try {

        const result = await fetch(BASE_URL + 'auth/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                secondName,
                email,
                password, repeatPassword
            })
        })

        const token = await result.json();
        cookies.set(config.COOKIE, token, { path: '/' });
        return token;
    } catch (error) {
        //validate and call notification msg
        console.log(error)
    }
}

const logout = () => {
    cookies.remove(config.COOKIE, { path: '/' });
}


export {
    login,
    register,
    logout,
}