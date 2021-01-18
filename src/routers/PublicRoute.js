import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { history } from '../routers/AppRouter';

import Header from '../components/Header';

export const PublicRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        ( history.location.pathname === '/') ? 
            <Redirect to={'/dashboard'} />
        : 
        <div className='app__container'>
            <Header isAuthenticated={ isAuthenticated } />
            <Component {...props}/>
        </div>  
        
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);