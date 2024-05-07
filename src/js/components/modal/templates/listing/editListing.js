import inputLabel from "../../../elements/inputLabel.js";
import button from "../../../elements/button.js";
import form from "../../../elements/form.js";
import modal from "../../index.js";
import imgWithPreview from "../../../elements/imgWithPreview.js";
import dateAndTime from "../../../elements/dateAndTime.js";
import textareaLabel from "../../../elements/textareaLabel.js";
import addTags from "../../../elements/addTags.js";
import cancelBtn from "../../../elements/cancelBtn.js";
import updateListing from "../../../../api/events/eventListeners/auth/updateListing.js";
import deleteRequest from "../../../../api/auth/requests/deleteRequest.js";

export default function editListing(data) {
  const title = inputLabel({
    text: "Title",
    name: "title",
    type: "text",
    value: data.title,
  });

  console.log(data);

  const description = textareaLabel({
    text: "Description",
    name: "description",
    type: "text",
    value: data.description,
  });

  const tags = addTags({
    id: "tags-container",
    tags: data.tags,
  });

  console.log(data.endsAt);

  const date = dateAndTime({
    value: data.endsAt,
  });

  const image = imgWithPreview({
    btn: true,
    id: "images-container",
    images: data.media,
  });
  const cancel = cancelBtn({
    text: "Delete",
    endpoint: `auction/listings/${data.id}`,
    onClick: deleteRequest,
    delete: true,
    confirm: true,
  });

  const submit = button({
    text: "Update",
  });

  const newForm = form({
    name: "updateListing",
    listen: updateListing,

    endpoint: `auction/listings/${data.id}/?_seller=true&_bids=true`,
  });

  newForm.append(title, image, description, tags, date, cancel, submit);

  modal({
    ele: newForm,
    title: "Edit listing",
  });
}
