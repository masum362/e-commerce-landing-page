
// hero section animation
const headerImg = document.getElementById("headerImg");
const bannerImg = [
  "./images/banner/banner-1.jpg",
  "./images/banner/banner-2.jpg",
  "./images/banner/banner-3.jpg",
];

let i = 0;
const slider = () => {
  console.log(i);
  if (i > bannerImg.length-1) {
    i = 0;
  }
  headerImg.src = `${bannerImg[i]}`;
  i++;

  setTimeout(() => {
    console.log("called");
    slider();
  }, 3000);
};

