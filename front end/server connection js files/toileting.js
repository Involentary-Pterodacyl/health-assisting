import {sendData} from "./paitents";

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


dependent.onclick = function(){sendData(toilet)}
extAssist.onclick = function(){sendData(toilet)}
limAssist.onclick = function(){sendData(toilet)}
supervision.onclick = function(){sendData(toilet)}
independent.onclick = function(){sendData(toilet)}
none1.onclick = function(){}


twoPerson.onclick = function(){sendData(toilet)}
onePerson.onclick = function(){sendData(toilet)}
setup.onclick = function(){sendData(toilet)}
noSetup.onclick = function(){sendData(toilet)}
none2.onclick = function(){sendData(toilet)}
