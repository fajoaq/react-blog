import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import moment from 'moment';

import { startSetSingleUser } from '../actions/users';
import { startAddPost } from '../actions/posts';
import { AiFillPlusCircle } from 'react-icons/ai';

export class AddPost extends React.Component {
    onAddPost = () => {
        let post = {};
        this.props.startSetSingleUser(this.props.userUid).then((user) => {
        post = {
                postTitle: "new post",
                postBody: "This is the post body",
                postAuthor: user.displayName,
                created: moment().valueOf()
            };
            console.log(post);
            
            this.props.startAddPost(post).then((ref) => {
                history.push({
                    pathname: `/edit/${ref.id}`, 
                    state: {uid: ref.postUid}
                });
            });
        });        
    };

    render() {
        return (
            <button className="button button--link button--add-post" onClick={ this.onAddPost }>
                <AiFillPlusCircle />
            </button>
        );
    };
}

const mapStateToProps = (state) => ({
    userUid: state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
    startSetSingleUser: (uid) => dispatch(startSetSingleUser(uid)),
    startAddPost: (post) => dispatch(startAddPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);