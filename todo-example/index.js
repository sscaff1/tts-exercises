// grab my elements
const formEl = document.querySelector('form');
const inputEl = formEl.querySelector('#item');
const listEl = document.querySelector('.list');
let id = 0;
let list = [];
let completedIds = [];

function addItem(e) {
  e.preventDefault();

  const input = e.target.item;
  const inputValue = input.value;
  const liEl = document.createElement('li');
  liEl.innerHTML = `<span class="item">${inputValue}</span> <span class="x">x</span>`;
  id += 1;
  liEl.dataset.id = id;
  listEl.append(liEl);
  list.push({ id: id.toString(), value: inputValue });
  input.value = '';
}

function completeItem(e) {
  e.preventDefault();

  if (e.target.classList.contains('item')) {
    const li = e.target.closest('li');
    const targetId = li.dataset.id;
    if (completedIds.includes(targetId)) {
      li.classList.remove('completed');
      completedIds = completedIds.filter(id => id !== targetId);
    } else {
      // added our class complete to the list item
      li.classList.add('completed');
      completedIds.push(targetId);
    }
  }
}

function deleteItem(e) {
  e.preventDefault();

  if (e.target.classList.contains('x')) {
    const li = e.target.closest('li');
    const targetId = li.dataset.id;
    list = list.filter(v => {
      return v.id !== targetId;
    });
    listEl.innerHTML = list
      .map(v => {
        const liClass = completedIds.includes(v.id) ? 'completed' : '';
        return `
        <li class="${liClass}" data-id=${v.id}><span class="item">${
          v.value
        }</span> <span class="x">x</span></li>
      `;
      })
      .join('');
  }
}

// event listeners
formEl.addEventListener('submit', addItem);
listEl.addEventListener('click', deleteItem);
listEl.addEventListener('click', completeItem);
