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

//START SET_POSTS
export const startSetPosts = () => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
       return database.ref(`users/`).once('value').then((snapshot) => {
        const userPosts = [];
        snapshot.forEach((user) => {
          user.forEach((post) => {
              userPosts.push({
                id: post.key,
                ...post.val()
            });
          });
        });
        dispatch(setPosts(userPosts));
      });
    };
  };
  
  // SET_POSTS
  export const setPosts = (userPosts) => ({
    type: 'SET_POSTS',
    userPosts
  });
  
  

