import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Greating from './components/greet';
import MainPage from './components/main_page';


export default(
  <Route path = "/app" component = {App} >
    <IndexRoute component={MainPage} />
    <Route path="/app/posts/new" component={Greating} />
    <Route path="/app/:id" component={Greating} />
  </Route>
);
