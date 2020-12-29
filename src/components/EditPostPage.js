import React from 'react';
import { connect } from 'react-redux';
import { startRemovePost, getSinglePost } from '../actions/posts';

export class EditPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      post: {
        postTitle: ''
      }
    }
    console.log(this.state);
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.getSinglePost({id}).then((data) => {
      this.setState(() => ({
        post: data
      }));
    });
  };
  handleTitleChange = ({target}) => {
    this.setState(() => ({
      post: {
        postTitle: target.value
      }
    }));
  };
  handleDeletePost = () => {
    this.props.startRemovePost({id: this.props.post.id });
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <form>
          <label>
            Title
            <input type="text" name="test" onChange={ this.handleTitleChange } value={ this.state.post.postTitle } />
          </label>
        </form>

        <div>
          <button onClick={ this.handleDeletePost }>Delete Post</button>
        </div>
      </div>
    );
  };
};

/* const mapStateToProps = (state, props) => ({
  post: state.postList.find((post) => post.id === props.match.params.id)
}); */

const mapDispatchToProps = (dispatch) => ({
  getSinglePost: (id) => dispatch(getSinglePost(id)),
  startRemovePost: (id) => dispatch(startRemovePost(id))
});

export default connect(undefined, mapDispatchToProps)(EditPostPage);
