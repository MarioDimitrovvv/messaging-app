import { Fragment, useState } from 'react';

import { login, register } from '../../actions/authActions';

import { useAlert } from '../../context/AlertContext';
import { useId } from '../../context/IdContext';
import { useUser } from '../../context/UserContext';
import { validateInputs } from '../../helpers/validateInputs';

import AuthForm from './AuthForm/AuthForm';

const baseFormData = { firstName: '', secondName: '', email: '', password: '', repeatedPassword: '' }

const Auth = (props) => {
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(baseFormData);

    const { setUser } = useUser();
    const { setId } = useId();
    const { setAlert } = useAlert();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const isInvalid = validateInputs(formData, isRegister);
        if (isInvalid) {
            setAlert({ text: isInvalid, type: 'danger' });
            return;
        }
        try {
            let token = null;
            if (isRegister) {
                token = await register(formData);
            } else {
                token = await login(formData);
            }

            if (!token.message) {
                setUser('trigger');
                setId('trigger');
                setAlert({ text: 'Successfully logged in!', type: 'success' });
                props.history.push('/users');
            } else {
                setAlert({ text: token.message, type: 'danger' });
            }
        } catch (error) {
            setAlert({ text: error.message, type: 'danger' })
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
            <AuthForm
                onSubmitHandler={onSubmitHandler}
                handleChange={handleChange}
                handlePassword={handlePassword}
                handleIsRegister={handleIsRegister}
                showPassword={showPassword}
                isRegister={isRegister}
            />
        </Fragment>
    )
}

export default Auth;