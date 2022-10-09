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
let bottomRight = document.querySelector(".bottom-right");
bottomRight.addEventListener("mousedown", mousedown, false);

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

// TODO: add timer: reduces blur filter and adds glasses
// TODO: add game title and directions
// TODO: add hover over helper for grabbing glasses
// TODO: add an array of searchable images
// TODO: add a "found waldo" button with waldoChecker function