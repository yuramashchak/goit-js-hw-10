import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



let timerId

const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')
const timeDate = document.querySelector('#datetime-picker')



let userSelectedDate;

const button = document.querySelector('.button_run');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
 onClose(selectedDates) {
  const date = selectedDates[0];

  if (date.getTime() <= Date.now()) {
    iziToast.error({
      title: "Error",
      message: "Please choose a date in the future",
    });

    button.disabled = true;
    userSelectedDate = null;
    return;
  }

  userSelectedDate = date;
  button.disabled = false;
}
};
flatpickr("#datetime-picker", options);
button.disabled = true;
timeDate.disabled = false;
button.addEventListener('click', ()=>{
    button.disabled = true;
    timeDate.disabled = true;
    const dateNow = userSelectedDate;
    if (!userSelectedDate) return;
    


        timerId = setInterval(()=>{
        const currentTime = new Date();
        const diff = dateNow - currentTime;
        const toMs = convertMs(diff)
       daysEl.textContent = addLeadingZero(toMs.days);
       hoursEl.textContent = addLeadingZero(toMs.hours);
       minutesEl.textContent = addLeadingZero(toMs.minutes);
       secondsEl.textContent = addLeadingZero(toMs.seconds);
       if (diff <= 0) {
  clearInterval(timerId);

  daysEl.textContent = "00";
  hoursEl.textContent = "00";
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";

  button.disabled = true;
  timeDate.disabled = false;
  userSelectedDate = null;

  return;
}
    }, 1000)

    
});





function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}