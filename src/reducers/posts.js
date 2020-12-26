
export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_POST':
            return [
                ...state,
                action.post
            ];
        case 'REMOVE_POST':
            return state.filter((post) => {
                return post.id === action.post.id;
            });
        case 'SET_POSTS':
            return action.userPosts;
        default:
            return state;
    };
};