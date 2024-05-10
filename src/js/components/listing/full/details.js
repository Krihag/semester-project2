import createEle from "../../../utils/element/createEle.js";
import profile from "../../modal/templates/profile/index.js";
import editListing from "../../modal/templates/listing/editListing.js";
import getDate from "../../../utils/helpers/getDate.js";

export default function details(data, isOwner) {
  const container = createEle(
    "div",
    "w-full  pt-8 pb-4 px-6 sm:flex sm:flex-col sm:bg-primary  sm:rounded-t-xl lg:px-12 ",
  );

  let titleText = data.title;
  // Had to add this incase someone adds a long title with no spaces so it doesn't break the layout
  if (titleText.length > 20 && !titleText.includes(" ")) {
    titleText = titleText.slice(0, 20);
  }

  const title = createEle("h1", "text-lg lg:text-xl font-semibold ", titleText);

  const description = createEle(
    "p",
    "mt-4 text-gray-200 text-sm lg:text-base",
    data.description ? data.description : "No description provided.",
  );

  const headerContainer = createEle("div", "flex justify-between items-center");

  const sellerContainer = createEle(
    "div",
    "flex items-center gap-4 my-4   py-2 rounded-md ",
  );

  const updatedAt = createEle(
    "p",
    "text-sm w-24 text-purple-100 lg:text-base lg:w-32",
    new Date(data.updated) > new Date(data.created)
      ? `Updated: ${getDate(data.updated)}`
      : `Created: ${getDate(data.created)}`,
  );

  headerContainer.append(updatedAt);
  if (isOwner) {
    const editBtn = createEle(
      "button",
      "px-4 py-2 bg-purple-200 text-primary rounded-full text-sm lg:text-base hover:bg-cta duration-500",
      "Edit listing",
    );
    editBtn.addEventListener("click", () => {
      editListing(data);
    });
    headerContainer.append(editBtn);
  }
  const sellerImg = createEle(
    "img",
    "w-14 h-14 rounded-full  object-cover cursor-pointer ",
  );
  sellerImg.src = data.seller.avatar.url;

  // added the isClicking because if you double clicked it it would render the profile twice
  let isClicking = false;
  sellerImg.addEventListener("click", () => {
    if (isClicking) return;
    isClicking = true;
    setTimeout(() => {
      isClicking = false;
    }, 1000);
    profile(data.seller.name);
  });

  const sellerInfo = createEle("div", "flex flex-col ");

  const sellerTitle = createEle("p", "text-sm  ", "Seller: ");

  const sellerName = createEle(
    "a",
    "cursor-pointer hover:text-cta duration-300",
    data.seller.name,
  );

  sellerName.addEventListener("click", () => {
    if (isClicking) return;
    isClicking = true;
    setTimeout(() => {
      isClicking = false;
    }, 1000);
    profile(data.seller.name);
  });

  const tagsContainer = createEle(
    "div",
    "flex flex-wrap  mt-2 items-center gap-2",
  );

  if (data.tags.length > 0) {
    data.tags.forEach((tag) => {
      const tagEle = createEle(
        "span",
        "border px-4 py-1 bg-primary text-xs lg:text-sm rounded-full",
        tag.startsWith("#") ? tag : `#${tag}`,
      );
      tagsContainer.append(tagEle);
    });
  }

  sellerInfo.append(sellerTitle, sellerName);
  sellerContainer.append(sellerImg, sellerInfo);

  container.append(
    headerContainer,
    sellerContainer,
    title,
    tagsContainer,
    description,
  );
  return container;
}
