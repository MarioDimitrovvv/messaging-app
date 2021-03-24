import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import UserContext from '../../context/UserContext';

import './Header.scss';

function Header() {

    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        setUser(null);
    }
    
    return (
        <div className="header">
            <NavLink to="/" activeClassName="used-link" exact className="header-child">Home</NavLink>
            <NavLink to="/contacts" activeClassName="used-link" className="header-child">Contact</NavLink>
            <NavLink to="/users" activeClassName="used-link" className="header-child">Users</NavLink>
            <NavLink to="/about" activeClassName="used-link" className="header-child">About</NavLink>
            {user 
                ? <div onClick={handleLogout}>Logout</div>
                : <NavLink to="/auth" activeClassName="used-link" className="header-child">Login</NavLink>
                }
        </div>
    );
}

export default Header;