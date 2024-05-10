import profileInfo from "./profileInfo.js";
import createEle from "../../utils/element/createEle.js";
import profileStats from "./profileStats.js";
import bidsHistory from "./bidsHistory/index.js";
import getRequest from "../../api/auth/requests/getRequest.js";

export default async function userProfile(data) {
  const container = createEle(
    "section",
    "pb-6 flex flex-col  gap-4 lg:flex-row lg:justify-between w-full max-w-7xl lg:mx-auto lg:items-start mt-10 lg:my-16",
  );

  const userListings = await getRequest(
    `auction/profiles/${data.name}/listings?_bids=true&_seller=true`,
  );
  const wonListings = await getRequest(
    `auction/profiles/${data.name}/wins?_bids=true&_seller=true`,
  );
  const listings = userListings.data;
  const wins = wonListings.data;

  const infoAndBids = createEle("div", "");
  infoAndBids.append(profileInfo(data));

  const bids = await bidsHistory(data);
  infoAndBids.append(bids);
  container.append(infoAndBids);
  container.append(profileStats(listings, wins));

  return container;
}
//  classes that used to be on infoAndBids "lg:flex  mt-10 lg:mt-28 w-full max-w-7xl mx-auto lg:justify-between md:px-14"
