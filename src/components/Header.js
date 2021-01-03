import React from 'react';
import { Link } from 'react-router-dom';


import Login from './Login';
import Logout from './Logout';

export const Header = ({ isAuthenticated }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>React Blog</h1>
        </Link>
        { isAuthenticated ? 
          <Logout />
          :
          <Login />
        }
      </div>
    </div>
  </header>
);


export default Header;
