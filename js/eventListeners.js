let HOURS = 0;
let MINUTES = 0;
let SECONDS = 0;
let FRACTION = 0;
let MICRO = 0;
let timeInterval = 0;
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
const headerHours = document.querySelector(".timer-header .hours");
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
// Display pad 0 before number if less than 10
function showCounter(n) {
  return n < 10 ? `0${n}` : n;
}
// Render Timer Header
function renderTimer() {
  // Carry on With Timer
  ++timeInterval;
  if (recentAction !== "Reset") {
    // Calculations on Timer
    FRACTION = Math.trunc(timeInterval);
    SECONDS = Math.trunc(FRACTION / 10) % 60;
    HOURS = Math.floor(FRACTION / 36000) % 24;
    MINUTES = Math.floor(FRACTION / 600) % 60;
    MICRO = timeInterval * 100;
    // Render Calculations
    headerMicro.textContent = MICRO.toString().substring(
      FRACTION.toString().length - 2,
      FRACTION.toString().length
    );
    headerFraction.textContent = FRACTION.toString().substring(
      FRACTION.toString().length - 1,
      FRACTION.toString().length
    );
    headerSeconds.textContent = showCounter(SECONDS);
    headerMinutes.textContent = showCounter(MINUTES);
    headerHours.textContent = showCounter(HOURS);
  } else {
    // If recentAction is Reset
    headerHours.textContent = "00";
    headerMinutes.textContent = "00";
    headerSeconds.textContent = "00";
    headerFraction.textContent = "0";
    headerMicro.textContent = "00";
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
      <div class="fraction">${FRACTION.toString().substring(
        FRACTION.toString().length - 1,
        FRACTION.toString().length
      )}</div>
      <div class="fraction-fraction"><sup>${MICRO.toString().substring(
        FRACTION.toString().length - 2,
        FRACTION.toString().length
      )}</sup></div>
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
  <div class="fraction">${fraction
    .toString()
    .substring(
      fraction.toString().length - 1,
      fraction.toString().length
    )}</div>
  <div class="fraction-fraction"><sup>${micro
    .toString()
    .substring(
      fraction.toString().length - 2,
      fraction.toString().length
    )}</sup></div>`;
}
function resetTimer() {
  clearInterval(INTERVAL);
  MINUTES = 0;
  HOURS = 0;
  SECONDS = 0;
  FRACTION = 0;
  MICRO = 0;
  counter = 0;
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
  renderTimer();
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
  INTERVAL = setInterval(renderTimer, 100);
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
  recentAction = e.target.innerText;
  // Stop Timer
  resetTimer();
}
