let HOURS = 0;
let MINUTES = 0;
let SECONDS = 0;
let FRACTION = 0;
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
    ++FRACTION;
  }
  if (FRACTION > 10) {
    FRACTION = 0;
    ++SECONDS;
  }
  if (SECONDS > 60) {
    SECONDS = 0;
    ++MINUTES;
  }
  if (MINUTES > 60) {
    MINUTES = 0;
    ++HOURS;
  }
  document.querySelector(
    ".timer-header"
  ).innerHTML = ` <div id="hours">${showCounter(HOURS)}</div>
  <div class="colon">:</div>
  <div id="minutes">${showCounter(MINUTES)}</div>
  <div class="colon">:</div>
  <div id="seconds">${showCounter(SECONDS)}</div>
  <div class="dot">.</div>
  <div class="fraction">${showCounter(FRACTION)}</div>
  <div class="fraction-fraction"><sup>26</sup></div>`;
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
      <div class="fraction">${showCounter(FRACTION)}</div>
      <div class="fraction-fraction"><sup>26</sup></div>
    </div>
  </td>
  <td>${recentAction}</td>`;
  tableContent.appendChild(tableRow);
}
function disableButton(button) {
  button.classList.add("disabled");
  button.disabled = true;
}
function enableButton(button) {
  button.classList.remove("disabled");
  button.disabled = false;
}
function setRecentTimer(hours, minutes, seconds) {
  recentTimer.innerHTML = `<div id="hours">${showCounter(hours)}</div>
  <div class="colon">:</div>
  <div id="minutes">${showCounter(minutes)}</div>
  <div class="colon">:</div>
  <div id="seconds">${showCounter(seconds)}</div>
  <div class="dot">.</div>
  <div class="fraction">${FRACTION}</div>
  <div class="fraction-fraction"><sup>26</sup></div>`;
}
/* *************** */
/* Event Functions */
/* *************** */
function startClicked(e) {
  INTERVAL = setInterval(renderTimer, 100);
  enableButton(splitButton);
  enableButton(resetButton);
  console.log(e.target.innerText);
  enableButton(splitButton);
  recentAction = e.target.innerText;
  renderPauseButton();
}

function pauseClicked(e) {
  // Increment Table Row Offset
  ++counter;
  // Record Recent Action
  recentAction = e.target.innerText;
  // Clear Timer
  clearInterval(INTERVAL);
  console.log(e.target.innerText);
  // Insert Row to table for pause action
  renderTable(recentAction);
  tableData.push(
    counter,
    { hours: HOURS, minutes: MINUTES, seconds: SECONDS },
    recentAction
  );
  // Disable Split Button once in paused state
  disableButton(splitButton);
  // Render Start Button to resume timer
  renderStartButton();
  // Set Recent Timer in timer-sub class
  setRecentTimer(HOURS, MINUTES, SECONDS);
}
function splitClicked(e) {
  // Increment the Table Row Offer
  ++counter;
  // Record recent performed Action for Table
  recentAction = e.target.innerText;
  console.log(e.target.innerText);
  // Rerender Table with new row for Split Action
  renderTable(recentAction);
  tableData.push(
    counter,
    { hours: HOURS, minutes: MINUTES, seconds: SECONDS },
    recentAction
  );
  // Set Recent Timer in timer-sub class
  setRecentTimer(HOURS, MINUTES, SECONDS);
}
function resetClicked(e) {
  // Stop Timer
  clearInterval(INTERVAL);
  MINUTES = 0;
  HOURS = 0;
  SECONDS = 0;
  // Re render Timer with 00:00:00
  recentAction = e.target.innerText;
  renderTimer();
  // Display Start Button instead of Pause Button
  renderStartButton();
  // Enable Split Button if Timer is Paused;
  enableButton(splitButton);
  // Empty Table Content
  tableData = [];
  tableContent.innerHTML = "";
  console.log(e.target.innerText);
  // Disable Reset and Split Button
  disableButton(resetButton);
  disableButton(splitButton);
  renderStartButton();
}
