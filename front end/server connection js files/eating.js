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

var eatingSPer;
dependent.onclick = function(){eatingSPer = 1}
extAssist.onclick = function(){eatingSPer = 2}
limAssist.onclick = function(){eatingSPer = 3}
supervision.onclick = function(){eatingSPer = 4}
independent.onclick = function(){eatingSPer = 5}
none1.onclick = function(){eatingSPer = 6}

var eatingSupp;
twoPerson.onclick = function(){eatingSupp = 1}
onePerson.onclick = function(){eatingSupp = 2}
setup.onclick = function(){eatingSupp = 3}
noSetup.onclick = function(){eatingSupp = 4}
none2.onclick = function(){eatingSupp = 5}

export {eatingSupp, eatingSPer};
