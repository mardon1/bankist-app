'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('nav');
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')


///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

btnsOpenModal.forEach(function (acc) {
  return acc.addEventListener('click', openModal)
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal)



document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Button Scrolling 
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault()
  // const s1coords = section1.getBoundingClientRect()
  // console.log(s1coords);

  // // console.log(e.target.getBoundingClientRect());
  // console.log(window.pageXOffset, pageYOffset);
  
  // console.log(
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  
  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  //   )

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({behavior:"smooth"}) 
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page navigation
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault()
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth'})
  })
})



tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  
  if(!clicked) return

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  console.log(clicked.dataset.tab);
  
})

// Menu handle hover 
const handleHover = function (o) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      // console.log(link);
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      // console.log(siblings);
      const logo = link.closest('.nav').querySelector('img');
      // console.log(logo);

      siblings.forEach(el => {
        if (el !== e.target) el.style.opacity = o;
      });
      logo.style.opacity = o;
    }
  }
}

nav.addEventListener('mouseover', handleHover(0.5))
nav.addEventListener('mouseout', handleHover(1))


// Sticky navigation

// const initialCoords = section1.getBoundingClientRect()
// // console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky')
//   }
  
// })


const header = document.querySelector('.header')
const navHeigth = nav.getBoundingClientRect().height; 
// console.log(navHeigth);

const stickyNav = function (entries) {
  const [entry] = entries
  // console.log(entry);
  
  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }

}

const stickyOption = {
  root: null,
  threshold: 0,
  rootMargin: '-90px'
}
const headerObserver = new IntersectionObserver(stickyNav, stickyOption)
headerObserver.observe(header)





// Reveal Sections

const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry.target, observer);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
  
}

const sectionOnserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})
allSections.forEach(function (section) {
  sectionOnserver.observe(section)
  // console.log(section);
  section.classList.add('section--hidden')
})


// Lazy Loading Images 
const imgTarget = document.querySelectorAll('img[data-src]')

const loadImages = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace sourse with data-src 
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  });

  observer.unobserve(entry.target)
  
}

const imgObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})
imgTarget.forEach(img => imgObserver.observe(img));



// Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots')
let curSlide = 0
const maxSlide = slides.length

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`))
const creatteDots = function () {
  slides.forEach(function (_, i) {
    dotcon
  })
}

const goToSlide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
}
goToSlide(0)
// Next silde
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0
  } else {
    curSlide++;
  }
  goToSlide(curSlide)
  activateDot(curSlide)
}; 

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1
  } else {
    curSlide--;
  }
  goToSlide(curSlide)
  activateDot(curSlide)
}; 

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();


btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function (e) {
  console.log(e);
  
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide()
})

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
slider();

// const obsCallback = function (entries, observer) {
//   entries.forEach(function (entry) {
//     return console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: 0.1
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1)
// const header = document.querySelector('.header')

// const message = document.createElement('div')
// message.classList.add('cookie-message')
// message.textContent = 'Birnima'

// header.append(message)

// // Styles

// message.style.backgroundColor = '#37383d'

// document.documentElement.style.setProperty('--color-primary', 'orangered')






// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1 ) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// console.log(randomColor());


// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.currentTarget.style.backgroundColor = randomColor()
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
  
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor()
//   console.log('CONTAINER', e.target, e.currentTarget);  
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });



// const h1 = document.querySelector('h1')

// h1.closest('.section').style.background = 'red'