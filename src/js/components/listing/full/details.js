import createEle from "../../../utils/element/createEle.js";
import profile from "../../modal/templates/profile/index.js";
import editListing from "../../modal/templates/listing/editListing.js";

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
  console.log(titleText);
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
  headerContainer.append(sellerContainer);

  if (isOwner) {
    const editBtn = createEle(
      "button",
      "px-4 py-2 bg-purple-200 text-primary rounded-full text-sm lg:text-base",
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

  const sellerName = createEle("a", null, data.seller.name);

  sellerName.addEventListener("click", () => {
    if (isClicking) return;
    isClicking = true;
    setTimeout(() => {
      isClicking = false;
    }, 1000);
    profile(data.seller.name);
  });

  sellerInfo.append(sellerTitle, sellerName);
  sellerContainer.append(sellerImg, sellerInfo);

  container.append(headerContainer, title, description);
  return container;
}
