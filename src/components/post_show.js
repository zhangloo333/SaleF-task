import React, {Component} from 'react';
import {fetchPost,deletePost} from '../actions/index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class PostShow extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick(id){
    this.props.deletePost(id, () => {
      this.props.history.push('/app');
    })
  }

  render() {
    const { post }  = this.props;

    if(!post) {
      return <div>We try to loade data !!</div>;
    } else{
      let date = post.timestamp.substring(8,10) + post.timestamp.substring(3,8) + post.timestamp.substring(23,29);
      return(
        <div className ='fill'>

          <div className = 'row'>
            <div className = 'col-md-8 col-md-offset-2'>
              <div className = 'row'>
                <Link to={`/app`} className="btn btn-warning btn-sm pull-right">
                    Back to Index
                </Link>
              </div>
              <div className = 'row'>
                <h5>Post: {post.title} <span className='pull-right'>{date}</span></h5>
                <p>{post.text}</p>
                <p>ID: {post.id}</p>
              </div>
              <div className = "button">
                <Link to={`/app/${post.id}`} className="btn btn-primary btn-sm">
                    Edit the post
                </Link>
                <button className="btn btn-danger btn-sm"
                        onClick={this.onDeleteClick.bind(this,post.id)}>
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
     )
    }
  }
}

function mapStateToProps(state) {
  return {post: state.posts.post};
}

export default connect(mapStateToProps, { fetchPost, deletePost})(PostShow);
