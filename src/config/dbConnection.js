/*
 * Database connection file.
 */
const mongoose = require("mongoose");
const { DBURL } = require("./index");

mongoose.connect(DBURL, {});
const db = mongoose.connection;

db.once("open", () => {
  console.info("Connection Succeed 🙌");
});

db.on("error", () => {
  console.error("Error in Connect Mongo");
});

module.exports = mongoose;
