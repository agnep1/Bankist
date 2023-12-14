'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//prideda tą patį funkcionalumą visiems mygtukams esantiems 'btnsOpenModal' selectoriuje (Node list)//

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
//uždaro langą paspaudus foną aplinkui jį//

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}); //uždaro langą paspaudus 'ESC" mygtuką//

///Page navigation/////
////////////////////////////////

/*document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault(); //defoltu naršyklėje nustatyta, kad peršoktu
    //į nurodyta paragrafą, liepiu nedartyti defolto.
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});*/

/////Event delegation//////
//////////////////////////

//1.Add event listener to common parent element
//2.Determent in what element event has originated

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); //preventing browser default jumping to section.

  //Maching startegy, that 'click' event would be executed just when clicked
  //on child elements not element  it self.
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////DOM TRAVERSING//////
/////////////////////////

const h1 = document.querySelector('h1');

//Going DOWNWORDS : selecting child element
//console.log(h1.querySelectorAll('.highlight'));
//console.log(h1.children);
//Selecting first child
///////h1.firstElementChild.style.color = 'white';
//Selecting last child
///////h1.lastElementChild.style.color = 'orangered';

//Going UPWORDS : selecting parents
//console.log(h1.parentNode);
//console.log(h1.parentElement);

//////////h1.closest('.header').style.background = 'var(--gradient-secondary)';

//Going SIDEWAYS: selecting siblings

//console.log(h1.previousElementSibling);
//console.log(h1.nextElementSibling);

//console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });

//Tab Component//
//////////////////////

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

/*tabs.forEach(tab =>
  tab.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('click');
  })
); this ir BAD PRACTICE, as it would slow down the page if there is a lot of tabs.*/

//Better to use EVENT DELEGATION
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  //Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Active content area
  tabsContent.forEach(con =>
    con.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////Menu fade animation///
////////////////////////
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    //.contains, without dot}
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

////Passing an 'argument' to event handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///Sticky navigation bar////
///////////////////////////

/*const initialCoor = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoor.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

///Sticky navigation usisng Intersection observer API////

/*const obsCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);*/
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Sukuriam nauja HTML elementa, priskiriam formatavimo klase, uzpildom informacija
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality';//
message.innerHTML = `We use cookies for improved functionality. <button class="btn btn--close-cookie">Got it!</button>`;

header.append(message);
//header.prepend(message.cloneNode(true)); jei norim DOM elemento kopijos//

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//Styles (in lyne styles)
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.opacity = '30%';
//console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');
//const logo = document.querySelector('.nav__logo');
//console.log(logo.src);

//Smooth scrolling
//Paspaudus mygtuka, 'Learn more' graziai nuslinks iki tam tikros vitos

btnScrollTo.addEventListener('click', function () {
  //const s1coords = section1.getBoundingClientRect();
  //window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset);

  /*window.scrollTo({
    left: s1coords.left + window.screenX,
    top: s1coords.top + window.screenY,
    behavior: 'smooth',
  });*/

  section1.scrollIntoView({ behavior: 'smooth' });
});

///Reveal sections///
/////////////////////////
//const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden'); //target is IntersectionObserverEntry Object property
  observer.unobserve(entry.target); //removes section observation after it is revealed
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //section reveald when it is 15% visible
});

allSections.forEach(function (section) {
  //section.classList.add('section--hidden');
  sectionObserver.observe(section); //adds section observation
});

///Lazy loading images///
/////////////////////////

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

////Slider///
/////////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlides = slides.length;

  //Functions
  const creatingDots = function () {
    slides.forEach(function (_, index) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  const activeDot = function (slideNumber) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slideNumber}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slideNumber) {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - slideNumber)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const init = function () {
    creatingDots();
    goToSlide(0); //places slide pictures next to eaxh other instead of on on top of the other.
    activeDot(0);
  };
  init();

  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && previousSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      //const {slide} = e.target.dataset; using destructuring
      goToSlide(slide);
      activeDot(slide);
    }
  });
};
slider();
//0%, 100%, 200%, 300%
///////////PLAY//////////
/////////////////////////

//Creating bubbling in practice
//creating random collor
//rgb(0,0,0)
/*const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randInt(0, 255)},${randInt(0, 255)},
${randInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Container', e.target, e.currentTarget);
  },
  true
);

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav', e.target, e.currentTarget);
}); */
document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
});

window.addEventListener('load', function (e) {
  console.log(e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
