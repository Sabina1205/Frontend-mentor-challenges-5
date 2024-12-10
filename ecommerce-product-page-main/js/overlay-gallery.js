// Thumbnail gallery for overlay container
let overlay = document.querySelector(".container");
let preview = document.querySelector(".preview-image");
let closeBtn = document.querySelector("#close-overlay");

// function for opening overlay gallery

function openOverlay() {
  preview.addEventListener("click", () => {
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
}

console.log(openOverlay());

const thumbnailsOverlay = document.querySelectorAll(
  ".thumbnail-images-overlay div"
);
const mainImagesOverlay = document.querySelectorAll(
  ".preview-image-overlay img"
);
let currentImageOverlayIndex = 0;
const changeImageOverlay = (index, mainImagesOverlay, thumbnailsOverlay) => {
  mainImagesOverlay.forEach((img) => {
    img.classList.remove("active");
  });
  thumbnailsOverlay.forEach((thumb) => {
    thumb.classList.remove("active");
  });
  thumbnailsOverlay.forEach((thumb) => {
    thumb.classList.remove("activeOpacity");
  });

  mainImagesOverlay[index].classList.add("active");
  thumbnailsOverlay[index].classList.add("active");
  thumbnailsOverlay[index].classList.add("activeOpacity");
  currentImageOverlayIndex = index;
};

thumbnailsOverlay.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImageOverlay(index, mainImagesOverlay, thumbnailsOverlay);
  });
});
