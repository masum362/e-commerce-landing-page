// hero section animation
const headerImg = document.getElementById("headerImg");
const bannerImg = [
  "./images/banner/banner-1.jpg",
  "./images/banner/banner-2.jpg",
  "./images/banner/banner-3.jpg",
];

let i = 0;
const slider = () => {
  if (i > bannerImg.length - 1) {
    i = 0;
  }
  headerImg.src = `${bannerImg[i]}`;
  i++;

  setTimeout(() => {
    slider();
  }, 3000);
};

// showcase section products filtering with the click of different buttons

const btns = document.querySelectorAll(".btns .btn");
const ProductCards = document.querySelectorAll(".filterable-cards .card");

const filterCard = (e) => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  ProductCards.forEach((card) => {
    card.classList.add("hide");
    console.log(card.dataset.name, e.target.dataset.name);
    if (
      card.dataset.name === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      card.classList.remove("hide");
    }
  });
};

btns.forEach((btn) => btn.addEventListener("click", filterCard));



// customer review carousel functionality start from here
const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll("i");
const firstElementWidth = document.querySelector(".carousel .card").offsetWidth;

// querySelector give us a nodeList but we can't do slice operation with it. so we need an array. we can get an array to spread the nodelist. 
const carouselChildrens = [...document.querySelectorAll(".carousel div.card")];

let draggable = false,
  startX,
  startScollLeft,timeOutId;


// carousel scroll one element left on left button click and one element right on right button click
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft +=
      btn.id === "left" ? -firstElementWidth : firstElementWidth;
  });
});


// get the number of cards that can fit in the carousel at once.
let cardPerView = Math.round(carousel.offsetWidth / firstElementWidth);

// insert copies of the last few cards at the beginning of the carousel for infinite scrolling.
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// insert copies of the first few cards at the end of the carousel for infinite scrolling.
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});


const dragStart = (e) => {
  draggable = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScollLeft = carousel.scrollLeft;
};

const dragStop = () => {
  draggable = false;
  carousel.classList.remove("dragging");
};

const dragging = (e) => {
  if (!draggable) return;
  carousel.scrollLeft = startScollLeft - (e.pageX - startX);
};

const autoPlay = () => {
  if (window.innerWidth < 800) return;

  console.log('entered')
  timeOutId = setTimeout(() => {
    carousel.scrollLeft += firstElementWidth;
  }, 2500);
};

autoPlay()

const infiniteScroll = () => {
  // if the scroll at the beginning , scrool to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // if the scroll at the end , scrool to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeOutId)
  if(!wrapper.matches(':hover')) return autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mouseover", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener('mouseenter',() => clearTimeout(timeOutId))
wrapper.addEventListener('mouseleave',() => autoPlay())
