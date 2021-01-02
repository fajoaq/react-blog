import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getSinglePost } from '../actions/posts';
import Header from '../components/Header';

export const PrivateRoute = ({ 
    isAuthenticated,
    isValidId,
    isAuthor,
    postId,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        (isValidId && isAuthenticated && isAuthor) ? (
            <div>
                <Header isAuthenticated={ isAuthenticated } />
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
    /* console.log(props, state) */
    /* console.log('here'); */
    const postId = props.computedMatch.params.id
    let postUid = '';
    let isValidId = false;
    let isAuthor = false;

    if(props.location.state) {
        postUid = props.location.state.uid;
        isAuthor = postUid === state.auth.uid;
        isValidId = true;
    }

    return {
        isAuthenticated: !!state.auth.uid,
        isValidId,
        isAuthor,
        postId
    };
};

export default connect(mapStateToProps)(PrivateRoute);