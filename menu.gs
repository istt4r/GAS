function createMenu() {
    var menu = SpreadsheetApp.getUi().createMenu("⚙️ Admin Settings");
     menu.addItem("Find/Replace →, & =", "findReplace");
     menu.addItem("Sort Imports", "sortImports");
     menu.addItem("Remove Headers", "removeHeaders");
     menu.addItem("Expand -> Rows", "expandRows");
     menu.addToUi();
  }
  