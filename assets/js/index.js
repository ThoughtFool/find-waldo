let imageHolder = document.querySelector(".image-holder");
let lensHolder = document.querySelector(".lens-holder");
let lensImageLeftElem = document.querySelector("#img-left");
let lensImageRightElem = document.querySelector("#img-right");

// holds image for lenses and imageHolder background:
let currentImage = "";
let currentIndex = 0;
let randNumArr = [];
let modalOpen = false;

// TODO: getLocal to use recorded locations:
// TODO: create function to use waldo's recorded coords and adjusts to screen-size
const waldoObjArr = {
    currentImageIndex: 0, // TODO: set value to current
    imageArray: [
        { img: "./assets/images/find-waldo.png", pos: { x: 330, y: 294 } },
        { img: "./assets/images/beach.png", pos: { x: 100, y: 100 } },
        { img: "./assets/images/sports.png", pos: { x: 100, y: 100 } },
        { img: "./assets/images/track-and-field.png", pos: { x: 100, y: 100 } },
        { img: "./assets/images/carnival-detail.png", pos: { x: 100, y: 100 } },
        { img: "./assets/images/art-show.png", pos: { x: 100, y: 100 } },
    ],
    getLocal: function (keyString) {
        console.log("getLocal function fires!");

        let dataString = localStorage.getItem(keyString);
        let data = JSON.parse(dataString);

        return data;
    },
    getStorageObj: function () {
        console.log(this.getLocal("image-object") === null);

        let imageObjParsed =
            this.getLocal("image-object") === null
                ? this.imageArray
                : this.getLocal("image-object");

        this.imageArray = imageObjParsed;
    },
};

(function init() {
    console.log("init function fires!");

    waldoObjArr.getStorageObj();
})();

function getRandom() {
    if (randNumArr.length >= waldoObjArr.imageArray.length) {
        randNumArr = [];
    }
    let randomIndex = Math.floor(Math.random() * waldoObjArr.imageArray.length);
    console.log("randomIndex");
    console.log(randomIndex);
    let numExists = randNumArr.indexOf(randomIndex);

    // if random number exists in array, run again:
    if (numExists !== -1) {
        return getRandom();
    } else {
        currentIndex = randomIndex;
        randNumArr.push(randomIndex);
        return randomIndex;
    }
}

function nextSearch() {
    let randomIndex = getRandom();
    console.log(randomIndex);
    console.log(waldoObjArr.imageArray[randomIndex].img);

    currentImage = waldoObjArr.imageArray[randomIndex].img;

    imageHolder.style.backgroundImage = `url(${currentImage})`;
    imageHolder.style.backgroundSize = "100vw, 100vh";

    lensImageLeftElem.src = currentImage;
    lensImageRightElem.src = currentImage;
}

// function getImageData(){
//     lensImageLeftElem.src = currentImage;
//     lensImageRightElem.src = currentImage;
// };

function offsetImage() {
    console.log("offsetImage function fires!");

    let lensHolderCoords = lensHolder.getBoundingClientRect();
    // let imageHolderCoords = imageHolder.getBoundingClientRect();

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

// adjust background images for each lens of Waldo's glasses:
offsetImage();

// drag Waldo's glasses around screen to bring background into focus:
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

        if (
            e.clientX >= document.body.clientLeft + 15 &&
            e.clientY >= document.body.clientTop + 15
            // e.client <= document.body.clientLeft + document.body.clientWidth &&
            // e.clientX <= document.body.clientTop + document.body.clientHeight
        ) {
            let newX = prevX - e.clientX,
                newY = prevY - e.clientY;

            const lensHolderCoords = lensHolder.getBoundingClientRect();

            // get location of lens holder: TODO: move this outside of mousemove event?
            let lensHolderElemWidth = lensHolderCoords.width / 2;
            let lensHolderElemLeft =
                lensHolderCoords.left + lensHolderElemWidth + 75;
            let lensHolderElemHeight = lensHolderCoords.height / 2;
            let lensHolderElemTop =
                lensHolderCoords.top + lensHolderElemHeight + 75;

            lensHolder.style.left = lensHolderCoords.left - newX + "px";
            lensHolder.style.top = lensHolderCoords.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;

            moveEyes(lensHolderElemLeft, lensHolderElemTop);

            offsetImage();
        } else {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
        }
    }

    function mouseup() {
        console.log("mouseup function fires!");

        let lensRightElem = document.querySelector(".lens-right");

        let lensRightCoords = lensRightElem.getBoundingClientRect();

        console.log(lensRightCoords.width / 2 + lensRightCoords.left);
        console.log(lensRightCoords.height / 2 + lensRightCoords.top);

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
    }
}

// TODO: add puppy eyes - follow mouse when glasses dragged

function moveEyes(clientX, clientY) {
    let leftPuppyEye = document.getElementById("pup-left");
    let rightPuppyEye = document.getElementById("pup-right");
    let puppyElem = document.getElementById("puppy-image");
    let puppyElemCoords = puppyElem.getBoundingClientRect();

    // get location of puppy head: TODO: move this outside of mousemove event
    let puppyElemWidth = puppyElemCoords.width / 3;
    let puppyElemLeft = puppyElemCoords.left + puppyElemWidth;
    let puppyElemHeight = puppyElemCoords.width / 3;
    let puppyElemTop = puppyElemCoords.top + puppyElemHeight;

    let degree = getDegree(clientX, clientY, puppyElemLeft, puppyElemTop);

    const puppyEyes = document.querySelectorAll(".eye");

    puppyEyes.forEach(function (eye) {
        eye.style.transform = `rotate(${90 + degree}deg)`;
    });
}

function getDegree(clientX, clientY, puppyElemCoordsX, puppyElemCoordsY) {
    const dx = puppyElemCoordsX - clientX;
    const dy = puppyElemCoordsY - clientY;
    const rad = Math.atan2(dy, dx);
    const degree = (rad * 180) / Math.PI;
    return degree;
}

// TODO: add game title and directions
// TODO: add hover over helper for grabbing glasses
// TODO: add an array of searchable images
// TODO: add a "found waldo" button with waldoChecker function

let foundYouElem = document.getElementById("found-you");
foundYouElem.addEventListener("click", function () {
    let theresWaldo = foundWaldo();

    // TODO: replace alerts with non-blocking, toast messages:
    if (theresWaldo) {
        let msg = `Great job! You've found Waldo. He's in the ${theresWaldo}-side lens.`;
        let lens = document.querySelector(`.lens-${theresWaldo}`);

        // adding visual feedback to winner:
        function rippleEffect() {
            lens.classList.add("pulse");

            setTimeout(function () {
                lens.classList.remove("pulse");
                toggleModal(null, true, msg);
            }, 2000);
        }

        rippleEffect();

        clearTimeout(timer);
    } else {
        let msg = `Sorry, there's no Waldo found in either lens. Please, keep trying, don't give up, never give up.`;
        toggleModal(null, false, msg);
    }

    return theresWaldo;
});

function foundWaldo() {
    console.log("foundWaldo function fires!");

    let leftLensElem = document.querySelector(".lens-left");
    let rightLensElem = document.querySelector(".lens-right");

    let leftLensCoords = leftLensElem.getBoundingClientRect();
    let rightLensCoords = rightLensElem.getBoundingClientRect();

    console.log(rightLensCoords.width / 2 + rightLensCoords.left);
    console.log(rightLensCoords.height / 2 + rightLensCoords.top);

    let leftLensCheck = checkPosition(
        getLensSpan(
            leftLensCoords.left,
            leftLensCoords.top,
            leftLensCoords.width,
            leftLensCoords.height
        )
    );
    let rightLensCheck = checkPosition(
        getLensSpan(
            rightLensCoords.left,
            rightLensCoords.top,
            rightLensCoords.width,
            rightLensCoords.height
        )
    );

    if (leftLensCheck) {
        return "left";
    } else if (rightLensCheck) {
        return "right";
    } else {
        return false;
    }
}

function getLensSpan(L, T, W, H) {
    let startX = L;
    let endX = L + W;

    let startY = T;
    let endY = T + H;

    return {
        startX,
        endX,
        startY,
        endY,
    };
}

function checkPosition({ startX, endX, startY, endY }) {
    if (
        waldoObjArr.imageArray[currentIndex].pos.x >= startX &&
        waldoObjArr.imageArray[currentIndex].pos.x <= endX &&
        waldoObjArr.imageArray[currentIndex].pos.y >= startY &&
        waldoObjArr.imageArray[currentIndex].pos.y <= endY
    ) {
        return true;
    } else {
        return false;
    }
}

// // test position of Waldo:
// // TODO: need to expand Waldo searchable coords to a bounding area:
// let waldoPos = {
//     x: 330,
//     y: 294,
// };

// TODO: add to timer event: reduce blur filter and add glasses
let timer = null;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let minutesElem = document.getElementById("minutes");
let secondsElem = document.getElementById("seconds");
let milisecondsElem = document.getElementById("miliseconds");
let blurElem = document.querySelector(".image-blur");
blurElem.classList.add("increase-blur");

// start timer and reduce background blur and show glasses:
start.addEventListener("click", function () {
    if (timer) {
        return;
    } else {
        startTimer();
        lensHolder.style.display = "flex";
        start.style.display = "none";
        // getImageData();
        offsetImage();
        blurElem.classList.add("decrease-blur");
        blurElem.classList.remove("increase-blur");
    }
});

// stop timer and set background to blur and hide glasses:
stop.addEventListener("click", stopTimer);

function stopTimer() {
    if (timer) {
        clearTimeout(timer);
        lensHolder.style.display = "none";
        start.style.display = "block";
        blurElem.classList.add("increase-blur");
        blurElem.classList.remove("decrease-blur");
        timer = null;
    } else {
        return;
    }
}

// reset.addEventListener("click", resetScreen);

let closeButton = document.querySelector(".close");

closeButton.addEventListener("click", toggleModal);

function toggleModal(e, bool, msg) {
    let modal = document.querySelector(".modal");
    let msgElem = document.getElementById("msg");

    if (modalOpen) {
        modal.style.display = "none";
        modalOpen = false;

        // TODO: ask client if they want to continue playing and adding initials to timed score:
    } else {
        modal.style.display = "block";
        console.log(modal);
        msgElem.innerText = msg;
        modalOpen = true;
        resetScreen(bool);
    }
}

function resetScreen(bool) {
    stopTimer();

    if (bool === false || bool === undefined) {
        return;
    } else {
        minutes = 0;
        seconds = 0;
        miliseconds = 0;
        minutesElem.innerText = "00:";
        secondsElem.innerText = "00:";
        milisecondsElem.innerText = "00";

        lensHolder.style.left = "calc(50% - 150px)";
        lensHolder.style.top = "10%";
        nextSearch();
    }
}

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
