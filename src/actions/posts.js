import database from '../firebase/firebase';

import postsSelector from '../selectors/posts';

//START_ADD_POST
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

//START REMOVE_EXPENSE
export const startRemovePost = ( {postId, authId} ) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if(authId === uid) {
      return database.ref(`/posts/${postId}`).remove().then(() => {
        return database.ref(`/postRef/${authId}/${postId}`).remove().then(() => {
          dispatch(removePost( postId ));
          dispatch(removeDraft( postId ));
        })
      });
    } else {
      console.log('POST POSTUID DOES NOT MATCH UID');
    }
  };
};

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
          dispatch(setDrafts(draftList));
          dispatch(setPosts(filteredList));
        }));
      });
    });
  };
};
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
          dispatch(removeDraft(post.postId));
        })
      });
    } else {
      console.log('POST POSTUID DOES NOT MATCH UID');
    }
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
// SET_POSTS
export const setPosts = (posts) => ({
  type: 'SET_POSTS',
  posts
});
// SET_DRAFTS
export const setDrafts = (posts) => ({
  type: 'SET_DRAFTS',
  posts
});
//SET VISIBLE POST
export const setVisiblePosts = (posts, filters) => {
  return postsSelector(posts, filters);
};
// UPDATE_POST
export const updatePost = (post) => ({
  type: 'UPDATE_POST',
  post
});
// REMOVE_EXPENSE
export const removePost = ( postId = 0 ) => ({
  type: 'REMOVE_POST',
  postId
});
// REMOVE_DRAFT
export const removeDraft = ( postId = 0 ) => ({
  type: 'REMOVE_DRAFT',
  postId
});

//RESET - in case store persistance goes awry
export const reset = () => ({
  type: 'RESET'
})