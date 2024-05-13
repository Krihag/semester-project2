import createEle from "../../utils/element/createEle.js";
import ifActive from "../../utils/helpers/listings/ifActive.js";
import thumbnail from "../listing/thumbnail/index.js";

export default function profileStats(listings, wins) {
  let active = 0;
  let inactive = 0;

  const data = {
    listings: listings,
    wins: wins,
  };

  listings.length > 0 &&
    listings.forEach((listing) =>
      ifActive(listing.endsAt) ? active++ : inactive++,
    );
  const container = createEle(
    "div",
    "flex flex-col gap-2 px-4 mt-10 justify-center max-w-sm mx-auto w-full  xl:max-w-[45rem] md:gap-4 lg:mt-0 lg:mx-0 xl:px-0",
  );

  const listingsHeader = createEle(
    "h2",
    "text-lg font-semibold md:text-2xl",
    "Your listings",
  );

  const statsContainer = createEle(
    "div",
    "flex w-80 md:w-full justify-between ",
  );

  const listingsBtn = createEle(
    "button",
    "  rounded-lg py-1   mt-1 font-semibold md:text-lg flex gap-1 items-center",
    `Ongoing `,
  );

  const ongoingSpanOne = createEle(
    "span",
    "text-lg hidden xl:flex",
    "listings ",
  );
  const ongoingSpanTwo = createEle("span", "text-lg  xl:flex", `(${active})`);

  listingsBtn.append(ongoingSpanOne, ongoingSpanTwo);

  listingsBtn.dataset.value = active;

  const winsBtn = createEle(
    "button",
    " rounded-lg py-1   mt-1 opacity-50 md:text-lg flex gap-1 items-center",
    `Won `,
  );

  const winsSpanOne = createEle("span", "text-lg hidden xl:flex", "listings ");
  const winsSpanTwo = createEle("span", "text-lg  xl:flex", `(${wins.length})`);
  winsBtn.append(winsSpanOne, winsSpanTwo);

  winsBtn.dataset.value = wins.length;

  const soldBtn = createEle(
    "button",
    " rounded-lg py-1   mt-1 opacity-50 md:text-lg flex gap-1 items-center",
    `Ended `,
  );
  soldBtn.dataset.value = inactive;

  const soldSpanOne = createEle("span", "text-lg hidden xl:flex", "listings ");
  const soldSpanTwo = createEle("span", "text-lg  xl:flex", `(${inactive})`);

  soldBtn.append(soldSpanOne, soldSpanTwo);

  const btns = [listingsBtn, winsBtn, soldBtn];

  statsContainer.append(listingsBtn, winsBtn, soldBtn);

  const displayContainer = createEle(
    "div",
    "flex  w-full flex-wrap gap-2 my-4 lg:gap-4 lg:justify-between",
  );
  listingsBtn.dataset.value > 0
    ? displayBy(data, listingsBtn, displayContainer)
    : displayContainer.append(
        createEle(
          "p",
          "text-center mt-4 md:text-lg ",
          "You have no active listings",
        ),
      );

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      displayContainer.innerHTML = "";
      btns.forEach((b) => {
        b.classList.remove("opacity-50");
        b.classList.add("opacity-50");
      });
      btn.classList.remove("opacity-50");
      btn.classList.add("opacity-100");
      btn.dataset.value > 0
        ? displayBy(data, btn, displayContainer)
        : displayContainer.append(
            createEle("p", "text-center mt-4 md:text-lg ", "No listings found"),
          );
    });
  });
  container.append(listingsHeader, statsContainer, displayContainer);
  return container;
}

/**
 * Displays listings based on the selected button value.
 *
 * @param {Object} data - The data object containing listings and name.
 * @param {HTMLElement} btn - The button element that triggered the display.
 * @param {HTMLElement} container - The container element to display the listings.
 * @returns {void}
 */
function displayBy(data, btn, container) {
  if (btn.dataset.value === 0)
    return createEle("p", "text-center text-lg mt-4", "No listings found");
  if (btn.textContent.includes("Ongoing")) {
    data.listings.forEach((listing) => {
      ifActive(listing.endsAt) && container.appendChild(thumbnail(listing));
    });
  } else if (btn.textContent.includes("Won")) {
    data.wins.forEach((listing) => {
      !ifActive(listing.endsAt) && container.appendChild(thumbnail(listing));
    });
  } else if (btn.textContent.includes("Ended")) {
    data.listings.forEach((listing) => {
      !ifActive(listing.endsAt) && container.appendChild(thumbnail(listing));
    });
  }
}
