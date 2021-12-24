document.addEventListener("DOMContentLoaded", ready);

function ready() {

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
        nbrRectangle++;
        rectCount.innerHTML = nbrRectangle;
    }
    function clickTriangle() {
        nbrTriangle++;
        trigCount.innerHTML = nbrTriangle;
    }
    


}
