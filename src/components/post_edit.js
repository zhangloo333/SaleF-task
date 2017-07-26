import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {fetchPost,editPost} from '../actions/index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class EditPosts extends Component {

  componentDidMount(){
      const {id} = this.props.match.params;
      this.props.fetchPost(id);
  }

  onSubmit(props,id) {
      this.props.editPost(props,this.props.post.id).then(()=>{
        this.context.router.push('/app');
      })
  }

  render() {
    const {fields:{title,text}, post,handleSubmit} = this.props;
    const className = `form-group ${text.touched && text.invalid? 'has-danger' : ''}`;
    if(!this.props.post) {
      return <div>Loading....</div>
    }

    return(
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Edit for this post</h3>
                <div className ={className}>
                      <label>Title</label>
                      <input type="text" className="form-control" value={post.title} {...title}/>
                      <div className="text-help">
                          { title.touched ? title.error : ""}
                      </div>
                </div>

                <div className = {className}>
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
})(connect(mapStateToProps,{fetchPost,editPost})(EditPosts));
