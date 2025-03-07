import {sendData} from "./paitents";

let calm = document.getElementById("calm");
let happy = document.getElementById("happy");
let depressed = document.getElementById("depressed");
let agitation = document.getElementById("agitation");
let sad = document.getElementById("sad");
let yelling = document.getElementById("yelling");
let anxiety = document.getElementById("anxiety");
let withdrawn = document.getElementById("withdrawn");
let combatitive = document.getElementById("combatitive");


calm.onclick = function(){sendData("mood",1)};
happy.onclick = function(){sendData("mood", 2)};
depressed.onclick = function(){sendData("mood", 3)};
agitation.onclick = function(){sendData("mood", 4)};
sad.onclick = function(){sendData("mood", 5)};
yelling.onclick = function(){sendData("mood", 6)};
anxiety.onclick = function(){sendData("mood", 7)};
withdrawn.onclick = function(){sendData("mood", 8)};
combatitive.onclick = function(){sendData("mood", 9)};
