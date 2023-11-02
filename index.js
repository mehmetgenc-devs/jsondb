const functions = require("./functions.js");
const fs = require("fs");

class MegaDB {
  constructor(options) {

    if (typeof options === "object") {
      this.dbName = options["name"] ? options["name"] : "database";
      this.dbFolder = options["folder"] ? options["folder"] : "database/";
      this.noBlankData = options["noBlankData"] ? (typeof options["noBlankData"] === "boolean" ? options["noBlankData"] : false) : false;
      this.readable = options["readable"] ? (typeof options["readable"] === "boolean" ? true : false) : false;
    } else {
      this.dbName = options ?? "database";
      this.dbFolder = "database/";
      this.noBlankData = true;
      this.readable = true;
    }

    functions.fetchFiles(this.dbFolder, this.dbName);
  }

  set(db, data) {
    functions.fetchFiles(this.dbFolder, this.dbName);

    if (!db) {
      throw new TypeError("Verinin adını gir. - Enter the name of the data.");
    }

    if (!data) {
      throw new TypeError("Ayarlanacak veriyi gir. - Enter the data to be set.");
    }

    const content = JSON.parse(fs.readFileSync(`./${this.dbFolder}/${this.dbName}.json`, "utf8"));
    functions.set(db, data, content);

    if (this.readable) {
      fs.writeFileSync(`./${this.dbFolder}/${this.dbName}.json`, JSON.stringify(content, null, 2));
    } else {
      fs.writeFileSync(`./${this.dbFolder}/${this.dbName}.json`, JSON.stringify(content));
    }
    return this.get(db);

  }

  get(db) {

    if (!db) {
      throw new TypeError("Verinin adını gir. - Enter the name of the data.");
    }

    const content = JSON.parse(fs.readFileSync(`./${this.dbFolder}/${this.dbName}.json`, "utf8"));

    return functions.get(content, ...db.split("."));

  }

  fetch(db) {

    if (!db) {
      throw new TypeError("Verinin adını gir. - Enter the name of the data.");
    }

    const content = JSON.parse(fs.readFileSync(`./${this.dbFolder}/${this.dbName}.json`, "utf8"));

    return functions.get(content, ...db.split("."));

  }

  has(db) {

    if (!db) {
      throw new TypeError("Verinin adını gir. - Enter the name of the data.");
    }

    const content = JSON.parse(fs.readFileSync(`./${this.dbFolder}/${this.dbName}.json`, "utf8"));

    return functions.get(content, ...db.split(".")) ? true : false;

  }

  delete(db) {
    functions.fetchFiles(this.dbFolder, this.dbName);

    if (!db) {
      throw new TypeError("Verinin adını gir. - Enter the name of the data.");
    }

    const content = JSON.parse(fs.readFileSync(`./${this.dbFolder}/${this.dbName}.json`, "utf8"));

    if (!this.get(db)) {
      return false;
    }

    functions.delete(content, db);

    if (this.noBlankData === true) {
      functions.removeEmptyData(content);
    }

    if (this.readable) {
      fs.writeFileSync(`./${this.dbFolder}/${this.dbName}.json`, JSON.stringify(content, null, 2));
    } else {
      fs.writeFileSync(`./${this.dbFolder}/${this.dbName}.json`, JSON.stringify(content));
    }

    return true;
  }

  add(db, number) {

    if (!db) {
      throw new TypeError("Verinin adını gir. - Enter the name of the data.");
    }

    if (!number) {
      throw new TypeError("Ayarlanacak veriyi gir. - Enter the data to be set.");
    }

    if (isNaN(number)) {
      throw new TypeError("Bir sayı gir. - Enter a number.");
    }

    this.set(db, Number(this.get(db) ? (isNaN(this.get(db)) ? Number(number) : this.get(db) + Number(number)) : Number(number)));

    return this.get(db);

  }

  subtract(db, number) {

    if (!db) {
      throw new TypeError("Verinin adını gir. - Enter the name of the data.");
    }

    if (!number) {
      throw new TypeError("Ayarlanacak veriyi gir. - Enter the data to be set.");
    }

    if (isNaN(number)) {
      throw new TypeError("Bir sayı gir. - Enter a number.");
    }

    if (this.get(db) - number <= 1) {
      this.delete(db);
      return (this.get(db) || 0)
    }

    if (!this.get(db)) {
      this.delete(db);
      return (this.get(db) || 0)
    }

    this.set(db, this.get(db) ? (this.get(db) - Number(number) <= 1 ? 1 : (isNaN(this.get(db)) ? 1 : this.get(db) - Number(number)) || 1) : 1);

    return this.get(db);

  }

  push(db, data) {

    if (!db) {
      throw new TypeError("Verinin adını gir. - Enter the name of the data.");
    }

    if (!data) {
      throw new TypeError("Ayarlanacak veriyi gir. - Enter the data to be set.");
    }

    var arr = [];

    if (this.get(db)) {
      if (typeof this.get(db) !== "object") {
        arr = [];
      } else {
        arr = this.get(db);
      }
    }

    arr.push(data);

    this.set(db, arr);

    return this.get(db);

  }

  unpush(db, data) {

    if (!db) {
      throw new TypeError("Verinin adını gir. - Enter the name of the data.");
    }

    if (!data) {
      throw new TypeError("Ayarlanacak veriyi gir. - Enter the data to be set.");
    }

    var arr = [];

    if (this.get(db)) {
      arr = this.get(db);
    }

    arr = arr.filter((x) => x !== data);

    this.set(db, arr);

    return this.get(db);

  }

  delByPriority(data, number) {

    if (!data) {
      throw new TypeError("Ayarlanacak veriyi gir. - Enter the data to be set.");
    }

    if (!number) {
      throw new TypeError("Bir sayı gir. - Enter a number.");
    }

    if (isNaN(number)) {
      throw new TypeError("Bir sayı gir. - Enter a number.");
    }

    if (!this.get(data) || this.get(data).length < 1) {
      return false;
    }

    let content = this.get(data);
    let neww = [];

    if (typeof content !== "object") {
      return false;
    }

    for (let a = 0; a < content.length; a++) {
      if (a !== (number - 1)) {
        neww.push(content[`${a}`]);
      }
    }

    this.set(data, neww);
    return this.get(data);

  }

  setByPriority(data, value, number) {

    if (!data) {
      throw new TypeError("Ayarlanacak veriyi gir. - Enter the data to be set.");
    }

    if (!value) {
      throw new TypeError("Ayarlanacak veriyi gir. - Enter the data to be set.");
    }

    if (!number) {
      throw new TypeError("Bir sayı gir. - Enter a number.");
    }

    if (isNaN(number)) {
      throw new TypeError("Bir sayı gir. - Enter a number.");
    }

    if (!this.get(data) || this.get(data).length < 1) {
      return false;
    }

    let content = this.get(data);
    let neww = [];

    if (typeof content !== "object") {
      return false;
    }

    for (let a = 0; a < content.length; a++) {
      let val = content[`${a}`];

      if (a === (number - 1)) {
        neww.push(value);
      } else {
        neww.push(val);
      }
    }

    this.set(data, neww);
    return this.get(data);

  }

  all() {
    const content = JSON.parse(fs.readFileSync(`./${this.dbFolder}/${this.dbName}.json`, "utf8"));

    return content;
  }

  deleteAll() {

    fs.writeFileSync(`./${this.dbFolder}/${this.dbName}.json`, JSON.stringify({}, null, 2));

    return true;

  }

}

module.exports = MegaDB;
