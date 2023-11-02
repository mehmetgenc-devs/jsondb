const MegaDB = require("./index");

const newDb = new MegaDB({ "dbName": "test", "dbFolder": "database", "noBlankData": true, "readable": true })

newDb.set("database", "test"); // output: true, data: { "database" : "test" }

newDb.set("array", [1]); // output: true, data: { "array" : [1] }

newDb.push("array", 2); // output: true, data: { "array" : [1, 2] }

newDb.set("number", 1); // output: true, data: { "number" : 1 }

newDb.add("number", 2); // output: true, data: { "number" : 3 }

newDb.all() // output: { "database" : "test", "array" : [1, 2], "number" : 3 }

newDb.deleteAll() // output: true, data: {}


// thank you for used by MEGA db...