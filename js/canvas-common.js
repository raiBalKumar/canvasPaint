let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let uploadFile = document.getElementById('uploadFile');
let clear = document.getElementById('clear');
let colorCode;

// width and height of canvas in %
canvasReal.width = 0.81 * window.innerWidth;
canvasReal.height = 0.8 * window.innerHeight;
canvasDraft.width = 0.81 * window.innerWidth;
canvasDraft.height = 0.8 * window.innerHeight;

window.addEventListener('DOMContentLoaded', init);

function init() {
    // resize canvas on  window resize
    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {

        // Copy canvas as image data to restore on size change
        var imgData = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
        // resize canvas
        canvasReal.width = 0.81 * window.innerWidth;
        canvasReal.height = 0.8 * window.innerHeight;
        canvasDraft.width = 0.81 * window.innerWidth;
        canvasDraft.height = 0.8 * window.innerHeight;

        // Copy back to resized canvas
        contextReal.putImageData(imgData, 0, 0);
    }

    // ---handle manually uploaded image ------
    uploadFile.addEventListener('change', function (ev) {
        var file = ev.target.files[0];
        var imgType = /image.*/;
        if (file.type.match(imgType)) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function (event) {
                var tempImg = new Image();
                tempImg.onload = function (ev) {
                    ev.target.width = canvasReal.width;
                    ev.target.height = canvasReal.height;
                    contextReal.drawImage(ev.target, 0, 0, this.width, this.height);
                }
                tempImg.src = event.target.result;

            }

        }
    });

    // ---clear button---------
    clear.addEventListener('click', function () {
        contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
    }, false);
}




$('#canvas-draft').mousedown(function (e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseDown([mouseX, mouseY], e);
    dragging = true;
});
$('#canvas-draft').mousemove(function (e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    if (dragging) {
        currentFunction.onDragging([mouseX, mouseY], e);
    }
    currentFunction.onMouseMove([mouseX, mouseY], e);
});
$('#canvas-draft').mouseup(function (e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseUp([mouseX, mouseY], e);
});
$('#canvas-draft').mouseleave(function (e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseLeave([mouseX, mouseY], e);
});

$('#canvas-draft').mouseenter(function (e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseEnter([mouseX, mouseY], e);
});

class PaintFunction {
    constructor() { }
    onMouseDown() { }
    onDragging() { }
    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }
}    
