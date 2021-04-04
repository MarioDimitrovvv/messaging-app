import { NavLink } from 'react-router-dom';

import { Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../../actions/authActions';
import { useUser } from '../../context/UserContext';
import { useId } from '../../context/IdContext';

import './Header.scss';

function Header() {

    const { user, setUser } = useUser();
    const { setId } = useId()

    const handleLogout = () => {
        logout();
        setUser(null);
        setId(null);
    }

    return (
        user
            ?
            // <Container >
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Messagin App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <LinkContainer to={{ pathname: "/messages/:id", state: 'id' }}>
                                <Nav.Link >Friends</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/users" exact activeClassName="used-link">
                                <Nav.Link>Users</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/about" activeClassName="used-link">
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            // <>
            //     <Nav justify variant="tabs" defaultActiveKey="/home">
            //         <Nav.Item>
            //             <Nav.Link href="/home">Active</Nav.Link>
            //         </Nav.Item>
            //         <Nav.Item>
            //             <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
            //         </Nav.Item>
            //         <Nav.Item>
            //             <Nav.Link eventKey="link-2">Link</Nav.Link>
            //         </Nav.Item>
            //     </Nav>
            // </>
            // </Container>
            : null
    );
}

export default Header;