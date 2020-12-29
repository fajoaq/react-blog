import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({ 
    isAuthenticated,
    computedMatch,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated? (
            <div>
                <Header isAuthenticated={ isAuthenticated }/>
                <Component {...props}/>
            </div>    
        ) : (
            <div>
                <Redirect to={`/post/${computedMatch.params.id}`} />
            </div>  
        )
    )}/>
);

const mapStateToProps = (state, props) => {
    return {
        isAuthenticated: !!state.auth.uid
    };
}

export default connect(mapStateToProps)(PrivateRoute);