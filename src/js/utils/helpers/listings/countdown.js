import createEle from "../../element/createEle.js";

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
  const timeLeftContainer = document.getElementById("time-left-container");

  const countDownDate = new Date(data.endsAt);

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
      timeLeftContainer.innerHTML = "";
      timeLeftContainer.append(
        data.bids.length > 0
          ? displayWinner(data)
          : createEle("p", null, "Auction has ended"),
      );
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

// This function will display the winner of the auction once the auction has ended.
// Added this here temporarly might move it into a separate file later
function displayWinner(data) {
  const lastBid = data.bids[data.bids.length - 1];

  const container = createEle("div", "text-center text-lg ");

  const headerText = createEle(
    "p",
    "text-xl font-semibold",
    "Auction has ended",
  );
  container.appendChild(headerText);

  const contentContainer = createEle(
    "div",
    "flex justify-center items-center ",
  );
  container.appendChild(contentContainer);

  const winnerContainer = createEle("div", "flex flex-col mt-1 text-start");
  contentContainer.appendChild(winnerContainer);

  const winnerText = createEle("p", " lg:text-xl py-1", "Winner:");
  winnerContainer.appendChild(winnerText);

  const avatarAndDetails = createEle("div", "flex items-center gap-3");
  winnerContainer.appendChild(avatarAndDetails);

  const winnerAvatar = createEle(
    "img",
    "w-10 h-10 lg:w-14 h-14 rounded-full object-cover",
  );
  winnerAvatar.setAttribute("src", lastBid.bidder.avatar.url);
  avatarAndDetails.appendChild(winnerAvatar);

  const winnerDetails = createEle(
    "div",
    "text-sm flex flex-col text-start lg:text-base",
  );
  avatarAndDetails.appendChild(winnerDetails);

  const winnerName = createEle("p", " lg:text-lg", lastBid.bidder.name);
  winnerDetails.appendChild(winnerName);

  const creditsAmount = createEle(
    "p",
    " lg:text-lg",
    `for ${lastBid.amount} credits`,
  );
  winnerDetails.appendChild(creditsAmount);

  return container;
}
