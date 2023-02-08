function sortImports(data, dictionary, sheet_row) {
  var header_row = sheet_row - 1;
  var flat_dictionary = [].concat.apply([], Object.values(dictionary));

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

  var header = data[header_row];
  var block = [];
  block.push(header);
  for (var i = header_row + 1; i < end_row; i++) {
    block.push(data[i]);
  }
  
  var position_array = getHeaderPositions(header, flat_dictionary, dictionary);

  function getHeaderPositions(header, flat_dictionary, dictionary) {
    let position_array = [];
    header.forEach(function(term) {
      var term = term.trim().toLowerCase();
      var term_index = flat_dictionary.map(function(x) { return x.toLowerCase(); }).indexOf(term);
      if (term_index !== -1) {
        for (var key in dictionary) {
          if (term_index < dictionary[key].length) {
            position_array[dictionary[key][term_index]] = term;
            break;
          }
        }
      } else {
        position_array.push("");
      }
    });
    return position_array;
  }

  let rearranged_header = [];
  for (var i = 0; i < position_array.length; i++) {
    if (position_array[i] !== undefined) {
      rearranged_header.push(position_array[i]);
    }
  }

  let rearranged_block = [rearranged_header];
  for (var i = 0; i < block.length - 1; i++) {
    let rearranged_row = [];
    for (var j = 0; j < position_array.length; j++) {
      if (position_array[j] !== undefined) {
        let header_index = header.indexOf(position_array[j]);
        rearranged_row.push(block[i + 1][header_index]);
      }
    }
    rearranged_block.push(rearranged_row);
  }

  var output_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet3");
  for (var i = 0; i < rearranged_block.length; i++) {
    output_sheet.getRange(output_sheet.getLastRow() + 1, 1, 1, rearranged_block[i].length).setValues([rearranged_block[i]]);
  }

  return [end_row + 1, findEndRow(data, end_row)];
}

function removeHeaders() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var data = sheet.getRange(2, 1, lastRow-1, lastColumn).getValues();
  var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  var newData = [];
  for (var i = 0; i < data.length; i++) {
    var newRow = {};
    for (var j = 0; j < headers.length; j++) {
      newRow[headers[j]] = data[i][j];
      }
      newData.push(newRow);
    }
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, headers.length).setValues(newData);
}
