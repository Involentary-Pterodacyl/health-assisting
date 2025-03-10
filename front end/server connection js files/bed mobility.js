import {sendData} from "./paitents";

let total = document.getElementById('total');
let extensive = document.getElementById('extensive');
let limited = document.getElementById('limited');
let supervision = document.getElementById('supervision');
let independent = document.getElementById('independent');
let none1 = document.getElementById('none');

let twoPerson = document.getElementById('two person');
let onePerson = document.getElementById('one person');
let setup = document.getElementById('setup');
let noSetup = document.getElementById('no setup');
let none2 = document.getElementById('no');


dependent.onclick = function(){sendData("bed_mobility_support", 1)};
extAssist.onclick = function(){sendData("bed_mobility_support", 2)};
limAssist.onclick = function(){sendData("bed_mobility_support", 3)};
supervision.onclick = function(){sendData("bed_mobility_support", 4)};
independent.onclick = function(){sendData("bed_mobility_support", 5)};
none1.onclick = function(){sendData("bed_mobility_support", 6)};


twoPerson.onclick = function(){sendData("bed_mobility_self", 1)};
onePerson.onclick = function(){sendData("bed_mobility_self", 2)};
setup.onclick = function(){sendData("bed_mobility_self", 3)};
noSetup.onclick = function(){sendData("bed_mobility_self", 4)};
none2.onclick = function(){sendData("bed_mobility_self", 5)};
