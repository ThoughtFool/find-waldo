let imageHolder = document.querySelector(".image-holder");
let waldoSelector = document.querySelector(".selector");
let waldoHere = document.querySelector("#waldo-here");

// drag Waldo's glasses around screen to bring background into focus:
let dragLens = document.querySelector(".btn-drag-holder");
dragLens.addEventListener("mousedown", mousedown, false);
waldoHere.addEventListener("click", getCoords);

const waldoObjArr = {
    currentImageIndex: 0,
    imageArray: [
        { img: "./assets/images/find-waldo.png", pos: { x: 330, y: 294 } },
        { img: "./assets/images/beach.png", pos: { x: 100, y: 100 } },
        { img: "./assets/images/sports.png", pos: { x: 100, y: 100 } },
        { img: "./assets/images/track-and-field.png", pos: { x: 100, y: 100 } },
        { img: "./assets/images/carnival-detail.png", pos: { x: 100, y: 100 } },
        { img: "./assets/images/art-show.png", pos: { x: 100, y: 100 } },
    ],
    setLocal: function (keyString, dataToSave) {
        console.log("setLocal function fires!");

        let dataString = JSON.stringify(dataToSave);
        localStorage.setItem(keyString, dataString);

        return dataString;
    },

    getLocal: function (keyString) {
        console.log("getLocal function fires!");

        let dataString = localStorage.getItem(keyString);
        let data = JSON.parse(dataString);

        return data;
    },

    getStorageObj: function () {
        console.log(localStorage.getItem("image-object") === null);

        let waldoObjArrParsed =
            this.getLocal("image-object") === null
                ? this.imageArray
                : this.getLocal("image-object");

        console.log(waldoObjArrParsed);
        this.imageArray = waldoObjArrParsed;
    },
    roundTwoPlaces: function (floatNum) {
        let roundedNum = Math.round((floatNum + Number.EPSILON) * 100) / 100;
        return roundedNum;
    },
    forwardFrame: function () {
        let currentIndex;

        if (this.currentImageIndex < this.imageArray.length - 1) {
            currentIndex = this.currentImageIndex;
            currentIndex += 1;
        } else {
            currentIndex = 0;
        }

        this.currentImageIndex = switchFrame(currentIndex);

        return {
            currentImageIndex: this.currentImageIndex,
        };
    },
    reverseFrame: function () {
        let currentIndex;

        if (this.currentImageIndex > 0) {
            currentIndex = this.currentImageIndex;
            currentIndex -= 1;
        } else {
            currentIndex = this.imageArray.length - 1;
        }

        this.currentImageIndex = switchFrame(currentIndex);

        return {
            currentImageIndex: this.currentImageIndex,
        };
    },
};

let rightArrow = document.querySelector(".right-arrow");
rightArrow.addEventListener("click", nextSlide);

let leftArrow = document.querySelector(".left-arrow");
leftArrow.addEventListener("click", nextSlide);

function switchFrame(indexCounterValue) {
    console.log({ indexCounterValue });

    if (indexCounterValue >= waldoObjArr.imageArray.length) {
        let diff = indexCounterValue - waldoObjArr.imageArray.length;

        console.log({ diff });

        return diff;
    } else {
        return indexCounterValue;
    }
}

function nextImage() {
    console.log("nextImage function fires!");

    currentImage = waldoObjArr.imageArray[waldoObjArr.currentImageIndex].img;

    imageHolder.style.backgroundImage = `url(${currentImage})`;
    imageHolder.style.backgroundSize = "100vw, 100vh";
}

function nextSlide(event) {
    console.log(waldoObjArr.currentImageIndex);

    // left or right:
    if (event.currentTarget.classList.contains("left")) {
        waldoObjArr.reverseFrame();
    } else if (event.currentTarget.classList.contains("right")) {
        waldoObjArr.forwardFrame();
    } else {
        console.log("no direction selected");
    }

    nextImage();
}

function getCoords() {
    let waldoCoords = waldoSelector.getBoundingClientRect();
    let midPointX = waldoCoords.width / 2 + waldoCoords.left;
    let midPointY = waldoCoords.height / 2 + waldoCoords.top;

    let waldoPos = {
        x: midPointX,
        y: midPointY,
    };

    waldoObjArr.imageArray[waldoObjArr.currentImageIndex].pos = waldoPos;

    waldoObjArr.setLocal("image-object", waldoObjArr.imageArray);

    return waldoPos;
}

function mousedown(e) {
    console.log("mousedown function fires!");

    window.addEventListener("mousemove", mousemove, false);
    window.addEventListener("mouseup", mouseup, false);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
        console.log("mousemove function fires!");

        // if (
        //     e.clientX >= document.body.clientLeft + 25 &&
        //     e.clientY >= document.body.clientTop + 25
        //     // e.client <=
        //     //     document.body.clientLeft + document.body.clientWidth - 25 &&
        //     // e.clientX <=
        //     //     document.body.clientTop + document.body.clientHeight - 25
        // ) {
        let newX = prevX - e.clientX,
            newY = prevY - e.clientY;

        const waldoSelectorCoords = waldoSelector.getBoundingClientRect();

        // get location of lens holder: TODO: move this outside of mousemove event?
        let waldoSelectorElemWidth = waldoSelectorCoords.width / 2;
        let waldoSelectorElemLeft =
            waldoSelectorCoords.left + waldoSelectorElemWidth + 75;
        let waldoSelectorElemHeight = waldoSelectorCoords.height / 2;
        let waldoSelectorElemTop =
            waldoSelectorCoords.top + waldoSelectorElemHeight + 75;

        waldoSelector.style.left = waldoSelectorCoords.left - newX + "px";
        waldoSelector.style.top = waldoSelectorCoords.top - newY + "px";

        prevX = e.clientX;
        prevY = e.clientY;
    }

    function mouseup() {
        console.log("mouseup function fires!");

        // let lensRightElem = document.querySelector(".lens-right");

        // let lensRightCoords = lensRightElem.getBoundingClientRect();

        // console.log(lensRightCoords.width / 2 + lensRightCoords.left);
        // console.log(lensRightCoords.height / 2 + lensRightCoords.top);

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
    }
}
