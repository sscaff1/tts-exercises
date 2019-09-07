import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Layout from './Layout';
import PostDetail from './PostDetail';
import CreatePost from './CreatePost';

function NoMatch() {
  return <h1>404</h1>;
}

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/posts/:id" component={PostDetail} />
          <Route path="/user/:userId/posts" component={App} />
          <Route path="/createPost" component={CreatePost} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
