import 'google-apps-script'

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

var sheet_row = 1;

while (sheet_row < data.length) {
  sheet_row = sortImports(data, dictionary, sheet_row);
}

function sortImports(data,dictionary,sheet_row) {

  var header_row = sheet_row-1;
  // flattening to facillitate easier iteration over all the values
  var flat_dictionary = [].concat.apply([], Object.values(dictionary));
  console.log(flat_dictionary);

  // Function to find the end_row number of an import "block"
  function findEndRow(data, header_row) {
    let end_row = -1;
    for (var i = header_row + 1; i < data.length; i++) {
      if (data[i][0].trim() == "Exercise") {
        end_row = i; 
        break;
      }
    }
    
    return end_row;
  }
  
  let end_row = findEndRow(data, header_row);
  console.log("header_row: ",header_row);
  console.log("end_row: ",end_row);

  // Contains all the values of the row designated a header
  var header = data[header_row];
  console.log("header: ",header);
  var block = [];
  console.log("block: ",block);
  // Push header and then all the rows from header_row to end_row into block
  block.push(header)
  for (var i = header_row+1; i < end_row; i++) {
    block.push(data[i]);
  }
  console.log("block: ", block);
  
  var position_array = getHeaderPositions(header, flat_dictionary, dictionary);
  console.log("position_array: ", position_array);
  
  // This function will interpret the header of a "block" and after processing will generate an array of numbers (or "" if no match found)
  // This array of numbers represents how the header needs to be rearranged to fit the desired scheme set by dictionary.
  function getHeaderPositions(header, flat_dictionary, dictionary) {
    let position_array = [];
    header.forEach(function(term) {
      var term_index = flat_dictionary.indexOf(term);
      console.log("Term_Index of '" + term + "' in flat_dictionary: " + term_index);

      if (term_index !== -1) {
        for (var key in dictionary) {
          if (term_index < dictionary[key].length) {
            var key_index = Object.keys(dictionary).indexOf(key);
            position_array = position_array.concat(key_index);
            console.log("Index of key in dictionary: ", key_index);
            break;
          } else {
            term_index -= dictionary[key].length;
          }
        }
      } else {
        position_array.push("");
      }
      console.log("position_array: ", position_array);
    });
    return position_array;
  }

  // This function will rearrange the elements of each inner array of the block array according to the position_array
  function rearrangeBlockArray(block, position_array) {
    function rearrangeContentArray(positional_array, content_array) {
      var clean_array = [];
      for (var i = 0; i < content_array.length; i++) {
        var position = positional_array[i];
        clean_array[position] = content_array[i];
      }
        return clean_array;
    }
    var clean_block = [];
    for (var i = 0; i < block.length; i++) {
      var header = block[i];
      var clean_array = rearrangeContentArray(position_array, header);
      clean_block.push(clean_array);
    }
    return clean_block;
  }

  var rearranged_block = rearrangeBlockArray(block, position_array);
  console.log("Rearranged block: ", rearranged_block);

  var num_rows = (end_row-header_row); // 9
  var dict_length = Object.keys(dictionary).length; // 19?
  console.log("num_rows: ",num_rows);
  console.log("dict_length: ",dict_length);

  // Writing the results to sheet3 for debugging purposes
  // TODO - Fix hardcoding of writing. 
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName("Sheet3");
  sheet.getRange(header_row+1, 1, num_rows, 18).setValues(rearranged_block);

  return header_row = end_row+1; 
}


