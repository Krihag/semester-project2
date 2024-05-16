import putRequest from "../../../auth/requests/putRequest.js";
import errorMessage from "../../../../utils/helpers/errorMessage.js";
import userAvatar from "../../../../updates/actions/userAvatar.js";
import storage from "../../../../utils/storage/index.js";

export default function updateAvatar(form, endpoint) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
      avatar: {
        url: form.elements["avatar"].value,
        alt: "User's avatar image",
      },
    };

    const request = await putRequest(endpoint, body);

    const [data, err] = await request.fetch();

    if (data) {
      userAvatar(body.avatar.url);
      const profile = storage.load("profile");
      profile.avatar.url = body.avatar.url;
      storage.save("profile", profile);
    } else {
      errorMessage(err);
    }
  });
}
