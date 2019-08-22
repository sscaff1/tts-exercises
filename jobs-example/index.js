const BASE_URL = 'http://api.dataatwork.org/v1/jobs';

function grabData() {
  return $.get(BASE_URL).then(renderJobs);
}

function renderJobs(data) {
  const list = $('#list');
  list.html(
    data
      .map(
        data => `<div>
          <p><a href="#" data-id="${data.uuid}">${data.title}</a></p>
          <div class="accordion"></div>
        </div>`
      )
      .join('')
  );
}

const list = document.getElementById('list');

// list.addEventListener('click', handleLinkClick);

// function handleLinkClick(e) {
//   e.preventDefault();
//   if (e.target.tagName === 'A') {
//     console.log(e.target.innerText);
//   }
// }

function sayName() {
  console.log(this.name);
}

const person = {
  sayName,
  name: 'Bob',
};

person.sayName();

$('#list').on('click', 'a', handleLinkClick);

function handleLinkClick(e) {
  e.preventDefault();

  const $el = $(e.target);
  const id = $el.data('id');
  const $modal = $('#modal');

  $.get(`${BASE_URL}/${id}/related_skills`).then(data => {
    const skillsHtml = data.skills.map(skill => {
      return `<p>${skill.skill_name} - ${skill.description}</p>`;
    });
    $modal.html(skillsHtml);
    $modal.dialog({
      title: $el.html(),
      show: { effect: 'fade', duration: 250 },
      maxHeight: 300,
    });
  });
}

/** ACCORDION EXAMPLE */
// function handleLinkClick(e) {
//   e.preventDefault();
//   // const id = e.target.dataset.id
//   const $el = $(e.target);
//   const id = $el.data('id');
//   const $accordion = $el.parent().next('.accordion');

//   if ($accordion.hasClass('has-data')) {
//     if ($accordion.hasClass('open')) {
//       $accordion.slideUp('slow');
//     } else {
//       $accordion.slideDown('slow');
//     }
//     $accordion.toggleClass('open');
//   } else {
//     $.get(`${BASE_URL}/${id}/related_skills`).then(data => {
//       const skillsHtml = data.skills.map(skill => {
//         return `<p>${skill.skill_name} - ${skill.description}</p>`;
//       });
//       $accordion.html(skillsHtml);
//       $accordion.slideDown('slow').addClass('has-data open');
//     });
//   }
// }

$(() => {
  const $loading = $('#loading');
  const $list = $('#list');
  $list.hide();
  grabData().then(() => {
    // loading.style.display = 'none'; // this is hide
    $loading.hide();
    // list.style.display = 'block'; // this is show
    $list.show();
  });
  console.log('ready domcontentloaded');
});
// window.addEventListener('DOMContentLoaded', () => {
//   console.log('ready domcontentloaded');
// });
console.log('ready here');

// const form = document.querySelector('form')
// const form = $('form');

// /** selecting all of them */
// const li = document.querySelectorAll('li'); // pretend there were 5
// const destroy = document.querySelector('.destroy');

// function clickHandler(e) {
//   console.log('clicked', e.target.innerText);
// }

// /** sample to add */
// li.forEach(el => {
//   el.addEventListener('click', clickHandler);
// });

// /** same to remove */
// destroy.addEventListener('click', () => {
//   li.forEach(el => {
//     el.removeEventListener('click', clickHandler);
//   });
// });

// const li = $('li').on('click', function clickHandler() {
//   console.log('clicked', this.innerText);
// });

// $('.destroy').on('click', () => {
//   li.off('click');
// });
