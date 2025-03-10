import {sendData} from "./paitents";

let continent = document.getElementById("continent");
let incontinent = document.getElementById("incontinent");
let catheter = document.getElementById("catheter");
let catheterL = document.getElementById("catheterL");
let bathroom = document.getElementById("bathroom");
let bedPan = document.getElementById("bedPan");
let besideCommode = document.getElementById("besideCommode");
let pads = document.getElementById("pads");


continent.onclick = function(){sendData("bladder", 1)};
incontinent.onclick = function(){sendData("bladder", 2)};
catheter.onclick = function(){sendData("bladder", 3)};
catheterL.onclick = function(){sendData("bladder", 4)};
bathroom.onclick = function(){sendData("bladder", 5)};
bedPan.onclick = function(){sendData("bladder", 6)};
besideCommode.onclick = function(){sendData("bladder", 7)};
pads.onclick = function(){sendData("bladder", 8)};
