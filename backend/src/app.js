const express = require("express");
const routes = require("./routes/index");
const app = express();

app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.json({limit: "16kb"}))

app.use("/api", routes);

module.exports = app;