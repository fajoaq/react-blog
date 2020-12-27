
export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_POST':
            console.log(action.post);
            return [
                ...state,
                action.post
            ];
        case 'REMOVE_POST':
            return state.filter((post) => {
                return post.id === action.post.id;
            });
        case 'SET_POSTS':
            return action.posts;
        default:
            return state;
    };
};