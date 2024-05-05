// export default function updateProfile(form) {
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const formData = new FormData(avatarForm);
//     const body = {
//       avatar: formData.get("avatar"),
//     };

//     const request = await postRequest(body, "auth/updateAvatar");
//     const [data, err] = await request.fetch();

//     if (data) {
//       console.log(data.data);
//     } else {
//       console.error(err);
//     }
//   });
// }
