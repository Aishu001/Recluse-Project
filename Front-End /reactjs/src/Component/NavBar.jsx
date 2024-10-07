import React from 'react';
import '../Style/NavBar.css'
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">Your Logo</div>
      <ul className="menu">
        <li><Link to='/signUp'>Sign in</Link></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
