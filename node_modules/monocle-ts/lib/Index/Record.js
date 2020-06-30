"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var Record_1 = require("../At/Record");
function indexRecord() {
    return index_1.Index.fromAt(Record_1.atRecord());
}
exports.indexRecord = indexRecord;
