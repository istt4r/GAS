function createMenu() {
  console.log("Running createMenu function");
  var menu = SpreadsheetApp.getUi().createMenu("⚙️ Admin Settings");
   menu.addItem("Sort Imports", "sortImports");
   menu.addItem("Remove Headers", "removeHeaders");
   menu.addToUi();
   console.log("createMenu function completed");
}
