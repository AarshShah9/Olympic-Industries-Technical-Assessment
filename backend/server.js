const express = require("express");
const app = express();
const db = require("./db/stock.js"); // gets crud methods

// middleware
// app.use(express.json()); // looks to see if the request has any json data
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// routes
app.get("/", async (req, res) => {
  const response = db.getAllStock(); // still need to build this method
  const data = await response; // need to parse the response and pass data of the form
  /*
  {
  "data": [],
  "labels": []
  }
  */

  res.status(200).json(data);
});

// connect to db
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Connected to DB and now listening for requests!");
});
