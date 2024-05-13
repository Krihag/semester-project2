/**
 *
 * Update the text content of an element and/or appends children.
 * @param {string} ele - The element to be updated
 * @param {string} [text] - The text content of the element. (optional)
 * @param {HTMLElement} [children] - The children of the element. (optional)
 * @returns {HTMLElement} The updated element.
 *
 **/

export default function updateEle(ele, text = null, children = null) {
  const element = document.querySelector(ele);
  text && (element.textContent = text);
  text && element.appendChild(children);
  return element;
}
