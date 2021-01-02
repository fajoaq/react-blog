import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import moment from 'moment';

import { startAddPost } from '../actions/posts';
import { AiFillPlusCircle } from 'react-icons/ai';

export class AddPost extends React.Component {
    onAddPost = () => {
        const post = {
            postTitle: "new post",
            postBody: "This is the post body",
            created: moment().valueOf()
        };
    
        this.props.startAddPost(post).then((ref) => {
            console.log(ref);
            history.push({
                pathname: `/edit/${ref.id}`, 
                state: {uid: ref.postUid}
            });
        });
        
    };

    render() {
        return (
            <div className="content-container">
                <button onClick={ this.onAddPost }><AiFillPlusCircle /></button>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => ({
    startAddPost: (post) => dispatch(startAddPost(post))
})

export default connect(undefined, mapDispatchToProps)(AddPost);