import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost,fetchPost,deletePost} from '../actions/index';
import {Link} from 'react-router';


class EditPosts extends Component {
  static contextTypes = {
      router: PropTypes.object
  }
  componentWillMount(){
    this.props.fetchPost(this.props.params.id);
  }

  render() {
    const {fields:{title,text}, post} = this.props;

    console.log(this.props.post);
    if(!this.props.post) {
      return <div>Loading....</div>
    }

    return(
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <form>
              <input type="text" className="form-control" value={post.title} {...title}/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  if(!values.title) {
    errors.title = 'Enter a username';
  }
  if(!values.text) {
    errors.text = 'Enter a text';
  }
  return errors;
}

function mapStateToProps(state) {
  return {post: state.posts.post};
}

export default reduxForm({
    form: 'EditForm',
    fields:['title','text'],
    validate
},mapStateToProps,{createPost,fetchPost,deletePost})(EditPosts);
