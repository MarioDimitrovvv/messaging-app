import { Fragment } from "react"
import { Button, Col, Container, Form, FormControl, InputGroup } from 'react-bootstrap'

import './AuthForm.css'

const AuthForm = ({
    onSubmitHandler,
    handleChange,
    handlePassword,
    handleIsRegister,
    showPassword,
    isRegister
}) => {
    return (
        <Container className="auth-container">
            {isRegister ? <h1>Register/Sign Up</h1> : <h1>Login/Sign In</h1>}
            <Form onSubmit={(e) => onSubmitHandler(e)} className='auth-form'>
                {isRegister && (
                    <Form.Group>
                        <Form.Label column="lg">Full Name</Form.Label>
                        <Form.Row>
                            <Col>
                                <Form.Control name="firstName" onChange={handleChange} type="text" placeholder="First name" required />
                            </Col>
                            <Col>
                                <Form.Control name="secondName" onChange={handleChange} type="text"placeholder="Second name" required />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                )}
                <Form.Group controlId="formGroupEmail">
                    <Form.Label column="lg">Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter email" required />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label column="lg">Password</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl type={showPassword ? "text" : "password"} name="password" onChange={handleChange} required placeholder="Password" />
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" onClick={handlePassword} />
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form.Group>
                {isRegister && (
                    <Fragment>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label column="lg">Confirm Password</Form.Label>
                            <Form.Control type={showPassword ? "text" : "password"} name="repeatPassword" onChange={handleChange} required placeholder="Repeated Password" />
                        </Form.Group>
                    </Fragment>
                )}
                <Button as="input" variant="outline-dark" type="submit" value="Submit" />
            </Form>
            <div onClick={handleIsRegister} className="isRegister">
                If you {isRegister ? 'already' : 'don\'t'} have an accout click here!
            </div>
        </Container>
    )
}

export default AuthForm;