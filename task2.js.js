let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateTime() {
  const currentTime = Date.now() - startTime + elapsedTime;
  const hours = Math.floor(currentTime / 3600000);
  const minutes = Math.floor((currentTime % 3600000) / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  display.textContent = 
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
    startStopBtn.textContent = 'Pause';
    running = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    running = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  display.textContent = '00:00:00';
  startTime = 0;
  elapsedTime = 0;
  running = false;
  startStopBtn.textContent = 'Start';
  laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const li = document.createElement('li');
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
});
