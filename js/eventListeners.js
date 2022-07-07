let HOURS = 0;
let MINUTES = 0;
let SECONDS = 0;
let FRACTION = 0;
let MICRO = 0;
let counter = 0;
let recentAction = "";
let recentActionTimer = "";
let INTERVAL;

let tableData = [];

const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const splitButton = document.querySelector(".split");
const resetButton = document.querySelector(".reset");
const tableContent = document.querySelector(".table-body");
const recentTimer = document.querySelector(".timer-sub");
// Timer Header Views
const headerHours = document.querySelector(".timer-header #hours");
const headerMinutes = document.querySelector(".timer-header .minutes");
const headerSeconds = document.querySelector(".timer-header .seconds");
const headerFraction = document.querySelector("div.timer-header .fraction");
const headerMicro = document.querySelector(
  ".timer-header .fraction-fraction sup"
);
// Timer Header Views
// Timer Controls

splitButton.addEventListener("click", splitClicked);
resetButton.addEventListener("click", resetClicked);
pauseButton.addEventListener("click", pauseClicked);
startButton.addEventListener("click", startClicked);

disableButton(resetButton);
disableButton(splitButton);

/* **************** */
/* Render Functions */
/* **************** */
function showCounter(counter) {
  if (counter.toString().length === 2) {
    return counter;
  } else if (counter.toString().length === 1) {
    return `0${counter}`;
  } else return "00";
}
function renderTimer() {
  if (recentAction !== "Reset") {
    ++MICRO;
    headerMicro.textContent = showCounter(MICRO);
  }
  if (MICRO > 99) {
    MICRO = 0;
    ++FRACTION;
    headerMicro.textContent = showCounter(MICRO);
    headerFraction.textContent = FRACTION;
  }
  if (FRACTION > 9) {
    FRACTION = 0;
    ++SECONDS;
    headerFraction.textContent = FRACTION;
    headerSeconds.textContent = showCounter(SECONDS);
  }
  if (SECONDS > 60) {
    SECONDS = 0;
    ++MINUTES;
    headerSeconds.textContent = showCounter(SECONDS);
    headerMinutes.textContent = showCounter(MINUTES);
  }
  if (MINUTES > 60) {
    MINUTES = 0;
    ++HOURS;
    headerMinutes.textContent = showCounter(MINUTES);
    headerHours.textContent = showCounter(HOURS);
  }
}
function renderPauseButton() {
  document.querySelector(".pause").classList.remove("hidden");
  document.querySelector(".start").classList.add("hidden");
}
function renderStartButton() {
  document.querySelector(".start").classList.remove("hidden");
  document.querySelector(".pause").classList.add("hidden");
}
function renderTable(action) {
  const seconds = SECONDS;
  const minutes = MINUTES;
  const hours = HOURS;
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `<td>${counter}</td>
  <td>
    <div class="timer-col-${action.toLowerCase()}">
      <div id="hours">${showCounter(hours)}</div>
      <div class="colon">:</div>
      <div id="minutes">${showCounter(minutes)}</div>
      <div class="colon">:</div>
      <div id="seconds">${showCounter(seconds)}</div>
      <div class="dot">.</div>
      <div class="fraction">${FRACTION}</div>
      <div class="fraction-fraction"><sup>${showCounter(MICRO)}</sup></div>
    </div>
  </td>
  <td>${recentAction}</td>`;
  tableContent.appendChild(tableRow);
}
function disableButton(button) {
  button.disabled = true;
}
function enableButton(button) {
  button.classList.remove("disabled");
  button.disabled = false;
}
function setRecentTimer(hours, minutes, seconds, fraction, micro) {
  recentTimer.innerHTML = `<div id="hours">${showCounter(
    hours
  )}</div><div class="colon">:</div>
  <div id="minutes">${showCounter(minutes)}</div>
  <div class="colon">:</div>
  <div id="seconds">${showCounter(seconds)}</div>
  <div class="dot">.</div>
  <div class="fraction">${fraction}</div>
  <div class="fraction-fraction"><sup>${showCounter(micro)}</sup></div>`;
}
function resetTimer() {
  clearInterval(INTERVAL);
  MINUTES = 0;
  HOURS = 0;
  SECONDS = 0;
  FRACTION = 0;
  MICRO = 0;
  renderTimer();
  // Display Start Button instead of Pause Button
  renderStartButton();
  setRecentTimer(HOURS, MINUTES, SECONDS, FRACTION, MICRO);
  // Enable Split Button if Timer is Paused;
  enableButton(splitButton);
  // Empty Table Content
  tableData = [];
  tableContent.innerHTML = "";
  // Disable Reset and Split Button
  disableButton(resetButton);
  disableButton(splitButton);
  renderStartButton();
}
function recordAction(action) {
  // Increment Table Row Offset
  ++counter;
  // Record Recent Action
  recentAction = action;
  // Clear Timer
  if (action === "Pause") {
    clearInterval(INTERVAL); // Disable Split Button once in paused state
    disableButton(splitButton);
  }
  // Insert Row to table for pause action
  renderTable(action);
  tableData.push(
    counter,
    { hours: HOURS, minutes: MINUTES, seconds: SECONDS },
    action
  );
}
/* *************** */
/* Event Functions */
/* *************** */
function startClicked(e) {
  INTERVAL = setInterval(renderTimer, 1);
  // Enable split and reset when timer start
  enableButton(splitButton);
  enableButton(resetButton);
  // record recent action
  recentAction = e.target.innerText;
  // Display Pause Button once timer is started
  renderPauseButton();
}

function pauseClicked(e) {
  recordAction(e.target.innerText);
  // Render Start Button to resume timer
  renderStartButton();
  // Set Recent Timer in timer-sub class
  setRecentTimer(HOURS, MINUTES, SECONDS, FRACTION, MICRO);
}
function splitClicked(e) {
  recordAction(e.target.innerText);
  // Set Recent Timer in timer-sub class
  setRecentTimer(HOURS, MINUTES, SECONDS, FRACTION, MICRO);
}
function resetClicked(e) {
  resetTimer();
  // Re render Timer with 00:00:00
  recentAction = e.target.innerText;
  // Stop Timer
}
