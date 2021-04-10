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
        return { message: error.message };
    }
}

const register = async (formData) => {
    const { firstName, secondName, email, password, repeatPassword } = formData;

    if (password !== repeatPassword) {
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

const editUser = async ({ firstName, secondName, email, id }) => {
    try {
        const result = await fetch(`${BASE_URL}auth/edit`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                secondName,
                email,
                id
            })
        });

        const token = await result.json();
        if (!token.message) {
            cookies.remove(config.COOKIE, { path: '/' });
            cookies.set(config.COOKIE, token, { path: '/' });
            return token;
        } else {
            return { message: token.message}
        }
    } catch (error) {
        return { message: error.message };
    }
}

export {
    login,
    register,
    logout,
    editUser
}