import renderInterface from './renderInterface';
import { handleChangeAdd } from './handlers';

renderInterface();

const addEl = document.querySelector('.add');
const inputs = addEl.querySelectorAll('input');

inputs.forEach((input) => input.addEventListener('change', handleChangeAdd));
