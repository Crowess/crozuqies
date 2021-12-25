document.addEventListener("DOMContentLoaded", ready);

function post(url, data) {
    return fetch(url, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data), credentials: "same-origin"});
}

let cookie = document.cookie;

if (!cookie) {
    document.cookie = "id = " + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}

async function ready() {
    var rectangle = document.getElementById("rectangleClickable");
    var triangle = document.getElementById("triangleClickable");
    var rectCount = document.getElementById("nbrRects");
    var trigCount = document.getElementById("nbrTrigs");
    var nbrRectangle = 0;
    var nbrTriangle = 0;

    rectangle.addEventListener('click', function (event) {
        clickRectangle();
    });
    triangle.addEventListener('click', function (event) {
        clickTriangle();
    });

    function clickRectangle() {
        rectCount.innerHTML = parseInt(rectCount.innerHTML) + 1;
        post("/add", {type: "rectangles"});
    }
    function clickTriangle() {
        trigCount.innerHTML = parseInt(trigCount.innerHTML) + 1;
        post("/add", {type: "triangles"});
    }

    async function update() {
        fetch("/triangles", {method: "GET", headers: {'Content-Type': 'application/json'}})
        .then((data) => data.json())
        .then((data) => {
            trigCount.innerHTML = data.amt;
        });
        fetch("/rectangles", {method: "GET", headers: {'Content-Type': 'application/json'}})
        .then((data) => data.json())
        .then((data) => {
            rectCount.innerHTML = data.amt;
        });
        setTimeout(update, 1000);
    }
    update();
}
