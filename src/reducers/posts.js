
import { act } from 'react-test-renderer';
import postsSelector from '../selectors/posts';

export default (state = [], action) => {
    /* console.log(action.type); */
    switch(action.type) {
        case 'ADD_POST':
            return [
                ...state,
                action.post
            ];
        case 'REMOVE_POST':
            return state.filter((post) => {
                return post.postId !== action.id;
            });
        case 'SET_POSTS':
 
            return postsSelector(action.posts, action.filters)
        case 'SET_SINGLE_POST':
            return [ 
                action.post
            ];
        case 'UPDATE_POST':
            const updateList = state.filter((post) => post.postId !== action.post.postId );
            return [
                ...updateList,
                action.post
            ];
        case 'RESET':
            return [];
        default:
            return state;
    };
};