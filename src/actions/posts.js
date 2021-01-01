import database from '../firebase/firebase';

export const startAddPost = (postData = {}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const userName = getState().auth.displayName
      const {
        postTitle = '',
        postBody = '',
        postAuthor = userName,
        postUid = uid
        } = postData;
  
      const post = { postTitle, postBody, postAuthor, postUid };
      return database.ref(`users/${uid}/posts`).push(post).then((ref) => {
        dispatch(addPost({
          id: ref.key,
          ...post
        }));
      });
    };
  };

export const addPost = (post) => ({
    type: 'ADD_POST',
    post
});

//START REMOVE_EXPENSE
export const startRemovePost = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/posts/${id}`).remove().then(() => {
      dispatch(removePost({ id }));
    });
  };
};

// REMOVE_EXPENSE
export const removePost = ({ id } = {}) => ({
  type: 'REMOVE_POST',
  id
});

//START SET_POSTS
export const startSetPosts = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
      return database.ref(`users/`).once('value').then((snapshot) => {
      const userPosts = [];
      snapshot.forEach((user) => {
        user.forEach((posts) => {
          posts.forEach((post) => {
              userPosts.push({
                id: post.key,
                ...post.val()
            });
          });
        });
      });
      dispatch(setPosts(userPosts));
    });
  };
};
  
// SET_POSTS
export const setPosts = (posts) => ({
  type: 'SET_POSTS',
  posts
});

// GET_SINGLE_POSTS
export const getSinglePost = ({id}) => {
  return (getState) => {
    const uid = getState().auth.uid;
      return database.ref(`users/${uid}/posts/${id}`).once('value').then((ref) => {
        return {
          id: ref.key,
          ...ref.val()
        };
      });
  };
};

//START UPDATE_POST
export const startUpdatePost = (post) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
      return database.ref(`users/${uid}/posts/${post.id}`).update({...post}).then(() => {
      dispatch(updatePost(post));
    });
  };
};
  
// SET_POSTS
export const updatePost = (post) => ({
  type: 'UPDATE_POST',
  post
});