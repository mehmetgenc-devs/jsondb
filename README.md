<h3>Json-Database-db<h3>

EN: This module allows you to create an easy-to-use and instantly modifiable local database in JSON format.
TR: Bu modül, JSON formatında kullanımı kolay ve anlık değiştirilebilen yerel bir veritabanı oluşturmanıza olanak sağlar.

Github: https://github.com/imehmetgenc/jsondb

<h3>Usage<h3>
Install this module:

```bash
$ npm i @imehmetgenc/jsondb
```

Import or require the module to your code:
```js
const { Model } = require('@imehmetgenc/jsondb')
```

```js
import { Model } from '@imehmetgenc/jsondb'

```
<br>

EN: I have left a few tips for you to use below, I hope I explained them well.<br>
TR: Aşağıda size kullanmanz için bir kaç ipucu bıraktım umarım iyi anlatmışımdır.

```js
const MegaDB = require("./index"); // Require database module

const newDb = new MegaDB({ "dbName": "test", "dbFolder": "database", "noBlankData": true, "readable": true }); // Create database

newDb.set("database", "test"); // output: true, data: { "database" : "test" }

newDb.set("array", [1]); // output: true, data: { "array" : [1] }

newDb.push("array", 2); // output: true, data: { "array" : [1, 2] }

newDb.set("number", 1); // output: true, data: { "number" : 1 }

newDb.add("number", 2); // output: true, data: { "number" : 3 }

newDb.all() // output: { "database" : "test", "array" : [1, 2], "number" : 3 }

newDb.deleteAll() // output: true, data: {}
```
