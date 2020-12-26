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