const SAMPLE_LIST = {
  apple: 'red',
  grass: 'green',
  dark: 'black',
  aqua: 'aqua-marine',
  dodger: 'Dodger-Blue',
};

function fetchSample() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.stringify(SAMPLE_LIST));
    }, 500);
  });
}

function getData() {
  fetchSample()
    .then(data => {
      return JSON.parse(data);
    })
    .then(loopThroughColors);
}

function loopThroughColors(colors) {
  const colorList = document.querySelector('#colors');
  const colorNames = Object.keys(colors); // array
  for (let i = 0; i < colorNames.length; i += 1) {
    setTimeout(() => {
      renderColor(colorNames[i], colors[colorNames[i]]);
      console.log(Array.from(colorList.querySelectorAll('li')));
    }, 1000 * i);
  }
}

function renderColor(name, color) {
  // const colorList = document.getElementById('colors');
  const colorList = document.querySelector('#colors');
  const li = document.createElement('li');

  li.style.color = color.replace('-', '').toLowerCase();
  li.innerText = name;
  colorList.append(li);
}

getData();
