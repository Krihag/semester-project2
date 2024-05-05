import createEle from "../../../utils/element/createEle.js";
import getRequest from "../../../api/auth/requests/getRequest.js";

import getDate from "../../../utils/helpers/getDate.js";
import bidHistory from "../../modal/templates/bidHistory/profileBids.js";

export default async function bidsHistory(data) {
  const bidsData = await getRequest(
    `auction/profiles/${data.name}/bids?_listings=true`,
  );

  const bids = bidsData.data;
  console.log(bids);

  const container = createEle(
    "div",
    "w-full py-8 px-4 relative max-w-sm mx-auto md:max-w-md lg:mx-0 xl:max-w-lg xl:px-0 xl:max-w-xl",
  );

  const titleContainer = createEle(
    "div",
    "flex justify-between items-start pb-2 ",
  );
  const title = createEle(
    "h2",
    "text-lg font-semibold mb-2 md:text-xl ",
    "Your latest bids",
  );

  const bidsContainer = createEle("div", "flex flex-col ");

  titleContainer.appendChild(title);
  if (bids.length > 3) {
    const button = createEle(
      "button",
      " border-b-2 border-orange-500 py-1 text-sm cursor-pointer md:text-base mb-4",
      `View all (${bids.length})`,
    );
    titleContainer.appendChild(button);

    button.addEventListener("click", () => {
      bidHistory(bids);
    });
  }

  console.log(bids);
  if (bids.length === 0) {
    const noBids = createEle(
      "div",
      "text-sm",
      "You have not placed any bids yet.",
    );
    bidsContainer.appendChild(noBids);
  } else if (bids.length <= 3) {
    bids.forEach((bid, i) => {
      const container = createEle(
        "div",
        "text-sm flex gap-4 justify-between items-center px-6 rounded-md py-2.5 md:text-base",
      );

      if (i === 0 || i === 2) container.classList.add("bg-primary");
      const itemName = createEle(
        "a",
        " text-sm w-32 ",
        bid.listing.title.length > 15
          ? bid.listing.title.slice(0, 15) + ".."
          : bid.listing.title,
      );
      itemName.href = `/listing/?id=${bid.listing.id}`;

      const bidAmount = createEle("div", "text-sm md:text-base", bid.amount);

      const createdAt = createEle(
        "div",
        "text-sm md:text-base",
        getDate(bid.created),
      );

      container.append(itemName, bidAmount, createdAt);
      bidsContainer.append(container);
    });
  } else if (bids.length > 3) {
    for (let i = 0; i < 3; i++) {
      const container = createEle(
        "div",
        "text-sm flex gap-4 justify-between items-center px-6 rounded-md py-2.5 md:text-base",
      );

      if (i === 0 || i === 2) container.classList.add("bg-primary");
      const itemName = createEle(
        "a",
        " text-sm w-28 md:text-base",
        bids[i].listing.title.length > 15
          ? bids[i].listing.title.slice(0, 15) + ".."
          : bids[i].listing.title,
      );
      itemName.href = `/listing/?id=${bids[i].listing.id}`;

      const bidAmount = createEle(
        "div",
        "text-sm md:text-base",
        bids[i].amount,
      );

      const createdAt = createEle(
        "div",
        "text-sm md:text-base",
        getDate(bids[i].created),
      );

      container.append(itemName, bidAmount, createdAt);
      bidsContainer.append(container);
    }
  }

  container.appendChild(titleContainer);
  container.appendChild(bidsContainer);

  return container;
}
