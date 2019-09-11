import React from 'react';

const styles = {
  input: {
    display: 'block',
  },
};

function PostForm({
  title,
  description,
  onSubmit,
  onCancel,
  onChangeTitle,
  onChangeDescription,
  submitLabel,
}) {
  return (
    <form onSubmit={onSubmit}>
      <input
        style={styles.input}
        type="text"
        value={title}
        onChange={onChangeTitle}
      />
      <textarea
        style={styles.input}
        onChange={onChangeDescription}
        value={description}
      />
      <div>
        <button type="submit">{submitLabel}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PostForm;
