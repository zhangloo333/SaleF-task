import {FETCH_POSTS,FETCH_POST,DELETE_POST,DELETE_ALLPOST,EDIT_POST} from '../actions/index';
import _ from 'lodash';

const INITIAL_STATE ={all: [], post: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POST:
      console.log('this is from reducer');
      console.log(action.payload);
      return {...state, post:action.payload.data.post}
    case FETCH_POSTS:
      return {...state, all:action.payload.data.blog.posts};
    case DELETE_POST:
        return {...state, all:action.payload.data.blog.posts};
    case EDIT_POST:
        return {...state, all:action.payload.data.blog.posts};
    case DELETE_ALLPOST:
        return INITIAL_STATE;
    default:
      return state;
  }
}
