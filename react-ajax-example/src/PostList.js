import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';

function PostList({ userId }) {
  const { ui, posts } = useSelector(state => state);
  if (ui.loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      {!!userId ? <h2>Viewing User Post for ID {userId}</h2> : null}
      {posts.map(post => {
        if (ui.postsWithLoading.includes(post.id)) {
          return <h3 key={post.id}>Loading...</h3>;
        }
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.body}
            userId={post.userId}
          />
        );
      })}
    </div>
  );
}

export default PostList;
