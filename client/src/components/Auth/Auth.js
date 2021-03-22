import { Fragment, useState, useContext } from 'react';

import { login, register } from '../../actions/authActions';
import UserContext from '../../context/UserContext';

import './Auth.scss';

const baseFormData = { firstName: '', secondName: '', email: '', password: '', repeatedPassword: '' }

const Auth = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState(baseFormData);

    const { user, setUser } = useContext(UserContext);


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // Validate Inputs and send notification msg!!!
        try {
            let token = null;
            if (isRegister) {
                token = await register(formData);
            } else {
                token = await login(formData);
            }

            setUser(token);

            props.history.push('/');
        } catch (error) {
            //Send notification msg
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handlePassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleIsRegister = () => {
        setIsRegister((prevIsRegister) => !prevIsRegister);
        setFormData(baseFormData);
    };

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
                            <input id="repeatedPassword" onChange={handleChange} type={showPassword ? "text" : "password"} name="repeatPassword" required />
                        </div>
                    </Fragment>
                )}
                <input type="submit" value="Submit" />
            </form>
            <div onClick={handleIsRegister} className="isRegister">
                If you {isRegister ? 'already' : 'don\'t'} have an accout click here!
            </div>
        </Fragment>
    )
}

export default Auth;