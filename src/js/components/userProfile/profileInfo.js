import createEle from "../../utils/element/createEle.js";
import editAvatar from "../modal/templates/editProfile/editAvatar.js";

export default function profileInfo(data) {
  const container = createEle(
    "div",
    "flex gap-4 px-4  items-center  flex-wrap max-w-sm mx-auto md:max-w-lg md:gap-8 lg:mx-0 lg:flex-nowrap lg:flex-col lg:bg-primary lg:py-10  lg:rounded-xl lg:min-w-96",
  );
  const avatar = createEle(
    "img",
    "w-28 h-28 rounded-full object-cover md:w-36 md:h-36 lg:w-60 lg:h-60",
  );
  avatar.src = data.avatar.url;
  avatar.alt = data.avatar.alt ? data.avatar.alt : "User avatar";
  const infoContainer = createEle(
    "div",
    "flex flex-col gap-2 items-start lg:items-center ",
  );
  const name = createEle(
    "h1",
    "text-lg font-semibold leading-4 md:text-xl",
    data.name,
  );
  const email = createEle(
    "p",
    "text-sm leading-4 opacity-50 md:text-base",
    data.email,
  );
  const creditsContainer = createEle("div", "flex gap-2 items-center");
  const creditsText = createEle(
    "p",
    "leading-4 font-medium md:text-lg",
    data.credits,
  );
  const credits = createEle("p", "leading-4 md:text-lg ", ` credits `);
  const coinIcon = createEle("i", "fa-solid fa-coins  text-cta md:text-lg");

  creditsContainer.append(coinIcon, creditsText, credits);

  const button = createEle(
    "button",
    "  bg-purple-100 shadow-md text-sm rounded-full text-primary py-1 w-32 px-2 mt-1 md:text-base hover:bg-cta duration-500",
    "Edit Profile",
  );

  button.addEventListener("click", function () {
    editAvatar(data);
  });

  infoContainer.append(name, email, creditsContainer, button);
  container.append(avatar, infoContainer);

  return container;
}
