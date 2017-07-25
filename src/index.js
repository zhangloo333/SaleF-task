import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Greating from './components/greet';
import MainPage from './components/main_page';
import PostsNew from './components/posts_new';
import EditPosts from './components/post_edit';



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/app/posts/new" component={Greating} />
          <Route path="/app/:id" component={EditPosts} />
          <Route path="/app" component={MainPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#bloger'));


// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <BrowserRouter>
//       <div>
//         <Switch>
//           <Route path = "/app" component = {Greating} />
//           <Route path = "/app/:id" component = {Greating} />
//           <Route path="/app/posts/new" component={MainPage} />
//         </Switch>
//       </div>
//     </BrowserRouter>
//   </Provider>
// , document.querySelector('#bloger'));
