import {sendData} from "./login.js";
import {patientval} from "./patients.js";

let calm = document.getElementById("calm");
let happy = document.getElementById("happy");
let depressed = document.getElementById("depressed");
let agitation = document.getElementById("agitation");
let sad = document.getElementById("sad");
let yelling = document.getElementById("yelling");
let anxiety = document.getElementById("anxiety");
let withdrawn = document.getElementById("withdrawn");
let combatitive = document.getElementById("combatitive");


calm.onclick = function(){sendData("mood",1, patientval)};
happy.onclick = function(){sendData("mood", 2, patientval)};
depressed.onclick = function(){sendData("mood", 3, patientval)};
agitation.onclick = function(){sendData("mood", 4, patientval)};
sad.onclick = function(){sendData("mood", 5, patientval)};
yelling.onclick = function(){sendData("mood", 6, patientval)};
anxiety.onclick = function(){sendData("mood", 7, patientval)};
withdrawn.onclick = function(){sendData("mood", 8, patientval)};
combatitive.onclick = function(){sendData("mood", 9, patientval)};
