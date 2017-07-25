import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost,fetchPosts,fetchPost,deletePost,editPost} from '../actions/index';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';


class EditPosts extends Component {
  static contextTypes = {
      router: PropTypes.object
  }
  componentWillMount(){
    this.props.fetchPost(this.props.params.id);
  }

  onSubmit(props,id) {
      this.props.editPost(props,this.props.post.id).then(()=>{
        this.context.router.push('/app');
      })
  }


  render() {
    const {fields:{title,text}, post,handleSubmit} = this.props;

    console.log('this from render');
    console.log(this.props.post);
    if(!this.props.post) {
      return <div>Loading....</div>
    }

    return(
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Edit for this post</h3>
                <div>
                      <label>Title</label>
                      <input type="text" className="form-control" value={post.title} {...title}/>
                      <div className="text-help">
                          { title.touched ? title.error : ""}
                      </div>
                </div>

                <div className = {`form-group ${text.touched && text.invalid? 'has-danger' : ''}`}>
                      <label>Content</label>
                      <textarea rows="10" type="text" value={post.text}className="form-control"
                      placeholder = { text.touched ? text.error : ""}
                      {...text}/>
                </div>

                <button type ="submit" className="btn btn-primary">Submit</button>
                <Link to ="/app" className="btn btn-danger">Cancel</Link>
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
},mapStateToProps,{createPost,fetchPosts,fetchPost,deletePost,editPost})(EditPosts);
