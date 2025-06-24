const express = require("express");
const routes = require("./routes/index");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({
  origin: "https://milestone-tracker-iota.vercel.app/",  
  credentials: true        
}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.json({limit: "16kb"}))
app.use(cookieParser())

app.use("/api", routes);

module.exports = app;
