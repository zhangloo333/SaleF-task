import React, {Component,PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import { createPost } from '../actions/index';
import {Link} from 'react-router';


class PostsShow extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

  onSubmit(props) {
    console.log(props);
    this.props.createPost(props)
    .then(() => {
        this.context.router.push('/app');
    });
  }

  render() {
    const {fields:{title,text}, handleSubmit} = this.props;
    return(
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <h3>Create A New Post</h3>

              <div className = { `form-group ${title.touched && title.invalid? 'has-danger' : ''}`}>
                  <label>Title</label>
                  <input type="text" className="form-control" placeholder = { title.touched ? title.error : ""} {...title}/>
                  <div className="text-help">
                    { title.touched ? title.error : ""}
                  </div>
              </div>

              <div className = {`form-group ${text.touched && text.invalid? 'has-danger' : ''}`}>
                  <label>Content</label>
                  <textarea rows="10" type="text" className="form-control"
                  placeholder = { text.touched ? text.error : ""}
                  {...text}/>
             </div>

             <button type ="submit" className="btn btn-primary">Submit</button>
             <Link to ="/app" className="btn btn-danger">Cancel</Link>

            </form>
          </div>
        </div>
      </div>
  )}
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

export default reduxForm({
    form: 'PostsNewForm',
    fields:['title','text'],
    validate
},null,{createPost})(PostsShow);
