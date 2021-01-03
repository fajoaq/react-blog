import React from 'react';
import { connect } from 'react-redux';

import { startLogin, startLogout } from '../actions/auth';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

export const Login = (props) => (
    <div className="login__container">
        <div className="button-group">
        <button id="googleLogin" className="button button--login" onClick={ props.startLogin }>
            <FcGoogle />
        </button>
        <button id="gitHubLogin" className="button button--login" onClick={ props.startLogin }>
            <AiFillGithub />
        </button>
        </div>  
    </div>
);


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startLogin: (e) => dispatch(startLogin(e))
});

export default connect(undefined, mapDispatchToProps)(Login);