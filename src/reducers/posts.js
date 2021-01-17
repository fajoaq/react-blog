export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_POST':
            return [
                ...state,
                action.post
            ];
        case 'REMOVE_POST':
            const post = state.find((post) => post.postId === action.postId);
            if(post) {
                return state.filter((post) => {
                    return post.postId !== action.postId;
                });
            } else return state;
        case 'SET_POSTS':
            return action.posts;
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