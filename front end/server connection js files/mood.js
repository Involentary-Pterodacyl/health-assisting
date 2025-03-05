let calm = document.getElementById("calm");
let happy = document.getElementById("happy");
let depressed = document.getElementById("depressed");
let agitation = document.getElementById("agitation");
let sad = document.getElementById("sad");
let yelling = document.getElementById("yelling");
let anxiety = document.getElementById("anxiety");
let withdrawn = document.getElementById("withdrawn");
let combatitive = document.getElementById("combatitive");

var moodVal;
calm.onclick = function(){moodVal = 1};
happy.onclick = function(){moodVal = 2};
depressed.onclick = function(){moodVal = 3};
agitation.onclick = function(){moodVal = 4};
sad.onclick = function(){moodVal = 5};
yelling.onclick = function(){moodVal = 6};
anxiety.onclick = function(){moodVal = 7};
withdrawn.onclick = function(){moodVal = 8};
combatitive.onclick = function(){moodVal = 9};

export {moodVal};
