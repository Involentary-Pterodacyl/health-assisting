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

var toiletingSPer;
dependent.onclick = function(){toiletingSPer = 1}
extAssist.onclick = function(){toiletingSPer = 2}
limAssist.onclick = function(){toiletingSPer = 3}
supervision.onclick = function(){toiletingSPer = 4}
independent.onclick = function(){toiletingSPer = 5}
none1.onclick = function(){toiletingSPer = 6}

var toiletingSupp;
twoPerson.onclick = function(){toiletingSupp = 1}
onePerson.onclick = function(){toiletingSupp = 2}
setup.onclick = function(){toiletingSupp = 3}
noSetup.onclick = function(){toiletingSupp = 4}
none2.onclick = function(){toiletingSupp = 5}

export {toiletingSupp, toiletingSPer}
