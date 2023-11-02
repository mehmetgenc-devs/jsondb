<h3>JSON DATABASE</h3>
<p>
EN: This module allows you to create an easy-to-use and instantly modifiable local database in JSON format.<br/>
TR: Bu modül, JSON formatında kullanımı kolay ve anlık değiştirilebilen yerel bir veritabanı oluşturmanıza olanak sağlar.<br/>
</p>
<br/>
Github: https://github.com/imehmetgenc/db.json<br>

<h3>Usage</h3>
Install this module:
```sh
$ npm install @imehmetgenc/db.json
```

Import or require the module to your code:
```js
const MegaDB = require('@imehmetgenc/db.json');
```

```js
import MegaDB from '@imehmetgenc/db.json';

```
<br/>


<h3>Test</h3>
<p>
EN: I have left a few tips for you to use below, I hope I explained them well.<br>
TR: Aşağıda size kullanmanz için bir kaç ipucu bıraktım umarım iyi anlatmışımdır.<br>
</p>
<br/>


```js
const newDb = new MegaDB("test"); // Create database src: /database/test.json

/*
const newDb = new MegaDB(); // Create database src: /database/database.json
const newDb = new MegaDB({ "name": "test", "folder": "database", "noBlankData": true, "readable": true }); // Create database src: /database/test.json
*/

newDb.set("database", "test"); // output: true, data: { "database" : "test" }

newDb.set("array", [1]); // output: true, data: { "array" : [1] }

newDb.push("array", 2); // output: true, data: { "array" : [1, 2] }

newDb.set("number", 1); // output: true, data: { "number" : 1 }

newDb.add("number", 2); // output: true, data: { "number" : 3 }

newDb.all() // output: { "database" : "test", "array" : [1, 2], "number" : 3 }

newDb.deleteAll() // output: true, data: {}
```
