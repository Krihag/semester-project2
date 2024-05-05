import createEle from "../../utils/element/createEle.js";
import previewImg from "../../utils/helpers/image/previewImg.js";

export default function imgWithPreview(ele) {
  const figure = createEle("figure", "flex flex-col py-2");
  const img = createEle("img", "w-80 h-64 object-cover rounded-md shadow-md");

  const inputContainer = createEle("div", "flex flex-col gap-2 pb-6 ");
  const inputLabel = createEle("label", "", "Image url");

  const inputAndBtn = createEle("div", "flex gap-2 relative ");
  const input = createEle(
    "input",
    "w-full bg-purple-100 text-sm text-primary rounded-full px-4 py-2 outline-none  ",
  );
  input.type = "url";
  input.placeholder = "Enter image url";
  input.name = "image";
  // input.maxLength = "300";

  const btn = createEle(
    "button",
    "bg-cta  text-primary text-sm px-4 py-3 rounded-full ",
  );
  btn.textContent = "Upload";
  btn.type = "button";

  const errorContainer = createEle("div", "text-red-500 text-sm");
  inputAndBtn.append(input, btn);
  inputContainer.append(inputLabel, inputAndBtn, errorContainer);

  const addedImgs = createEle("div", "flex gap-2 flex-wrap pt-4");
  const addedImgArray = [];
  ele.images && ele.images.forEach((img) => addedImgArray.push(img.url));

  img.src = "/src/img/placeholder.jpg";

  previewImg(input, img, errorContainer);

  if (ele.images && ele.images.length > 0) {
    ele.images.forEach((image) => {
      const imgContainer = createEle(
        "div",
        "relative w-24 h-20 shadow-md rounded-md overflow-hidden",
      );
      const newImg = createEle(
        "img",
        "w-24 h-20 object-cover rounded-md create-img  ",
      );
      const closeBtn = createEle(
        "i",
        "absolute top-1 right-1 fa-solid fa-xmark cursor-pointer text-primary bg-pink-200 rounded-full py-1 px-1.5 shadow-lg",
      );

      closeBtn.addEventListener("click", () => {
        imgContainer.remove();
        addedImgArray.splice(addedImgArray.indexOf(image.url), 1);
        if (addedImgArray.length === 0) {
          img.src = "/src/img/placeholder.jpg";
        }
        if (newImg.src === img.src) {
          if (addedImgArray.length > 0) {
            img.src = addedImgArray[addedImgArray.length - 1];
          } else if (addedImgArray.length === 0) {
            img.src = "/src/img/placeholder.jpg";
          }
        }
      });
      newImg.src = image.url;

      imgContainer.append(newImg, closeBtn);

      addedImgs.append(imgContainer);
    });
  }

  figure.append(inputContainer, img, addedImgs);
  console.log(addedImgArray);
  btn.addEventListener("click", async () => {
    if (input.value.trim() === "") return;
    if (input.value.length >= 300) return;
    try {
      new URL(input.value);

      const imgContainer = createEle(
        "div",
        "relative w-24 h-20 shadow-md rounded-md overflow-hidden",
      );
      const newImg = createEle(
        "img",
        "w-24 h-20 object-cover rounded-md create-img  ",
      );
      const closeBtn = createEle(
        "i",
        "absolute top-1 right-1 fa-solid fa-xmark cursor-pointer text-primary bg-pink-200 rounded-full py-1 px-1.5 shadow-lg",
      );

      closeBtn.addEventListener("click", () => {
        imgContainer.remove();
        addedImgArray.splice(addedImgArray.indexOf(input.value), 1);
        if (addedImgArray.length === 0) {
          img.src = "/src/img/placeholder.jpg";
        }
        if (newImg.src === img.src) {
          if (addedImgArray.length > 0) {
            img.src = addedImgArray[addedImgArray.length - 1];
          } else if (addedImgArray.length === 0) {
            img.src = "/src/img/placeholder.jpg";
          }
        }
      });
      newImg.src = input.value;

      imgContainer.append(newImg, closeBtn);

      addedImgs.append(imgContainer);
      addedImgArray.push(input.value);
      console.log(addedImgArray);
      input.value = "";
      // img.src = "/src/img/placeholder.jpg";
    } catch (err) {
      console.error(err);
      // errorContainer.textContent = "Invalid URL";
    }
  });

  return figure;
}
