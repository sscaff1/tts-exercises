import React from 'react';
import Post from './Post';

function PostList({
  loading,
  posts,
  postsWithLoading,
  onEdit,
  onDelete,
  userId,
}) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      {!!userId ? <h2>Viewing User Post for ID {userId}</h2> : null}
      {posts.map(post => {
        if (postsWithLoading.includes(post.id)) {
          return <h3 key={post.id}>Loading...</h3>;
        }
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.body}
            userId={post.userId}
            onEdit={(title, description) => onEdit(post, title, description)}
            onDelete={() => onDelete(post)}
          />
        );
      })}
    </div>
  );
}

export default PostList;
