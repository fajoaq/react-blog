import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getSinglePost } from '../actions/posts';
import Header from '../components/Header';

export const PrivateRoute = ({ 
    post,
    isAuthenticated,
    isAuthor,
    postId,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        (isAuthenticated && isAuthor) ? (
            <div>
                <Header isAuthenticated={ isAuthenticated } isAuthor={ isAuthor } />
                <Component {...props} post={post}/>
            </div>    
        ) : (
            <div>
                <Redirect to={`/post/${postId}`} post={post}/>
            </div>  
        )
    )}/>
);

const mapStateToProps = (state, props) => {
/*     console.log('private', state, props); */
    let post = state.draftList.find((draft) => draft.postId === props.computedMatch.params.id);
    if(!post) {
        post = state.postList.find((post) => post.postId === props.computedMatch.params.id);
    }
    if(post) {
        return { 
            post,
            postId: post.postId,
            isAuthenticated: !!state.auth.uid,
            isAuthor: post.authId === state.auth.uid
        }
    } else {
        return {
            postId: props.computedMatch.params.id,
            isAuthenticated: !!state.auth.id,
            isAuthor: state.auth.id === props.location.state.uid
        }
    }
/*     console.log(props.location.state);
    const postId = props.computedMatch.params.id
    let postUid = '';
    let isValidId = false;
    let isAuthor = false;

    if(props.location.state) {
        postUid = props.location.state.uid;
        isAuthor = postUid === state.auth.uid;
        isValidId = true;
    } */
    /* console.log(postUid, isValidId, isAuthor); */
    /* console.log('PRIVATEROUTE', props, state); */
/*     return {
        isAuthenticated: !!state.auth.uid,
        isValidId,
        isAuthor,
        postId
    }; */
    return {
        
    }
};

export default connect(mapStateToProps)(PrivateRoute);