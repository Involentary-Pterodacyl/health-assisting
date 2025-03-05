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


var bedMobilitySPer;
dependent.onclick = function(){bedMobilitySPer = 1};
extAssist.onclick = function(){bedMobilitySPer = 2};
limAssist.onclick = function(){bedMobilitySPer = 3};
supervision.onclick = function(){bedMobilitySPer = 4};
independent.onclick = function(){bedMobilitySPer = 5};
none1.onclick = function(){bedMobilitySPer = 6};

var bedMobilitySupp;
twoPerson.onclick = function(){bedMobilitySupp = 1};
onePerson.onclick = function(){bedMobilitySupp = 2};
setup.onclick = function(){bedMobilitySupp = 3};
noSetup.onclick = function(){bedMobilitySupp = 4};
none2.onclick = function(){bedMobilitySupp = 5};

export {bedMobilitySupp, bedMobilitySPer};
