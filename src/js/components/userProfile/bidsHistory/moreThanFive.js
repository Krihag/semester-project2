import createEle from "../../../utils/element/createEle.js";
import bidItem from "./bidItem.js";

// not in use, might add back later
export default function moreThanFive(bids, btnsCont) {
  const container = createEle("tbody", "text-center bg-primary relative h-60 ");

  const btnsContainer = createEle(
    "div",
    "absolute flex justify-center items-center gap-4 w-full bottom-[-.5rem] right-1 gap-4 ",
  );
  const leftBtn = createEle(
    "button",
    "  rounded-full px-2.5 py-0.5 bg-cta text-primary  text-xl shadow-lg ",
    "<",
  );

  const btnsText = createEle("span");

  const rightBtn = createEle(
    "button",
    "rounded-full px-2.5 py-0.5 bg-cta text-primary  text-xl shadow-lg  ",
    ">",
  );

  btnsContainer.append(leftBtn, btnsText, rightBtn);

  let pages = 1;
  const pageArray = [];

  bids.forEach((bid, i) => {
    if (!pageArray[pages - 1]) {
      pageArray[pages - 1] = [];
    }
    pageArray[pages - 1].push(bid);
    if (pageArray[pages - 1].length === 5) {
      pages++;
    }

    if (i === bids.length - 1) {
      container.innerHTML = "";
      pageArray[0].forEach((bid) => container.append(bidItem(bid)));
    }
  });

  const numPages = pageArray.length;

  btnsText.textContent = `page 1 of ${numPages}`;

  leftBtn.addEventListener("click", () => {
    if (pages > 1) {
      pages--;
      container.innerHTML = "";
      pageArray[pages - 1].forEach((bid) => container.append(bidItem(bid)));
      btnsText.textContent = `page ${pages} of ${numPages}`;
    }
  });

  rightBtn.addEventListener("click", () => {
    if (pages < pageArray.length) {
      pages++;
      container.innerHTML = "";
      console.log("test");
      pageArray[pages - 1].forEach((bid) => container.append(bidItem(bid)));
      btnsText.textContent = `page ${pages} of ${numPages}`;
    }
  });

  pages = 1;

  console.log(pageArray);

  btnsCont.append(btnsContainer);
  return container;
}
