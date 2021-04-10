import { Fragment, useEffect, useState } from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import { getFriends } from '../../actions/userActions';

import { useUser } from '../../context/UserContext';
import ModalContainer from './ModalContainer/ModalContainer';

const Profile = () => {
    const [friends, setFriends] = useState([]);
    const [isModal, setIsModal] = useState(false);

    const { user, email } = useUser();
    const handleClose = () => setIsModal(false);
    const handleShow = () => setIsModal(true);
    
    useEffect(() => {
        getFriends()
            .then(data => {
                if (data.friends.length === 0) return setFriends([]);
                setFriends(data.friends)
            })
            .catch(err => console.error(err))

        return () => setFriends([]);
    }, [isModal, setIsModal])

    return (
        <Jumbotron>
            {isModal ?
                <ModalContainer 
                    isModal={isModal}
                    handleClose={handleClose}
                    user={user}
                    email={email}
                />
                :
                <Fragment>
                    <div className="d-flex align-items-end flex-column bd-highlight mb-3">
                        <Button className="p-1 bd-highlight" onClick={handleShow}>Edit Profile</Button>
                    </div>
                    <Container>
                        <h1>{user}</h1>
                        <p>Email: {email}</p>
                        <p>Friends: {friends.length}</p>

                    </Container>
                </Fragment>
            }
        </Jumbotron>
    )
}

export default Profile;