let HOURS = 0;
let MINUTES = 0;
let SECONDS = 0;
let counter = 0;
let recentAction = "";
let INTERVAL;

const tableData = [];

const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const splitButton = document.querySelector(".split");
const resetButton = document.querySelector(".reset");
const tableContent = document.querySelector(".timer-table");

splitButton.addEventListener("click", splitClicked);
resetButton.addEventListener("click", resetClicked);
pauseButton.addEventListener("click", pauseClicked);
startButton.addEventListener("click", startClicked);

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
  ++SECONDS;
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
  <div class="fraction">6</div>
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
      <div class="fraction">6</div>
      <div class="fraction-fraction"><sup>26</sup></div>
    </div>
  </td>
  <td>${recentAction}</td>`;
  tableContent.appendChild(tableRow);
}
/* *************** */
/* Event Functions */
/* *************** */
function startClicked(e) {
  INTERVAL = setInterval(renderTimer, 1000);
  console.log(e.target.innerText);
  renderPauseButton();
}
function pauseClicked(e) {
  ++counter;
  recentAction = e.target.innerText;
  clearInterval(INTERVAL);
  console.log(e.target.innerText);
  renderTable(recentAction);
  tableData.push(
    counter,
    { hours: HOURS, minutes: MINUTES, seconds: SECONDS },
    recentAction
  );
  renderStartButton();
}
function splitClicked(e) {
  ++counter;
  recentAction = e.target.innerText;
  console.log(e.target.innerText);
  renderTable(recentAction);
  tableData.push(
    counter,
    { hours: HOURS, minutes: MINUTES, seconds: SECONDS },
    recentAction
  );
}
function resetClicked(e) {
  console.log(e.target.innerText);
}
