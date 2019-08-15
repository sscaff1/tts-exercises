// grab my elements
const formEl = document.querySelector('form');
const inputEl = formEl.querySelector('#item');
const listEl = document.querySelector('.list');
let list = [];

function addItem(e) {
  e.preventDefault();

  const input = e.target.item;
  const inputValue = input.value;
  const liEl = document.createElement('li');
  liEl.innerHTML = `${inputValue} <span class="x" data-index="${
    list.length
  }">x</span>`;
  listEl.append(liEl);
  list.push(inputValue);
  input.value = '';
}

function completeItem() {}

function deleteItem(e) {
  e.preventDefault();

  if (e.target.classList.contains('x')) {
    const indexToDelete = parseInt(e.target.dataset.index, 10);
    list = list.filter((_v, index) => {
      return index !== indexToDelete;
    });
    listEl.innerHTML = list
      .map((v, i) => {
        return `
        <li>${v} <span class="x" data-index="${i}">x</span></li>
      `;
      })
      .join('');
  }
}

// event listeners
formEl.addEventListener('submit', addItem);
listEl.addEventListener('click', deleteItem);
