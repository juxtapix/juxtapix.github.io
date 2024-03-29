const str = 'Hello World!';
let processedStr;
let start = false;
let letterIndex = 0;
let bitIndex = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(255);
  frameRate(30);
  processedStr = processString(str);
}

function draw() {
  if (start) {
    writeData();
  } else {
    background(200);
  }
}

function mouseClicked() {
  console.log(processedStr);
  start = true;
}

function writeData() {
  if (processedStr[letterIndex][bitIndex] === '1') {
    background(255);
  } else {
    background(0);
  }
  bitIndex++;
  if (bitIndex === 8) {
    bitIndex = 0;
    letterIndex++;
  }
  if (letterIndex === processedStr.length) {
    letterIndex = 0;
    start = false;
  }
}

//-------------------------- FullScreen

function touchStarted () {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};

function processString(str) {
  return str.split('').map(processChar).concat(['00000000']);
}

function processChar(letter) {
  let binary = letter.charCodeAt(0).toString(2);
  return '0'.repeat(8 - binary.length) + binary;
}
