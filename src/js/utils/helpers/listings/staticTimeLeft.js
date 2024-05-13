/**
 * Gets the date of the auction and returns the time left until the auction ends based on current time.
 *  Not ment for live update (check countdown function for this)

 * @param {string} date - The end date of the auction in string format.
 * @returns {string} - The time left until the auction ends. Returns as string, but in different text format based on the time left.
 */
export default function staticTimeLeft(date) {
  const now = new Date();
  const endDate = new Date(date);
  const timeLeft = endDate - now;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  if (timeLeft < 0) {
    return "Auction ended";
  } else if (days === 0 && hours === 0 && minutes === 0) {
    return `Less than a minute left`;
  } else if (days === 0 && hours === 0) {
    return `${minutes} minutes left`;
  } else if (days === 0) {
    return `${hours}h ${minutes}m left`;
  } else if (days >= 1) {
    return `${days}d ${hours}h left`;
  } else if (days < 10) {
    return `${days} days left`;
  }
}
