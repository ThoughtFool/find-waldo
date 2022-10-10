let imageHolder = document.querySelector(".image-holder");
let lensHolder = document.querySelector(".lens-holder");
let lensImageLeftElem = document.querySelector("#img-left");
let lensImageRightElem = document.querySelector("#img-right");

function offsetImage() {
    console.log("offsetImage function fires!");

    let imageHolderCoords = imageHolder.getBoundingClientRect();

    let lensHolderCoords = lensHolder.getBoundingClientRect();

    // let imageMidpointLeft = imageHolderCoords.width / 2 + imageHolderCoords.left;
    // let imageMidpointTop = imageHolderCoords.height / 2 + imageHolderCoords.top;

    // let lensMidpointLeft = lensHolderCoords.width / 2 + lensHolderCoords.left;
    // let lensMidpointTop = lensHolderCoords.height / 2 + lensHolderCoords.top;

    // lensImageLeftElem.style.width = imageHolderCoords.width;
    // lensImageLeftElem.style.width = imageHolderCoords.height;

    lensImageLeftElem.style.left = -1 * lensHolderCoords.left - 10 + "px";
    lensImageLeftElem.style.top = -1 * lensHolderCoords.top - 10 + "px";

    lensImageRightElem.style.left =
        -1 * lensHolderCoords.left - 10 - 150 + "px";
    lensImageRightElem.style.top = -1 * lensHolderCoords.top - 10 + "px";
}

offsetImage();
let dragLens = document.querySelector(".btn-drag-lens");
dragLens.addEventListener("mousedown", mousedown, false);

function mousedown(e) {
    console.log("mousedown function fires!");

    window.addEventListener("mousemove", mousemove, false);
    window.addEventListener("mouseup", mouseup, false);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
        console.log("mousemove function fires!");

        let newX = prevX - e.clientX,
            newY = prevY - e.clientY;

        const lensHolderCoords = lensHolder.getBoundingClientRect();
        lensHolder.style.left = lensHolderCoords.left - newX + "px";
        lensHolder.style.top = lensHolderCoords.top - newY + "px";

        prevX = e.clientX;
        prevY = e.clientY;

        offsetImage();
    }

    function mouseup() {
        console.log("mouseup function fires!");

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
    }
}

// TODO: add to timer event: reduce blur filter and add glasses
// TODO: add game title and directions
// TODO: add hover over helper for grabbing glasses
// TODO: add an array of searchable images
// TODO: add a "found waldo" button with waldoChecker function
// function foundWaldo ()

let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let minutesElem = document.getElementById("minutes");
let secondsElem = document.getElementById("seconds");
let milisecondsElem = document.getElementById("miliseconds");

start.addEventListener("click", function () {
    startTimer();
});

stop.addEventListener("click", function () {
    clearTimeout(timer);
});

reset.addEventListener("click", function () {
    minutes = 0;
    seconds = 0;
    miliseconds = 0;
    minutesElem.innerText = "00:";
    secondsElem.innerText = "00:";
    milisecondsElem.innerText = "00";
});

function timeKeeper() {
    miliseconds++;
    if (miliseconds > 99) {
        miliseconds = 0;
        seconds++;
        if (seconds > 59) {
            seconds = 0;
            minutes++;
            if (minutes < 10) {
                minutesElem.innerText = `0${minutes}:`;
            } else {
                minutesElem.innerText = `${minutes}:`;
            }
        }

        if (seconds < 10) {
            secondsElem.innerText = `0${seconds}:`;
        } else {
            secondsElem.innerText = `${seconds}:`;
        }
    }
    if (miliseconds < 10) {
        milisecondsElem.innerText = `0${miliseconds}`;
    } else {
        milisecondsElem.innerText = miliseconds;
    }

    startTimer();
}

function startTimer() {
    timer = setTimeout(timeKeeper, 10);
}
