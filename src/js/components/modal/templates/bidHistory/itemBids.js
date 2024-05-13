import createEle from "../../../../utils/element/createEle.js";
import modal from "../../index.js";
import getDate from "../../../../utils/helpers/getDate.js";
import profileModal from "../profile/index.js";
import modalToggle from "../../handler/toggleModal.js";

export default function itemBids(bids) {
  const bidsContainer = createEle("div", "w-full py-8");

  const header = createEle(
    "div",
    "flex justify-between items-center py-2.5 px-4 rounded-md",
  );

  const userName = createEle("div", null, "user:");
  const bidAmount = createEle("div", null, "bid:");
  const createdAt = createEle("div", null, "Date:");

  header.append(userName, bidAmount, createdAt);
  bidsContainer.append(header);

  bids.forEach((bid, i) => {
    const item = createEle(
      "div",
      "flex justify-between items-center py-2.5 px-4 rounded-md",
    );

    i % 2 === 0 && item.classList.add("bg-lighterPurple");
    const userName = createEle(
      "a",
      "cursor-pointer hover:text-cta duration-300 w-28",
      bid.bidder.name.length > 12
        ? bid.bidder.name.slice(0, 12) + ".."
        : bid.bidder.name,
    );
    userName.title = bid.bidder.name;
    userName.addEventListener("click", () => {
      modalToggle.close();
      profileModal(bid.bidder.name);
    });

    const bidAmount = createEle("div", null, bid.amount);

    const createdAt = createEle(
      "div",
      "text-sm lg:text-base",
      getDate(bid.created),
    );

    item.append(userName, bidAmount, createdAt);
    bidsContainer.append(item);
  });

  modal(
    {
      ele: bidsContainer,
      title: "Listing bid history",
    },
    true,
  );
}
