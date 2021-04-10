import { Jumbotron, Container } from 'react-bootstrap';

import {useUser} from '../../context/UserContext';

const Profile = () => {
    const {userInfo} = useUser();
    const { email, name, friends } = userInfo;

    return (
        <Jumbotron>
            <Container>
                <h1>{name}</h1>
                <p>Email: {email}</p>
                <p>Friends: {friends.length}</p>
                
            </Container>
        </Jumbotron>
    )
}

export default Profile;