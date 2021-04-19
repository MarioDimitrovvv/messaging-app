import { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap"

import { editUser } from "../../../actions/authActions";

import { useId } from '../../../context/IdContext';
import { useUser } from "../../../context/UserContext";
import { useAlert } from "../../../context/AlertContext";

const ModalContainer = ({
    isModal,
    handleClose,
    user,
    email,
}) => {
    const { id, setId } = useId();
    const { setUser } = useUser();
    const { setAlert } = useAlert();

    const [firstName, secondName] = user.split(' ');

    const [formData, setFormData] = useState({ firstName, secondName, email })

    const editProfile = async (e) => {
        e.preventDefault();
        try {
            const token = await editUser({ ...formData, id });
    
            if (!token.message) {
                setUser('new');
                setId('new');
                setAlert({ text: 'Successful edited profile!', type: 'success' });
                handleClose();
            } else {
                setAlert({ text: token.message, type: 'danger' });
            }
        } catch (error) {
                setAlert({ text: error.message, type: 'danger' });
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Modal show={isModal} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered animation={false}>
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => editProfile(e)}>
                    <Form.Group>
                        <Form.Label column="lg">Full Name</Form.Label>
                        <Form.Row>
                            <Col>
                                <Form.Control name="firstName" type="text" onChange={handleChange} placeholder="First name" value={formData.firstName} required />
                            </Col>
                            <Col>
                                <Form.Control name="secondName" type="text" onChange={handleChange} placeholder="Second name" value={formData.secondName} required />
                            </Col>
                        </Form.Row>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label column="lg">Email</Form.Label>
                        <Form.Control name="email" type="email" onChange={handleChange} placeholder="Email" value={formData.email} required />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={(e) => editProfile(e)}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalContainer;