import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchPosts,deletePost,deleteAllPost} from '../actions/index';


class MainPage extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderHistory() {
      return this.props.posts.map((post) => {
        let date = post.timestamp.substring(8,10) + post.timestamp.substring(3,8) + post.timestamp.substring(23,29);
        return(
          <li className ='list-group-item' key={post.id}>
            <Link to={`/app/show/${post.id}`}>
              <span> {date} - </span>
              <strong>{post.title}</strong>
            </Link>
          </li>
        )
      });
  }

  renderContent() {
    return this.props.posts.map((post) => {
      let date = post.timestamp.substring(8,10) + post.timestamp.substring(3,8) + post.timestamp.substring(23,29);
      return(
        <li className ='list-group-item' key={`${post.id}1`}>
          <div className = 'row'>
            <h5>Post: {post.title} <span className='pull-right'>{date}</span></h5>
            <p>{post.text}</p>
          </div>
          <div className = "row">
            <div className = 'pull-right'>
              <Link to={`app/${post.id}`} className="btn btn-primary" >
                  Edit the post
              </Link>
              <button className="btn btn-danger "
                      onClick={this.onDeleteClick.bind(this,post.id)}>
                DELETE
              </button>
            </div>
          </div>
        </li>
      )
    });
  }

  onDeleteClick(id){
    this.props.deletePost(id, () => {
      this.props.history.push('/app');
    })
  }

  onDeleteAllClick(){
    this.props.deleteAllPost()
  };

  render() {
    return (
      <div className = 'row index'>
        <div className = 'col-sm-offset-1 col-md-3'>
              <div className = 'row'>
                <div className = 'col-md-9'>
                    <h4>Past Posts</h4>
                  <ul className='list-group'>
                   {this.renderHistory()}
                  </ul>
                  <Link to="/app/posts/new" className="btn btn-primary btn-sm" >
                      Add a post
                  </Link>
                  <button className="btn btn-danger btn-sm"
                          onClick={this.onDeleteAllClick.bind(this)}>
                    Delete All
                  </button>
                </div>
              </div>
        </div>

        <div className = 'col-md-7'>
            <h3>Bloger Pannel / All my Bloger</h3>
            <ul className='list-group posts'>
                {this.renderContent()}
            </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {posts: state.posts.all};
}

export default connect(mapStateToProps,{fetchPosts,deletePost,deleteAllPost})(MainPage);
