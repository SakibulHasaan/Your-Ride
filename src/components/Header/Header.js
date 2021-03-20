import React, { useContext, useState } from 'react';
import './Header.css'
import {UserContext} from "../../App";
import { Link } from 'react-router-dom';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div>
            <nav>
                <input type="checkbox" id="check" />
                <label for="check" class="checkbtn">
                    <i class="fas fa-bars"></i>
                </label>
                <label class="logo">Your Ride</label>
                <ul>
                    <li><Link style={{ textDecoration: 'none' }} to="/">Home</Link></li>
                    <li><Link style={{ textDecoration: 'none' }} to="/destination">Destination</Link></li>
                    <li><Link style={{ textDecoration: 'none' }} to="/blog">Blog</Link></li>
                    <li><Link style={{ textDecoration: 'none' }} to="/contact">Contact</Link></li>
                    <li><Link style={{ textDecoration: 'none' }} className="btn btn-info" to="/login">{loggedInUser.name ? loggedInUser.name : 'Sign in'}</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;