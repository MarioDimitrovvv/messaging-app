const BASE_URL = 'http://localhost:4000/api/';

const login = (formData) => {
    const { email, password } = formData

    fetch(BASE_URL + 'auth/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(data => console.log(data))
        //validate and call notification msg
        .catch(err => console.log(err))
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
        .then(data => console.log(data))
        //validate and call notification msg
        .catch(err => console.log(err))
}

export {
    login,
    register
}