"use strict";

var List          = require("./list-model");
var Sqlite        = require("nativescript-sqlite");
var appSettings   = require("application-settings");
var ListModel     = new List.ListModel();
var moment        = require('moment');
var page;

function navigatingTo(args) {
  page = args.object;
  
  if (!Sqlite.exists("alejodb.db")) {
    Sqlite.copyDatabase("alejodb.db");
  }
  (new Sqlite("alejodb.db")).then(db => {
    ListModel.refresh();
    page.bindingContext = ListModel;
  }, error => {
    console.log("OPEN DB ERROR", error);
  });
}
exports.navigatingTo = navigatingTo;

function onSelectedIndexChanged(args) {
  ListModel.selectedCat = args.newIndex;
  ListModel.refresh();
}
exports.onSelectedIndexChanged = onSelectedIndexChanged;
