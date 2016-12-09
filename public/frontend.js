const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// set up sockets on the front-end
const socket = io();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// set up pen
ctx.strokeStyle = 'cadetBlue';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

// drawing variables
let isDrawing = false;
let x1 = 0;
let y1 = 0;

canvas.addEventListener('mousedown', function(event) {
  isDrawing = true;
  // redefine x and y on every click of the mouse (the starting point of the line)
  x1 = event.offsetX;
  y1 = event.offsetY;
  console.log(event);
});


canvas.addEventListener('mousemove', function(event) {
  if (isDrawing) {
    draw(x1, y1, event.offsetX, event.offsetY);
    let coords = [x1, y1, event.offsetX, event.offsetY];
      socket.emit('draw coordinates', coords);
  }
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);



// 2) listen for incoming coordinates on the front-end
socket.on('draw coordinates', function(coords){
  // console.log(coords);\
  draw(coords[0], coords[1], coords[2], coords[3]);
});


function draw(x1, y1, x2, y2) {
  ctx.beginPath();
  //start from
  ctx.moveTo(x1, y1);
  //go to
  ctx.lineTo(x2, y2);
  ctx.stroke();
  // redefine x and y on every move of the mouse (every call of the 'draw' function)
  var coords = [x1, y1, x2, y2];
  x2 = x1;
  y2 = y1;
}
