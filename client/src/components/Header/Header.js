import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../context/UserContext';

import './Header.scss';

function Header() {

    const {user ,setUser} = useContext(UserContext);
    
    return (
        <div className="header">
            <NavLink to="/" activeClassName="used-link" exact className="header-child">Home</NavLink>
            <NavLink to="/contacts" activeClassName="used-link" className="header-child">Contact</NavLink>
            <NavLink to="/about" activeClassName="used-link" className="header-child">About</NavLink>
            <NavLink to="/auth" activeClassName="used-link" className="header-child">{user ? <div>Logout</div> : <div>Login</div>}</NavLink>
        </div>
    );
}

export default Header;