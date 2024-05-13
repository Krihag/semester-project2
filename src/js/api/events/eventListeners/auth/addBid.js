import storage from "../../../../utils/storage/index.js";
import login from "../../../../components/modal/templates/login/index.js";
import postRequest from "../../../auth/requests/postRequest.js";
import bidsAndCredits from "../../../../updates/actions/bidsAndCredits.js";

export default async function addBid(id, amount, errContainer = false) {
  const profile = storage.load("profile");
  if (!profile?.loggedIn) {
    login();
    return;
  }

  const endpoint = `auction/listings/${id}/bids`;

  const body = {
    amount: Number(amount),
  };

  const request = await postRequest(body, endpoint);
  const [data, err] = await request.fetch();

  if (data) {
    bidsAndCredits();
  } else {
    if (errContainer) {
      errContainer.textContent = err;
      setTimeout(() => {
        errContainer.textContent = "";
      }, 7000);
      return;
    }
  }
}
