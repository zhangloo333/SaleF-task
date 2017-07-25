import axios from 'axios';
import qs from 'qs';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_ALLPOST = 'DELETE_ALLPOST';
export const EDIT_POST = 'EDIT_POST';


const ROOT_URL = 'http://localhost:8080/Blog/api';

//fetchSinglePost
export function fetchPost(id) {
  const request = axios.get(ROOT_URL+'/'+id);
  console.log(request);
  return {
    type:FETCH_POST,
    payload: request
  }
}

// fetchAllPosts
export function fetchPosts() {
  const request = axios.get(ROOT_URL);
  console.log('this is from action');
  console.log(request);
  return {
      type: FETCH_POSTS,
      payload: request
  }
}

// Posts a New Posts
const instance = axios.create({
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
});
export function createPost(props){
  console.log(props);

  const request = instance.post(ROOT_URL,qs.stringify(props));
  return {
    type:CREATE_POST,
    payload: request
  };
}

// Delete on post
export function deletePost(id){
  axios.delete(`${ROOT_URL}/${id}`);
  const request = axios.get(ROOT_URL);
  return {
    type: DELETE_POST,
    payload: request
  }
}

export function editPost(props,id){
  const request = axios.delete(`${ROOT_URL}/${id}`).then(()=>{
    instance.post(ROOT_URL,qs.stringify(props))
  }).then(()=>axios.get(ROOT_URL));
  return {
    type:EDIT_POST,
    payload: request
  };
}

//Delete all Posts
export function deleteAllPost() {
  const request = axios.delete(ROOT_URL);
  return {
    type: DELETE_ALLPOST,
    payload: request
  }
}
