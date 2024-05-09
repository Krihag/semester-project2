import storage from "../../../../utils/storage/index.js";
import login from "../../../../components/modal/templates/login/index.js";
import postRequest from "../../../auth/requests/postRequest.js";

import inputError from "../../../../components/modal/handler/inputError.js";

export default async function createListing(form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (inputError(form, "title", "* Title cannot be empty")) return;

    const user = storage.load("profile");
    if (!user?.loggedIn) {
      login();
      return;
    }

    const formData = new FormData(form);

    const tags = form.querySelectorAll(".create-tag");

    const tagsContainer = [];

    tags?.length > 0 &&
      tags.forEach((tag) => {
        tagsContainer.push(tag.textContent.slice(1));
      });

    const data = Object.fromEntries(formData.entries());
    tagsContainer.length > 0 && (data.tags = tagsContainer);

    const imgs = form.querySelectorAll(".create-img");
    const images = [];

    imgs.length > 0 &&
      imgs.forEach((img) => {
        images.push({
          url: img.src,
          alt: img.alt ? img.alt : "Listing image",
        });
      });

    data.media = images.length > 0 ? images : null;

    data.endsAt = new Date(`${data.date}`);

    const request = await postRequest(data, "auction/listings/?_seller=true");

    const [res, err] = await request.fetch();

    if (res) {
      window.location.href = `/listing/?id=${res.data.id}`;
      storage.save("successMessage", "Listing created");
    } else {
      console.log(err);
    }
  });
}
