import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../../actions/authActions';
import { useUser } from '../../context/UserContext';
import { useId } from '../../context/IdContext';

import './Header.css';

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
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" >
                <Navbar.Brand className="logo">Messagin App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
                <Navbar.Collapse id="responsive-navbar-nav" className="header">
                    <Nav className="mr-auto">
                        <Nav.Item className="navigation">
                            <LinkContainer to={{ pathname: "/messages/:id", state: 'id' }}>
                                <Nav.Link >Friends</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
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
            : null
    );
}

export default Header;