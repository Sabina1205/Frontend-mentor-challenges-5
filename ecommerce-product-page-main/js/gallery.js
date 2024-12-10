// MAIN GALLERY
const mainImages = document.querySelectorAll(".preview-image img");
const thumbnails = document.querySelectorAll(".thumbnail-images div");

let currentImageIndex = 0;

const changeImage = (index, mainImages, thumbnails) => {
  mainImages.forEach((img) => {
    img.classList.remove("active");
  });
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
  });
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("activeOpacity");
  });

  mainImages[index].classList.add("active");
  thumbnails[index].classList.add("active");
  thumbnails[index].classList.add("activeOpacity");
  currentImageIndex = index;
};

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, mainImages, thumbnails);
  });
});

// Mobile version gallery

const prev = document.getElementById("prevBtn");
const next = document.getElementById("nextBtn");
let currentMobileImageIndex = 0;

function updateMobileGallery() {
  mainImages.forEach((img) => img.classList.remove("active"));
  mainImages[currentMobileImageIndex].classList.add("active");
}

prev.addEventListener("click", () => {
  if (currentMobileImageIndex > 0) {
    currentMobileImageIndex--;
    updateMobileGallery();
  }
});

next.addEventListener("click", () => {
  if (currentMobileImageIndex < mainImages.length - 1) {
    currentMobileImageIndex++;
    updateMobileGallery();
  }
});
