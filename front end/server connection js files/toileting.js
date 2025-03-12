import {sendData} from "./login.js";
import {patientval} from "./patients.js";

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


dependent.onclick = function(){sendData("toileting_support", 1, patientval)};
extAssist.onclick = function(){sendData("toileting_support", 2, patientval)};
limAssist.onclick = function(){sendData("toileting_support", 3, patientval)};
supervision.onclick = function(){sendData("toileting_support", 4, patientval)};
independent.onclick = function(){sendData("toileting_support", 5, patientval)};
none1.onclick = function(){sendData("toileting_support", 6, patientval)};


twoPerson.onclick = function(){sendData("toileting_self", 1, patientval)};
onePerson.onclick = function(){sendData("toileting_self", 2, patientval)};
setup.onclick = function(){sendData("toileting_self", 3, patientval)};
noSetup.onclick = function(){sendData("toileting_self", 4, patientval)};
none2.onclick = function(){sendData("toileting_self", 5, patientval)};
