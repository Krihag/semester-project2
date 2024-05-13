import placeholderImg from "../../../../img/placeholder.jpg";

/**
 * Adds an event listener to the input element that previews an image based on the input value.
 * If the input value is a valid URL, the image source will be set to the URL.
 * If the input value is empty or not a valid URL, a placeholder image will be displayed.
 *
 * @param {HTMLInputElement} input - The input element to listen for input events.
 * @param {HTMLImageElement} img - The image element to update the source based on the input value.
 * @param {HTMLElement} errContainer - The element to display an error message if the input value is to long.
 */
export default function previewImg(input, img, errContainer = false) {
  input.addEventListener("input", (e) => {
    const url = e.target.value;

    if (errContainer && e.target.value.length >= 300) {
      errContainer.textContent = "URL is to long (300 characters max)";
    } else if (errContainer && e.target.value.length < 300) {
      errContainer.textContent = "";
    }

    if (!url || url === "") {
      img.src = placeholderImg;
      return;
    }

    try {
      new URL(url);
      img.src = url;
    } catch (e) {
      console.error(e);

      img.src = placeholderImg;
    }
  });
}
