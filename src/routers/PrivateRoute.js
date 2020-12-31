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
    const postId = props.computedMatch.params.id;

    let json = localStorage.getItem('post');
    let post = undefined;
    if(json) {
        post = JSON.parse(json);
    } else {
        post = state.postList.find((post) => post.id === postId);
        json = JSON.stringify(post);
        localStorage.setItem('post', json);
    }

    const isAuthor = post.postUid === state.auth.uid;
    return {
        isAuthenticated: !!state.auth.uid,
        isAuthor,
        postId
    };
};

export default connect(mapStateToProps)(PrivateRoute);