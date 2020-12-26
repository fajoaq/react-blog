import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'; 

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Boilerplate</h1>
            <p>Subtitle.</p>
            <div className="button-group">
                <button id="googleLogin" className="button button--login" onClick={ startLogin }>
                    <FcGoogle />
                </button>
                <button id="gitHubLogin" className="button button--login" onClick={ startLogin }>
                    <AiFillGithub />
                </button>
            </div>
        </div>
        
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: (e) => dispatch(startLogin(e))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);