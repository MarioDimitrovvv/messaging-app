import { Fragment, useState } from 'react';

import login from '../../actions/authActions';

import './Auth.scss';

const baseFormData = { firstName: '', secondName: '', email: '', password: '', repeatedPassword: '' }

const Auth = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(true);
    const [formData, setFormData] = useState(baseFormData);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        //Call history.push('/')
        login(formData)
        console.log(formData);
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    const handlePassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleIsRegister = () => setIsRegister((prevIsRegister) => !prevIsRegister);

    return (
        <Fragment>
            {isRegister ? <h1>Register/Sign Up</h1> : <h1>Login/Sign In</h1>}
            <form onSubmit={onSubmitHandler} className="go-bottom">
                {isRegister && (
                    <Fragment>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" name="firstName" onChange={handleChange} type="text" required />
                        </div>
                        <div>
                            <label htmlFor="secondName">Second Name:</label>
                            <input id="secondName" onChange={handleChange} type="text" name="secondName" required />
                        </div>
                    </Fragment>
                )}
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type={showPassword ? "text" : "password"} onChange={handleChange} required />
                    <input className="checkBox" type="checkbox" onClick={handlePassword} />
                </div>
                {isRegister && (
                    <Fragment>
                        <div>
                            <label htmlFor="secondName">Repeat Password</label>
                            <input id="repeatedPassword" onChange={handleChange} type={showPassword ? "text" : "password"} name="repeatedPassword" required />
                        </div>
                    </Fragment>
                )}
                <input type="submit" value="Submit"/>
            </form>
            <div onClick={handleIsRegister} className="isRegister">
                If you {isRegister ? 'already' : 'don\'t'} have an accout click here!
            </div>
        </Fragment>
    )
}

export default Auth;