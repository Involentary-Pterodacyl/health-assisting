let username = sessionStorage.getItem("username");
let logout = document.getElementById("signout");

let submit = document.getElementById("submit");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");

let headerNames = ["Student", "Category", "Value", "Patient", "Date"];

// all table names ["bed_mobility_self", "bed_mobility_support", "bed_mobility_position", "bladder", "mood", "sundowning", "meal", "dietary_intake", "dietary_output",
// "eating_self", "eating_support", "toileting_self", "toileting_support", "toileting_consistency", "catheter", "transfers_self",
// "transfers_support", "transfers_device", "weight", "blood_pressure", "oxygen_levels", "pulse", "respiration", "temperature", "bathing", "shaving","back_rub",
// "nails", "oral", "denture"]

// tables with values in valSelf1to6
let tableSelf1to6 = ["bed_mobility_self", "eating_self", "toileting_self", "transfers_self"];
// the values for tables in tableSelf1to6
let valSelf1to6 = ["Totally Dependant", "Extensive Assist", "Limited Assist", "Supervision", "Independent", "Did Not Occur"];

let tableSupport1to6 = ["bed_mobility_support", "eating_support", "toileting_support", "transfers_support"];
let valSupport2to6 = ["", "Two Person Assist", "One Person Assist", "Set-Up", "No Set-Up", "Did Not Occur"];
let valSupport1 = ["Hoyer Lift", "Feeding Tube", "Colostomy Bag", "Hoyer Lift"];

let tableCare1to4 = ["back_rub", "nails", "oral", "shaving", "denture"];
let valCare1to4 = ["Assist", "Independent", "Dependent", "Not Applicable"];

let tableBool = ["catheter"];

let tableOther = ["bed_mobility_position", "bladder", "mood", "toileting_consistency", "transfers_device"];
let valOther = [
  ["Left Lateral", "Right Lateral", "Supine"],
  ["Continent", "Incontinent", "Catheter", "Catheter Leakage", "Bathroom", "Bed Pan/Urinal", "Bedside Commode", "Pads/Briefs"],
  ["Calm", "Happy", "Depressed", "Agitation", "Sad", "Yelling", "Anxiety", "Withdrawn", "Combative"],
  ["Liquid", "Soft", "Formed", "Constipated"],
  ["Cane", "Walker", "Crutches", "Wheelchair", "Bedridden", "None"]
];

// need to figure out how to display tables with more than one value
// meal, dietary_intake, etc

//const tableNames = ["bed_mobility_self", "bed_mobility_support", "bed_mobility_position", "bladder", "mood"];
const tableNames = ["bed_mobility_self", "bed_mobility_support", "bed_mobility_position", "bladder", "mood", //"sundowning",
  "meal", //"dietary_intake", "dietary_output",
  "eating_self", "eating_support", "toileting_self", "toileting_support", "toileting_consistency", "catheter", "transfers_self",
  "transfers_support", "transfers_device", //"weight", "blood_pressure", "oxygen_levels",
  "pulse", "respiration", "temperature", //"bathing",
  "shaving","back_rub", "nails", "oral", "denture"];
let usernames = [];
let studentNames = [];
let categoryRowspans = [];
let allData = [];
let patientNames = [];
let patientIDs = [];

await sortStudents();
// console.log("usernames:");
// console.log(usernames);
// console.log("studentNames:");
// console.log(studentNames);

await getPatients();
// console.log("patientIDs:");
// console.log(patientIDs);
// console.log("patientNames :");
// console.log(patientNames);

// once the page has fully loaded a call is made to the server with the username variable
// to check if the student has signed in
window.onload = () => {
  axios.post('http://localhost:3000/login_get', {username:username})
    .then(response => {
      console.log(response.data);
      if (response.data === false){
        console.log("not signed in");
        window.location.href = "../index.html";
      }
    });
}

submit.onclick = async function () {
  let d1 = date1.value;
  let d2 = date2.value;

  if (d1 === "" || d2 === "") {
    window.alert("Please select both dates.");
    return;
  } else if (d1 > d2) {
    window.alert("The end date must be on or after the start date.");
    return;
  }

  console.log("about to start loop");
  for (let u = 0; u < usernames.length; u++) {
    categoryRowspans[u] = [];
    //allData[u] = [];
    for (let t = 0; t < tableNames.length; t++) {
      await axios.post("http://localhost:3000/teacher", {date1: d1, date2: d2, username: usernames[u], tableName: tableNames[t]})
        .then(res => {
          // console.log("data " + usernames[u] + ' ' + tableNames[t]);
          // console.log(res.data);
          //allData.push(res.data);
          allData.push(...res.data);
          categoryRowspans[u].push(res.data.length);

          // for (let x = 0; x < res.data.length; x++) {
          //   if (usernames.includes(res.data[x]["username"]) === false) {
          //     usernames.push(res.data[x]["username"]);
          //   }
          // }
        })
    }
  }
  // console.log("category rowspans: ");
  // console.log(categoryRowspans);
  // console.log("alldata: ");
  // console.log(allData.length);
  // console.log(allData);
  //await new Promise(r => setTimeout(r, 1));
  generateTable(usernames, categoryRowspans);
}

if (logout !== null) {
  logout.onclick = function () {
    console.log("logging out");

    axios.post("http://localhost:3000/logout", {username:username})
      .catch(error => {
        console.error('Error:', error);
      });
    window.location.href = "../index.html";
  };
}

//generateTable(["Student 1", "Student 2", "Student 3"], [[1,2,1], [2,1,0], [0,0,0]]);

async function sortStudents() {
  let uNames = [];
  let sNames = [];

  await axios.post("http://localhost:3000/getStudents").then((res) => {
    // console.log("Students:");
    // console.log(res.data);

    for (let i = 0; i < res.data.length; i++) {
      uNames.push(res.data[i]["username"]);
      sNames.push(res.data[i]["first_name"] + " " + res.data[i]["last_name"]);
    }
    // console.log("usernames: " + usernames);
    // console.log("names: " + studentNames);
    // return {usernames: usernames, studentNames: studentNames};
    usernames = uNames;
    studentNames = sNames;
  })
  //await new Promise(r => setTimeout(r, 10));
}


//WORKS
function calcRowspans(usernames, categoryRowspans) {
  // let usernames = ["Student 1", "Student 2"]; // string usernames
  // let categoryRowspans = [[2,1], [0,1]]; // each inner array is for a student, each value is for a category

  let studentRowspans = []; // the rowspan corresponding to each student
  let studentAtRowI = [];
  let catAtRowI = [];
  let numRows = 0;

  for (let i = 0; i < categoryRowspans.length; i++){
    studentRowspans[i] = 0;
    for (let j = 0; j < categoryRowspans[i].length; j++){
      studentRowspans[i] += categoryRowspans[i][j];

      //find the category at row i
      for (let k = 0; k < categoryRowspans[i][j]; k++){
        catAtRowI.push(j);
      }
    }
  }
  numRows = catAtRowI.length;

  for (let i = 0; i < usernames.length; i++) {
    for (let j = 0; j < studentRowspans[i]; j++) {
      studentAtRowI.push(i);
    }
  }
  // console.log("studnet rowspans: " + studentRowspans);
  // console.log("student at i: " + studentAtRowI);
  // console.log("cat at i: " + catAtRowI);
  // console.log("numrows: " + numRows);
  return {studentRowspans: studentRowspans, studentAtRowI: studentAtRowI, catAtRowI: catAtRowI, numRows: numRows};
}

async function getPatients() {
  //gets all the names of the patients from the server
  await axios.get("http://localhost:3000/getPatients")
    .then(response => {
      let res = response.data;
      for (let i = 0; i < res.length; i++) {
        patientNames.push(res[i]["first_name"] + " " + res[i]["last_name"]);
        patientIDs.push(res[i]["patient_id"]);
      }
    });
}

function generateTable(students, categoryRowspans) {
  //console.log("students: " + students.length);

  let rowspanThings = calcRowspans(students, categoryRowspans);
  let studentRowspans = rowspanThings.studentRowspans;
  let studentAtRowI = rowspanThings.studentAtRowI;
  let catAtRowI = rowspanThings.catAtRowI;
  let numRows = rowspanThings.numRows;

// create the table header
  const table = document.createElement("table");

  const tableHead = document.createElement("thead");

  const row = document.createElement("tr");
  for (let j = 0; j < headerNames.length; j++){
    const cell = document.createElement("th");
    const cellText = document.createTextNode(headerNames[j]);
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  tableHead.appendChild(row);
  table.appendChild(tableHead);

//create the table body
  const tableBody = document.createElement("tbody");

  for (let i = 0; i < numRows; i++){
    const row = document.createElement("tr");

    for (let j = 0; j < headerNames.length; j++){
      if (i > 0 &&
        ((j === 0 && studentAtRowI[i] === studentAtRowI[i - 1])
          || (j === 1 && catAtRowI[i] === catAtRowI[i - 1]) && studentAtRowI[i] === studentAtRowI[i - 1])) {
        continue;
      }
      const cell = document.createElement("td");
      if (j === 0) {
        cell.setAttribute("rowSpan", studentRowspans[studentAtRowI[i]].toString());
      }
      else if (j === 1){
        cell.setAttribute("rowSpan", categoryRowspans[studentAtRowI[i]][catAtRowI[i]].toString());
      }
      let cellText;
      if (j === 0){
        // student names
        cellText = document.createTextNode(studentNames[studentAtRowI[i]]);
      }
      else if (j === 1){
        // categories
        // replaces underscores with spaces and capitalizes the first letter of each word
        cellText = document.createTextNode(capitalize(tableNames[catAtRowI[i]].replace(/_/g, " ")));
      }
      else if (j === 2){
        // values
        if (tableSelf1to6.includes(tableNames[catAtRowI[i]])){
          cellText = document.createTextNode(valSelf1to6[allData[i]["value"] - 1]);
        }
        else if (tableSupport1to6.includes(tableNames[catAtRowI[i]])){
          if (allData[i]["value"] >= 2){
            cellText = document.createTextNode(valSupport2to6[allData[i]["value"] - 1]);
          }
          else {
            cellText = document.createTextNode(valSupport1[tableSupport1to6.indexOf(tableNames[catAtRowI[i]])]);
          }
        }
        else if (tableCare1to4.includes(tableNames[catAtRowI[i]])){
          cellText = document.createTextNode(valCare1to4[allData[i]["value"] - 1]);
        }
        else if (tableBool.includes(tableNames[catAtRowI[i]])){
          cellText = document.createTextNode(["No", "Yes"][allData[i]["value"]]);
        }
        else if (tableOther.includes(tableNames[catAtRowI[i]])){
          cellText = document.createTextNode(valOther[tableOther.indexOf(tableNames[catAtRowI[i]])][allData[i]["value"] - 1]);
        }
        else {
          cellText = document.createTextNode(allData[i]["value"]); //we need to translate from the numbers to the words
        }
      }
      else if (j === 3){
        // patient names
        cellText = document.createTextNode(patientNames[patientIDs.indexOf(allData[i]["patient_id"])]);
      }
      else if (j === 4){
        let date = allData[i]["date"];
        let dateArr = date.split("T");
        date = dateArr[0] + ", " + dateArr[1].substring(0,5);
        // ^ this works okay but may need time zone stuff
        // and its currently YYYY-MM-DD
        // like 2025-05-08, 16:44
        //(actual time was 12:44. off by 4 hours)
        cellText = document.createTextNode(date);
      }
      else{
        cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
      }
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);

  //add the table to the page
  const tableStart = document.getElementById("tableStart");
  document.body.insertBefore(table, tableStart);
}

function capitalize(str) {
  let strArr = str.split(" ");
  let result = "";
  for (let i = 0; i < strArr.length; i++) {
    result += strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    if (i < strArr.length - 1) {
      result += " ";
    }
  }
  return result;
}
