import createEle from "../../../utils/element/createEle.js";
import staticTimeLeft from "../../../utils/helpers/listings/staticTimeLeft.js";

/**
 * Creates a thumbnail element for a listing.
 * @param {Object} data - The data object containing information about the listing.
 * @returns {HTMLElement} - The created thumbnail element.
 */
export default function thumbnail(data) {
  const thumbnail = createEle(
    "a",
    "bg-primary w-full flex flex-col justify-center rounded-lg max-w-80  pb-4 shadow-lg md:max-w-[22rem]",
  );
  thumbnail.href = `/listing/?id=${data.id}`;

  thumbnail.dataset.endsAt = data.endsAt;

  const imgContainer = createEle("div", "w-full relative flex justify-center ");
  const img = createEle("img", "w-full h-52 rounded-t-lg object-cover md:h-60");
  img.src =
    data.media.length > 0 ? data.media[0].url : "/src/img/placeholder.jpg";
  img.alt = "placeholder";
  imgContainer.append(img);

  const timeLeft = createEle(
    "div",
    "absolute top-2 right-2 bg-primary opacity-85 p-2 text-sm w-40 flex justify-center gap-2 items-center rounded-3xl shadow-lg md:text-base lg:w-48 ",
  );

  const timeLeftClock = createEle(
    "i",
    "fa-regular fa-clock text-white lg:text-lg",
  );

  const timeLeftText = createEle(
    "span",
    "text-white text-sm lg:text-base lg:text-base",
    staticTimeLeft(data.endsAt),
  );

  timeLeft.append(timeLeftClock, timeLeftText);

  imgContainer.append(timeLeft);

  const contentContainer = createEle("div", "py-2 px-6 text-sm  ");

  const itemName = createEle(
    "div",
    " font-medium py-2 text-base text-purple-100 lg:text-lg",
    data.title.length > 22 ? data.title.slice(0, 22) + "..." : data.title,
  );
  itemName.title = data.title;

  const seller = createEle("div", "flex gap-4 items-center py-1");

  const sellerSpan = createEle(
    "span",
    "text-sm text-purple-100 lg:text-base",
    "Seller: ",
  );
  const sellerName = createEle(
    "span",
    "text-purple-100 lg:text-base",
    data.seller.name,
  );

  seller.append(sellerSpan, sellerName);

  contentContainer.append(itemName, seller);

  const currentBid = createEle("div", "flex gap-4 items-center ");

  const bidSpan = createEle(
    "span",
    "text-sm text-purple-100 lg:text-base",
    "Current bid: ",
  );
  const bidAmount = createEle(
    "span",
    "text-sm text-purple-100 lg:text-base",
    `${
      data.bids?.length > 0 ? data.bids[data.bids.length - 1].amount : 0
    } credits`,
  );

  currentBid.append(bidSpan, bidAmount);
  contentContainer.append(currentBid);

  const readMoreBtn = createEle(
    "button",
    " py-2 px-4 mt-4 bg-purple-200 text-primary rounded-full shadow-md w-full hover:bg-cta duration-500 lg:text-base  ",
    "View listing",
  );

  // if (data.tags.length > 0) {
  //   console.log("test");
  //   const tagsContainer = createEle("div", "flex gap-2 items-center ");
  //   data.tags.forEach((tag) => {
  //     console.log(tag);
  //     const tagEle = createEle(
  //       "span",
  //       "text-xs opacity-80 text-white   rounded-md",
  //       "#" + tag
  //     );
  //     tagsContainer.append(tagEle);
  //   });
  //   console.log(tagsContainer);
  //   contentContainer.append(tagsContainer);
  // }

  contentContainer.append(seller, readMoreBtn);
  thumbnail.append(imgContainer, contentContainer);

  return thumbnail;
}
