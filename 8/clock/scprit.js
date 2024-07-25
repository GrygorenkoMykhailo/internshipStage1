const hours = document.querySelector('.hour-hand');
const minutes = document.querySelector('.minute-hand');
const seconds = document.querySelector('.second-hand');

function updateClock(){
    const now = new Date();

    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();
    const hourDegrees = 30 * hour + minute / 2;
    const minuteDegrees = 6 * minute;
    const secondDegrees = 6 * second;

    seconds.style.transform = `rotate(${secondDegrees}deg)`;
    minutes.style.transform = `rotate(${minuteDegrees}deg)`;
    hours.style.transform = `rotate(${hourDegrees}deg)`;
}

updateClock();
setInterval(updateClock, 1000);