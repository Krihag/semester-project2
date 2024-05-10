import profileMedia from "./profileMedia.js";
import profileStats from "./profileStats.js";
import createEle from "../../../../utils/element/createEle.js";
import getRequest from "../../../../api/auth/requests/getRequest.js";
import storage from "../../../../utils/storage/index.js";
import modal from "../../index.js";
import loginModal from "../login/index.js";
import modalToggle from "../../handler/toggleModal.js";

/**
 * Fetches and creates profile content for modal.
 * The profile component displays the user's profile information and media.
 * Ment for displaying profiles of other users and not the logged in user (that is handled by the profile component in the user profile page).
 * @param {string} name - The name of the profile.
 * @returns {Promise<HTMLDivElement>} The profile component container.
 */
export default async function profile(name) {
  const userProfile = storage.load("profile");

  // Closes the modal to reset it to prevent issue when opening a new user profile from the profileModal.
  modalToggle.close();

  // If the user is not logged in, opens the login modal instead.
  if (!userProfile) {
    loginModal();
    return;
  }
  const container = createEle("div");
  const isOwner = storage.load("profile")?.name === name ? true : false;

  // Added this so that if the user is trying to click on their own profile, they are redirected to their profile page and not a modal
  isOwner && window.location.replace("/profile/");

  const profileData = await getRequest(
    `auction/profiles/${name}?_listings=true&_wins=true&_bids=true`,
  );
  const data = profileData.data;

  const userListings = await getRequest(
    `auction/profiles/${data.name}/listings?_bids=true&_seller=true`,
  );
  const wonListings = await getRequest(
    `auction/profiles/${data.name}/wins?_bids=true&_seller=true`,
  );

  const media = profileMedia(data, isOwner);
  const stats = profileStats({
    listings: userListings.data,
    wins: wonListings.data,
  });

  container.append(media, stats);

  modal({
    ele: container,
    title: `${data.name}'s profile`,
  });
}
