let continent = document.getElementById("continent");
let incontinent = document.getElementById("incontinent");
let catheter = document.getElementById("catheter");
let catheterL = document.getElementById("catheterL");
let bathroom = document.getElementById("bathroom");
let bedPan = document.getElementById("bedPan");
let besideCommode = document.getElementById("besideCommode");
let pads = document.getElementById("pads");

var bladderVal;
continent.onclick = function(){bladderVal = 1};
incontinent.onclick = function(){bladderVal = 2};
catheter.onclick = function(){bladderVal = 3};
catheterL.onclick = function(){bladderVal = 4};
bathroom.onclick = function(){bladderVal = 5};
bedPan.onclick = function(){bladderVal = 6};
besideCommode.onclick = function(){bladderVal = 7};
pads.onclick = function(){bladderVal = 8};

export {bladderVal};
