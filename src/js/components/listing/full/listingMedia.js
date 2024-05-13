import createEle from "../../../utils/element/createEle.js";
import placeholderImg from "../../../../img/placeholder.jpg";

export default function listingMedia(data) {
  const figure = createEle("figure", "relative w-full  lg:text-xl");
  if (data.media) {
    if (data.media.length > 1) {
      const slider = createEle(
        "div",
        " relative flex w-full  overflow-hidden ",
      );

      const buttons = createEle(
        "div",
        "absolute bottom-2 bg-secondary opacity-85 left-6  py-2  flex justify-between w-5/6 rounded-3xl sm:max-w-sm flex items-center lg:left-12  xl:left-28",
      );

      const prev = createEle(
        "button",
        "py-2 px-4  fa-solid fa-chevron-left cursor-pointer",
      );

      let current = 0;
      const totalImg = createEle(
        "div",
        "   w-full text-sm  text-center lg:text-base",
        `${data.media.length}  images`,
      );

      const next = createEle(
        "i",
        " py-2 px-4  rounded-full fa-solid fa-chevron-right cursor-pointer  ",
      );

      buttons.append(prev, totalImg, next);
      buttons.appendChild(next);

      totalImg.textContent = `${current + 1}/${data.media.length} images`;

      prev.addEventListener("click", () => {
        const imgs = slider.querySelectorAll(".slider-img");
        imgs[current].classList.remove("opacity-100");
        imgs[current].classList.add("opacity-0");

        current = current === 0 ? imgs.length - 1 : current - 1;

        imgs[current].classList.remove("opacity-0");
        imgs[current].classList.add("opacity-100");

        totalImg.textContent = `${current + 1}/${data.media.length} images`;
      });

      next.addEventListener("click", () => {
        const imgs = slider.querySelectorAll(".slider-img");
        imgs[current].classList.remove("opacity-100");
        imgs[current].classList.add("opacity-0");

        current = current === imgs.length - 1 ? 0 : current + 1;

        imgs[current].classList.remove("opacity-0");
        imgs[current].classList.add("opacity-100");

        totalImg.textContent = `${current + 1}/${data.media.length} images`;
      });

      const imgContainer = createEle(
        "div",
        "relative w-full h-80 lg:h-[30rem] ",
      );
      data.media.forEach((img, i) => {
        const newImg = createEle(
          "img",
          "absolute w-full object-cover h-80 lg:h-[30rem] slider-img rounded-t-xl sm:rounded-xl",
        );
        newImg.src = img.url;
        newImg.alt = img.alt ? img.alt : "Listing image";

        if (i === 0) {
          newImg.classList.add("opacity-100");
        } else {
          newImg.classList.add("opacity-0");
        }

        newImg.id = `img-${i + 1}`;

        imgContainer.appendChild(newImg);
      });

      slider.appendChild(imgContainer);
      slider.appendChild(buttons);
      figure.appendChild(slider);
      // figure.appendChild(totalImg);
    } else {
      const img = createEle(
        "img",
        "w-full rounded-t-xl sm:rounded-xl h-80 lg:h-[30rem]  object-cover",
      );
      img.src = data.media[0]?.url ? data.media[0].url : placeholderImg;
      img.alt = data.media[0]?.alt ? data.media[0].alt : "Listing image";
      figure.appendChild(img);
    }
  }
  return figure;
}
