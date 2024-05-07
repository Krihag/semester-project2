import postRequest from "../../../auth/requests/postRequest.js";
import storage from "../../../../utils/storage/index.js";
import loginReq from "../../../../updates/actions/loginReq.js";
import errorMessage from "../../../../utils/helpers/errorMessage.js";

export default async function loginListen(form) {
  const loginForm = form ? form : document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
      email: loginForm.elements["email"].value,
      password: loginForm.elements["password"].value,
    };

    const request = await postRequest(body);

    const [data, err] = await request.fetch();

    if (data) {
      console.log(data);
      console.log(data.data);
      const { accessToken, ...profile } = data.data;
      profile.loggedIn = true;

      storage.save("profile", profile);
      storage.save("token", accessToken);
      loginReq();
    } else {
      const errorContainer = document.getElementById("modal-error-display");
      if (errorContainer) {
        errorContainer.textContent = `* ${err}`;
        setTimeout(() => (errorContainer.textContent = ""), 5000);
      } else errorMessage(err);
    }
  });
}
