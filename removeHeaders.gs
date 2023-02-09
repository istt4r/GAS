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