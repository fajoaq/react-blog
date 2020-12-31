import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({ 
    isAuthenticated,
    isAuthor,
    postId,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        (isAuthenticated && isAuthor) ? (
            <div>
                <Header isAuthenticated={ isAuthenticated }/>
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
    const postId = props.computedMatch.params.id
    const postUid = props.location.state.uid;
    const isAuthor = postUid === state.auth.uid;

    return {
        isAuthenticated: !!state.auth.uid,
        isAuthor,
        postId
    };
};

export default connect(mapStateToProps)(PrivateRoute);