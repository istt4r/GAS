import 'google-apps-script'


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
    console.log(dictionary);

    // flattening to facillitate easier iteration over all the values
    var flat_dictionary = [].concat.apply([], Object.values(dictionary));
    console.log(flat_dictionary);


    // Contains all the values of the row designated a header
    var header = ["Exercise","Apparatus","Set","Completed","Weight","Repetitions","Date"];
    var rearrange_header = [];
    
    // Retrieve term_index of the term in flat_dictionary which matches to the term in header
    header.forEach(function(term) {
        var term_index = flat_dictionary.indexOf(term);
        console.log("Term_Index of '" + term + "' in flat_dictionary: " + term_index);

      // Reverse search the term_index to find the corresponding key_index in dictionary
      for (var key in dictionary) {
          if (term_index < dictionary[key].length) {
              key_index = Object.keys(dictionary).indexOf(key);
              rearrange_header = rearrange_header.concat(key_index);
              console.log("Index of key in dictionary: ",key_index);
              break;
          } else {
            term_index -= dictionary[key].length;
          }
    }
    console.log("Rearrangement array: ",rearrange_header);
    });
}    
