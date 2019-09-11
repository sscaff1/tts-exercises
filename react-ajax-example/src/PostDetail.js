import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postActions from './core/posts/actions';

function PostDetail({ match }) {
  const dispatch = useDispatch();
  const { ui, comments } = useSelector(state => state);
  useEffect(() => {
    dispatch(postActions.getPostDetail(match.params.id));
  }, [match.params.id, dispatch]);
  if (ui.loading) {
    return 'Loading...';
  }
  return (
    <div>
      <h2>{ui.post.title}</h2>
      <p>{ui.post.body}</p>
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id}>
          <h4>
            {comment.name} ({comment.email})
          </h4>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostDetail;
