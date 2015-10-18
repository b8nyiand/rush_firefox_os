function clickButton(e){
    e.target.innerHTML = "kattintott";
}
document.addEventListener("DOMContentLoaded", function (event) {
   console.log("DOM loaded and parsed"); 
   document.querySelector("button").addEventListener("click", clickButton);
});
