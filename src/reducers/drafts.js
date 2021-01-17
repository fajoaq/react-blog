export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_DRAFT':
            return [
                ...state,
                action.post
            ];
        case 'SET_DRAFTS':
            return action.posts;
        case 'REMOVE_DRAFT':
            const draft = state.find((draft) => draft.postId === action.postId);
            if(draft) {
                return state.filter((draft) => {
                    return draft.postId !== action.postId;
                });
            } else return state;
        case 'RESET':
            return [];
        default:
            return state;
    };
};