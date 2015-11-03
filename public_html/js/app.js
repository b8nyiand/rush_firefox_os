/*function clickButton(e){
    e.target.innerHTML = "kattintott";
}
document.addEventListener("DOMContentLoaded", function (event) {
   console.log("DOM loaded and parsed"); 
   document.querySelector("button").addEventListener("click", clickButton);
});
*/

document.querySelector('#btn-show-tasks').addEventListener('click', function () {
    document.querySelector('#show-tasks').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
     /*var battery = navigator.battery; 
    if (battery) {
        var batteryLevel = Math.round(battery.level * 100) + "%";
        var charging = (battery.charging) ? "Yes" : "No";         var chargingTime = parseInt(battery.chargingTime / 60, 10);         var dischargingTime = parseInt(battery.dischargingTime / 60, 10);

        document.querySelector('#battery-level').textContent = batteryLevel;
        document.querySelector('#battery-charging').textContent = charging;
        document.querySelector('#battery-time-charge').textContent = chargingTime;
        document.querySelector('#battery-time-discharge').textContent = dischargingTime;     }*/
});

document.querySelector('#btn-back').addEventListener('click', function () {
    document.querySelector('#show-tasks').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});