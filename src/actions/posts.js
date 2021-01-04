import database from '../firebase/firebase';

export const startAddPost = (postData = {}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const userName = getState().auth.displayName
      const {
        postTitle = '',
        postBody = '',
        created = '',
        postAuthor = userName,
        postUid = uid
        } = postData;
  
      const post = { postTitle, postBody, created, postAuthor, postUid };
      return database.ref(`/posts`).push(post).then((ref) => {
        dispatch(addPost({
          id: ref.key,
          ...post
        }));
        return {
          id: ref.key, 
          postUid: post.postUid
        };
      });
    };
  };

export const addPost = (post) => ({
    type: 'ADD_POST',
    post
});

//START REMOVE_EXPENSE
export const startRemovePost = ( {id, postUid} ) => {
  console.log(id, postUid);
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log(uid, postUid);
    if(postUid === uid) {
      return database.ref(`/posts/${id}`).remove().then(() => {
        dispatch(removePost( id ));
      });
    } else {
      console.log('POST POSTUID DOES NOT MATCH UID');
    }
  };
};

// REMOVE_EXPENSE
export const removePost = ( id = 0 ) => ({
  type: 'REMOVE_POST',
  id
});

//START SET_POSTS
export const startSetPosts = (filters) => {
  console.log('startSetPosts');
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
      return database.ref(`/posts`).once('value').then((snapshot) => {
      const userPosts = [];
      console.log(snapshot.val());
      snapshot.forEach((post) => {
        userPosts.push({
          id: post.key,
          ...post.val()
        });
      });
      dispatch(setPosts(userPosts, filters));
    });
  };
};
  
// SET_POSTS
export const setPosts = (posts, filters) => ({
  type: 'SET_POSTS',
  posts,
  filters
});

// GET_SINGLE_POST
export const startSetSinglePost = (uid, id) => {
  return (dispatch) => {
      if(!!uid) {
        return database.ref(`/posts/${id}`).once('value').then((ref) => {
          const post = {
            id: ref.key,
            ...ref.val()
          };
          dispatch(setSinglePost(post));
       });
      } else {
        return database.ref(`/posts/${id}`).once('value').then((ref) => {
          const post = {
            id: ref.key,
            ...ref.val()
          };
          dispatch(setSinglePost(post));
       });
      }
  };
}

// SET_POSTS
export const setSinglePost = (post) => ({
  type: 'SET_SINGLE_POST',
  post
});

//START UPDATE_POST
export const startUpdatePost = (post) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if(post.postUid === uid) {
      return database.ref(`/posts/${post.id}`).update({...post}).then(() => {
        dispatch(updatePost(post));
      });
    } else {
      console.log('POST POSTUID DOES NOT MATCH UID');
    }
  };
};
  
// SET_POSTS
export const updatePost = (post) => ({
  type: 'UPDATE_POST',
  post
});