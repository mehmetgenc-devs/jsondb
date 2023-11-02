const MegaDB = require("./index"); // Require database module

const newDb = new MegaDB(); // Create database src: /database/database.json

/*
const newDb = new MegaDB({ "name": "test", "folder": "database", "noBlankData": true, "readable": true }); // Create database
*/

newDb.set("database", "test"); // output: true, data: { "database" : "test" }
console.log("newDb.set(\"database\", \"test\")", newDb.get("database"));

newDb.set("array", [1]); // output: true, data: { "array" : [1] }
console.log("newDb.set(\"array\", [1])", newDb.get("array"));

newDb.push("array", 2); // output: true, data: { "array" : [1, 2] }
console.log("newDb.push(\"array\", 2)", newDb.get("array"))

newDb.set("number", 1); // output: true, data: { "number" : 1 }
console.log("newDb.set(\"number\", 1)", newDb.get("number"));

newDb.add("number", 2); // output: true, data: { "number" : 3 }
console.log("newDb.add(\"number\", 2)", newDb.get("number"));

newDb.all() // output: { "database" : "test", "array" : [1, 2], "number" : 3 }
console.log("newDb.all()", newDb.all());

newDb.deleteAll() // output: true, data: {}
console.log("newDb.deleteAll()", newDb.all());


// thank you for used by MEGA db...
