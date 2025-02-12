let total_in_cart = document.getElementById("total_in_cart");
let full_cart = document.querySelector(".full-cart");
let empty_cart = document.querySelector(".empty-cart");

// displaying data from data.json to the screen
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let output = "";

    for (let items of data) {
      output += `
        <div class="dessert">
          <div class="image-wrapper">
            <div class="image">
              <img
                class="product"
                src="${items.image.desktop}"
                alt="${items.name}"
              />
            </div>
            <button class="main-button" data-product-name="${items.name}">
              <img src="assets/images/icon-add-to-cart.svg" alt="product" /> Add to Cart
            </button>
            <button class="action-button hidden">
              <div class="decrement">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
              </div>
              <span class="total">0</span>
              <div class="increment">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
              </div>
            </button>
          </div>
          <div class="product-information">
            <p class="name">${items.name}</p>
            <h4 class="category">${items.category}</h4>
            <p class="price">${items.price}$</p>
          </div>
        </div>
      `;
    }

    document.querySelector(".desserts").innerHTML = output;

    // Add event listeners to main buttons
    const main_buttons = document.querySelectorAll(".main-button");
    // Hidden buttons
    const action_buttons = document.querySelectorAll(".action-button");
    const plusBtn = document.querySelectorAll(".increment");
    const minBtn = document.querySelectorAll(".decrement");
    // Total
    const totalNum = document.querySelectorAll(".total");
    // Images
    const product_images = document.querySelectorAll(".image img");
    // Main button
    main_buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // get the product name
        const productName = button.dataset.productName;

        // Find the product data for the clicked item
        const productData = Array.from(data).find(
          (item) => item.name === productName
        );
        // display the hidden buttons
        action_buttons.forEach((action_button) => {
          if (action_button === button.nextElementSibling) {
            action_button.classList.remove("hidden");
          }
          // Add a border to related images
          product_images.forEach((product_image) => {
            if (
              product_image === button.previousElementSibling.firstElementChild
            ) {
              product_image.classList.add("bordered");
            }
          });
        });
        console.log(productName);

        let matchingItem;
        // if the product is already in the cart, increment the quantity
        cart.forEach((item) => {
          if (productName === item.productName) {
            matchingItem = item;
          }
        });
        // if the product is not in the cart, add it the first time
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          cart.push({
            productName: productName,
            price: productData.price, // Include price
            quantity: 1,
          });
          totalProducts = 1;
        }

        // Update the total number displayed in the action button
        const totalSpan = button.nextElementSibling.querySelector(".total");
        totalSpan.textContent = parseInt(totalSpan.textContent) + 1;

        // display the cart items
        let cartQuantity = 0;
        cart.forEach((item) => {
          cartQuantity += item.quantity;
        });
        // display total quantity in cart
        total_in_cart.innerHTML = cartQuantity;

        console.log(cartQuantity);

        updateCartDisplay();
      });
    });

    // INCREMENT BUTTON
    plusBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // Increment the total number displayed
        totalNum[index].textContent = parseInt(totalNum[index].textContent) + 1;

        // Update the cart
        const productName = btn
          .closest(".dessert")
          .querySelector(".main-button").dataset.productName;
        // Find the product data for the clicked item
        const productData = Array.from(data).find(
          (item) => item.name === productName
        );

        let matchingItem;
        cart.forEach((item) => {
          if (productName === item.productName) {
            matchingItem = item;
          }
        });
        if (matchingItem) {
          matchingItem.quantity += 1;
          productData.price += matchingItem.price;
        } else {
          cart.push({
            productName: productName,
            price: productData.price,
            quantity: 1,
          });
        }
        renderCartItems();
        // Update the total quantity in cart
        let cartQuantity = 0;
        cart.forEach((item) => {
          cartQuantity += item.quantity;
        });
        total_in_cart.innerHTML = cartQuantity;
        console.log(cartQuantity);

        // Update the cart display
        updateCartDisplay();
        updateActionTotal();
      });
    });

    // DECREMENT BUTTON
    minBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // Decrement the total number displayed
        if (totalNum[index].textContent <= 0) {
          totalNum[index].textContent = 0;
        } else {
          totalNum[index].textContent =
            parseInt(totalNum[index].textContent) - 1;
        }

        console.log(totalNum[index].textContent);
        // Update the cart
        const productName = btn
          .closest(".dessert")
          .querySelector(".main-button").dataset.productName;

        // Find the product data for the clicked item
        let matchingItem;
        cart.forEach((item) => {
          if (productName === item.productName) {
            matchingItem = item;
          }
        });

        if (matchingItem) {
          matchingItem.quantity -= 1;
          if (matchingItem.quantity <= 0) {
            // Remove the item from the cart if quantity is 0 or less
            cart = cart.filter((item) => item.productName !== productName);
          }
        }

        // Update the total quantity in cart
        let cartQuantity = 0;
        cart.forEach((item) => {
          cartQuantity += item.quantity;
        });
        total_in_cart.innerHTML = cartQuantity;
        console.log(cartQuantity);

        // Update the cart display
        updateCartDisplay();
        updateActionTotal();
      });
    });

    // RENDER ITEMS IN CART
    function renderCartItems() {
      if (cart.length === 0) {
        full_cart.classList.add("hidden");
        return;
      }

      // Variable to keep track of the total price
      let totalPrice = 0;

      // Clear the cart
      full_cart.innerHTML = "";

      // Iterate over cart items
      cart.forEach((item) => {
        // Checking if price or quantity are missing or invalid
        let price = item.price || 0; // Default to 0 if undefined
        let quantity = item.quantity || 0; // Default to 0 if undefined
        // Calculate if there's more than one product
        let price_multiply = price;
        if (quantity > 1) {
          price_multiply = price_multiply * quantity;
          quantity.textContent = quantity + 1;
        }

        // Calculate the total price
        totalPrice += price * quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
          <div class="cart-item-details">
            <p class="cart-item-name">${item.productName}</p>
            <div class="cart-item-details-bottom">
              <div class="cart-item-quantity-price">
                <p class="cart-item-quantity">${quantity}x</p>
                <p class="cart-item-price-value">$${price.toFixed(2)}</p>
                <p class="cart-item-price-add">$${price_multiply.toFixed(2)}</p>
              </div>
              <div class="remove-item">
                 <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        `;

        full_cart.appendChild(cartItem);
      });

      // Render the total price
      const totalPriceElement = document.createElement("div");
      totalPriceElement.classList.add("cart-total");

      totalPriceElement.innerHTML = `
        <p>Order Total </p> <span class="cart-total-value">$${totalPrice.toFixed(
          2
        )}</span>
      `;

      full_cart.appendChild(totalPriceElement);

      // Create description div

      const descriptionDiv = document.createElement("div");
      descriptionDiv.classList.add("description-div");

      descriptionDiv.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
        <p>This is a <span id="carbon-neutral">carbon-neutral</span> delivery</p>
      `;

      full_cart.appendChild(descriptionDiv);

      ///////////////////////////////
      // NOT COMPLETED YET
      //////////////////////////////
      document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (event) => {
          console.log("The button is clicked");

          // Find the cart item element
          const cartItem = event.target.closest(".cart-item");
          if (!cartItem) {
            console.error("Cart item not found!");
            return;
          }

          // Find the product name
          const productName = cartItem
            .querySelector(".cart-item-name")
            .textContent.trim();

          // Find the quantity element in the DOM
          const quantityElement = cartItem.querySelector(".item-quantity");

          // Find the matching item in the cart array
          let matchingItem = cart.find(
            (item) => item.productName === productName
          );

          if (matchingItem) {
            matchingItem.quantity -= 1;
            console.log(
              `Updated quantity for ${productName}:`,
              matchingItem.quantity
            );

            // If quantity is greater than 0, update the displayed quantity
            if (matchingItem.quantity > 0) {
              quantityElement.textContent = matchingItem.quantity;
            } else {
              // If quantity reaches 0, remove the item from the cart array and the DOM
              cart = cart.filter((item) => item.productName !== productName);
              cartItem.remove();
              console.log(`${productName} removed from cart.`);
            }
          }

          // Update total items count in cart
          total_in_cart.innerHTML = parseInt(total_in_cart.innerHTML) - 1;

          // Update cart display functions
          updateCartDisplay();
          renderCartItems();
          updateActionTotal();
        });
      });

      //
      // CONFIRM ORDER
      //
      // Create confirm button
      const confirmButton = document.createElement("button");
      confirmButton.classList.add("confirm-button");

      confirmButton.textContent = "Confirm Order";

      confirmButton.addEventListener("click", () => {
        // Render the confirmation container
        renderConfirmationContainer();

        // Display the confirmation container
        document.querySelector(".overlay-window").style.display = "flex";
      });
      full_cart.appendChild(confirmButton);

      //
      // Conformation container
      function renderConfirmationContainer() {
        const confirmationContainer =
          document.querySelector(".ordered-desserts");
        confirmationContainer.innerHTML = ""; // Clear the container

        cart.forEach((cartItem) => {
          // Find the matching product in data.json
          const productData = data.find(
            (item) => item.name === cartItem.productName
          );

          // If productData is found, use its image path; otherwise, use a fallback image
          const imagePath = productData
            ? productData.image.desktop
            : `assets/images/default-thumbnail.jpg`;

          const orderedDessert = document.createElement("div");
          orderedDessert.classList.add("ordered-dessert");

          orderedDessert.innerHTML = `
            <img src="${imagePath}" alt="${cartItem.productName} thumbnail" 
              onerror="this.onerror=null; this.src='assets/images/default-thumbnail.jpg';" />
            <div class="order-info">
              <div class="order-details">
                <h5 class="order-name">${cartItem.productName}</h5>
                <div class="order-price">
                  <span class="amount">${cartItem.quantity}x</span>
                  <span class="price">$${cartItem.price.toFixed(2)}</span>
                </div>
              </div>
              <div class="order-total-per-dessert">
                <p>$${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
              </div>
            </div>
          `;

          confirmationContainer.appendChild(orderedDessert);
        });

        // Calculate and display the total price
        const totalPrice = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        const orderTotal = document.createElement("div");
        orderTotal.classList.add("order-total");
        orderTotal.innerHTML = `
          <p>Order total</p>
          <span class="total-confirmed-price">$${totalPrice.toFixed(2)}</span>
        `;
        confirmationContainer.appendChild(orderTotal);

        // Add a button to start a new order
        const newOrderButton = document.createElement("button");
        newOrderButton.classList.add("new-order");
        newOrderButton.textContent = "Start New Order";
        newOrderButton.addEventListener("click", () => {
          // Clear the cart and update the display
          cart = [];
          updateCartDisplay();
          renderCartItems();
          updateActionTotal();
          confirmationContainer.innerHTML = "";
          total_in_cart.innerHTML = 0;
        });
        confirmationContainer.appendChild(newOrderButton);
      }
    }

    // Function to update the cart display
    function updateCartDisplay() {
      if (cart.length === 0) {
        empty_cart.classList.remove("hidden");
        full_cart.classList.add("hidden");
      } else {
        empty_cart.classList.add("hidden");
        full_cart.classList.remove("hidden");
      }
      renderCartItems();
    }

    updateCartDisplay();

    // Function to update the action total
    function updateActionTotal() {
      const totalSpan = document.querySelectorAll(".total");
      totalSpan.forEach((span) => {
        span.textContent = 0;
      });
      cart.forEach((item) => {
        const button = document.querySelector(
          `.main-button[data-product-name="${item.productName}"]`
        );
        if (button) {
          const totalSpan = button.nextElementSibling.querySelector(".total");
          totalSpan.textContent = item.quantity;
        }
      });
    }
  });
