function findReplace() {
    var spreadsheetId = "1u-EEsoBc7CYML8X1tsiYIc_GRP2M-YSiQB84wdUzxhg"; // Please set Spreadsheet ID.
  
    const response = SheetsAPI.Spreadsheets.batchUpdate({
      requests: [
        {
          "findReplace": {
            "allSheets": true,
            "includeFormulas": true,
            "find": "→",
            "replacement": "->",
            
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
        },
        {
          "findReplace": {
          "searchByRegex": true,
          "find": "(Exercises|Name|Namel c)",
          "replacement": "Exercise",
          "allSheets": true,
          "matchCase": false,
          "matchEntireCell": true
          }
        }
      ]
    }, spreadsheetId);
  }  
    
  