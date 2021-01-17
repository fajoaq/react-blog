import database, { firebase } from '../firebase/firebase';

export const startAddPost = (postData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const authorName = getState().auth.displayName;

    const {
      postTitle = '',
      postBody = '',
      created = '',
      authId = uid
      } = postData;

    let post = { postTitle, postBody, created, authId };
    
    return database.ref(`/user/${uid}`).update({displayName: authorName}).then(() => {
      return database.ref('/posts').push(post).then((ref) => {
        return database.ref(`/postRef/${uid}/${ref.key}`).update({isPublished: false}).then(() => {
          post = {
            ...post,
            postId: ref.key,
            authorName
          }
          dispatch(addDraft({
            ...post
          }));
          return {
            ...post
          };
        });
      });
    });
  };
};

//Add Draft
export const addDraft = (post) => ({
  type: 'ADD_DRAFT',
  post
});

//Add post
export const addPost = (post) => ({
    type: 'ADD_POST',
    post
});

//START REMOVE_EXPENSE
export const startRemovePost = ( {postId, authId} ) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if(authId === uid) {
      return database.ref(`/posts/${postId}`).remove().then(() => {
        return database.ref(`/postRef/${authId}/${postId}`).remove().then(() => {
          dispatch(removePost( postId ));
        })
      });
    } else {
      console.log('POST POSTUID DOES NOT MATCH UID');
    }
  };
};

// REMOVE_EXPENSE
export const removePost = ( postId = 0 ) => ({
  type: 'REMOVE_POST',
  postId
});

//START SET_POSTS
export const startSetPosts = (filters = {}) => {
  return (dispatch, getState) => {
    return database.ref('/user').once('value').then((users) => {
      return database.ref(`/postRef/`).once('value', (puRef) => {
        return database.ref(`/posts/`).orderByChild('authId').once('value', ((pRef) => {
          let authorList = [];
          let postList = [];
          let filteredList = [];
          let draftList = [];

          users.forEach((user) => {
            authorList.push({
              authId: user.key,
              authorName: user.val().displayName
            })
          });

          puRef.forEach((userPostsRef) => {
            userPostsRef.forEach((singleRef) => {
              const postCheck = authorList.find((a) => a.authId === userPostsRef.key);
              postList.push({
                authId: userPostsRef.key,
                postId: singleRef.key, 
                authorName: postCheck.authorName,
                isPublished: singleRef.val().isPublished
              });
            });
          });

          const uid = getState().auth.uid;
          pRef.forEach((post) => {
            const postCheck = postList.find((p) => p.postId === post.key);
            const postData = {
              ...post.val(),
              authorName: postCheck.authorName,
              postId: postCheck.postId,
              isPublished: postCheck.isPublished
            }
            if(postCheck.isPublished) {
              filteredList.push({...postData});
            } else if(postCheck.authId === uid) {
              draftList.push({...postData})
            }
          });
          dispatch(setDrafts(draftList, filters));
          dispatch(setPosts(filteredList, filters));
        }));
      });
    });
  };
};
  
// SET_POSTS
export const setPosts = (posts, filters) => ({
  type: 'SET_POSTS',
  posts,
  filters
});
// SET_DRAFTS
export const setDrafts = (posts, filters) => ({
  type: 'SET_DRAFTS',
  posts,
  filters
});
//START UPDATE_POST
export const startUpdatePost = (post) => {
  const updates = {
    authId: post.authId,
    created: post.created,
    postBody: post.postBody,
    postTitle: post.postTitle
  }
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if(post.authId === uid) {
      return database.ref(`/posts/${post.postId}`).update({...updates}).then(() => {
        return database.ref(`/postRef/${uid}/${post.postId}`).update({isPublished: true}).then(() => {
          dispatch(updatePost(post));
        })
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

//RESET 
export const reset = () => ({
  type: 'RESET'
})