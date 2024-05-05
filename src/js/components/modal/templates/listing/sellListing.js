import inputLabel from "../../../elements/inputLabel.js";
import button from "../../../elements/button.js";
import form from "../../../elements/form.js";
import modal from "../../index.js";
import imgWithPreview from "../../../elements/imgWithPreview.js";
import dateAndTime from "../../../elements/dateAndTime.js";
import textareaLabel from "../../../elements/textareaLabel.js";
import addTags from "../../../elements/addTags.js";
import cancelBtn from "../../../elements/cancelBtn.js";
import createListing from "../../../../api/events/eventListeners/auth/createListing.js";

export default function sellListing() {
  const title = inputLabel({
    text: "Title",
    name: "title",
    type: "text",
    required: true,
  });

  const description = textareaLabel({
    text: "Description",
    name: "description",
    type: "text",
  });

  const tags = addTags({
    id: "tags-container",
  });

  const date = dateAndTime();

  const image = imgWithPreview({
    btn: true,
    id: "images-container",
  });
  const cancel = cancelBtn({
    text: "Cancel",
  });

  const submit = button({
    text: "Add Listing",
  });

  const newForm = form({
    name: "sellListing",
    listen: createListing,
  });

  // newForm.append(title, description, tags, date, image, cancel, submit);
  newForm.append(title, image, description, tags, date, cancel, submit);

  modal({
    ele: newForm,
    title: "New listing",
  });
}
