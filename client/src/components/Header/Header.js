import { NavLink } from 'react-router-dom';
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
        <div className="header">
            <NavLink to="/" exact activeClassName="used-link" className="header-child">Home</NavLink>
            <NavLink to={{ pathname: "/messages/:id", state: 'id' }} activeClassName="used-link" className="header-child">Friends</NavLink>
            <NavLink to="/users" exact activeClassName="used-link" className="header-child">Users</NavLink>
            <NavLink to="/about" activeClassName="used-link" className="header-child">About</NavLink>
            {user
                ? <button onClick={handleLogout}>Logout</button>
                : <NavLink to="/auth" activeClassName="used-link" className="header-child">Login</NavLink>
            }
        </div>
    );
}

export default Header;