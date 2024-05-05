import createEle from "../../../../utils/element/createEle.js";
import modal from "../../index.js";
import getDate from "../../../../utils/helpers/getDate.js";

export default function bidHistory(bids) {
  const bidsContainer = createEle("div", "w-full py-8");

  const header = createEle(
    "div",
    "flex justify-between items-center py-2.5 px-4 rounded-md",
  );

  const itemName = createEle("div", " w-28", "Item:");
  const bidAmount = createEle("div", "w-20 ", "Bid: ");
  const createdAt = createEle("div", "", "Date:");

  header.append(itemName, bidAmount, createdAt);
  bidsContainer.append(header);

  bids.forEach((bid, i) => {
    const item = createEle(
      "div",
      "flex justify-between items-center py-2.5 px-4 rounded-md",
    );
    const itemName = createEle(
      "a",
      " text-sm w-28",
      bid.listing.title.length > 12
        ? bid.listing.title.slice(0, 12) + ".."
        : bid.listing.title,
    );

    itemName.title = bid.listing.title;

    i % 2 === 0 && item.classList.add("bg-lighterPurple");
    itemName.href = `/listing/?id=${bid.listing.id}`;

    const bidAmount = createEle("div", "text-sm text-center w-12 ", bid.amount);

    const createdAt = createEle("div", "text-sm", getDate(bid.created));

    item.append(itemName, bidAmount, createdAt);
    bidsContainer.append(item);
  });

  modal({
    ele: bidsContainer,
    title: "Your bid history",
  });
}

// const itemName = createEle(
//     "a",
//     " text-sm ",
//     bids[i].listing.title.length > 15
//       ? bids[i].listing.title.slice(0, 15) + ".."
//       : bids[i].listing.title
//   );
//   itemName.href = `/listing/?id=${bids[i].listing.id}`;

//   const bidAmount = createEle("div", "text-sm", bids[i].amount);

//   const createdAt = createEle("div", "text-sm", getDate(bids[i].created));

//   container.append(itemName, bidAmount, createdAt);
//   bidsContainer.append(container);
