const express = require("express");
const routes = require("./routes/index");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const allowedOrigins = [
  "https://milestone-tracker-iota.vercel.app",
  "http://localhost:5173"
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.json({limit: "16kb"}))
app.use(cookieParser())

app.use("/api", routes);

module.exports = app;
