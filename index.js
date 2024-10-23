const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const minutesInput = document.getElementById("minutesInput");
const progressCircle = document.getElementById("progress");
const alarmSound = document.getElementById("alarmSound");
let countdown;
let isRunning = false;
let remainingTime;
const totalLength = 565.48;

startButton.addEventListener("click", () => {
  const minutes = parseInt(minutesInput.value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("To'g'ri daqiqa kiriting!");
    return;
  }

  if (!isRunning) {
    clearInterval(countdown);
    const endTime =
      Date.now() + (remainingTime ? remainingTime * 1000 : minutes * 60000);
    remainingTime = remainingTime || minutes * 60;

    countdown = setInterval(() => {
      const timeLeft = endTime - Date.now();
      if (timeLeft <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "00:00";
        progressCircle.style.strokeDashoffset = totalLength;

        alarmSound.currentTime = 0;
        alarmSound.playbackRate =
          alarmSound.duration > 3 ? alarmSound.duration / 3 : 1;
        alarmSound.play();
        alert("Vaqt tugadi!");
        isRunning = false;
      } else {
        remainingTime = Math.floor(timeLeft / 1000);
        const minutesLeft = Math.floor(remainingTime / 60);
        const secondsLeft = remainingTime % 60;
        timerDisplay.textContent = `${minutesLeft
          .toString()
          .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;

        const timePassed = minutes * 60 - remainingTime;
        const offset = (timePassed / (minutes * 60)) * totalLength;
        progressCircle.style.strokeDashoffset = offset;
      }
    }, 1000);

    isRunning = true;
  }
});

stopButton.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(countdown);
    alarmSound.pause();
    alarmSound.currentTime = 0;
    isRunning = false;
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(countdown);
  timerDisplay.textContent = "00:00";
  progressCircle.style.strokeDashoffset = totalLength;
  isRunning = false;
  remainingTime = null;
  minutesInput.value = "";
  secondsInput.value = "";
});
