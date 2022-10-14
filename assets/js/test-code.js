function getRadi(radiusA, radiusB) {
    let radi = radiusA + radiusB;

    return radi;
}

function getHypotenuse(figA, figB) {
    let xDiff = figA.x - figB.x;
    let yDiff = figA.y - figB.y;

    let sideX = xDiff >= 0 ? xDiff : xDiff * -1;
    let sideY = yDiff >= 0 ? yDiff : yDiff * -1;

    console.log({ sideX, sideY });

    sideX = sideX * sideX;
    sideY = sideY * sideY;

    let hypotenuse = Math.sqrt(sideX + sideY);

    return hypotenuse;
}

function findMidPoint(L, T, W, H) {
    // find the midpoint of polygon:
    let midX = W / 2 + L;
    let midY = H / 2 + T;

    // coordinates for midpoint:
    let midCoords = {
        x: midX,
        y: midY,
    };

    return midCoords;
}

function getDist(radi, hypotenuse) {
    if (radi < hypotenuse) {
        console.log("is overlapping");
    } else if (radi > hypotenuse) {
        console.log("is NOT touching");
    } else {
        console.log("is touching");
    }
}

// Testing math with sample 1 polygon coords:
let L = 20;
let W = 150;
let H = 150;
let T = 0;

let radiusA = W / 2;
// let let radiusY = H / 2;

let figA = findMidPoint(L, W, H, T);

// Testing math with sample 2 polygon coords:
L = 100;
W = 150;
H = 150;
T = 25;

let radiusB = W / 2;
// let radiusY = H / 2;

figB = findMidPoint(L, W, H, T);

getHypotenuse(figA, figB);

// testing if regular polygons are overlapping:

getDist(getRadi(radiusA, radiusB), getHypotenuse(figA, figB));
// returns: is NOT touching
