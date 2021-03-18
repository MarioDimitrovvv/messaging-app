import { Fragment, useState } from 'react';

import './Auth.scss';

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);

    const isSignup = true;

    const onSubmitHandler = () => {

    }
    const handlePassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    return (
        <Fragment>
            {isSignup ? <h1>Register/Sign Up</h1> : <h1>Login/Sign In</h1>}
            <form onSubmit={onSubmitHandler} className="go-bottom">
                {isSignup && (
                    <Fragment>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" name="firstName" type="text" required />
                        </div>
                        <div>
                            <label htmlFor="secondName">Second Name:</label>
                            <input id="secondName" type="text" name="secondName" required />
                        </div>
                    </Fragment>
                )}
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type={showPassword ? "text" : "password"} required />
                    <input id="checkBox" type="checkbox" onClick={handlePassword} />
                </div>
            </form>
        </Fragment>
    )
}

export default Auth;