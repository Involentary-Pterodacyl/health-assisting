let dependent = document.getElementById("dependent");
let extAssist = document.getElementById("extAssist");
let limAssist = document.getElementById("limAssist");
let supervision = document.getElementById("supervision");
let independent = document.getElementById("independent");
let none1 = document.getElementById("none");

let twoPerson = document.getElementById("twoPerson");
let onePerson = document.getElementById("onePerson");
let setup = document.getElementById("setup");
let noSetup = document.getElementById("noSetup");
let none2 = document.getElementById("no");


var transfersSPer;
dependent.onclick = function(){transfersSPer = 1}
extAssist.onclick = function(){transfersSPer = 2}
limAssist.onclick = function(){transfersSPer = 3}
supervision.onclick = function(){transfersSPer = 4}
independent.onclick = function(){transfersSPer = 5}
none1.onclick = function(){transfersSPer = 6}

var transfersSupp;
twoPerson.onclick = function(){transfersSupp = 1}
onePerson.onclick = function(){transfersSupp = 2}
setup.onclick = function(){transfersSupp = 3}
noSetup.onclick = function(){transfersSupp = 4}
none2.onclick = function(){transfersSupp = 5}

export {transfersSupp, transfersSPer};
