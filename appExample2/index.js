class Counter {
  constructor(initialCount = 0) {
    this.addButton = document.querySelector('.addButton');
    this.minusButton = document.querySelector('.minusButton');
    this.resetButton = document.querySelector('.resetButton');
    this.countEl = document.querySelector('.count');
    this.initialCount = initialCount;
    this.count = initialCount;
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
    this.addButton.addEventListener('click', this.increment);
    this.minusButton.addEventListener('click', this.decrement);
    this.resetButton.addEventListener('click', this.reset);
    this.render();
  }

  destroy() {
    this.addButton.removeEventListener('click', this.increment);
    this.minusButton.removeEventListener('click', this.decrement);
    this.resetButton.removeEventListener('click', this.reset);
  }

  increment() {
    this.count += 1;
    this.render();
  }

  decrement() {
    this.count -= 1;
    this.render();
  }

  reset() {
    this.count = this.initialCount;
    this.render();
  }

  render() {
    this.countEl.innerText = this.count;
  }
}

function addOne(count) {
  return count + 1;
}

function minusOne(count) {
  return count - 1;
}

function resetBackToInitial(initialCount) {
  return initialCount;
}

function render(el, count) {
  el.innerText = count;
}

function startCounter(initialCount = 0) {
  let count = initialCount;
  const addButton = document.querySelector('.addButton');
  const minusButton = document.querySelector('.minusButton');
  const resetButton = document.querySelector('.resetButton');
  const countEl = document.querySelector('.count');
  function increment() {
    const newValue = addOne(count);
    render(countEl, newValue);
    count = newValue;
  }
  function decrement() {
    const newValue = minusOne(count);
    render(countEl, newValue);
    count = newValue;
  }
  function reset() {
    const newValue = resetBackToInitial(initialCount);
    render(countEl, newValue);
    count = newValue;
  }
  addButton.addEventListener('click', increment);
  minusButton.addEventListener('click', decrement);
  resetButton.addEventListener('click', reset);

  render(countEl, count);
  return function destroy() {
    addButton.removeEventListener('click', increment);
    minusButton.removeEventListener('click', decrement);
    resetButton.removeEventListener('click', reset);
  };
}

const destroyFunction = startCounter();

// const count1 = new Counter(5);
// window.addEventListener('hashchange', () => {
//   count1.destroy();
// });
const destroyEl = document.querySelector('.destroy');
destroyEl.addEventListener('click', () => {
  destroyFunction();
});
