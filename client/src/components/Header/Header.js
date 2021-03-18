import { NavLink } from 'react-router-dom';

import './Header.scss';

function Header() {

    return (
        <div className="header">
            <NavLink to="/" activeClassName="used-link" exact className="header-child">Home</NavLink>
            <NavLink to="/contacts" activeClassName="used-link" className="header-child">Contact</NavLink>
            <NavLink to="/about" activeClassName="used-link" className="header-child">About</NavLink>
            <NavLink to="/auth" activeClassName="used-link" className="header-child">Sign In</NavLink>
        </div>
    );
}

export default Header;