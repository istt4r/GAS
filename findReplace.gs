// Function uses the "Google Sheets API" to utilize the batchUpdate() method
// Specifying in the within the request for two FindReplaceRequest(s): https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request?authuser=0
function findReplace() {
  var spreadsheetId = "1u-EEsoBc7CYML8X1tsiYIc_GRP2M-YSiQB84wdUzxhg"; // Spreadsheet ID.

  const response = SheetsAPI.Spreadsheets.batchUpdate({
    requests: [
      {
            "findReplace": {
              "allSheets": true,
              "includeFormulas": true,
              "find": "→",
              "replacement": "->",
              "matchEntireCell": false,
              "matchCase": false
            }
          },
          {
            "findReplace": {
              "allSheets": true,
              "includeFormulas": true,
              "find": "=",
              "replacement": "",
              "matchCase": false,
              "matchEntireCell": false
            }
          }
    ]
  }, spreadsheetId);
}  
  
