function sortImports() {
  
    // Get the Google Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
  
    // Get the data in the sheet
    var data = sheet.getDataRange().getValues();
    
    
    // Declare the preset list of equivalent terms for each property
    var equivalentTerms = {
    "Exercise": ["Exercise", "Name"],
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
  
    // Define the sorting function
    function sortBlock(block) {
      // Get the header row
      var headerRow = block[0];
  
      // Create an array to store the index of each property in the header row
      var propertyIndices = [];
      for (var i = 0; i < headerRow.length; i++) {
        var headerCell = headerRow[i];
        for (var property in equivalentTerms) {
          if (equivalentTerms[property].includes(headerCell)) {
            propertyIndices[property] = i;
            break;
          }
        }
      }
  
      // Sort each row in the block according to the index of each property
      for (var i = 1; i < block.length; i++) {
        var row = block[i];
        var sortedRow = [];
        for (var property in propertyIndices) {
          sortedRow[propertyIndices[property]] = row[propertyIndices[property]];
        }
        block[i] = sortedRow;
      }
  
      // Remove the header row
      block.shift();
  
      return block;
    }
  
    
  
    // Split the data into blocks
    var blocks = [];
    var currentBlock = [];
    for (var i = 0; i < data.length; i++) {
    var row = data[i];
    if (row[0] in equivalentTerms) {
        blocks.push(sortBlock(currentBlock));
        currentBlock = [row];
      } else {
        currentBlock.push(row);
      }
    }
  
    // Sort the last block and remove its header row
    blocks.push(sortBlock(currentBlock));
  
    // Flatten the blocks into a single array
    var sortedData = [];
    for (var i = 0; i < blocks.length; i++) {
      sortedData = sortedData.concat(blocks[i]);
    }
  
  // Write the sorted data back to the sheet
  sheet.clearContents();
  sheet.getRange(1, 1, sortedData.length, sortedData[0].length).setValues(sortedData);
  }
  
  
  