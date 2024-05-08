/**
 * Applies parallax effect to specified elements based on scroll position.
 * This is ment for the main page (auctions)
 *
 */
export default function parallax() {
  const layer1 = document.getElementById("parallax-layer-3");
  const layer2 = document.getElementById("parallax-layer-2");
  const layer3 = document.getElementById("parallax-layer-1");
  const textLayer = document.getElementById("parallax-text");

  const speed1 = -0.2;
  const speed2 = -0.4;
  const speed3 = -0.6;

  if (window.scrollY < window.innerHeight / 3) {
    textLayer.classList.remove("hidden");
    alert("hidden removed");
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight) return;
    const offset = window.scrollY;

    window.requestAnimationFrame(() => {
      layer1.style.transform = `translateY(${offset * speed1}px)`;
      layer2.style.transform = `translateY(${offset * speed2}px)`;
      layer3.style.transform = `translateY(${offset * speed3}px)`;

      if (offset > window.innerHeight / 3) {
        textLayer.classList.add("hidden");
      }
      if (offset < window.innerHeight / 3) {
        textLayer.classList.remove("hidden");
      }
    });
  });
}
