import createEle from "../../../utils/element/createEle.js";

import addBid from "../../../api/events/eventListeners/auth/addBid.js";
import bidItem from "./bitItem.js";
import itemBids from "../../modal/templates/bidHistory/itemBids.js";

export default function bidsAndPrice(data) {
  const container = createEle(
    "div",
    "max-w-full  py-8 px-6  rounded-lg sm:flex sm:flex-row-reverse sm:px-0  sm:pt-0 sm:gap-4 lg:gap-10",
  );

  container.id = "bids-and-price";

  const CurPriceAndBids = createEle(
    "div",
    "w-full sm:bg-primary sm:px-6 lg:px-12 rounded-b-xl pt-4",
  );

  const price =
    data.bids.length > 0 ? data.bids[data.bids.length - 1].amount : 0;

  const currentPrice = createEle("p", " w-full mb-2", `Current bid: `);

  const priceSpan = createEle(
    "span",
    "w-full rounded-lg px-2 ml-6 py-1 my-2 ",
    ` ${price} credits`,
  );

  currentPrice.append(priceSpan);

  // container.append(currentPrice);

  const addBidContainer = createEle(
    "div",
    "flex  items center gap-3  relative",
  );

  const addBidInput = createEle(
    "input",
    "w-full bg-white text-sm lg:text-base  text-primary rounded-full outline-none px-4 py-2 my-2 ",
  );

  addBidInput.type = "number";
  addBidInput.placeholder = "Your offer...";

  const addBidBtn = createEle(
    "button",
    "bg-cta text-primary text-sm lg:text-base rounded-full px-8 py-1 my-2",
    "Bid",
  );

  const errMessage = createEle(
    "p",
    "h-4 text-red-400 text-sm lg:text-base pb-2",
  );

  addBidBtn.addEventListener("click", () => {
    addBid(data.id, addBidInput.value, errMessage);
  });

  addBidContainer.append(addBidInput, addBidBtn);
  CurPriceAndBids.append(currentPrice, addBidContainer, errMessage);

  const bidsHistoryContainer = createEle(
    "div",
    "w-full py-4 sm:pb-0 justify-self-end ",
  );

  const titleContainer = createEle(
    "div",
    "flex justify-between items-start pb-2 ",
  );

  const bidsHistoryTitle = createEle(
    "h2",
    "text-xl lg:text-3xl font-semibold",
    "Bid History",
  );

  titleContainer.append(bidsHistoryTitle);

  const bidsHistoryList = createEle(
    "ul",
    "w-full text-gray-200 py-2 lg:text-lg sm:pb-0",
  );

  bidsHistoryContainer.append(titleContainer, bidsHistoryList);

  if (data.bids.length === 0) {
    const noBids = createEle("li", " py-2", "No bids yet.");
    bidsHistoryList.appendChild(noBids);
  } else if (data.bids.length <= 3) {
    data.bids.forEach((bid, i) => {
      bidsHistoryList.append(bidItem(bid, i));
    });

    // if there are more than 3 bids, displays 3 bids and a button to view all (opens modal with all bids)
  } else {
    const button = createEle(
      "button",
      " border-b-2 border-orange-500 py-1 text-sm cursor-pointer md:text-base mb-4",
      `View all (${data.bids.length})`,
    );
    titleContainer.appendChild(button);

    for (let i = 0; i < 3; i++)
      bidsHistoryContainer.append(bidItem(data.bids[i], i));

    button.addEventListener("click", () => itemBids(data.bids));
  }

  container.append(CurPriceAndBids, bidsHistoryContainer);

  return container;
}
