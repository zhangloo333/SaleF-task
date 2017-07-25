import {FETCH_POSTS,FETCH_POST,DELETE_POST,DELETE_ALLPOST,EDIT_POST} from '../actions/index';
import _ from 'lodash';

const INITIAL_STATE ={all: [], post: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POST:
      return {...state, post:action.payload.data.post}
    case FETCH_POSTS:
      return {...state, all:action.payload.data.blog.posts};
    case DELETE_POST:
        // console.log('***',state);
        // console.log('###',action);
        // let allstate = _.remove(state.all,function(e){ return e.id === action.payload});
        // console.log(allstate);
        // let newsate = {...state, all:allstate};
        // console.log('this is new',newsate);
        // return newsate;
        return {...state, all:action.payload.data.blog.posts};
    case EDIT_POST:
        return {...state, all:action.payload.data.blog.posts};
    case DELETE_ALLPOST:
        return INITIAL_STATE;
    default:
      return state;
  }
}
