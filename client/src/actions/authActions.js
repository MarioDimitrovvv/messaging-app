const BASE_URL = 'http://localhost:4000/api/';

const login = (formData) => {
    const { email, password } = formData
    
    fetch(BASE_URL + 'login', {
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
        .catch(err => console.log(err))
}

export default login;