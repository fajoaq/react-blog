import React from 'react';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

export const Login = (props) => (
    <div className="login__container">
        <div className="button-group">
            <button className="button button--link" onClick={ props.startLogout }>Log out</button>
        </div>  
    </div>
);


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Login);