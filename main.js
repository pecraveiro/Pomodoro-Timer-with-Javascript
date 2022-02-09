const timer = {
    pomodoro: 25, // 25min doing the work/task that you need
    shortBreak: 5, // 5min break, if you change this you can increased ou decreased the amount of time of your break
    longBreak: 15, // 15min break, if you change this you can increased ou decreased the amount of time of your break
    longBreakInterval: 4
};

let interval;

const mainButton = document.getElementById('js-btn'); // Adding the Button
mainButton.addEventListener('click', () => {
    const { action } = mainButton.dataset;
    if (action == 'start') {
        startTimer();
    } else {
        stopTimer();
      }
});

const modeButtons = document.querySelector("#js-mode-buttons");
modeButtons.addEventListener('click', handleMode);

function handleMode(event){
    const { mode } = event.target.dataset;

    if(!mode) return;

    switchMode(mode);
    stopTimer();
}

function switchMode(mode) {
    timer.mode = mode; // The first mode is a property which is set to the current mode... so it could be pomodoro, short break or long break
    timer.remainingTime = { // That is an object which contains three different properties of its own total, minutes and seconds. Total - number of time remaining, minutes is the number of minutes and seconds is always set to zero to start with.
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds: 0,
    };

    document
        .querySelectorAll('button[data-mode]')
        .forEach(e => e.classList.remove('active'));
    document.querySelector(` [data-mode="${mode}"]`).classList.add('active');
    document.body.style.backgroundColor = `var(--${mode})`;

    updateClock(); // Update Clock Function
}

function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;

    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);

    return {
        total,
        minutes,
        seconds,
    };
}

function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    mainButton.dataset.action = 'stop';
    mainButto.textContent = 'stop';
    mainButton.classList.add('active');

    interval = setInterval(function(){
        timer.remainingTime = getRemainingTime(endTime);
        updateClock();
        
        total = timer.remaining.total;
        if (total <= 0) {
            clearInterval(interval);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);

    mainButton.dataset.action = 'start';
    mainButton.textContent = 'start';
    mainButton.classList.remove('active');
}

function updateClock(){ // Update Clock Function
    const  { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');

    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');

    min.textContent = minutes;
    sec.textContent = seconds;    
}

document.addEventListener('DOMContentLoaded', () => {
    switchMode('pomodoro');
});
