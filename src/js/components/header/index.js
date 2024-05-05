import loggedIn from "./loggedIn/index.js";
import loggedOut from "./loggedOut/index.js";
import hamburger from "./hamburger/index.js";
import storage from "../../utils/storage/index.js";

/**
 * Checks if the user is logged in or not and renders the appropriate nav items (after clearing the navbar element)
 * Runs hamburger function to enable mobile navigation
 * @module src/js/components/header/index
 * @returns {profiledata | null} - The profile data if the user is logged in, otherwise null
 */
export default function header() {
  const navBar = document.getElementById("nav-bar");
  navBar.innerHTML = "";

  hamburger();

  const data = storage.load("profile")?.loggedIn
    ? loggedIn(navBar)
    : loggedOut(navBar);

  return data;
}
