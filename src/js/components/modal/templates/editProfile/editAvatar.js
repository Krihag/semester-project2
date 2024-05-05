import button from "../../../elements/button.js";
import inputLabel from "../../../elements/inputLabel.js";
import form from "../../../elements/form.js";
import modal from "../../index.js";
import cancelBtn from "../../../elements/cancelBtn.js";
import previewImg from "../../../../utils/helpers/image/previewImg.js";

export default function editAvatar(data) {
  const avatar = document.createElement("img");
  avatar.src = data.avatar.url;
  avatar.alt = "User's avatar";
  avatar.setAttribute(
    "class",
    "w-40 h-40 rounded-full flex self-center object-cover",
  );

  const fileInput = inputLabel({
    text: "Upload new avatar",
    name: "avatar",
    type: "url",
    placeholder: "Your image url...",
  });

  const cancel = cancelBtn();

  const submit = button({
    text: "Upload",
  });

  const newForm = form({
    name: "editAvatar",
  });
  newForm.setAttribute("class", "flex flex-col gap-4 w-full  justify-center");

  previewImg(fileInput, avatar);
  newForm.append(avatar, fileInput, cancel, submit);

  modal({
    ele: newForm,
    title: "Edit avatar",
  });
}
