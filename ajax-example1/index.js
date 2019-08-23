const BASE_URL = 'http://jsonplaceholder.typicode.com';
const postEl = document.querySelector('#posts');
const formEl = document.querySelector('form');

function renderPosts(data, fromUser = false) {
  const backButton = fromUser
    ? `<a href="#" class="back-link"><- Go Back</a>`
    : '';

  const postsHtml = data
    .map(post => {
      const getPostsFromUserLink = fromUser
        ? ''
        : `<a href="#" class="user-posts">Get Posts from ${post.userId}</a>`;
      return `
      <div class="post" data-id="${post.id}" data-user-id="${post.userId}">
        ${getPostsFromUserLink}
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <span class="editButton">✏️</span>
        <span class="deleteButton">x</span>
      </div>
    `;
    })
    .join('');

  postEl.innerHTML = `
    ${backButton}
    ${postsHtml}
  `;
}

function renderPostWithComments(post, comments) {
  console.table(comments);
  const commentsHtml = comments
    .map(comment => {
      return `
      <div>
        <h4>${comment.name} (${comment.email})</h4>
        <p>${comment.body}</p>
      </div>
    `;
    })
    .join('');
  const postHtml = `
    <a href="#" class="back-link"><- Go Back</a>
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    <h3>Comments</h3>
    ${commentsHtml}
  `;
  postEl.innerHTML = postHtml;
}

function appendNewPost(post) {
  const newPost = document.createElement('div');
  newPost.classList.add('post');
  newPost.dataset.id = post.id;
  newPost.dataset.userId = post.userId;
  newPost.innerHTML = `
      <a href="#" class="user-posts">Get Posts from ${post.userId}</a>
      <h4>${post.title}</h4>
      <p>${post.body}</p>
  `;

  postEl.prepend(newPost);
}

function renderEditForm(post) {
  const currentHtml = post.innerHTML;
  const id = post.dataset.id;
  const userId = post.dataset.userId;
  const title = post.querySelector('h4').innerText;
  const body = post.querySelector('p').innerText;
  post.innerHTML = `
    <form>
      <div>
        <input type="text" placeholder="Title" name="title" value="${title}" />
      </div>
      <div>
        <textarea name="body" cols="30" rows="10">${body}</textarea>
      </div>
      <div>
        <button type="submit" class="edit">Edit Post</button>
        <button type="button" class="cancel">Cancel</button>
      </div>
    </form>
  `;

  const cancelButton = post.querySelector('.cancel');
  const editForm = post.querySelector('form');
  const editButton = post.querySelector('.edit');

  function handleCancelClick() {
    post.innerHTML = currentHtml;
    removeEventListeners();
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    const title = editForm.title.value;
    const body = editForm.body.value;
    console.log('jere');
    editPost(id, userId, title, body).then(data => {
      post.innerHTML = currentHtml;
      post.querySelector('h4').innerText = data.title;
      post.querySelector('p').innerText = data.body;
      removeEventListeners();
    });
  }

  function removeEventListeners() {
    cancelButton.removeEventListener('click', handleCancelClick);
    editForm.removeEventListener('submit', handleEditSubmit);
  }

  cancelButton.addEventListener('click', handleCancelClick);
  editButton.addEventListener('click', handleEditSubmit);
}

function getAllPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then(resp => resp.json())
    .then(renderPosts);
}

function getPostWithId(id) {
  return fetch(`${BASE_URL}/posts/${id}`).then(resp => resp.json());
}

function getCommentsWithPostId(postId) {
  return fetch(`${BASE_URL}/comments?postId=${postId}`).then(resp =>
    resp.json()
  );
}

function getAllPostsByUserId(userId) {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(resp => resp.json())
    .then(data => renderPosts(data, true));
}

function deletePost(postId) {
  return fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
  })
    .then(resp => resp.json())
    .then(data => console.log(data));
}

function editPost(postId, userId, title, body) {
  return fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: postId,
      title,
      body,
      userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(response => response.json());
}

getAllPosts();

function handlePostClick(e) {
  e.preventDefault();

  const post = e.target.closest('.post');
  const id = post && post.dataset.id;
  console.log(e.target.tagName);
  if (e.target.classList.contains('user-posts')) {
    const userId = post.dataset.userId;
    getAllPostsByUserId(userId);
  } else if (e.target.classList.contains('back-link')) {
    getAllPosts();
  } else if (e.target.classList.contains('deleteButton')) {
    // delete the post
    deletePost(id).then(() => {
      post.remove();
    });
  } else if (e.target.classList.contains('editButton')) {
    renderEditForm(post);
  } else if (
    post &&
    (e.target.tagName !== 'BUTTON' &&
      e.target.tagName !== 'INPUT' &&
      e.target.tagName !== 'TEXTAREA')
  ) {
    // .then(([post, comments]) => { // do stuff here... })
    Promise.all([getPostWithId(id), getCommentsWithPostId(id)]).then(arr => {
      // const post = arr[0];
      // const comments = arr[1];
      const [post, comments] = arr;
      renderPostWithComments(post, comments);
    });
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const title = e.target.title.value;
  const body = e.target.body.value;

  fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(appendNewPost);
}

postEl.addEventListener('click', handlePostClick);
formEl.addEventListener('submit', handleSubmit);
