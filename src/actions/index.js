import axios from 'axios';
import qs from 'qs';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_ALLPOST = 'DELETE_ALLPOST';
export const EDIT_POST = 'EDIT_POST';


const ROOT_URL = 'http://localhost:8080/Blog/api';

//fetchSinglePost
export const fetchPost = (id) => async dispatch => {
  const request = await axios.get(ROOT_URL+'/'+id);
  dispatch({
    type: FETCH_POST,
    payload: request
  });
}

// fetchAllPosts
export const fetchPosts = () => async dispatch => {
  const request = await axios.get(ROOT_URL);
  dispatch({
    type: FETCH_POSTS,
    payload: request
  })
}

// Posts a New Posts
const instance = axios.create({
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
});

export const createPost = (data,callback) => async dispatch => {
  const request = await instance.post(ROOT_URL,qs.stringify(data));
  callback();
  dispatch({
    type:CREATE_POST,
    payload: request
  })
}

// Delete on post
export const deletePost = (id,callback) => async dispatch => {
  const request = await axios.delete(`${ROOT_URL}/${id}`).then(()=>axios.get(ROOT_URL));
  callback();
  dispatch({
    type: DELETE_POST,
    payload: request
  })
}

export const editPost = (data,id,callback) => async dispatch =>{
  const request = await axios.delete(`${ROOT_URL}/${id}`).then(()=>{
    instance.post(ROOT_URL,qs.stringify(data))
  }).then(()=>axios.get(ROOT_URL));
  callback();
  dispatch({
    type:EDIT_POST,
    payload: request
  });
}

//Delete all Posts
export const deleteAllPost = () => async dispatch => {
  const request = await axios.delete(ROOT_URL);
  dispatch({
    type: DELETE_ALLPOST,
    payload: request
  });
}
