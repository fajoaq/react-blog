import postsSelector from '../selectors/posts';

export default (state = [], action) => {
    /* console.log(action.type); */
    switch(action.type) {
        case 'ADD_DRAFT':
            return [
                ...state,
                action.post
            ];
        case 'SET_DRAFTS':
            return postsSelector(action.posts, action.filters)
        case 'RESET':
            return [];
        default:
            return state;
    };
};