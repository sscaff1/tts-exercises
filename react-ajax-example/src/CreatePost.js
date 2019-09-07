import React, { useState } from 'react';
import PostForm from './PostForm';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <PostForm
      title={title}
      onChangeTitle={e => setTitle(e.target.value)}
      description={description}
      onChangeDescription={e => setDescription(e.target.value)}
      onSubmit={() => {}}
      onCancel={() => {}}
      submitLabel="Create Post"
    />
  );
}

export default CreatePost;
