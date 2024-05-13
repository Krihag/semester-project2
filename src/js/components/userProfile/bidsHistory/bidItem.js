import createEle from "../../../utils/element/createEle.js";
import getDate from "../../../utils/helpers/getDate.js";

// not in use, might add back later
export default function bidItem(bid) {
  const tr = createEle("tr", "text-sm text-left");
  const td1 = createEle(
    "td",
    "text-sm border border-lighterPurple px-2 py-1",
    bid.listing.title.length > 30
      ? bid.listing.title.slice(0, 30) + ".."
      : bid.listing.title,
  );
  const td2 = createEle(
    "td",
    "text-sm border border-lighterPurple px-2 py-1 text-center",
    bid.amount,
  );
  const td3 = createEle(
    "td",
    "border  border-lighterPurple px-2 py-1 text-white text-center",
    getDate(bid.created),
  );

  tr.append(td1, td2, td3);

  td1.addEventListener("click", () =>
    window.location.assign(`/listing/?id=${bid.listing.id}`),
  );

  return tr;
}
