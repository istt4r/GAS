// Get the Google Sheet
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Import");

// Get the data in the sheet
var data = sheet.getDataRange().getValues();

// Declare the preset list of equivalent terms for each property
var dictionary = {
"Exercise": ["Exercise"],
"Device": ["Device", "Equipment", "Apparatus"],
"Set": ["Set"],
"Completed": ["Completed", "Checkbox"],
"Weight": ["Weight"],
"Unit": ["Unit"],
"Load": ["Load", "Loading"],
"Reps": ["Reps", "Repetitions"],
"Rest": ["Rest", "Rest (min)"],
"Energy": ["Energy"],
"Loaded-Stretch": ["Loaded-Stretch"],
"RPE": ["RPE", "Intensity"],
"RoM [M|m]": ["RoM [M|m]", "Form"],
"Cadence": ["Cadence"],
"Program": ["Program", "Programming"],
"Notes": ["Notes"],
"Peak HR": ["Peak HR", "Peak Heart Rate"],
"Trough HR": ["Trough HR", "Trough Heart Rate"],
"Date": ["Created", "Date", "Created Time", "Property"],
"Last Edited Time": ["Last Edited Time", "Last Edited"]
};

// Flattening to facilitate easier iteration over all the values
var flatDictionary = [].concat.apply([], Object.values(dictionary));

var sheetRow = 1;
var lastRow = sheet.getLastRow();

while (sheetRow < lastRow) {
sheetRow = sortImports(data, flatDictionary, sheetRow);
}

function removeHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sorting");
  const data = sheet.getDataRange().getValues();
  let numDeleted = 0;

  for (let i = 1; i < data.length; i++) {
    if (data[i][0].trim() === "Exercise") {
      sheet.deleteRow(i + 1 - numDeleted);
      numDeleted += 1;
    }
  }
}
removeHeaders();

// Function to find the end_row number of an import "block"
function findEndRow(data, headerRow) {
  let endRow = -1;
  for (var i = headerRow + 1; i < data.length; i++) {
    if (data[i][0].trim() == "Exercise") {
      endRow = i;
      break;
    } else {
      endRow = lastRow;
    }
  }
  return endRow;
}

// Returns an array of numbers representing the desired order of the header elements.
function getHeaderPositions(header, flatDictionary, dictionary) {
  let positionArray = [];
  header.forEach(function (term) {
    var term = term.trim().toLowerCase();
    var termIndex = flatDictionary.map(function (x) { return x.toLowerCase(); }).indexOf(term);
    // console.log("TermIndex of '" + term + "' in flatDictionary: " + termIndex);
    if (termIndex !== -1) {
      for (var key in dictionary) {
        if (termIndex < dictionary[key].length) {
          var keyIndex = Object.keys(dictionary).indexOf(key);
          positionArray = positionArray.concat(keyIndex);
          // console.log("Index of key in dictionary: ", keyIndex);
          break;
        } else {
          termIndex -= dictionary[key].length;
        }
      }
    } else {
    positionArray.push("");
    }
    // console.log("positionArray: ", positionArray);
  });
  return positionArray;
}

// Rearranges the elements of each inner array in the block according to the positionArray returned by getHeaderPositions
function rearrangeBlockArray(block, positionArray) {
  function rearrangeContentArray(positionalArray, contentArray) {
    var cleanArray = [];
    for (var i = 0; i < contentArray.length; i++) {
      var position = positionalArray[i];
      cleanArray[position] = contentArray[i];
    }
    return cleanArray;
  }
  var cleanBlock = [];
  for (var i = 0; i < block.length; i++) {
    var header = block[i];
    var cleanArray = rearrangeContentArray(positionArray, header);
    cleanBlock.push(cleanArray);
  }
  return cleanBlock;
}

function sortImports(data, flatDictionary, sheetRow) {
  var headerRow = sheetRow - 1;
  var endRow = findEndRow(data, headerRow);
  const numRows = endRow - headerRow;

  const header = data[headerRow];
  const block = [header, ...data.slice(headerRow + 1, endRow)];

  const positionArray = getHeaderPositions(header, flatDictionary, dictionary);
  const rearrangedBlock = rearrangeBlockArray(block, positionArray);

  const sheet = SpreadsheetApp.getActive().getSheetByName("Sorting");
  sheet.getRange(headerRow + 1, 1, numRows, 19).setValues(rearrangedBlock);

  return headerRow = endRow + 1;
}