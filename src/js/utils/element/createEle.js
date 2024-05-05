/**
 * Create a new element with optional classes and text content.
 * @param {string} tag - The tag name of the element.
 * @param {string} [classes] - A string containing the classes to add to the element. (optional)
 * @param {string} [text] - The text content of the element. (optional )
 * @returns {HTMLElement} The new element.
 */

export default function createEle(tag, classes = null, text = null) {
  const element = document.createElement(tag);
  if (classes) element.setAttribute("class", classes);
  if (text) element.textContent = text;

  return element;
}
