import createEle from "../../../../utils/element/createEle.js";

export default function profileMedia(data) {
  const container = createEle("div", "flex flex-col items-center w-full");

  const profileImg = createEle(
    "img",
    "w-40 h-40 border-2 border-lighterPurple rounded-full object-cover ",
  );
  profileImg.src = data.avatar.url;
  profileImg.alt = "profile image";

  const profileName = createEle("h3", "text-xl font-bold mt-4", data.name);

  const email = createEle("p", "text-white", data.email);

  container.append(profileImg, profileName, email);

  return container;
}
