let images = [
  {
    url: "img/image1.png",
    title: "Image 1",
  },
  {
    url: "img/image2.png",
    title: "Image 2",
  },
  {
    url: "img/image3.png",
    title: "Image 3",
  },
];

function initSlider(options) {
  if (!images || !images.length) return;

  options = options || {
    dots: true,
  };

  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");

  initImages();
  initArrows();

  if (options.dots) {
    initDots();
  }

  function initImages() {
    images.forEach((image, index) => {
      const isFirstImage = index === 0 ? "active" : "";
      let imageDiv = `<div class="image n${index} ${isFirstImage}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.insertAdjacentHTML("beforeend", imageDiv);
    });
  }

  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      const isFirstImage = index === 0 ? "active" : "";
      let dot = `<div class="slider__dots-item n${index} ${isFirstImage}" data-index="${index}" />`;
      sliderDots.insertAdjacentHTML("beforeend", dot);
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach((dot) => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      });
    });
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }
}

let sliderOptions = {
  dots: true,
};

document.addEventListener("DOMContentLoaded", function () {
  initSlider(sliderOptions);
});
