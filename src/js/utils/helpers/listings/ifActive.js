/**
 * Checks if the listing is currently active.
 * @param {string} date - The date of the listing.
 * @returns {boolean} - Returns true if the listing is active, otherwise false.
 */
export default function ifActive(date) {
  const now = new Date();
  const endDate = new Date(date);
  const timeLeft = endDate - now;

  return timeLeft > 0 ? true : false;
}
