import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import IdContext from '../../context/IdContext';
import UserContext from '../../context/UserContext';

import './Header.scss';

function Header() {

    const { user, setUser } = useContext(UserContext);
    const { setId } = useContext(IdContext);

    const handleLogout = () => {
        logout();
        setUser(null);
        setId(null);
    }

    return (
        <div className="header">
            <NavLink to="/" exact activeClassName="used-link" className="header-child">Home</NavLink>
            <NavLink to={{pathname: "/messages/:id", state: 'id'}} activeClassName="used-link" className="header-child">Friends</NavLink>
            <NavLink to="/users" exact activeClassName="used-link" className="header-child">Users</NavLink>
            <NavLink to="/about" activeClassName="used-link" className="header-child">About</NavLink>
            {user 
                ? <div onClick={handleLogout}>Logout</div>
                : <NavLink to="/auth" activeClassName="used-link" className="header-child">Login</NavLink>
                }
        </div>
    );
}

export default Header;