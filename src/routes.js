import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Greating from './components/greet';
import MainPage from './components/main_page';
import PostsNew from './components/posts_new';
import EditPosts from './components/post_edit';

export default(
  <Route path = "/app" component = {App} >
    <IndexRoute component={MainPage} />
    <Route path="/app/posts/new" component={PostsNew} />
    <Route path="/app/:id" component={EditPosts} />
  </Route>
);
