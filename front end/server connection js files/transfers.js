import {sendData} from "./login";

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



dependent.onclick = function(){sendData("transfers_support", 1)};
extAssist.onclick = function(){sendData("transfers_support", 2)};
limAssist.onclick = function(){sendData("transfers_support", 3)};
supervision.onclick = function(){sendData("transfers_support", 4)};
independent.onclick = function(){sendData("transfers_support", 5)};
none1.onclick = function(){sendData("transfers_support", 6)};


twoPerson.onclick = function(){sendData("transfers_self", 1)};
onePerson.onclick = function(){sendData("transfers_self", 2)};
setup.onclick = function(){sendData("transfers_self", 3)};
noSetup.onclick = function(){sendData("transfers_self", 4)};
none2.onclick = function(){sendData("transfers_self", 5)};
