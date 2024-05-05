import thumbnail from "../../../components/listing/thumbnail/index.js";

/**
 * Lazy loads listings.
 *
 * @param {Array} listings - The listings to lazy load.
 * @param {string} [container] - The container to render the listings that we want to display.
 * @param {number} [number=5] - The number of listings to load  (set to 6 by default).
 * @param {number} [observe=5] - The listing number to observe that will trigger loading new listings (set to 5 by default).
 */

export default function lazyLoadListings(
  listings,
  container,
  number = 6,
  observe = 5,
) {
  let count = 0;
  let index = number - 1;

  // resets the container, so that it can be reused with filtering
  container.innerHTML = "";

  // create new observer
  function createObs(ele) {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-100px",
      threshold: 0.1,
    });

    observer.observe(ele);
  }

  // handle intersection
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        renderListings();
      }
    });
  }

  // render listings
  function renderListings() {
    const indexStart = index * count;
    if (listings.length <= indexStart) return;
    const indexEnd =
      listings.length >= indexStart + number
        ? indexStart + number
        : listings.length;

    count++;

    for (let i = indexStart; i < indexEnd; i++) {
      if (listings[i]) {
        container.appendChild(thumbnail(listings[i]));
      }

      if (i + 1 === observe * count) {
        createObs(container.lastChild);
        console.log(`observer created for ${i + 1}th listing`);
      }
    }
  }

  renderListings();
}
