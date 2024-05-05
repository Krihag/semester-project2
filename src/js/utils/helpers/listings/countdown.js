/**
 * Updates the countdown timer for a specific auction listing every 1 second based on the endsAt of the data received.
 * it will update the days, hours, minutes and seconds left until the date provided.
 * The date provided will have to be in the format "YYYY-MM-DDTHH:MM:SSZ".
 * It also needs to be in the future as the countdown will not work for past dates, it will just display "Auction has ended".
 * the setinterval will also be cleared once the countdown reaches 0.
 * @param {string} data - the profile data object containing the date the auction ends and other listing information.
 */
export default function timeCountdown(data) {
  const daysLeft = document.getElementById("days-left");
  const hoursLeft = document.getElementById("hours-left");
  const minutesLeft = document.getElementById("minutes-left");
  const secondsLeft = document.getElementById("seconds-left");

  const countDownDate = new Date(data.endsAt);

  console.log(data);

  const formatTime = (time) => {
    if (time < 10) {
      return `0${time < 0 ? "00" : time}`;
    }
    return time;
  };

  const updateTime = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(updateTime);
      daysLeft.parentElement.parentElement.parentElement.innerHTML =
        data.bids.length > 0
          ? `<div class="text-center text-lg">
      <p class="text-xl  font-semibold">Auction has ended</p>

      <div class="flex justify-center items-center">
      <div class="flex flex-col mt-1 text-start">
      <p>Winner:</p> 
      <div class="flex items-center gap-3">
      <img class="w-10 h-10 rounded-full object-cover" src="${
        data.bids[data.bids.length - 1].bidder.avatar.url
      }" />
      <div class="text-sm flex flex-col text-start">
      <p>${data.bids[data.bids.length - 1].bidder.name}</p>
      <p>for ${data.bids[data.bids.length - 1].amount} credits</p>
      </div>
      </div>
      </div>
      </div>`
          : "<p>Auction has ended</p>";
      return;
    }

    const days = formatTime(Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = formatTime(
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const minutes = formatTime(
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    );
    const seconds = formatTime(Math.floor((distance % (1000 * 60)) / 1000));

    daysLeft.textContent = days;
    hoursLeft.textContent = hours;
    minutesLeft.textContent = minutes;
    secondsLeft.textContent = seconds;
  }, 1000);
}
