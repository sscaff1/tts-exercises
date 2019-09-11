import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PostList from './PostList';
import './App.css';
import postActions from './core/posts/actions';

function App({ match }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getPosts(match.params.userId));
  }, [match.params.userId, dispatch]);
  return <PostList userId={match.params.userId} />;
}

export default App;
