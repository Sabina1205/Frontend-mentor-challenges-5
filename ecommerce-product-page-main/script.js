let overlay = document.querySelector(".container");
let preview = document.querySelector(".preview-image");
let closeBtn = document.querySelector("#close-overlay");
// selected for cart function
let cart = document.querySelector(".basket-fill");
let cartIcon = document.querySelector(".icon-wrapper");
let totalInCart = document.querySelector(".total");

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

// function for opening cart

function openCart() {
  cartIcon.addEventListener("click", () => {
    cart.classList.add("cart-open");

    if (cart.classList.add("cart-open")) {
      cart.classList.remove("cart-open");
    }
  });
}

console.log(openCart());

// Function for calculation for cart
let addBtn = document.getElementById("add");
let minus = document.getElementById("minus");
let num = document.getElementById("num");
let plus = document.getElementById("plus");
let total = document.querySelector(".total");
let deleteIcon = document.querySelector(".delete-icon");
let cartNum = document.getElementById("number");
let resultNum = document.getElementById("result");
let checkout_btn = document.querySelector(".checkout-btn");
let main_cart = document.querySelector(".main-cart");
let empty_cart = document.querySelector(".empty-cart");
const productPrice = 125.0;
let count = 0;
total.textContent = `0`;
num.textContent = `0`;
cartNum.textContent = `0`;
function updateCount(newCount) {
  if (newCount >= 0) {
    count = newCount;
    num.textContent = count;
    result.textContent = `$${(count * productPrice).toFixed(2)}`;
  }
}

function addButton() {
  addBtn.addEventListener("click", () => {
    total.textContent = count;
    cartNum.textContent = count;
  });
}

addButton();

function deleteProduct() {
  deleteIcon.addEventListener("click", () => {
    total.textContent = `0`;
    num.textContent = `0`;
    cartNum.textContent = `0`;
    resultNum.textContent = ``;
  });
}

deleteProduct();

function checkout() {
  checkout_btn.addEventListener("click", () => {
    main_cart.style.display = "none";
    empty_cart.style.display = "flex";

    total.textContent = `0`;
    num.textContent = `0`;
  });
}

checkout();

function addToCart() {
  plus.addEventListener("click", () => {
    updateCount(count + 1);
  });

  minus.addEventListener("click", () => {
    updateCount(count - 1);
  });
}

addToCart();

// Mobile version => functions for opening and closing menu

let menu = document.querySelector(".mobile-menu");
let hamburger = document.querySelector(".hamburger-menu");
let closeMenuIcon = document.querySelector("#closeMenu");

function openMenu() {
  hamburger.addEventListener("click", () => {
    menu.style.display = "block";
  });
}

openMenu();

function closeMenu() {
  closeMenuIcon.addEventListener("click", () => {
    menu.style.display = "none";
  });
}

closeMenu();

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

// Thumbnail gallery for overlay container

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
