function sortImports() {
  
  // Get the Google Sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");

  // Get the data in the sheet
  var data = sheet.getDataRange().getValues();
  
  // Declare the preset list of equivalent terms for each property
  var dictionary = {
  "Exercise": ["Exercise"],
  "Device": ["Device", "Equipment","Apparatus"],
  "Set": ["Set"],
  "Completed": ["Completed", "Checkbox"],
  "Weight": ["Weight"],
  "Unit": ["Unit"],
  "Load": ["Load", "Loading"],
  "Reps": ["Reps", "Repetitions"],
  "Rest": ["Rest"],
  "Energy": ["Energy"],
  "Loaded-Stretch": ["Loaded-Stretch"],
  "RPE": ["RPE", "Intensity"],
  "RoM [M|m]": ["RoM [M|m]", "Form"],
  "Cadence": ["Cadence"],
  "Program": ["Program", "Programming"],
  "Notes": ["Notes"],
  "Peak HR": ["Peak HR", "Peak Heart Rate"],
  "Trough HR": ["Trough HR", "Trough Heart Rate"],
  "Date": ["Created", "Date"],
  "Last Edited Time": ["Last Edited Time"]
  };

  // flattening to facillitate easier iteration over all the values
  var flat_dictionary = [].concat.apply([], Object.values(dictionary));



  var start_row = 1;
  // Function to find the end_row number of an import "block"
  function findEndRow(data, start_row) {
    let end_row = -1;
    for (var i = start_row + 1; i < data.length; i++) {
      if (data[i][0].trim() == "Exercise") {
        end_row = i; 
        break;
      }
    }
    
    return end_row;
  }
  
  // TODO - encapulate in loop to process all of data.length
  let end_row = findEndRow(data, start_row);
  console.log("start_row: ",start_row);
  console.log("end_row: ",end_row);

  // Contains all the values of the row designated a header
  var header = data[start_row];
  console.log("header: ",header);
  var block = [];
  console.log("block: ",block);
  // Push header and then all the rows from start_row to end_row into block
  block.push(header)

  for (var i = start_row+1; i < end_row; i++) {
    block.push(data[i]);
  }
  
  console.log("block: ", block);
  

  
  
  
var rearrange_header = [];
  

// Retrieve term_index of the term in flat_dictionary which matches to the term in header
header.forEach(function(term) {
  var term_index = flat_dictionary.indexOf(term);
  console.log("term_Index of '" + term + "' in flat_dictionary: " + term_index);

// Reverse search the term_index to find the corresponding key_index in dictionary
if (term_index !== -1) {
  for (var key in dictionary) {
    if (term_index < dictionary[key].length) {
      var key_index = Object.keys(dictionary).indexOf(key);
      rearrange_header = rearrange_header.concat(key_index);
      console.log("Index of key in dictionary: ", key_index);
      break;
    } else {
      term_index -= dictionary[key].length;
    }
  }
} else {
  rearrange_header.push("");
}
console.log("Rearrangement array: ", rearrange_header);

});
  
}

