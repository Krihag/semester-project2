import toggleContainer from "../../../utils/helpers/toggleContainer.js";

export default function hamburger() {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navBar = document.getElementById("nav-bar");

  hamburgerMenu.addEventListener("click", () => {
    navBar.classList.toggle("hidden");
    navBar.classList.toggle("flex");
  });

  toggleContainer(hamburgerMenu, navBar, false, "flex");
}
