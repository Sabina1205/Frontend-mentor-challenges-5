// selected for cart function
let cart = document.querySelector(".basket-fill");
let cartIcon = document.querySelector(".icon-wrapper");
let totalInCart = document.querySelector(".total");

// function for opening cart

function openCart() {
  cartIcon.addEventListener("click", () => {
    cart.classList.toggle("cart-open");
    if (count === 0) {
      empty_cart.style.display = "flex";
      main_cart.style.display = "none";
    } else {
      empty_cart.style.display = "none";
      main_cart.style.display = "block";
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

function addToCart() {
  plus.addEventListener("click", () => {
    updateCount(count + 1);
  });

  minus.addEventListener("click", () => {
    updateCount(count - 1);
  });

  addBtn.addEventListener("click", () => {
    total.textContent = count;
    cartNum.textContent = count;
  });

  if (addBtn === addBtn) {
    empty_cart.style.display = "none";
  }
}

addToCart();

function deleteProduct() {
  deleteIcon.addEventListener("click", () => {
    total.textContent = `0`;
    num.textContent = `0`;
    cartNum.textContent = `0`;
    resultNum.textContent = ``;
    count = 0;
  });
}

deleteProduct();

function checkout() {
  checkout_btn.addEventListener("click", () => {
    main_cart.style.display = "none";
    empty_cart.style.display = "flex";

    total.textContent = `0`;
    num.textContent = `0`;
    count = 0; // Reset the count to 0
  });
}

checkout();
