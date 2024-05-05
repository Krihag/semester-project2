import createEle from "../../../utils/element/createEle.js";
import profileModal from "../../modal/templates/profile/index.js";

export default function bidItem(bid, i) {
  const bidItem = createEle(
    "li",
    " py-2 flex items-center gap-2 justify-between px-4 rounded-lg ",
  );

  i % 2 === 0 && bidItem.classList.add("bg-lighterPurple", "sm:bg-primary");

  const bidderContainer = createEle("div", "flex items-center gap-2");

  const bidderImg = createEle("img", "w-6 h-6 rounded-full object-cover");

  bidderImg.src = bid.bidder.avatar.url;

  const bidderName = createEle(
    "a",
    "text-sm cursor-pointer md:text-base",
    bid.bidder.name,
  );

  const bidAmount = createEle(
    "span",
    " py-2 flex text-sm lg:text-base items-center gap-2 md:text-base",
    `${bid.amount} credits `,
  );

  // added the isClicking because if you double clicked it it would render the profile twice
  let isClicking = false;
  bidderName.addEventListener("click", () => {
    if (isClicking) return;
    isClicking = true;
    setTimeout(() => {
      isClicking = false;
    }, 1000);
    profileModal(bid.bidder.name);
  });

  bidderContainer.append(bidderImg, bidderName);

  bidItem.append(bidderContainer, bidAmount);

  return bidItem;
}
