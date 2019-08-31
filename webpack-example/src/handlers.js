import { add } from './math';

function handleChangeAdd() {
  const addEl = document.querySelector('.add');
  const inputs = addEl.querySelectorAll('input');
  const sumEl = addEl.querySelector('.sum');
  const values = [];
  inputs.forEach((input) => values.push(parseInt(input.value, 10)));
  const sum = add(...values); // [1, 2] => 1, 2

  sumEl.innerHTML = sum;
}

/** Will be adding more exports in the future */
// eslint-disable-next-line import/prefer-default-export
export { handleChangeAdd };
