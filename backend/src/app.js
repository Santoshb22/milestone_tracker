const express = require("express");
const routes = require("./routes/index");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({
  origin: "http://localhost:5173",  // ✅ your Vite dev server
  credentials: true                // ✅ allow cookies
}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.json({limit: "16kb"}))
app.use(cookieParser())

app.use("/api", routes);

module.exports = app;
