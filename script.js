// hero section animation
const headerImg = document.getElementById("headerImg");
const bannerImg = [
  "./images/banner/banner-1.jpg",
  "./images/banner/banner-2.jpg",
  "./images/banner/banner-3.jpg",
];

let i = 0;
const slider = () => {
  if (i > bannerImg.length-1) {
    i = 0;
  }
  headerImg.src = `${bannerImg[i]}`;
  i++;

  setTimeout(() => {
    slider();
  }, 3000);
};


// showcase section products filtering with the click of different buttons

const btns = document.querySelectorAll('.btns .btn');
const cards = document.querySelectorAll('.card');

const filterCard = (e) => {
  document.querySelector('.active').classList.remove('active');
  e.target.classList.add('active');

  cards.forEach(card => {
    card.classList.add("hide")
    console.log(card.dataset.name,e.target.dataset.name)
    if(card.dataset.name === e.target.dataset.name || e.target.dataset.name ==="all"){
      card.classList.remove("hide");
    }
  })
}

btns.forEach(btn => btn.addEventListener('click',filterCard));
