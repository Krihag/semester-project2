import createEle from "../../../utils/element/createEle.js";
import sellListing from "../../modal/templates/listing/sellListing.js";
import storage from "../../../utils/storage/index.js";
import getRequests from "../../../api/auth/requests/getRequest.js";
import header from "../index.js";

export default async function loggedIn(container) {
  const user = storage.load("profile");
  const userData = await getRequests(
    "auction/profiles/" + user.name + "/?_listings=true&_wins=true",
  );

  const userCredits = userData.data.credits;

  console.log(userData);

  const userProfileContainer = createEle(
    "a",
    "flex items-center gap-4 pb-6 lg:pb-0 border-b border-lighterPurple lg:border-0 lg:order-4 lg:mx-10",
  );
  userProfileContainer.href = "/profile/";
  const userProfile = createEle("img", "w-12 h-12 rounded-full object-cover");

  const nameAndCredits = createEle("div", "flex flex-col ");
  const userName = createEle("span", "text-lg", user.name);

  const credits = createEle("div", "flex  items-center gap-2");
  const creditsText = createEle("span", false, "Credits: ");
  const creditsAmount = createEle("span", "text-cta font-medium", userCredits);
  creditsAmount.id = "user-credits";

  credits.append(creditsText, creditsAmount);
  nameAndCredits.append(userName, credits);

  userProfile.src = user.avatar.url;
  userProfile.alt = user.avatar.alt ? user.avatar.alt : "User avatar";

  userProfileContainer.append(userProfile, nameAndCredits);

  const homeContainer = createEle(
    "a",
    "flex text-lg items-center gap-4 p-1 mt-3 lg:mt-0",
  );
  const homeIcon = createEle(
    "i",
    "fa-solid fa-home w-6 text-purple-100 lg:hidden",
  );
  const home = createEle(
    "span",
    "text-purple-100 lg:text-lg hover:text-cta duration-300",
    "Home",
  );
  homeContainer.href = "/";
  homeContainer.append(homeIcon, home);

  const profileContainer = createEle(
    "a",
    "flex text-lg items-center gap-4 p-1",
  );
  const profileIcon = createEle(
    "i",
    "fa-solid fa-user w-6 text-purple-100 lg:hidden",
  );
  const profile = createEle(
    "span",
    "text-purple-100 lg:text-lg hover:text-cta duration-300",
    "Profile",
  );
  profileContainer.href = "/profile/";

  profileContainer.append(profileIcon, profile);

  const sellItemContainer = createEle(
    "a",
    "flex text-lg items-center cursor-pointer gap-4 p-1",
  );
  const sellItemIcon = createEle(
    "i",
    "fa-solid fa-tag w-6 text-purple-100 lg:hidden",
  );
  const sellItem = createEle(
    "span",
    "text-purple-100 lg:text-lg hover:text-cta duration-300",
    "Sell item",
  );

  sellItemContainer.append(sellItemIcon, sellItem);

  const logoutContainer = createEle(
    "a",
    "flex text-lg items-center  mt-3   gap-4 p-1  border-t border-lighterPurple  cursor-pointer   lg:px-8  lg:mt-0 lg:order-5 lg:border lg:rounded-full lg:border-purple-100  hover:border-cta duration-500",
  );
  const logoutIcon = createEle(
    "i",
    "fa-solid fa-sign-out  w-6 text-purple-100 lg:hidden",
  );
  const logout = createEle(
    "span",
    " lg:py-1 text-purple-100 lg:text-base ",
    "Logout",
  );

  logoutContainer.append(logoutIcon, logout);

  logout.addEventListener("click", () => {
    storage.clear();
    header();
  });

  sellItem.addEventListener("click", sellListing);

  container.append(
    userProfileContainer,
    homeContainer,
    profileContainer,
    sellItemContainer,
    logoutContainer,
  );

  return userData.data;
}
