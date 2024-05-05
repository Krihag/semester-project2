import postRequest from "../../../auth/requests/postRequest.js";

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
      // console.log(data.data);
    } else {
      console.error(err);
    }
  });
}
