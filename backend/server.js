const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  "db/lumber.sqlite3",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the lumber database.");
    }
  }
);

// middleware
app.use(bodyParser.json());

// get request
app.get("/data", (req, res) => {
  try {
    sql = "SELECT * FROM LumberStockData";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.json({ status: 404, error: err });
      }
      if (rows.length < 1) {
        return res.json({ status: 404, message: "No data found" });
      }
      return res.json({ status: 200, message: "success", data: rows });
    });
  } catch (err) {
    return res.json({ status: 400, success: false, error: err });
  }
});

app.listen(4000, () => {});
