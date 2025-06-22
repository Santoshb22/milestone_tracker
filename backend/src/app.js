const express = require("express");
const routes = require("./routes/index");
const app = express();

app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.json({limit: "16kb"}))

app.use("/babysteps/api/v1", routes);

module.exports = app;