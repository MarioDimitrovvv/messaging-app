import { useEffect, useState } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { getFriends } from '../../actions/userActions';

import { useUser } from '../../context/UserContext';

const Profile = () => {
    const [friends, setFriends] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        getFriends()
            .then(data => {
                if (data.friends.length === 0) return setFriends([]);
                setFriends(data.friends)
            })
            .catch(err => console.error(err))

        return () => setFriends([]);
    }, [])

    return (
        <Jumbotron>
            <Container>
                <h1>{user}</h1>
                {/* <p>Email: {user.email}</p> */}
                <p>Friends: {friends.length}</p>

            </Container>
        </Jumbotron>
    )
}

export default Profile;