import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AddPost from './AddPost';
import { startLogin, startLogout } from '../actions/auth';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'; 

export const Header = ({ startLogin, startLogout, isAuthenticated }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>React Blog</h1>
        </Link>
        { isAuthenticated ? 
          <div className="login__container">
            <div className="button-group">
              <AddPost />
              <button className="button button--link" onClick={ startLogout }>Log out</button>
            </div>  
          </div>
          : 
          <div className="login__container">
            <div className="button-group">
              <button id="googleLogin" className="button button--login" onClick={ startLogin }>
                  <FcGoogle />
              </button>
              <button id="gitHubLogin" className="button button--login" onClick={ startLogin }>
                  <AiFillGithub />
              </button>
            </div>  
          </div>
        }
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startLogin: (e) => dispatch(startLogin(e))
});

export default connect(undefined, mapDispatchToProps)(Header);
