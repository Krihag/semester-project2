import profileMedia from "./profileMedia.js";
import profileStats from "./profileStats.js";
import createEle from "../../../../utils/element/createEle.js";
import getRequest from "../../../../api/auth/requests/getRequest.js";
import storage from "../../../../utils/storage/index.js";
import modal from "../../index.js";
import loginModal from "../login/index.js";

/**
 * Fetches and creates profile content for modal.
 * The profile component displays the user's profile information and media.
 * Ment for displaying profiles of other users and not the logged in user (that is handled by the profile component in the user profile page).
 * @param {string} name - The name of the profile.
 * @returns {Promise<HTMLDivElement>} The profile component container.
 */
export default async function profile(name) {
  const userProfile = storage.load("profile");

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
  console.log(data);
  const media = profileMedia(data, isOwner);
  const stats = profileStats(data);

  container.append(media, stats);

  console.log(container);

  modal({
    ele: container,
    title: `${data.name}'s profile`,
  });
}
