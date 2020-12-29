import database from '../firebase/firebase';

export const startAddPost = (postData = {}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
        postTitle = ''
        } = postData;
  
      const post = { postTitle };
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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
      return database.ref(`users/${uid}/posts/${id}`).once('value').then((ref) => {
        return ref.val();
      });
  };
};

