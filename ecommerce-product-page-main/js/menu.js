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
