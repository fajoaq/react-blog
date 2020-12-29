import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({ 
    isAuthenticated,
    postId, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated? (
            <div>
                <Header isLogged={ true }/>
                <Component {...props}/>
            </div>    
        ) : (
            <div>
                <Redirect to={`/post/${postId}`} />
            </div>  
        )
    )}/>
);

const mapStateToProps = (state, props) => {
    return {
        isAuthenticated: !!state.auth.uid,
        postId: props.location.state.postId
    };
}

export default connect(mapStateToProps)(PrivateRoute);