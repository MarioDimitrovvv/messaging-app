import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../../actions/authActions';
import { useUser } from '../../context/UserContext';
import { useId } from '../../context/IdContext';
import { useAlert } from '../../context/AlertContext';

import './Header.css';
import { Fragment } from 'react';

function Header() {

    const { user, setUser } = useUser();
    const { setId } = useId()
    const { setAlert } = useAlert();

    const handleLogout = () => {
        logout();
        setAlert({ text: 'Successfully logged out!', type: 'success' })
        setUser(null);
        setId(null);
    }

    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" >
            <Navbar.Brand className="logo">Messaging App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="header">
                <Nav className="mr-auto">
                    {user &&
                        <Fragment>
                            <Nav.Item className="navigation">
                                <LinkContainer to={{ pathname: "/messages/:id", state: 'id' }}>
                                    <Nav.Link >Friends</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item className="navigation">
                                <LinkContainer to="/profile" exact activeClassName="used-link">
                                    <Nav.Link>Profile</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Fragment>}
                    <Nav.Item className="navigation">
                        <LinkContainer to="/users" exact activeClassName="used-link">
                            <Nav.Link>Users</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>

                    <Nav.Item className="navigation">
                        <LinkContainer to="/about" activeClassName="used-link">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item>
                        {user
                            ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            :
                            <LinkContainer to="/auth" activeClassName="used-link">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>}
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;