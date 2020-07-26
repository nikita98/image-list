import React from 'react'
import { NavLink } from 'react-router-dom';
// import 

export const Navbar = () => (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>Images</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/Favorites">Favorites</NavLink>
            </li>
        </ul>
    </nav>
)

export default Navbar;