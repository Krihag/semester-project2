import storage from "../../../../utils/storage/index.js";
import login from "../../../../components/modal/templates/login/index.js";
import successMessage from "../../../../utils/helpers/successMessage.js";
import putRequest from "../../../auth/requests/putRequest.js";
import modalToggle from "../../../../components/modal/handler/toggleModal.js";
import fullListing from "../../../../components/listing/full/index.js";
import inputError from "../../../../components/modal/handler/inputError.js";

export default async function updateListing(form, endpoint) {
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
    console.log(data);

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

    const request = await putRequest(endpoint, data);

    const [res, err] = await request.fetch();

    if (res) {
      console.log(res.data);
      fullListing(res.data);

      successMessage("Listing updated");
      modalToggle.close();
    } else {
      console.log(err);
    }
  });
}
