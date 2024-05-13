import postRequest from "../../../auth/requests/postRequest.js";
import errorMessage from "../../../../utils/helpers/errorMessage.js";
import loginReq from "../../../../updates/actions/loginReq.js";
import storage from "../../../../utils/storage/index.js";

export default function registerListen(form) {
  const registerForm = form ? form : document.getElementById("register-form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
      name: registerForm.elements["name"].value,
      email: registerForm.elements["email"].value,
      password: registerForm.elements["password"].value,
    };

    const request = await postRequest(body, "auth/register");
    const [data, err] = await request.fetch();

    if (data) {
      const [loginData, loginErr] = await request.fetch("auth/login");
      if (loginData) {
        const { accessToken, ...profile } = loginData.data;
        profile.loggedIn = true;
        storage.save("profile", profile);
        storage.save("token", accessToken);
        loginReq();
      } else {
        errorMessage(loginErr);
      }
    } else {
      errorMessage(err);
    }
  });
}
