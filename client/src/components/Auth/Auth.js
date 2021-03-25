import { useState, useContext } from 'react';

import { login, register } from '../../actions/authActions';
import { getUser } from '../../actions/userActions';
import IdContext from '../../context/IdContext';
import UserContext from '../../context/UserContext';
// import UserContext from '../../context/UserContext';

import './Auth.scss';
import AuthForm from './AuthForm/AuthForm';

const baseFormData = { firstName: '', secondName: '', email: '', password: '', repeatedPassword: '' }

const Auth = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState(baseFormData);

    const { setUser } = useContext(UserContext);
    const { setId } = useContext(IdContext);

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

            if (!token.message) {
                const data = await getUser();
                setUser(data.name);
                setId(data._id);
                props.history.push('/users');
            } else {
                console.log(token.message);
            }
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
        <AuthForm
            onSubmitHandler={onSubmitHandler}
            handleChange={handleChange}
            handlePassword={handlePassword}
            handleIsRegister={handleIsRegister}
            showPassword={showPassword}
            isRegister={isRegister}
        />
    )
}

export default Auth;