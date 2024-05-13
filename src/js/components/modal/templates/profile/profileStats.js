import createEle from "../../../../utils/element/createEle.js";
import ifActive from "../../../../utils/helpers/listings/ifActive.js";
import displayBy from "../../../../utils/helpers/displayBy.js";

export default function profileStats(data) {
  let active = 0;
  let inactive = 0;

  data.listings.length > 0 &&
    data.listings.forEach((listing) =>
      ifActive(listing.endsAt) ? active++ : inactive++,
    );
  const container = createEle(
    "div",
    "flex flex-col gap-2 px-4 mt-10   justify-center items-center ",
  );

  const listings = createEle("h2", "text-lg font-semibold ", "Users listings");

  const statsContainer = createEle("div", "flex gap-6");

  const listingsBtn = createEle(
    "button",
    "  rounded-lg py-1   mt-1 font-semibold ",
    `Ongoing (${active})`,
  );

  listingsBtn.dataset.value = active;

  const winsBtn = createEle(
    "button",
    " rounded-lg py-1   mt-1 opacity-50",
    `Won (${data.wins.length})`,
  );

  winsBtn.dataset.value = data.wins.length;

  const soldBtn = createEle(
    "button",
    " rounded-lg py-1   mt-1 opacity-50",
    `Ended (${inactive})`,
  );
  soldBtn.dataset.value = inactive;

  const btns = [listingsBtn, winsBtn, soldBtn];

  statsContainer.append(listingsBtn, winsBtn, soldBtn);

  const displayContainer = createEle(
    "div",
    "flex  w-full justify-center flex-wrap gap-2 my-4",
  );
  listingsBtn.dataset.value > 0
    ? displayBy(data, listingsBtn, displayContainer)
    : displayContainer.append(
        createEle("p", "text-center text-lg mt-4"),
        "No listings found",
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
            createEle("p", "text-center text-lg mt-4"),
            "No listings found",
          );
    });
  });
  container.append(listings, statsContainer, displayContainer);
  return container;
}
