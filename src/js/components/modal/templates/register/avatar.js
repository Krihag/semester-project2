import createEle from "../../../../utils/element/createEle.js";
import previewImg from "../../../../utils/helpers/image/previewImg.js";
import placeholderImg from "../../../../../img/placeholder.jpg";

export default function avatar() {
  const container = createEle("div", "flex flex-col justify-center gap-2 my-4");
  const header = createEle(
    "h3",
    "text-lg text-center font-semibold",
    "Profile image",
  );
  const avatar = createEle("div", "w-40 h-40 rounded-full mb-2 self-center");
  const avatarImg = createEle("img", "rounded-full h-40 w-40 object-cover");
  avatarImg.src = placeholderImg;
  avatarImg.alt = "avatar";
  const label = createEle("label", "", "enter image url");
  const input = createEle(
    "input",
    "rounded-full bg-purple-100 text-primary py-2 px-4 w-full max-w-full outline-none text-primary text-sm",
  );

  avatar.append(avatarImg);
  container.append(header, avatar, label, input);
  previewImg(input, avatarImg);
  return container;
}
