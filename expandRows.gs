// Originally I used the notation "->" to indicate a dropset, however this proved impractical for a spreadsheet to interpret
// This function searches for rows which include "->", and "expands" the row into new rows while preserving the appropriate weight/repetitions/set accordingly.
function expandRows() {
  var sheet = SpreadsheetApp.getActive().getSheetByName("Sorting");
  var data = sheet.getDataRange().getValues();
  var newData = [];

  for (var i = 0; i < data.length; i++) {
    var weight = data[i][4];

    if (weight.toString().indexOf("->")!= -1) {
      console.log("Found '->' at Row: ", i);
      var repetitions = data[i][7];
      var weightArr = weight.split("->");
      var repsArr = repetitions.split("->");

      if (weightArr.length > 1) {
        for (var j = 0; j < weightArr.length; j++) {
          var row = data[i].slice();
          row[4] = weightArr[j];
          row[7] = repsArr[j];
          console.log("New Row: ", j);
          newData.push(row);
        }
      } 
    } else {
        newData.push(data[i]);
    }
  }
    
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}
